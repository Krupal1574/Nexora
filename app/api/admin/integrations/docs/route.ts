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

    const docs = google.docs({ version: 'v1', auth: oauth2Client });
    
    const body = await req.json();
    const title = body.title || "Nexora Client Document";

    // Create a new document
    const document = await docs.documents.create({
      requestBody: { title }
    });

    // Optionally insert text
    if (document.data.documentId && body.content) {
      await docs.documents.batchUpdate({
        documentId: document.data.documentId,
        requestBody: {
          requests: [
            {
              insertText: {
                location: { index: 1 },
                text: body.content,
              }
            }
          ]
        }
      });
    }

    const docUrl = `https://docs.google.com/document/d/${document.data.documentId}/edit`;
    return NextResponse.json({ success: true, documentUrl: docUrl });
  } catch (error) {
    console.error("Docs creation error:", error);
    return NextResponse.json({ error: "Creation failed" }, { status: 500 });
  }
}
