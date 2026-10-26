"use client";

import { useState, useEffect, FormEvent } from "react";
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
  KeyRound,
  Eye,
  EyeOff,
  ShieldAlert,
  LogOut,
  Sparkles,
} from "lucide-react";

type BankField = {
  id: string;
  label: string;
  value: string;
  copyValue: string;
  wide?: boolean;
};

const PASSWORD = "Payment@nexora1";

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

export default function PaymentDetailsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("nexora_payment_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(null);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nexora_payment_auth", "true");
      }
    } else {
      setAuthError("Incorrect password. Please verify and try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    setAuthError(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("nexora_payment_auth");
    }
  };

  const handleCopy = async (text: string, label: string, key: string) => {
    if (!isAuthenticated) return;
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
    if (!isAuthenticated) return;
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
    if (!isAuthenticated) return;
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Mask sensitive values until authenticated
  const displayFields = RAW_BANK_FIELDS.map((f) => {
    if (!isAuthenticated) {
      if (f.id === "bank-name") return { ...f, value: "•••• ••••" };
      if (f.id === "account-holder") return { ...f, value: "•••••••• •••••••• ••••" };
      if (f.id === "routing-number") return { ...f, value: "•••••••••" };
      if (f.id === "account-number") return { ...f, value: "•••••••••••••••" };
      if (f.id === "transfer-currency") return { ...f, value: "$ USD · ••••••••••" };
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

      {/* POPUP MODAL FOR PASSWORD UNLOCK */}
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
                Enter the authorization password to view official USD bank transfer information.
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleLogin} className="p-6 sm:p-7 space-y-4">
              <div>
                <label
                  htmlFor="popup-password-input"
                  className="block text-xs font-extrabold text-[#173b5e] uppercase tracking-wider mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#687d8f]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="popup-password-input"
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    placeholder="Enter password to unlock"
                    autoFocus
                    required
                    className="w-full pl-10 pr-11 py-3 text-sm bg-white border border-[#dce6ed] rounded-xl text-[#173b5e] placeholder-[#94a3b8] focus:outline-none focus:border-[#2c7197] focus:ring-2 focus:ring-[#2c7197]/20 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#687d8f] hover:text-[#173b5e] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
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
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#173b5e] hover:bg-[#204a74] text-white font-bold text-sm shadow-md shadow-[#173b5e]/20 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock Page</span>
              </button>
            </form>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#fafcfe] border-t border-[#e6edf2] flex flex-col items-center gap-2 text-center text-xs text-[#687d8f]">
              <div>
                <span>Need access? Contact </span>
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
                        onClick={() => handleCopy(field.copyValue, field.label, field.id)}
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
              Verify payment instructions through a trusted Nexora contact before transferring funds. USD is the stated currency; the flags are illustrative and do not confirm Canadian-dollar or local-transfer support.
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
