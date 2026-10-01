import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as argon2 from "argon2";
import { sendWelcomeEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || typeof name !== "string" || name.length < 2) {
      return new NextResponse("Invalid name", { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new NextResponse("Invalid email", { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return new NextResponse("Password must be at least 8 characters", { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    if (isRateLimited("register", ip)) {
      return new NextResponse("Too many registration attempts. Please try again later.", { status: 429 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 409 });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });

    // Fire-and-forget welcome email (failures logged internally)
    sendWelcomeEmail(email, name);

    return NextResponse.json(
      { message: "User created successfully", id: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

