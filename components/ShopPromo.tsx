"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Sparkles, ArrowRight } from "lucide-react";

const PROMO_KEY = "nexora-promo-seen";

export default function ShopPromo() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show on /shop and only once per session
    if (pathname !== "/shop") return;
    try {
      if (sessionStorage.getItem(PROMO_KEY)) return;
    } catch {
      return;
    }

    // Delay popup appearance for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(PROMO_KEY, "1");
    } catch {
      // sessionStorage unavailable
    }
  };

  const handleCTA = () => {
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Desktop modal / Mobile bottom-sheet */}
      <div
        className="fixed z-[90] left-0 right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md sm:rounded-2xl rounded-t-2xl bg-[#FFFFFF] border border-[#F26A21]/20 shadow-[0_0_60px_rgba(0,242,254,0.15)] overflow-hidden animate-[slideUp_0.4s_ease]"
        role="dialog"
        aria-modal="true"
        aria-label="Special offer"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#F26A21]/[0.06] rounded-full blur-[60px] pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-[#FFFFFF]/80 border border-[#E5E5E5] text-[#77736D] hover:text-[#171717] hover:border-[#F26A21]/30 transition-all"
          aria-label="Close offer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-8 sm:p-10 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F26A21]/20 to-[#8FB8D8]/10 border border-[#F26A21]/25 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7 text-[#F26A21]" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F26A21]/10 border border-[#F26A21]/20 text-[#F26A21] text-xs font-bold tracking-wider uppercase mb-4">
            Limited-Time Offer
          </div>

          {/* Headline */}
          <h3
            className="text-2xl sm:text-3xl font-bold text-[#171717] mb-3"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Save Up to{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #F26A21 0%, #8FB8D8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              33% Off
            </span>
          </h3>

          <p className="text-[#77736D] text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto">
            Explore our career plans and individual services at special introductory pricing.
          </p>

          {/* CTA */}
          <Link
            href="#products"
            onClick={handleCTA}
            className="btn-primary text-sm px-8 py-3.5 mx-auto"
          >
            Browse Plans
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-[#64748B] text-xs mt-4">
            No hidden fees · Flexible payment options
          </p>
        </div>

        {/* Bottom handle for mobile (visual affordance) */}
        <div className="sm:hidden flex justify-center pb-4">
          <div className="w-10 h-1 rounded-full bg-[#E5E5E5]" />
        </div>
      </div>
    </>
  );
}
