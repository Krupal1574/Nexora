import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmailChangeVerification } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { newEmail } = body;

    if (!newEmail || !newEmail.includes("@")) {
      return new NextResponse("Invalid email", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existingUser) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.pendingEmailChange.deleteMany({
      where: { userId: session.user.id },
    });

    await prisma.pendingEmailChange.create({
      data: {
        userId: session.user.id,
        newEmail,
        token,
        expiresAt,
      },
    });

    const verifyUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/profile/verify-email?token=${token}`;
    await sendEmailChangeVerification(newEmail, verifyUrl);

    return NextResponse.json({ success: true, message: "Verification email sent" });
  } catch (error) {
    console.error("[EMAIL_CHANGE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { token } = body;

    if (!token) return new NextResponse("No token", { status: 400 });

    const pending = await prisma.pendingEmailChange.findUnique({
      where: { token },
    });

    if (!pending || pending.userId !== session.user.id || pending.expiresAt < new Date()) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { email: pending.newEmail, emailVerified: new Date() },
    });

    await prisma.pendingEmailChange.delete({ where: { id: pending.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[EMAIL_CHANGE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
