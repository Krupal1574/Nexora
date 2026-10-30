"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Copy,
  ArrowLeftRight,
  ShieldCheck,
  Printer,
  ExternalLink,
  Mail,
  Globe,
  ArrowLeft,
  Lock,
  ShieldAlert,
  LogOut,
  Loader2,
  Send,
} from "lucide-react";

type BankField = {
  id: string;
  label: string;
  value: string;
  copyValue: string;
  wide?: boolean;
};

const RAW_BANK_FIELDS: BankField[] = [
  {
    id: "bank-name",
    label: "BANK NAME",
    value: "Chase Bank",
    copyValue: "Chase Bank",
  },
  {
    id: "account-holder",
    label: "ACCOUNT HOLDER",
    value: "Nexora Staffing Inc.",
    copyValue: "Nexora Staffing Inc.",
  },
  {
    id: "routing-number",
    label: "ROUTING NUMBER",
    value: "121145433",
    copyValue: "121145433",
  },
  {
    id: "account-number",
    label: "ACCOUNT NUMBER",
    value: "496019749540199",
    copyValue: "496019749540199",
  },
  {
    id: "transfer-currency",
    label: "TRANSFER CURRENCY",
    value: "$ USD · US Dollar",
    copyValue: "USD",
    wide: true,
  },
];

type Step = "email" | "otp" | "authenticated";

