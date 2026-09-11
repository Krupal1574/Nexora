import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const item = await prisma.product.update({
      where: { id: id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        originalPrice: body.originalPrice,
        discount: body.discount,
        image: body.image,
        category: body.category,
        status: body.status,
        stock: body.stock,
        featured: body.featured,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error('PUT Error in products:', error);
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
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error in products:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
