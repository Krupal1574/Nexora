"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  UserPlus,
  Rocket,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Gift,
  Star,
  ChevronRight,
  Mail,
  Phone,
  User,
  Send,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Refer a Friend or Colleague",
    description:
      "Know someone looking for a job in the U.S. tech industry? Submit their details using our simple referral form. It takes less than 2 minutes.",
    color: "#00F2FE",
  },
  {
    number: "02",
    icon: Rocket,
    title: "Empower Their Career",
    description:
      "Nexora's team takes it from there — providing your referral with full career counseling, resume optimization, and active placement support.",
    color: "#00D2C4",
  },
  {
    number: "03",
    icon: DollarSign,
    title: "Collect Your Referral Bonus",
    description:
      "Once your referral is successfully placed in a role, you receive up to $500 directly to your account. No limits — refer as many people as you like.",
    color: "#00F2FE",
  },
];

const faqs = [
  {
    q: "Who can I refer?",
    a: "Anyone actively looking for a tech job in the United States — friends, colleagues, family members, or anyone in your professional network.",
  },
  {
    q: "When do I receive my bonus?",
    a: "Your $500 bonus is paid out within 30 days of your referral's successful placement and confirmed start date.",
  },
  {
    q: "Is there a limit on referrals?",
    a: "No! There is absolutely no cap on how many people you can refer. Each successful placement earns you up to $500.",
  },
  {
    q: "How do I track my referral status?",
    a: "After submitting a referral, a Nexora team member will keep you updated via email on every stage of your referral's progress.",
  },
];

