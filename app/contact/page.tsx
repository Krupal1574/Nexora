"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Clock,
  Headphones,
} from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (302) 412-4095",
    sublabel: "Mon–Fri, 9AM–6PM EST",
    href: "tel:+13024124095",
    color: "#2E8BF0",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@nexora.info",
    sublabel: "We respond within 24 hours",
    href: "mailto:support@nexora.info",
    color: "#F0851F",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    value: "Tampa, FL, USA",
    sublabel: "Serving clients nationwide",
    color: "#2E8BF0",
  },
];

const features = [
  { icon: Clock, label: "24hr Response Time" },
  { icon: Headphones, label: "Dedicated Support" },
  { icon: CheckCircle2, label: "Free Consultation" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    smsOptIn: false,
    email: "",
    message: "",
    website: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const idempotencyKey = useRef("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [target.name]: target.checked }));
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    setFieldErrors({});
    idempotencyKey.current ||= crypto.randomUUID().replaceAll("-", "");

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": idempotencyKey.current,
        },
        body: JSON.stringify(form),
      });
      const result: { message?: string; fieldErrors?: Record<string, string> } = await response.json();
      if (!response.ok) {
        setFormError(result.message ?? "We could not send your message. Please try again.");
        setFieldErrors(result.fieldErrors ?? {});
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError("We could not send your message. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F19]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#2E8BF014_0%,transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #2E8BF0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label">Get In Touch</span>
          <h1
            className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] mb-5"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Let's Start Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2E8BF0 0%, #F0851F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Success Story
            </span>
          </h1>
          <p className="text-[#94A3B8] text-xl max-w-2xl mx-auto mb-8">
            Whether you're ready to start your job search or just have questions,
            the Nexora team is here to help. Reach out — we respond fast.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A202C] border border-[#2D3748] text-[#94A3B8] text-sm"
              >
                <Icon className="w-4 h-4 text-[#2E8BF0]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          QUICK INFO CARDS
      ════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {contactCards.map(({ icon: Icon, title, value, sublabel, href, color }) => {
              const commonProps = {
                className: href
                  ? "glass-card p-7 flex flex-col items-center text-center gap-4 group"
                  : "glass-card p-7 flex flex-col items-center text-center gap-4 group cursor-default"
              };
              const Inner = (
                <>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}30`,
                      boxShadow: `0 0 20px ${color}18`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color }}
                    >
                      {title}
                    </p>
                    <p
                      className={`text-white font-semibold text-base transition-colors ${href ? 'group-hover:text-[#2E8BF0]' : ''}`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {value}
                    </p>
                    <p className="text-[#64748B] text-xs mt-1">{sublabel}</p>
                  </div>
                </>
              );
              return href ? <a key={title} href={href} {...commonProps}>{Inner}</a> : <div key={title} {...commonProps}>{Inner}</div>;
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CONTACT FORM
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#121623] border-t border-[#1A202C]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="section-label">Send a Message</span>
            <h2
              className="text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              We'd Love to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #2E8BF0 0%, #F0851F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hear From You
              </span>
            </h2>
          </div>

          {submitted ? (
            <div className="glass-card p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-[#2E8BF0]/15 border border-[#2E8BF0]/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_#2E8BF033]">
                <CheckCircle2 className="w-10 h-10 text-[#2E8BF0]" />
              </div>
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Message Delivered
              </h3>
              <p className="text-[#94A3B8] mb-2">
                Thank you for reaching out, <span className="text-white font-medium">{form.name}</span>.
              </p>
              <p className="text-[#94A3B8] text-sm mb-8">
                Your message has been sent to the Nexora team. We will use{" "}
                <span className="text-[#2E8BF0]">{form.email}</span> to reply.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", phone: "", smsOptIn: false, email: "", message: "", website: "" });
                  setFormError("");
                  setFieldErrors({});
                  idempotencyKey.current = "";
                }}
                className="btn-ghost"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="glass-card p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                {formError && (
                  <div role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    {formError}
                  </div>
                )}
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-[#94A3B8] text-sm mb-2 block font-medium"
                  >
                    Full Name <span className="text-[#2E8BF0]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      placeholder="Your full name"
                      className="form-input pl-11"
                    />
                  </div>
                  {fieldErrors.name && <p id="name-error" className="mt-2 text-sm text-red-200">{fieldErrors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-[#94A3B8] text-sm mb-2 block font-medium"
                  >
                    Phone Number <span className="text-[#2E8BF0]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                      placeholder="+1 (555) 000-0000"
                      className="form-input pl-11"
                    />
                  </div>
                  {/* SMS Opt-In */}
                  <label className="flex items-center gap-3 mt-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="smsOptIn"
                        id="smsOptIn"
                        checked={form.smsOptIn}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#2E8BF0] ${
                          form.smsOptIn
                            ? "bg-[#2E8BF0] border-[#2E8BF0]"
                            : "bg-transparent border-[#4A5568] group-hover:border-[#2E8BF0]/60"
                        }`}
                      >
                        {form.smsOptIn && (
                          <CheckCircle2 className="w-3 h-3 text-[#0B0F19]" />
                        )}
                      </div>
                    </div>
                    <span className="text-[#94A3B8] text-sm">
                      I agree to receive SMS updates about this inquiry. Consent is optional and not required to submit. Message frequency varies; message and data rates may apply. Reply STOP to opt out.
                    </span>
                  </label>
                  {fieldErrors.phone && <p id="phone-error" className="mt-2 text-sm text-red-200">{fieldErrors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-[#94A3B8] text-sm mb-2 block font-medium"
                  >
                    Email Address <span className="text-[#2E8BF0]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      placeholder="you@email.com"
                      className="form-input pl-11"
                    />
                  </div>
                  {fieldErrors.email && <p id="email-error" className="mt-2 text-sm text-red-200">{fieldErrors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-[#94A3B8] text-sm mb-2 block font-medium"
                  >
                    Message <span className="text-[#2E8BF0]">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#64748B]" />
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      rows={5}
                      placeholder="Tell us about your background, your goals, or any questions you have..."
                      className="form-input pl-11 resize-none"
                    />
                  </div>
                  {fieldErrors.message && <p id="message-error" className="mt-2 text-sm text-red-200">{fieldErrors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-[#64748B] text-xs">
                  By submitting, you acknowledge the <Link href="/privacy-policy" className="text-[#94A3B8] underline underline-offset-2 hover:text-[#2E8BF0]">Privacy Policy</Link>. Do not include sensitive personal information in this form.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
