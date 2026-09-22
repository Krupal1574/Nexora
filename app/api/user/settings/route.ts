import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import * as argon2 from "argon2";

export const dynamic = "force-dynamic";

/** GET /api/user/settings
 *  Returns safe account metadata for the logged-in user:
 *  name, email, jobTitle, company, role, hasPassword, isGoogleUser
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        jobTitle: true,
        company: true,
        role: true,
        password: true,          // needed only to derive hasPassword
        accounts: {
          select: { provider: true },
        },
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Never send the password hash to the client
    const { password, accounts, ...safeUser } = user;
    const providers = accounts.map((a: any) => a.provider);

    return NextResponse.json({
      ...safeUser,
      hasPassword: !!password,
      isGoogleUser: providers.includes("google"),
      providers,
    });
  } catch (error) {
    console.error("GET /api/user/settings error:", error);
    Sentry.captureException(error, {
      extra: { context: "GET /api/user/settings" },
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** PUT /api/user/settings
 *  Password change for credential users only.
 *  Body: { currentPassword, newPassword }
 */
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, password: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Only credential users have a stored password
    if (!user.password) {
      return NextResponse.json(
        { error: "Password changes are not available for Google accounts" },
        { status: 400 }
      );
    }

    const isValid = await argon2.verify(user.password, currentPassword);
    if (!isValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const hashedNew = await argon2.hash(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNew },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/user/settings error:", error);
    Sentry.captureException(error, {
      extra: { context: "PUT /api/user/settings" },
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
