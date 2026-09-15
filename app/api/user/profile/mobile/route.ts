import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

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

    // In a real app, integrate Twilio here
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // await sendSmsOtp(newPhone, otp);
    // await saveOtpToDb(session.user.id, otp);
    
    // For MVP, we mock it by returning success and accepting any 6-digit code in PUT
    console.log(`[MOCK SMS] OTP sent to ${newPhone}`);

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

    // In a real app, verify OTP against DB/Redis
    // For MVP, any 6-digit string works since it's mocked

    await prisma.user.update({
      where: { id: session.user.id },
      data: { phone: user.pendingPhone, pendingPhone: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[MOBILE_OTP_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
