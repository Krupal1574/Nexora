import { NextRequest, NextResponse } from "next/server";
import { getAuthUrl } from "@/lib/google-oauth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const scopeType = searchParams.get('type');

  if (scopeType !== 'workspace' && scopeType !== 'calendar') {
    return NextResponse.json({ error: "Invalid scope type" }, { status: 400 });
  }

  // Admin check for workspace
  if (scopeType === 'workspace' && (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const authUrl = getAuthUrl(scopeType);
  return NextResponse.redirect(authUrl);
}
