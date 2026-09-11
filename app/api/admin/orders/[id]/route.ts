import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendOrderStatusEmail } from "@/lib/email";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const item = await prisma.order.update({
      where: { id: id },
      data: {
        status: body.status,
        paymentStatus: body.paymentStatus,
      },
    });

    // Fire-and-forget order status email to the customer
    sendOrderStatusEmail({
      orderNumber: item.orderNumber,
      customerEmail: item.customerEmail,
      customerName: item.customerName,
      status: item.status,
      paymentStatus: item.paymentStatus,
      total: item.total.toString(),
      currency: item.currency,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('PUT Error in orders:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// DELETE is explicitly disallowed for orders per business logic
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ error: "Orders cannot be deleted." }, { status: 405 });
}

