import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const whereClause: any = {
      expiresAt: { gt: new Date() }
    };

    if (category && category !== "All") {
      whereClause.category = category;
    }

    const articles = await prisma.externalArticle.findMany({
      where: whereClause,
      orderBy: { publishedAt: 'desc' },
      take: 50, // Limit to reasonable number
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching external articles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
