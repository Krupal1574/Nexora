import { NextResponse, NextRequest } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    Sentry.captureMessage("Test log from admin products API", "info");
    Sentry.metrics.count('test_metric', 1);
    const items = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
  } catch (error) {
    console.error('GET Error in products:', error);
    Sentry.captureException(error, {
      extra: { context: "GET /api/admin/products" },
    });
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
    const item = await prisma.product.create({
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
    console.error('POST Error in products:', error);
    Sentry.captureException(error, {
      extra: { context: "POST /api/admin/products" },
    });
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
