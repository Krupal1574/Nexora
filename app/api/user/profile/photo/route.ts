import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const photo = await prisma.candidatePhoto.findUnique({
      where: { userId: session.user.id },
    });

    if (!photo) return new NextResponse("Not found", { status: 404 });

    return new NextResponse(photo.data, {
      headers: {
        "Content-Type": photo.mimeType,
        "Cache-Control": "private, max-age=3600, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[PHOTO_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return new NextResponse("No file", { status: 400 });

    if (file.size > 2 * 1024 * 1024) {
      return new NextResponse("File too large (max 2MB)", { status: 400 });
    }
    
    if (!file.type.startsWith("image/")) {
      return new NextResponse("Invalid file type", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    await prisma.candidatePhoto.upsert({
      where: { userId: session.user.id },
      update: { data: buffer, mimeType: file.type, size: file.size },
      create: { userId: session.user.id, data: buffer, mimeType: file.type, size: file.size },
    });

    await prisma.candidateProfile.upsert({
      where: { userId: session.user.id },
      update: { hasCustomPhoto: true },
      create: { userId: session.user.id, hasCustomPhoto: true },
    });

    const newPhotoUrl = `/api/user/profile/photo`;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: newPhotoUrl },
    });

    return NextResponse.json({ url: newPhotoUrl });
  } catch (error) {
    console.error("[PHOTO_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    await prisma.candidatePhoto.delete({
      where: { userId: session.user.id },
    });

    await prisma.candidateProfile.update({
      where: { userId: session.user.id },
      data: { hasCustomPhoto: false },
    });

    // We don't restore the Google photo automatically here because we don't store it separately.
    // Setting image to null will make it fallback to initials. If user logs out/in via Google, it'll refresh.
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PHOTO_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
