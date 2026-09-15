import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    // Prefer userId match (authenticated sessions); fall back to email for
    // legacy guest orders placed with the same email address.
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          // Only match userId if we have one — prevents accidental cross-user leakage
          ...(userId ? [{ userId }] : []),
          // Exact email match for legacy/guest orders – also scoped strictly to this user
          { customerEmail: userEmail, userId: null },
        ],
      },
      include: {
        items: {
          select: {
            id: true,
            productName: true,
            quantity: true,
            unitPrice: true,
            totalPrice: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/user/orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
