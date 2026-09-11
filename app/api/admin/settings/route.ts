import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await prisma.siteSetting.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
  } catch (error) {
    console.error('GET Error in settings:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

const FORBIDDEN_KEYS = [
  "RESEND_API_KEY", 
  "GOOGLE_CLIENT_ID", 
  "GOOGLE_CLIENT_SECRET", 
  "NEXTAUTH_SECRET", 
  "NEXTAUTH_URL",
  "DATABASE_URL"
];

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body.key && FORBIDDEN_KEYS.some(k => body.key.toUpperCase().includes(k))) {
      return NextResponse.json({ error: "Cannot store sensitive credentials in SiteSettings" }, { status: 400 });
    }

    const item = await prisma.siteSetting.create({
      data: {
        key: body.key,
        value: body.value,
        description: body.description,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error('POST Error in settings:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
