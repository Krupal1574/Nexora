import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    if (isRateLimited("forgot_password", ip)) {
      return NextResponse.json({ message: "Too many reset requests. Please try again later." }, { status: 429 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Always return success to prevent email enumeration
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (user && user.password) {
      // Only send reset for credential-based accounts (not Google-only)
      const token = crypto.randomUUID().replace(/-/g, "");
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Clean up any existing tokens for this email
      await prisma.verificationToken.deleteMany({
        where: { identifier: normalizedEmail },
      });

      // Create new reset token
      await prisma.verificationToken.create({
        data: {
          identifier: normalizedEmail,
          token,
          expires,
        },
      });

      // Build reset URL
      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

      try {
        await sendPasswordResetEmail(normalizedEmail, resetUrl);
      } catch (emailError) {
        console.error("Failed to send reset email:", emailError);
      }
    }

    // Always return 200 regardless of whether the user exists
    return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: error.message || "Something went wrong. Please try again." }, { status: 500 });
  }
}
