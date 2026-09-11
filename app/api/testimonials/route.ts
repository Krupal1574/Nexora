import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, content, avatar } = body;

    if (!name || !role || !content) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        content,
        avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        rating: 5,
        published: true, // Auto-publish testimonials
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
