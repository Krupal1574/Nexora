import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const roleName = (formData.get("roleName") as string) || "General Application";
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const linkedin = (formData.get("linkedin") as string) || "";
    const notes = (formData.get("notes") as string) || "";
    const resumeFile = formData.get("resume") as File | null;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      return NextResponse.json(
        { error: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    if (!resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { error: "Please upload your resume to apply." },
        { status: 400 }
      );
    }

    // Limit resume size to 10MB
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume file size must be under 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const attachments = [
      {
        filename: resumeFile.name,
        content: buffer,
      },
    ];

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #171717; max-width: 600px;">
        <h2 style="color: #F26A21; margin-bottom: 4px;">New Job Application</h2>
        <p style="font-size: 16px; margin-top: 0;"><strong>Role:</strong> ${escapeHtml(roleName)}</p>
        
        <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
        
        <h3 style="color: #0f0f0f; margin-bottom: 8px;">Applicant Details</h3>
        <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p style="margin: 4px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
        <p style="margin: 4px 0;"><strong>LinkedIn:</strong> ${
          linkedin
            ? `<a href="${escapeHtml(linkedin)}" target="_blank">${escapeHtml(linkedin)}</a>`
            : "Not provided"
        }</p>
        
        ${
          notes
            ? `<p style="margin: 12px 0;"><strong>Cover Note / Comments:</strong><br />${escapeHtml(notes)}</p>`
            : ""
        }
        
        <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
        <p style="font-size: 13px; color: #77736D;">
          📎 <strong>Attached Resume:</strong> ${escapeHtml(resumeFile.name)} (${(
      resumeFile.size / 1024
    ).toFixed(1)} KB)
        </p>
      </div>
    `;

    const recipients = ["connect@nexorastaffingllp.com"];
    const fromAddress = process.env.EMAIL_FROM || "Nexora Careers <connect@nexorastaffingllp.com>";

    const mailtoFallback = `mailto:connect@nexorastaffingllp.com?subject=${encodeURIComponent(
      `Application: ${roleName} - ${name}`
    )}&body=${encodeURIComponent(
      `Candidate Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLinkedIn: ${linkedin || "N/A"}\n\nPlease find my resume attached.`
    )}`;

    try {
      const emailResult = await resend.emails.send({
        from: fromAddress,
        to: recipients,
        replyTo: email,
        subject: `New Application: ${roleName} – ${name}`,
        html: htmlContent,
        attachments,
      });

      if (emailResult.error) {
        console.error("[careers/apply] Resend error:", emailResult.error);
        return NextResponse.json({
          success: true,
          notice: "Email sent with mailto fallback",
          mailto: mailtoFallback,
        });
      }

      return NextResponse.json({
        success: true,
        data: emailResult,
        mailto: mailtoFallback,
      });
    } catch (sendError) {
      console.error("[careers/apply] Resend sending failed:", sendError);
      return NextResponse.json({
        success: true,
        notice: "Proceeding with mail client fallback",
        mailto: mailtoFallback,
      });
    }
  } catch (error: unknown) {
    console.error("[careers/apply] Error processing application:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again or use the mailto button." },
      { status: 500 }
    );
  }
}

