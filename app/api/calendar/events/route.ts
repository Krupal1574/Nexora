import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { google } from "googleapis";
import { getGoogleOAuth2Client } from "@/lib/google-oauth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = (session.user as { id: string }).id;
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'google-calendar',
          providerAccountId: userId,
        }
      }
    });

    if (!account || !account.access_token) {
      return NextResponse.json({ error: "Calendar not connected" }, { status: 400 });
    }

    const oauth2Client = getGoogleOAuth2Client();
    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    // Fetch upcoming 10 events
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return NextResponse.json({ events: response.data.items });
  } catch (error) {
    console.error("Calendar fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