export default function PaymentDetailsPage() {
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("nexora_payment_auth");
      if (stored === "true") {
        setStep("authenticated");
      }
      setIsLoading(false);
    }
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSendOTP = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) {
      setAuthError("Please enter your email address.");
      return;
    }

    setIsSending(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/payment-otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Failed to send code.");
        setIsSending(false);
        return;
      }

      setStep("otp");
      setOtp(["", "", "", "", "", ""]);
      setResendCooldown(60);
      setIsSending(false);

      // Focus first OTP input after render
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch {
      setAuthError("Network error. Please try again.");
      setIsSending(false);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setAuthError(null);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (value && index === 5 && newOtp.every((d) => d !== "")) {
      verifyOTP(newOtp.join(""));
    }
  };

  const handleOTPKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 0) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    setAuthError(null);

    // Focus the next empty input or the last one
    const nextEmpty = newOtp.findIndex((d) => d === "");
    if (nextEmpty >= 0) {
      otpRefs.current[nextEmpty]?.focus();
    } else {
      otpRefs.current[5]?.focus();
      // Auto-submit
      verifyOTP(newOtp.join(""));
    }
  };

  const verifyOTP = async (code: string) => {
    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/payment-otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Verification failed.");
        setOtp(["", "", "", "", "", ""]);
        setIsVerifying(false);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
        return;
      }

      setStep("authenticated");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nexora_payment_auth", "true");
      }
      setIsVerifying(false);
    } catch {
      setAuthError("Network error. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleVerifySubmit = (e: FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setAuthError("Please enter the complete 6-digit code.");
      return;
    }
    verifyOTP(code);
  };

  const handleLogout = () => {
    setStep("email");
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setAuthError(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("nexora_payment_auth");
    }
  };

  const handleCopy = async (text: string, label: string, key: string) => {
    if (step !== "authenticated") return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      setCopiedKey(key);
      setToastMessage(`Copied ${label}`);

      setTimeout(() => {
        setCopiedKey(null);
      }, 1800);

      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    } catch {
      setToastMessage("Failed to copy");
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const handleCopyAll = () => {
    if (step !== "authenticated") return;
    const fullMemo = [
      "NEXORA STAFFING INC. · GLOBAL PAYMENT DETAILS (USD)",
      "===================================================",
      "Bank Name: Chase Bank",
      "Account Holder: Nexora Staffing Inc.",
      "Routing Number: 121145433",
      "Account Number: 496019749540199",
      "Currency: USD ($)",
      "---------------------------------------------------",
      "Official Contact: connect@nexorastaffingllp.com",
      "Website: https://www.nexorastaffingllp.com",
      "===================================================",
    ].join("\n");

    handleCopy(fullMemo, "All Payment Details", "all");
  };

  const handlePrint = () => {
    if (step !== "authenticated") return;
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const isAuthenticated = step === "authenticated";

  // Mask sensitive values until authenticated
  const displayFields = RAW_BANK_FIELDS.map((f) => {
    if (!isAuthenticated) {
      if (f.id === "bank-name") return { ...f, value: "•••• ••••" };
      if (f.id === "account-holder")
        return { ...f, value: "•••••••• •••••••• ••••" };
      if (f.id === "routing-number") return { ...f, value: "•••••••••" };
      if (f.id === "account-number") return { ...f, value: "•••••••••••••••" };
      if (f.id === "transfer-currency")
        return { ...f, value: "$ USD · ••••••••••" };
    }
    return f;
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8fbfd] via-[#fdfbfa] to-[#fff5f1] font-sans text-[#23384a]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[60] flex items-center gap-2 bg-[#173b5e] text-white px-4 py-2.5 rounded-xl shadow-xl text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-[#ff745c]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* EMAIL / OTP MODAL */}
      {!isLoading && !isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a1c2e]/65 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white border border-[#dce6ed] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-b from-[#f2f8fc] to-white p-7 pb-5 text-center border-b border-[#e6edf2] relative">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white border border-[#dce6ed] p-2 flex items-center justify-center shadow-md">
                <Image
                  src="/nexora-logo.png"
                  alt="Nexora Staffing Inc."
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173b5e]/10 text-[#173b5e] text-[11px] font-bold tracking-wider uppercase mb-2">
                <Lock className="w-3.5 h-3.5 text-[#2c7197]" />
                <span>Protected Document</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#173b5e] tracking-tight">
                Unlock Payment Details
              </h2>
              <p className="text-xs sm:text-sm text-[#687d8f] mt-1 max-w-xs mx-auto">
                {step === "email"
                  ? "Enter your email to receive a one-time verification code."
                  : `We sent a 6-digit code to ${email}`}
              </p>
            </div>

            {/* Step 1: Email Input */}
            {step === "email" && (
              <form onSubmit={handleSendOTP} className="p-6 sm:p-7 space-y-4">
                <div>
                  <label
                    htmlFor="email-input"
                    className="block text-xs font-extrabold text-[#173b5e] uppercase tracking-wider mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#687d8f]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (authError) setAuthError(null);
                      }}
                      placeholder="you@company.com"
                      autoFocus
                      required
                      className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-[#dce6ed] rounded-xl text-[#173b5e] placeholder-[#94a3b8] focus:outline-none focus:border-[#2c7197] focus:ring-2 focus:ring-[#2c7197]/20 transition-all"
                    />
                  </div>
                </div>

                {authError && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold animate-in fade-in duration-150">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#173b5e] hover:bg-[#204a74] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-[#173b5e]/20 hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Code…</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Verification Code</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP Input */}
            {step === "otp" && (
              <form
                onSubmit={handleVerifySubmit}
                className="p-6 sm:p-7 space-y-4"
              >
                <div>
                  <label className="block text-xs font-extrabold text-[#173b5e] uppercase tracking-wider mb-3 text-center">
                    Enter 6-digit code
                  </label>
                  <div
                    className="flex justify-center gap-2 sm:gap-3"
                    onPaste={handleOTPPaste}
                  >
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          otpRefs.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(i, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(i, e)}
                        className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white border border-[#dce6ed] rounded-xl text-[#173b5e] focus:outline-none focus:border-[#2c7197] focus:ring-2 focus:ring-[#2c7197]/20 transition-all font-mono"
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                </div>

                {authError && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold animate-in fade-in duration-150">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifying || otp.join("").length !== 6}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#173b5e] hover:bg-[#204a74] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-[#173b5e]/20 hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying…</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Verify & Unlock</span>
                    </>
                  )}
                </button>

                {/* Resend / Change email */}
                <div className="flex items-center justify-between text-xs text-[#687d8f]">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setOtp(["", "", "", "", "", ""]);
                      setAuthError(null);
                    }}
                    className="hover:text-[#173b5e] transition-colors font-semibold cursor-pointer"
                  >
                    ← Change email
                  </button>

                  <button
                    type="button"
                    disabled={resendCooldown > 0}
                    onClick={() => handleSendOTP()}
                    className="hover:text-[#173b5e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold cursor-pointer"
                  >
                    {resendCooldown > 0
                      ? `Resend in ${resendCooldown}s`
                      : "Resend code"}
                  </button>
                </div>
              </form>
            )}

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#fafcfe] border-t border-[#e6edf2] flex flex-col items-center gap-2 text-center text-xs text-[#687d8f]">
              <div>
                <span>Need help? Contact </span>
                <a
                  href="mailto:connect@nexorastaffingllp.com"
                  className="text-[#2c7197] font-semibold hover:underline"
                >
                  connect@nexorastaffingllp.com
                </a>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#687d8f] hover:text-[#173b5e] transition-colors mt-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Nexora Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Layout (Blurred and non-interactive until authenticated) */}
      <div
        className={`-mt-16 lg:-mt-20 -mb-20 lg:-mb-12 py-8 sm:py-12 px-4 sm:px-6 flex flex-col justify-center items-center transition-all duration-500 ${
          !isAuthenticated
            ? "filter blur-md pointer-events-none select-none opacity-60 scale-[0.99]"
            : "filter-none opacity-100 scale-100"
        }`}
      >
        {/* Top utility bar */}
        <div className="w-full max-w-[820px] mb-4 flex items-center justify-between text-xs print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[#687d8f] hover:text-[#173b5e] transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Nexora</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#dce6ed] hover:border-[#2c7197] text-[#2c7197] font-bold shadow-sm transition-all text-xs cursor-pointer"
            >
              {copiedKey === "all" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">All Copied ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All Details</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#dce6ed] hover:border-[#173b5e] text-[#173b5e] font-semibold shadow-sm transition-all text-xs cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#dce6ed] hover:border-red-400 hover:text-red-600 text-[#687d8f] font-semibold shadow-sm transition-all text-xs cursor-pointer"
              title="Lock page session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Main Payment Card */}
        <div className="w-full max-w-[820px] bg-white border border-[#dce6ed] rounded-3xl shadow-[0_22px_70px_rgba(23,59,94,0.08)] overflow-hidden">
          {/* Card Header */}
          <header className="p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-[#e6edf2] bg-gradient-to-r from-white via-[#fcfdfe] to-[#f4f9fc]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-white border border-[#dce6ed] p-2 flex items-center justify-center shadow-sm">
                <Image
                  src="/nexora-logo.png"
                  alt="Nexora Staffing Inc."
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>

              <div>
                <div className="text-[11px] tracking-[0.12em] font-extrabold text-[#2c7197] uppercase">
                  Official Account Information
                </div>
                <h1 className="text-xl sm:text-3xl font-black text-[#173b5e] tracking-tight m-0">
                  Nexora Staffing Inc.
                </h1>
                <div className="text-xs sm:text-sm text-[#687d8f] mt-0.5 font-medium">
                  Global Staffing & Business Solutions · Corporate Account
                </div>
              </div>
            </div>

            {/* Verification Badge */}
            <div className="sm:self-center shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Account</span>
              </div>
            </div>
          </header>

          {/* Global Transfer Strip */}
          <section className="bg-gradient-to-r from-[#173b5e] to-[#2c7197] text-white px-5 sm:px-7 py-3 flex items-center justify-between gap-3 text-xs font-medium">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-[#ff745c] shrink-0" />
              <span>International wire transfer & direct bank deposit details</span>
            </div>
            <span className="hidden md:inline-block text-[11px] text-white/80 font-mono tracking-wider">
              US United States · CA Canada · USD payments
            </span>
          </section>

          {/* Body Content */}
          <main className="px-5 sm:px-7 pb-7 pt-6">
            <h2 className="text-lg font-bold text-[#173b5e] mb-5">
              Payment Details
            </h2>

            {/* Grid of Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayFields.map((field) => {
                const isCopied = copiedKey === field.id;

                return (
                  <div
                    key={field.id}
                    className={`border border-[#dce6ed] rounded-2xl p-4 bg-white transition-all duration-200 hover:border-[#2c7197]/40 ${
                      field.wide ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="text-[10px] tracking-[0.1em] font-extrabold text-[#687d8f] mb-2 uppercase">
                      {field.label}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-base sm:text-lg font-bold text-[#173b5e] break-all select-all font-mono tracking-tight">
                        {field.value}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(field.copyValue, field.label, field.id)
                        }
                        className={`inline-flex items-center gap-1 border-0 rounded-xl px-3 py-2 text-xs font-extrabold cursor-pointer transition-all duration-150 shrink-0 select-none ${
                          isCopied
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm"
                            : "bg-[#f2f8fc] text-[#2c7197] hover:bg-[#e3f0f8]"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact & Support Meta */}
            <div className="mt-4 p-4 rounded-2xl bg-[#f8fbfd] border border-[#dce6ed] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#23384a]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#dce6ed] flex items-center justify-center shrink-0 text-[#2c7197]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#173b5e] text-[11px] uppercase tracking-wider font-extrabold">
                    Official Email
                  </strong>
                  <a
                    href="mailto:connect@nexorastaffingllp.com"
                    className="text-[#2c7197] font-semibold hover:underline break-all"
                  >
                    connect@nexorastaffingllp.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#dce6ed] flex items-center justify-center shrink-0 text-[#2c7197]">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#173b5e] text-[11px] uppercase tracking-wider font-extrabold">
                    Website
                  </strong>
                  <a
                    href="https://www.nexorastaffingllp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2c7197] font-semibold hover:underline inline-flex items-center gap-1 break-all"
                  >
                    <span>www.nexorastaffingllp.com</span>
                    <ExternalLink className="w-3.5 h-3.5 inline-block shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-5 p-4 rounded-xl bg-[#fff1ed] border border-[#ffd6cc] text-xs leading-relaxed text-[#6a5a58]">
              <strong className="text-[#173b5e] font-bold block mb-0.5">
                Security note
              </strong>
              Verify payment instructions through a trusted Nexora contact before
              transferring funds. USD is the stated currency; the flags are
              illustrative and do not confirm Canadian-dollar or local-transfer
              support.
            </div>
          </main>

          {/* Card Footer */}
          <footer className="text-center text-[#687d8f] text-[11px] py-4 px-6 border-t border-[#dce6ed] tracking-[0.08em] uppercase font-semibold bg-[#fafcfe]">
            NEXORA STAFFING INC. · GLOBAL PAYMENT DETAILS · USD
          </footer>
        </div>
      </div>
    </div>
  );
}
