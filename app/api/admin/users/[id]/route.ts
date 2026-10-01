import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Prevent modifying the current admin user to avoid locking oneself out
  if ((session.user as any)?.id === id) {
    return NextResponse.json({ error: "Cannot modify your own admin account" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const item = await prisma.user.update({
      where: { id: id },
      data: {
        role: body.role,
        isDisabled: body.isDisabled,
      },
    });
    const { password, ...safeItem } = item;
    return NextResponse.json(safeItem);
  } catch (error) {
    console.error('PUT Error in users:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Prevent deleting the current admin user
  if ((session.user as any)?.id === id) {
    return NextResponse.json({ error: "Cannot delete your own admin account" }, { status: 403 });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error in users:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
