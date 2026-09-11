import "server-only";

import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Initialisation – lazily created so the module can be imported safely even
// when RESEND_API_KEY is not yet set (e.g. at build-time).
// ---------------------------------------------------------------------------
let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (_resend) return _resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY is not configured – emails will be skipped.");
    return null;
  }
  _resend = new Resend(apiKey);
  return _resend;
}

const DEFAULT_FROM = "onboarding@resend.dev";

function getFrom(): string {
  return process.env.EMAIL_FROM || DEFAULT_FROM;
}

function getAdminEmail(): string | null {
  return process.env.ADMIN_EMAIL || null;
}

// ---------------------------------------------------------------------------
// Contact-form notification → admin
// ---------------------------------------------------------------------------
export async function sendContactNotification(submission: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const resend = getResend();
  const adminEmail = getAdminEmail();
  if (!resend || !adminEmail) return;

  try {
    await resend.emails.send({
      from: getFrom(),
      to: adminEmail,
      subject: `New Contact Inquiry from ${submission.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
        ${submission.phone ? `<p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>` : ""}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(submission.message)}</p>
      `,
    });
  } catch (error) {
    console.error("[email] Failed to send contact notification:", error);
  }
}

// ---------------------------------------------------------------------------
// Referral-form notification → admin
// ---------------------------------------------------------------------------
export async function sendReferralNotification(submission: {
  yourName: string;
  yourEmail: string;
  refName: string;
  refPhone: string;
  refEmail: string;
  message: string;
}) {
  const resend = getResend();
  const adminEmail = getAdminEmail();
  if (!resend || !adminEmail) return;

  try {
    await resend.emails.send({
      from: getFrom(),
      to: adminEmail,
      subject: `New Referral from ${submission.yourName}`,
      html: `
        <h2>New Referral Submission</h2>
        <p><strong>Referrer:</strong> ${escapeHtml(submission.yourName)} (${escapeHtml(submission.yourEmail)})</p>
        <hr />
        <h3>Referred Person</h3>
        <p><strong>Name:</strong> ${escapeHtml(submission.refName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(submission.refEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(submission.refPhone)}</p>
        ${submission.message ? `<p><strong>Notes:</strong> ${escapeHtml(submission.message)}</p>` : ""}
      `,
    });
  } catch (error) {
    console.error("[email] Failed to send referral notification:", error);
  }
}

// ---------------------------------------------------------------------------
// Testimonial notification → admin
// ---------------------------------------------------------------------------
export async function sendTestimonialNotification(testimonial: {
  name: string;
  role: string;
  content: string;
  rating: number;
}) {
  const resend = getResend();
  const adminEmail = getAdminEmail();
  if (!resend || !adminEmail) return;

  try {
    await resend.emails.send({
      from: getFrom(),
      to: adminEmail,
      subject: `New Testimonial from ${testimonial.name}`,
      html: `
        <h2>New Testimonial Submitted</h2>
        <p><strong>Name:</strong> ${escapeHtml(testimonial.name)}</p>
        <p><strong>Role:</strong> ${escapeHtml(testimonial.role)}</p>
        <p><strong>Rating:</strong> ${"★".repeat(testimonial.rating)}${"☆".repeat(5 - testimonial.rating)}</p>
        <hr />
        <blockquote>${escapeHtml(testimonial.content)}</blockquote>
      `,
    });
  } catch (error) {
    console.error("[email] Failed to send testimonial notification:", error);
  }
}

// ---------------------------------------------------------------------------
// Welcome email → new user
// ---------------------------------------------------------------------------
export async function sendWelcomeEmail(email: string, name: string) {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: getFrom(),
      to: email,
      subject: "Welcome to Nexora!",
      html: `
        <h2>Welcome to Nexora, ${escapeHtml(name)}!</h2>
        <p>Thank you for creating your account. We're excited to have you on board.</p>
        <p>With your Nexora account, you can:</p>
        <ul>
          <li>Browse and purchase our products and courses</li>
          <li>Track your orders</li>
          <li>Access exclusive content</li>
        </ul>
        <p>If you have any questions, feel free to reach out through our <a href="${process.env.NEXTAUTH_URL || "https://nexora.com"}/contact">contact page</a>.</p>
        <p>Best regards,<br />The Nexora Team</p>
      `,
    });
  } catch (error) {
    console.error("[email] Failed to send welcome email:", error);
  }
}

// ---------------------------------------------------------------------------
// Order status update → customer
// ---------------------------------------------------------------------------
export async function sendOrderStatusEmail(order: {
  orderNumber: string;
  customerEmail: string;
  customerName?: string | null;
  status: string;
  paymentStatus: string;
  total: string | number;
  currency: string;
}) {
  const resend = getResend();
  if (!resend) return;

  const statusLabels: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    REFUNDED: "Refunded",
  };

  const displayStatus = statusLabels[order.status] || order.status;
  const greeting = order.customerName
    ? `Hi ${escapeHtml(order.customerName)},`
    : "Hi,";

  try {
    await resend.emails.send({
      from: getFrom(),
      to: order.customerEmail,
      subject: `Order ${order.orderNumber} — ${displayStatus}`,
      html: `
        <h2>Order Update</h2>
        <p>${greeting}</p>
        <p>Your order <strong>#${escapeHtml(order.orderNumber)}</strong> has been updated.</p>
        <table style="border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Status:</td><td>${escapeHtml(displayStatus)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Payment:</td><td>${escapeHtml(order.paymentStatus)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Total:</td><td>${order.currency.toUpperCase()} ${order.total}</td></tr>
        </table>
        <p>If you have any questions about your order, please don't hesitate to contact us.</p>
        <p>Thank you for choosing Nexora!</p>
      `,
    });
  } catch (error) {
    console.error("[email] Failed to send order status email:", error);
  }
}

// ---------------------------------------------------------------------------
// Password reset email → user
// ---------------------------------------------------------------------------
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: getFrom(),
      to: email,
      subject: "Reset Your Nexora Password",
      html: `
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <p style="margin: 24px 0;">
          <a href="${escapeHtml(resetUrl)}" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#00F2FE,#00D2C4);color:#0B0F19;font-weight:bold;text-decoration:none;border-radius:8px;">
            Reset Password
          </a>
        </p>
        <p style="color:#94A3B8;font-size:14px;">If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="color:#00F2FE;font-size:14px;word-break:break-all;">${escapeHtml(resetUrl)}</p>
        <hr style="border-color:#2D3748;margin:24px 0;" />
        <p style="color:#64748B;font-size:12px;">This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
      `,
    });
  } catch (error) {
    console.error("[email] Failed to send password reset email:", error);
  }
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
