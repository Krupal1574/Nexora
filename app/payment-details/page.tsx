"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, ArrowLeftRight, ShieldCheck, Printer, ExternalLink, Mail, Globe, ArrowLeft } from "lucide-react";

type BankField = {
  id: string;
  label: string;
  value: string;
  copyValue: string;
  wide?: boolean;
};

const BANK_FIELDS: BankField[] = [
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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string, key: string) => {
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
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="-mt-16 lg:-mt-20 -mb-20 lg:-mb-12 min-h-screen bg-gradient-to-br from-[#f8fbfd] via-[#fdfbfa] to-[#fff5f1] py-8 sm:py-12 px-4 sm:px-6 flex flex-col justify-center items-center font-sans text-[#23384a]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#173b5e] text-white px-4 py-2.5 rounded-xl shadow-xl text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-[#ff745c]" />
          <span>{toastMessage}</span>
        </div>
      )}

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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#dce6ed] hover:border-[#2c7197] text-[#2c7197] font-bold shadow-sm transition-all text-xs"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#dce6ed] hover:border-[#173b5e] text-[#687d8f] hover:text-[#173b5e] font-semibold shadow-sm transition-all text-xs"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Payment Card */}
      <div className="w-full max-w-[820px] bg-white border border-[#dce6ed] rounded-3xl shadow-[0_22px_70px_rgba(23,59,94,0.08)] overflow-hidden">
        {/* Card Header */}
        <header className="flex flex-col sm:flex-row gap-5 items-start sm:items-center p-6 sm:p-8 pb-5 border-b border-[#f2f8fc]">
          <div className="relative w-20 h-20 sm:w-[86px] sm:h-[86px] shrink-0 rounded-2xl overflow-hidden border border-[#dce6ed] bg-white shadow-sm p-1.5 flex items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="Nexora Staffing logo"
              width={86}
              height={86}
              className="object-contain w-full h-full rounded-xl"
              priority
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] font-extrabold text-[#2c7197] uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GLOBAL PAYMENTS · OFFICIAL BANK DETAILS</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#173b5e]">
              Nexora Staffing Inc.
            </h1>
            <p className="text-sm text-[#687d8f] mt-0.5">
              Bank wire transfer information
            </p>
          </div>
        </header>

        {/* Global Transfer Banner */}
        <div className="mx-5 sm:mx-7 my-5 p-4 sm:p-5 rounded-2xl border border-[#dce6ed] bg-gradient-to-r from-[#f2f8fc] to-[#fff1ed] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-base font-bold text-[#173b5e]">
              <ArrowLeftRight className="w-4 h-4 text-[#2c7197]" />
              <span>Global bank transfer</span>
            </div>
            <div className="mt-1 text-xs sm:text-[13px] text-[#687d8f]">
              🇺🇸 United States &nbsp;·&nbsp; 🇨🇦 Canada &nbsp;·&nbsp; USD payments
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-black text-[#ff745c] bg-white border border-[#ffe0d8] rounded-2xl px-3.5 py-1.5 shadow-sm tracking-tight shrink-0">
            $ USD
          </div>
        </div>

        {/* Fields Container */}
        <main className="px-5 sm:px-7 pb-7">
          <h2 className="text-lg font-bold text-[#173b5e] mb-5">
            Payment Details
          </h2>

          {/* Grid of Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BANK_FIELDS.map((field) => {
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
                      aria-label={`Copy ${field.label}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied ✓</span>
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

          {/* Official Contact Box */}
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#fbfdff] border border-[#dce6ed] grid gap-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-1 sm:gap-2 text-sm">
              <strong className="text-[#173b5e] flex items-center gap-1.5 font-bold">
                <Mail className="w-3.5 h-3.5 text-[#2c7197]" />
                Email
              </strong>
              <a
                href="mailto:connect@nexorastaffingllp.com"
                className="text-[#2c7197] font-semibold hover:underline break-all"
              >
                connect@nexorastaffingllp.com
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-1 sm:gap-2 text-sm">
              <strong className="text-[#173b5e] flex items-center gap-1.5 font-bold">
                <Globe className="w-3.5 h-3.5 text-[#2c7197]" />
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
  );
}
