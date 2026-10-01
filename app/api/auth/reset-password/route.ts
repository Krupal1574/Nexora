import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as argon2 from "argon2";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ message: "Invalid reset token." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    if (isRateLimited("reset_password", ip)) {
      return NextResponse.json({ message: "Too many attempts. Please try again later." }, { status: 429 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });
    }

    // Find the token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json({ message: "Invalid or expired reset link. Please request a new one." }, { status: 400 });
    }

    // Check expiry
    if (verificationToken.expires < new Date()) {
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: { token },
      });
      return NextResponse.json({ message: "This reset link has expired. Please request a new one." }, { status: 400 });
    }

    // Find the user by identifier (email)
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      // Clean up token if user doesn't exist
      await prisma.verificationToken.delete({
        where: { token },
      });
      return NextResponse.json({ message: "Account not found." }, { status: 400 });
    }

    // Hash the new password and update
    const hashedPassword = await argon2.hash(password);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Delete the used token (one-time use)
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
