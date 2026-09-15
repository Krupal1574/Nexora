import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { storeResume, getResume, deleteResume } from "@/lib/resume-storage";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const resume = await getResume(session.user.id);
    if (!resume) return new NextResponse("Not found", { status: 404 });

    return new NextResponse(resume.data, {
      headers: {
        "Content-Type": resume.mimeType,
        "Content-Disposition": `attachment; filename="${resume.fileName}"`,
      },
    });
  } catch (error) {
    console.error("[RESUME_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const parsedDataStr = formData.get("parsedData") as string | null;
    
    if (!file) return new NextResponse("No file", { status: 400 });

    if (file.size > 5 * 1024 * 1024) {
      return new NextResponse("File too large (max 5MB)", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let parsedData = {};
    if (parsedDataStr) {
      try { parsedData = JSON.parse(parsedDataStr); } catch (e) {}
    }

    await storeResume(session.user.id, file.name, file.type, buffer, parsedData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[RESUME_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    await deleteResume(session.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[RESUME_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
