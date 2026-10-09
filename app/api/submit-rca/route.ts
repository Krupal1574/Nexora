import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// You will need to set RESEND_API_KEY in your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const linkedin = formData.get("linkedin") as string;
    const outputEffort = formData.get("output_effort") as string;
    const dailyApps = formData.get("daily_applications") as string;
    const weeklyCalls = formData.get("weekly_calls") as string;
    const resumeUsage = formData.get("resume_usage") as string;
    const whereStuck = formData.get("where_stuck") as string;
    const whatDoing = formData.get("what_doing") as string;
    const biggestProblem = formData.get("biggest_problem") as string;
    
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }

    const attachments = [];

    if (resumeFile && resumeFile.size > 0) {
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
      });
    }

    const htmlContent = `
      <h2>New Quick RCA Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>LinkedIn:</strong> ${linkedin || "Not provided"}</p>
      
      <h3>Diagnosis Information</h3>
      <p><strong>Output vs Effort:</strong> ${outputEffort}</p>
      <p><strong>Daily Applications:</strong> ${dailyApps}</p>
      <p><strong>Weekly Interview Calls:</strong> ${weeklyCalls}</p>
      <p><strong>Resume Usage:</strong> ${resumeUsage}</p>
      <p><strong>Where they are stuck:</strong> ${whereStuck}</p>
      <p><strong>What they are currently doing:</strong> ${whatDoing}</p>
      <p><strong>Biggest Problem:</strong> ${biggestProblem}</p>
    `;

    const data = await resend.emails.send({
      from: "Nexora RCA <support@nexorastaffingllp.com>",
      to: ["nexorastaffingllp@gmail.com", "Support@nexorastaffingllp.com"],
      subject: `New RCA Submission from ${name}`,
      html: htmlContent,
      attachments,
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error processing RCA submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
