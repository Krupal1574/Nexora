import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const FORBIDDEN_KEYS = [
  "RESEND_API_KEY", 
  "GOOGLE_CLIENT_ID", 
  "GOOGLE_CLIENT_SECRET", 
  "NEXTAUTH_SECRET", 
  "NEXTAUTH_URL",
  "DATABASE_URL"
];

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    
    if (body.key && FORBIDDEN_KEYS.some(k => body.key.toUpperCase().includes(k))) {
      return NextResponse.json({ error: "Cannot store sensitive credentials in SiteSettings" }, { status: 400 });
    }

    const item = await prisma.siteSetting.update({
      where: { id },
      data: {
        key: body.key,
        value: body.value,
        description: body.description,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error('PUT Error in settings:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.siteSetting.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error in settings:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
