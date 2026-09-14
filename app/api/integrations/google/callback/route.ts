import { NextRequest, NextResponse } from "next/server";
import { getGoogleOAuth2Client } from "@/lib/google-oauth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const scopeType = searchParams.get('state'); // Passed from getAuthUrl

  if (!code || !scopeType) {
    return NextResponse.redirect(new URL('/admin?error=MissingCodeOrState', req.url));
  }

  try {
    const oauth2Client = getGoogleOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    
    // Determine provider ID based on scope type
    const providerId = scopeType === 'workspace' ? 'google-workspace-admin' : 'google-calendar';

    // Store in Prisma Account table
    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: providerId,
          providerAccountId: (session.user as { id: string }).id,
        },
      },
      update: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || undefined, // Only update if a new one is provided
        expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : null,
        scope: tokens.scope,
        token_type: tokens.token_type,
      },
      create: {
        userId: (session.user as { id: string }).id,
        type: 'oauth',
        provider: providerId,
        providerAccountId: (session.user as { id: string }).id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : null,
        scope: tokens.scope,
        token_type: tokens.token_type,
      },
    });

    const redirectPath = scopeType === 'workspace' ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(`${redirectPath}?success=connected`, req.url));
  } catch (error) {
    console.error("Error exchanging Google token:", error);
    return NextResponse.redirect(new URL('/admin?error=AuthFailed', req.url));
  }
}
