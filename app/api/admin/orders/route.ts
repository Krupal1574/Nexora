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
    const items = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
  } catch (error) {
    console.error('GET Error in orders:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const item = await prisma.order.create({
      data: body,
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error('POST Error in orders:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
