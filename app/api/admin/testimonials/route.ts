import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        role: body.role,
        content: body.content,
        avatar: body.avatar || "https://i.pravatar.cc/150?img=1",
        rating: body.rating ? parseInt(body.rating) : 5,
        published: body.published ?? true,
        isApproved: body.isApproved ?? false,
        isFeatured: body.isFeatured ?? false,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