export default function ReferAndEarnPage() {
  const [form, setForm] = useState({
    yourName: "",
    yourEmail: "",
    refName: "",
    refPhone: "",
    refEmail: "",
    message: "",
    authorizedToRefer: false,
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
    setForm((prev) => ({
      ...prev,
      [target.name]: target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    setFieldErrors({});
    idempotencyKey.current ||= crypto.randomUUID().replaceAll("-", "");

    try {
      const response = await fetch("/api/forms/referral", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": idempotencyKey.current,
        },
        body: JSON.stringify(form),
      });
      const result: { message?: string; fieldErrors?: Record<string, string> } = await response.json();
      if (!response.ok) {
        setFormError(result.message ?? "We could not send this referral. Please try again.");
        setFieldErrors(result.fieldErrors ?? {});
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError("We could not send this referral. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F19]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#00F2FE14_0%,transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #00F2FE 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating dollar signs */}
        <div className="absolute top-24 left-12 text-6xl opacity-5 font-bold text-[#00F2FE] select-none">
          $
        </div>
        <div className="absolute top-40 right-20 text-8xl opacity-5 font-bold text-[#00D2C4] select-none">
          $
        </div>
        <div className="absolute bottom-16 left-1/4 text-4xl opacity-5 font-bold text-[#00F2FE] select-none">
          $
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Earnings badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#00F2FE]/25 bg-[#00F2FE]/8 text-[#00F2FE] text-sm font-semibold mb-8">
            <Gift className="w-4 h-4" />
            Earn up to $500 per placed referral — unlimited referrals!
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Join Nexora's{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Referral Revolution
            </span>
          </h1>
          <p className="text-[#94A3B8] text-xl max-w-3xl mx-auto leading-relaxed">
            Help a friend land their dream tech job. Nexora handles everything — the
            career coaching, resume work, and placement. You earn up to{" "}
            <span className="text-[#00F2FE] font-semibold">$500</span> for every
            person you refer who gets placed.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3-STEP PROCESS
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#121623] border-y border-[#1A202C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">How It Works</span>
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              3 Simple Steps to Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                $500 Bonus
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#00F2FE] to-[#00D2C4] opacity-30 z-0" />

            {steps.map(({ number, icon: Icon, title, description, color }) => (
              <div
                key={number}
                className="glass-card p-8 flex flex-col items-center text-center gap-5 relative z-10"
              >
                {/* Step circle */}
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.2)]"
                    style={{
                      background: `linear-gradient(135deg, ${color}33 0%, ${color}15 100%)`,
                      border: `2px solid ${color}50`,
                    }}
                  >
                    <Icon className="w-9 h-9" style={{ color }} />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-[#0B0F19] text-xs font-bold flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color} 0%, #00D2C4 100%)`,
                    }}
                  >
                    {number}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Perks row */}
          <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: DollarSign, text: "Up to $500 per referral" },
              { icon: Star, text: "Unlimited referrals" },
              { icon: CheckCircle2, text: "Fast, transparent payouts" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#0B0F19] border border-[#00F2FE]/15"
              >
                <Icon className="w-5 h-5 text-[#00F2FE] flex-shrink-0" />
                <span className="text-white text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          REFERRAL FORM
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0B0F19]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="section-label">Submit a Referral</span>
            <h2
              className="text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Refer Someone Today &{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Start Earning
              </span>
            </h2>
          </div>

          {submitted ? (
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#00F2FE]/15 border border-[#00F2FE]/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#00F2FE]" />
              </div>
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Referral Delivered
              </h3>
              <p className="text-[#94A3B8] mb-6">
                Thank you. Your referral has been sent to the Nexora team for review.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ yourName: "", yourEmail: "", refName: "", refPhone: "", refEmail: "", message: "", authorizedToRefer: false, website: "" });
                  setFormError("");
                  setFieldErrors({});
                  idempotencyKey.current = "";
                }}
                className="btn-primary"
              >
                Submit Another Referral
              </button>
            </div>
          ) : (
            <div className="glass-card p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                {formError && (
                  <div role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    {formError}
                  </div>
                )}
                {/* Your Info */}
                <div>
                  <h4
                    className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-[#00F2FE]"
                  >
                    Your Details
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="yourName" className="text-[#94A3B8] text-sm mb-2 block">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          id="yourName"
                          type="text"
                          name="yourName"
                          value={form.yourName}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                          aria-invalid={Boolean(fieldErrors.yourName)}
                          aria-describedby={fieldErrors.yourName ? "your-name-error" : undefined}
                          placeholder="John Doe"
                          className="form-input pl-11"
                        />
                      </div>
                      {fieldErrors.yourName && <p id="your-name-error" className="mt-2 text-sm text-red-200">{fieldErrors.yourName}</p>}
                    </div>
                    <div>
                      <label htmlFor="yourEmail" className="text-[#94A3B8] text-sm mb-2 block">
                        Your Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          id="yourEmail"
                          type="email"
                          name="yourEmail"
                          value={form.yourEmail}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                          aria-invalid={Boolean(fieldErrors.yourEmail)}
                          aria-describedby={fieldErrors.yourEmail ? "your-email-error" : undefined}
                          placeholder="you@email.com"
                          className="form-input pl-11"
                        />
                      </div>
                      {fieldErrors.yourEmail && <p id="your-email-error" className="mt-2 text-sm text-red-200">{fieldErrors.yourEmail}</p>}
                    </div>
                  </div>
                </div>

                {/* Referral Info */}
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-[#00F2FE]">
                    Referral's Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="refName" className="text-[#94A3B8] text-sm mb-2 block">
                        Referral Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          id="refName"
                          type="text"
                          name="refName"
                          value={form.refName}
                          onChange={handleChange}
                          required
                          autoComplete="off"
                          aria-invalid={Boolean(fieldErrors.refName)}
                          aria-describedby={fieldErrors.refName ? "ref-name-error" : undefined}
                          placeholder="Jane Smith"
                          className="form-input pl-11"
                        />
                      </div>
                      {fieldErrors.refName && <p id="ref-name-error" className="mt-2 text-sm text-red-200">{fieldErrors.refName}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="refPhone" className="text-[#94A3B8] text-sm mb-2 block">
                          Referral Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                          <input
                            id="refPhone"
                            type="tel"
                            name="refPhone"
                            value={form.refPhone}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            aria-invalid={Boolean(fieldErrors.refPhone)}
                            aria-describedby={fieldErrors.refPhone ? "ref-phone-error" : undefined}
                            placeholder="+1 (555) 000-0000"
                            className="form-input pl-11"
                          />
                        </div>
                        {fieldErrors.refPhone && <p id="ref-phone-error" className="mt-2 text-sm text-red-200">{fieldErrors.refPhone}</p>}
                      </div>
                      <div>
                        <label htmlFor="refEmail" className="text-[#94A3B8] text-sm mb-2 block">
                          Referral Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                          <input
                            id="refEmail"
                            type="email"
                            name="refEmail"
                            value={form.refEmail}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            aria-invalid={Boolean(fieldErrors.refEmail)}
                            aria-describedby={fieldErrors.refEmail ? "ref-email-error" : undefined}
                            placeholder="jane@email.com"
                            className="form-input pl-11"
                          />
                        </div>
                        {fieldErrors.refEmail && <p id="ref-email-error" className="mt-2 text-sm text-red-200">{fieldErrors.refEmail}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="text-[#94A3B8] text-sm mb-2 block">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about your referral's background or tech focus area..."
                        className="form-input resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      id="authorizedToRefer"
                      name="authorizedToRefer"
                      checked={form.authorizedToRefer}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-[#4A5568] bg-transparent text-[#00F2FE] focus:ring-[#00F2FE]"
                      aria-invalid={Boolean(fieldErrors.authorizedToRefer)}
                      aria-describedby={fieldErrors.authorizedToRefer ? "authorization-error" : undefined}
                    />
                    <span className="text-[#94A3B8] text-sm leading-relaxed">
                      I confirm that I am authorized to share this person's contact details and that they expect to hear from Nexora about this referral.
                    </span>
                  </label>
                  {fieldErrors.authorizedToRefer && <p id="authorization-error" className="mt-2 text-sm text-red-200">{fieldErrors.authorizedToRefer}</p>}
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base disabled:cursor-not-allowed disabled:opacity-70">
                  <Send className="w-4 h-4" />
                  {loading ? "Sending Referral..." : "Submit Referral"}
                </button>
                <p className="text-center text-[#64748B] text-xs">
                  By submitting, you acknowledge the <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-[#00F2FE]">Privacy Policy</Link> and <Link href="/terms-and-conditions" className="underline underline-offset-2 hover:text-[#00F2FE]">Terms &amp; Conditions</Link>.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#121623] border-t border-[#1A202C]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">FAQs</span>
            <h2
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-[#00F2FE] mt-1 flex-shrink-0" />
                  <div>
                    <p
                      className="text-white font-semibold mb-2"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {q}
                    </p>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
