import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import * as mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return new Response("File too large (max 5MB)", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      // For PDF, we can use Gemini multimodal directly on the file parts if we want,
      // or we can use pdf-parse. But the requirements say use Gemini 1.5 for PDF extraction.
      // Since ai-sdk supports passing files, we can pass it as a multimodal prompt.
      // We will send the prompt with the file data.
    } else {
      return new Response("Unsupported file type. Use PDF or DOCX.", { status: 400 });
    }

    // Schema for candidate data extraction
    const candidateSchema = z.object({
      name: z.string().optional(),
      headline: z.string().optional(),
      location: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      summary: z.string().optional(),
      skills: z.array(z.string()).default([]),
      languages: z.array(z.object({ lang: z.string(), level: z.string() })).default([]),
      education: z.array(
        z.object({
          school: z.string(),
          degree: z.string(),
          field: z.string(),
          from: z.string(),
          to: z.string(),
          current: z.boolean(),
        })
      ).default([]),
      experience: z.array(
        z.object({
          company: z.string(),
          title: z.string(),
          from: z.string(),
          to: z.string(),
          current: z.boolean(),
          description: z.string().optional(),
        })
      ).default([]),
      certifications: z.array(
        z.object({
          name: z.string(),
          issuer: z.string(),
          date: z.string().optional(),
        })
      ).default([]),
    });

    let result;

    if (extractedText) {
      // Use text prompt for DOCX
      result = await generateObject({
        model: google("gemini-3.6-flash"),
        schema: candidateSchema,
        prompt: `Extract candidate profile information from the following resume text:\n\n${extractedText}`,
      });
    } else {
      // Use multimodal for PDF
      result = await generateObject({
        model: google("gemini-3.6-flash"),
        schema: candidateSchema,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract candidate profile information from this resume PDF.",
              },
              {
                type: "file",
                data: buffer.toString("base64"),
                mediaType: "application/pdf",
              },
            ],
          },
        ],
      });
    }

    return new Response(JSON.stringify(result.object), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[RESUME_PARSE]", error);
    return new Response("Internal error parsing resume", { status: 500 });
  }
}
