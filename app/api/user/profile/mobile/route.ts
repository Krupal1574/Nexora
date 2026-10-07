import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PinpointSMSVoiceV2Client, SendTextMessageCommand } from "@aws-sdk/client-pinpoint-sms-voice-v2";

const smsClient = new PinpointSMSVoiceV2Client({
  region: process.env.AWS_REGION || "us-east-1",
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { newPhone } = body;

    if (!newPhone) return new NextResponse("Invalid phone", { status: 400 });

    const identifier = `otp_${session.user.id}`;
    
    // Check rate limit
    const rateLimit = await prisma.rateLimit.findUnique({
      where: { identifier_action: { identifier, action: "send_otp" } },
    });

    if (rateLimit && rateLimit.count >= 5 && rateLimit.resetAt > new Date()) {
      return new NextResponse("Too many requests, try again later", { status: 429 });
    }

    // Save pending phone
    await prisma.user.update({
      where: { id: session.user.id },
      data: { pendingPhone: newPhone },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in verification tokens
    await prisma.verificationToken.deleteMany({
      where: { identifier: `phone_${session.user.id}` },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: `phone_${session.user.id}`,
        token: otp,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      },
    });

    try {
      const command = new SendTextMessageCommand({
        DestinationPhoneNumber: newPhone,
        MessageBody: `Your Nexora verification code is ${otp}`,
        MessageType: "TRANSACTIONAL",
      });
      await smsClient.send(command);
    } catch (smsError) {
      console.error("[MOBILE_OTP_POST] AWS SMS Error:", smsError);
      return new NextResponse("Failed to send SMS", { status: 500 });
    }

    // Update rate limit
    await prisma.rateLimit.upsert({
      where: { identifier_action: { identifier, action: "send_otp" } },
      create: {
        identifier,
        action: "send_otp",
        count: 1,
        resetAt: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      },
      update: {
        count: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("[MOBILE_OTP_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { otp } = body;

    if (!otp || otp.length !== 6) return new NextResponse("Invalid OTP", { status: 400 });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { pendingPhone: true },
    });

    if (!user?.pendingPhone) return new NextResponse("No pending phone", { status: 400 });

    const verification = await prisma.verificationToken.findFirst({
      where: {
        identifier: `phone_${session.user.id}`,
        token: otp,
        expires: { gt: new Date() }
      }
    });

    if (!verification) {
      return new NextResponse("Invalid or expired OTP", { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { phone: user.pendingPhone, pendingPhone: null },
    });

    await prisma.verificationToken.deleteMany({
      where: { identifier: `phone_${session.user.id}` },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[MOBILE_OTP_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
