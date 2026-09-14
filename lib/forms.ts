import "server-only";

import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { sendContactNotification, sendReferralNotification } from "@/lib/email";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const IDEMPOTENCY_WINDOW_MS = 24 * 60 * 60 * 1_000;

const rateLimitStore = new Map<string, number[]>();
const idempotencyStore = new Map<string, number>();

export type ContactSubmission = {
  name: string;
  phone: string;
  email: string;
  smsOptIn: boolean;
  message: string;
};

export type ReferralSubmission = {
  yourName: string;
  yourEmail: string;
  refName: string;
  refPhone: string;
  refEmail: string;
  message: string;
  authorizedToRefer: boolean;
};

type SubmissionType = "contact" | "referral";

type FormError = {
  status: number;
  message: string;
  fieldErrors?: Record<string, string>;
};

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function booleanValue(value: unknown) {
  return value === true;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string) {
  return /^[0-9+()\-.\s]{7,25}$/.test(value);
}

function validateContact(input: Record<string, unknown>): ContactSubmission | FormError {
  const submission: ContactSubmission = {
    name: stringValue(input.name),
    phone: stringValue(input.phone),
    email: stringValue(input.email).toLowerCase(),
    smsOptIn: booleanValue(input.smsOptIn),
    message: stringValue(input.message),
  };
  const fieldErrors: Record<string, string> = {};

  if (submission.name.length < 2 || submission.name.length > 120) fieldErrors.name = "Enter your full name.";
  if (!isPhone(submission.phone)) fieldErrors.phone = "Enter a valid phone number.";
  if (!isEmail(submission.email) || submission.email.length > 254) fieldErrors.email = "Enter a valid email address.";
  if (submission.message.length < 10 || submission.message.length > 3_000) fieldErrors.message = "Enter a message between 10 and 3,000 characters.";

  return Object.keys(fieldErrors).length
    ? { status: 400, message: "Please correct the highlighted fields.", fieldErrors }
    : submission;
}

function validateReferral(input: Record<string, unknown>): ReferralSubmission | FormError {
  const submission: ReferralSubmission = {
    yourName: stringValue(input.yourName),
    yourEmail: stringValue(input.yourEmail).toLowerCase(),
    refName: stringValue(input.refName),
    refPhone: stringValue(input.refPhone),
    refEmail: stringValue(input.refEmail).toLowerCase(),
    message: stringValue(input.message),
    authorizedToRefer: booleanValue(input.authorizedToRefer),
  };
  const fieldErrors: Record<string, string> = {};

  if (submission.yourName.length < 2 || submission.yourName.length > 120) fieldErrors.yourName = "Enter your full name.";
  if (!isEmail(submission.yourEmail) || submission.yourEmail.length > 254) fieldErrors.yourEmail = "Enter a valid email address.";
  if (submission.refName.length < 2 || submission.refName.length > 120) fieldErrors.refName = "Enter the referred person's full name.";
  if (!isPhone(submission.refPhone)) fieldErrors.refPhone = "Enter a valid phone number.";
  if (!isEmail(submission.refEmail) || submission.refEmail.length > 254) fieldErrors.refEmail = "Enter a valid email address.";
  if (submission.message.length > 2_000) fieldErrors.message = "Keep notes to 2,000 characters or fewer.";
  if (!submission.authorizedToRefer) fieldErrors.authorizedToRefer = "You must confirm that you are authorized to share these details.";

  return Object.keys(fieldErrors).length
    ? { status: 400, message: "Please correct the highlighted fields.", fieldErrors }
    : submission;
}

function getClientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function purgeExpiredEntries(now: number) {
  for (const [key, timestamps] of rateLimitStore) {
    const recent = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    if (recent.length) rateLimitStore.set(key, recent);
    else rateLimitStore.delete(key);
  }
  for (const [key, expiresAt] of idempotencyStore) {
    if (expiresAt <= now) idempotencyStore.delete(key);
  }
}

function isRateLimited(request: NextRequest, type: SubmissionType) {
  const now = Date.now();
  purgeExpiredEntries(now);
  const key = `${type}:${getClientKey(request)}`;
  const timestamps = rateLimitStore.get(key) ?? [];
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) return true;
  timestamps.push(now);
  rateLimitStore.set(key, timestamps);
  return false;
}

function isTrustedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return origin === request.nextUrl.origin;
}

function getIdempotencyKey(request: NextRequest) {
  const key = request.headers.get("idempotency-key") ?? "";
  return /^[a-zA-Z0-9_-]{16,128}$/.test(key) ? key : null;
}

async function parsePayload(request: NextRequest): Promise<Record<string, unknown> | FormError> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return { status: 413, message: "Submission is too large." };
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return { status: 415, message: "Unsupported submission format." };
  }
  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return { status: 400, message: "Invalid submission." };
    }
    return payload as Record<string, unknown>;
  } catch {
    return { status: 400, message: "Invalid submission." };
  }
}

function isFormError(value: unknown): value is FormError {
  return Boolean(value && typeof value === "object" && "status" in value && "message" in value);
}

export async function handleFormSubmission(request: NextRequest, type: SubmissionType) {
  if (!isTrustedOrigin(request)) return Response.json({ message: "Invalid request origin." }, { status: 403 });
  if (isRateLimited(request, type)) return Response.json({ message: "Please wait before trying again." }, { status: 429 });

  const idempotencyKey = getIdempotencyKey(request);
  if (!idempotencyKey) return Response.json({ message: "Invalid submission token. Please refresh and try again." }, { status: 400 });
  if (idempotencyStore.has(`${type}:${idempotencyKey}`)) {
    return Response.json({ message: "This submission has already been received." }, { status: 409 });
  }

  const payload = await parsePayload(request);
  if (isFormError(payload)) return Response.json(payload, { status: payload.status });
  if (stringValue(payload.website)) return Response.json({ message: "Unable to process this submission." }, { status: 400 });

  const submission = type === "contact" ? validateContact(payload) : validateReferral(payload);
  if (isFormError(submission)) return Response.json(submission, { status: submission.status });

  // Deliver the submission via Resend email notification to the admin.
  // We await the call so that delivery failures are surfaced to the client
  // as a 502 rather than being silently dropped.
  const submissionId = randomUUID();
  try {
    if (type === "contact") {
      const s = submission as ContactSubmission;
      await sendContactNotification({ name: s.name, email: s.email, phone: s.phone, message: s.message });
    } else {
      const s = submission as ReferralSubmission;
      await sendReferralNotification(s);
    }
  } catch (err) {
    console.error("form_submission_email_failed", { type, submissionId, err });
    return Response.json({ message: "We could not deliver your submission. Please try again shortly." }, { status: 502 });
  }

  // Record the idempotency key only after successful delivery so a retry is
  // still accepted if email delivery failed on a previous attempt.
  idempotencyStore.set(`${type}:${idempotencyKey}`, Date.now() + IDEMPOTENCY_WINDOW_MS);

  console.info("form_submission_delivered", { type, submissionId });
  return Response.json({ ok: true }, { status: 201 });
}
