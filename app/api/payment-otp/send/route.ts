import { NextResponse } from "next/server";
import {
  otpStore,
  sendCounts,
  generateOTP,
  cleanupExpired,
  RATE_LIMIT_WINDOW,
  MAX_SENDS_PER_WINDOW,
  OTP_EXPIRY,
} from "@/lib/payment-otp";
import { sendPaymentOtpEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    cleanupExpired();

    const body = await request.json().catch(() => ({}));
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const now = Date.now();

    // 1. Rate limiting per hour
    const sendRecord = sendCounts.get(email);
    if (sendRecord) {
      if (now - sendRecord.windowStart < RATE_LIMIT_WINDOW) {
        if (sendRecord.count >= MAX_SENDS_PER_WINDOW) {
          return NextResponse.json(
            {
              error:
                "Too many requests. Please wait a while before requesting another code.",
            },
            { status: 429 }
          );
        }
        sendRecord.count += 1;
      } else {
        sendRecord.count = 1;
        sendRecord.windowStart = now;
      }
    } else {
      sendCounts.set(email, { count: 1, windowStart: now });
    }

    // 2. Prevent spamming resend within 60 seconds
    const existing = otpStore.get(email);
    if (existing && now - existing.lastSentAt < 60_000) {
      const waitSecs = Math.ceil((60_000 - (now - existing.lastSentAt)) / 1000);
      return NextResponse.json(
        { error: `Please wait ${waitSecs} seconds before requesting a new code.` },
        { status: 429 }
      );
    }

    // 3. Generate and store OTP
    const otp = generateOTP();
    otpStore.set(email, {
      otp,
      expiresAt: now + OTP_EXPIRY,
      attempts: 0,
      lastSentAt: now,
    });

    // 4. Send email via Resend
    const result = await sendPaymentOtpEmail(email, otp);

    if (!result.success) {
      // Revert attempt so user isn't penalized for email provider outage
      otpStore.delete(email);
      return NextResponse.json(
        { error: result.error || "Failed to send verification code. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (err: unknown) {
    console.error("[payment-otp/send] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
