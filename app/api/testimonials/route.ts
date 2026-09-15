import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendTestimonialNotification } from "@/lib/email";

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
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { name, role, content, avatar, rating: bodyRating } = body;

    if (!name || !role || !content) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Rate Limiting (Server-side using RateLimit model)
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const identifier = session?.user?.email || ip;
    const action = "testimonial_submission";
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const rateLimit = await prisma.rateLimit.findUnique({
      where: { identifier_action: { identifier, action } }
    });

    if (rateLimit) {
      if (rateLimit.resetAt > now) {
        if (rateLimit.count >= 2) {
          return new NextResponse("Rate limit exceeded. Try again later.", { status: 429 });
        }
        await prisma.rateLimit.update({
          where: { id: rateLimit.id },
          data: { count: rateLimit.count + 1 }
        });
      } else {
        await prisma.rateLimit.update({
          where: { id: rateLimit.id },
          data: { count: 1, resetAt: new Date(now.getTime() + 60 * 60 * 1000) }
        });
      }
    } else {
      await prisma.rateLimit.create({
        data: {
          identifier,
          action,
          count: 1,
          resetAt: new Date(now.getTime() + 60 * 60 * 1000)
        }
      });
    }

    const rating = bodyRating ? parseInt(bodyRating, 10) : 5;
    
    // Automatically use session image if available
    const finalAvatar = (session?.user as any)?.image || avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        content,
        avatar: finalAvatar,
        rating,
        published: true, // Auto-publish testimonials
        isApproved: true, // Bypass admin approval
      },
    });

    // Fire-and-forget email notification to admin
    sendTestimonialNotification({ name, role, content, rating });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

