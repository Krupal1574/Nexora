import { NextResponse } from "next/server";
import {
  otpStore,
  lockouts,
  cleanupExpired,
  MAX_ATTEMPTS,
  LOCKOUT_DURATION,
} from "@/lib/payment-otp";

export async function POST(request: Request) {
  try {
    cleanupExpired();

    const body = await request.json().catch(() => ({}));
    const email = (body.email || "").trim().toLowerCase();
    const otp = (body.otp || "").trim();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const now = Date.now();

    // 1. Check if email is currently locked out
    const lockedUntil = lockouts.get(email);
    if (lockedUntil && now < lockedUntil) {
      const waitMins = Math.ceil((lockedUntil - now) / 60_000);
      return NextResponse.json(
        {
          error: `Too many failed attempts. Please try again in ${waitMins} minute${waitMins > 1 ? "s" : ""}.`,
        },
        { status: 429 }
      );
    }

    // 2. Retrieve OTP record
    const record = otpStore.get(email);

    if (!record) {
      return NextResponse.json(
        { error: "No verification code found. Please request a new one." },
        { status: 400 }
      );
    }

    // 3. Check expiration
    if (now > record.expiresAt) {
      otpStore.delete(email);
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // 4. Verify match
    if (record.otp !== otp) {
      record.attempts += 1;
      const remaining = MAX_ATTEMPTS - record.attempts;

      if (record.attempts >= MAX_ATTEMPTS) {
        otpStore.delete(email);
        lockouts.set(email, now + LOCKOUT_DURATION);
        return NextResponse.json(
          {
            error:
              "Too many failed attempts. You have been temporarily locked out for 30 minutes.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `Invalid code. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`,
        },
        { status: 401 }
      );
    }

    // 5. Successful verification
    otpStore.delete(email);
    lockouts.delete(email);

    return NextResponse.json({
      success: true,
      message: "Verification successful.",
    });
  } catch (err: unknown) {
    console.error("[payment-otp/verify] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
