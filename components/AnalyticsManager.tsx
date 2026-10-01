"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { X } from "lucide-react";
import Link from "next/link";

export default function AnalyticsManager() {
  const [consentState, setConsentState] = useState<"pending" | "granted" | "denied" | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nexora-cookie-consent");
      if (stored) {
        setConsentState(stored as any);
      } else {
        setConsentState("pending");
      }
    } catch (error) {
      setConsentState("denied");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("nexora-cookie-consent", "granted");
    setConsentState("granted");
  };

  const handleDecline = () => {
    localStorage.setItem("nexora-cookie-consent", "denied");
    setConsentState("denied");
  };

  return (
    <>
      {consentState === "granted" && <Analytics />}
      {consentState === "pending" && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pb-24 lg:pb-6 pointer-events-none flex justify-center">
          <div className="bg-[#121923] border border-[#203548] rounded-2xl p-4 sm:p-5 shadow-2xl pointer-events-auto max-w-3xl w-full flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-5 duration-300">
            <div className="text-xs sm:text-sm text-[#94A3B8] pr-0 md:pr-4">
              <span className="text-white font-semibold mb-1 block">Your Privacy Choices</span>
              We use optional analytics cookies to understand how visitors interact with our site, helping us improve the Nexora experience. You can choose whether to allow this tracking. 
              {" "}
              <Link href="/privacy" className="text-[#00F2FE] hover:underline">
                Read our Privacy Policy
              </Link>.
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <button 
                onClick={handleDecline}
                className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-[#203548] text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1A202C] transition-colors"
              >
                Opt Out
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-[#00F2FE] text-[#061018] text-xs font-bold hover:bg-[#00D2C4] shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
              >
                Accept
              </button>
              <button 
                onClick={handleDecline}
                className="p-2 text-[#64748B] hover:text-white transition-colors hidden md:block"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
