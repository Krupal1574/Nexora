import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        candidateProfile: true,
        resume: { select: { fileName: true, fileSize: true, mimeType: true, updatedAt: true } },
      },
    });

    if (!user) return new NextResponse("Not found", { status: 404 });

    // Hide sensitive data
    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("[PROFILE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const {
      name,
      phone,
      headline,
      location,
      summary,
      availability,
      expectedSalary,
      skills,
      languages,
      education,
      experience,
      certifications,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
    } = body;

    // Update User basic fields
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone,
      },
    });

    // Update CandidateProfile
    const profile = await prisma.candidateProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        headline,
        location,
        summary,
        availability,
        expectedSalary,
        skills,
        languages,
        education,
        experience,
        certifications,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
      },
      update: {
        headline,
        location,
        summary,
        availability,
        expectedSalary,
        skills,
        languages,
        education,
        experience,
        certifications,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("[PROFILE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
