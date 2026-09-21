import { NextResponse } from "next/server";
import { db } from "@/lib/prisma8";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendTestimonialNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await db.orm.public.Testimonial
      .where({ published: true })
      .orderBy(t => t.createdAt.desc())
      .all();
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

    const rateLimit = await db.orm.public.RateLimit
      .where({ identifier, action })
      .first();

    if (rateLimit) {
      if (new Date(rateLimit.resetAt) > now) {
        if (rateLimit.count >= 2) {
          return new NextResponse("Rate limit exceeded. Try again later.", { status: 429 });
        }
        await db.orm.public.RateLimit
          .where({ id: rateLimit.id })
          .update({ count: rateLimit.count + 1 });
      } else {
        await db.orm.public.RateLimit
          .where({ id: rateLimit.id })
          .update({ count: 1, resetAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString() as any });
      }
    } else {
      await db.orm.public.RateLimit.create({
        id: crypto.randomUUID(),
        identifier,
        action,
        count: 1,
        resetAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString() as any
      });
    }

    const rating = bodyRating ? parseInt(bodyRating, 10) : 5;
    
    // Automatically use session image if available
    const finalAvatar = (session?.user as any)?.image || avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

    const testimonial = await db.orm.public.Testimonial.create({
      id: crypto.randomUUID(),
      name,
      role,
      content,
      avatar: finalAvatar,
      rating,
      published: true, // Auto-publish testimonials
      isApproved: true, // Bypass admin approval
      updatedAt: new Date().toISOString() as any,
    });

    // Fire-and-forget email notification to admin
    sendTestimonialNotification({ name, role, content, rating });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

