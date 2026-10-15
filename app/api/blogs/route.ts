import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json([]);
  }

  try {
    const db = prisma as unknown as {
      blogPost?: {
        findMany: (args: unknown) => Promise<unknown[]>;
      };
    };

    if (db.blogPost?.findMany) {
      const blogs = await db.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(blogs || []);
    }
    return NextResponse.json([]);
  } catch {
    return NextResponse.json([]);
  }
}
