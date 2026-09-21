import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { google } from "googleapis";
import { getGoogleOAuth2Client } from "@/lib/google-oauth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const adminId = (session.user as { id: string }).id;
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'google-workspace-admin',
          providerAccountId: adminId,
        }
      }
    });

    if (!account || !account.access_token) {
      return NextResponse.json({ error: "Google Workspace not connected" }, { status: 400 });
    }

    const oauth2Client = getGoogleOAuth2Client();
    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token,
    });

    // Handle token refresh internally via googleapis if refresh_token is present
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    
    // Example: Create a new sheet with user data
    const users = await prisma.user.findMany({ select: { name: true, email: true, role: true } });
    
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: { title: "Nexora Users Export" }
      }
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId;
    if (spreadsheetId) {
       await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "Sheet1!A1:C",
        valueInputOption: "RAW",
        requestBody: {
          values: [
            ["Name", "Email", "Role"],
            ...users.map((u: any) => [u.name, u.email, u.role])
          ]
        }
      });
    }

    return NextResponse.json({ success: true, spreadsheetUrl: spreadsheet.data.spreadsheetUrl });
  } catch (error) {
    console.error("Sheets export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
