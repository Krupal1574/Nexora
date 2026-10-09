"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  ExternalLink,
  MessageCircle,
  X,
} from "lucide-react";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

const MEETING_URL = "https://meet.google.com/wck-bjpx-ktz";

export default function SeminarAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useModalScrollLock(isOpen);

  useEffect(() => {
    const dismissed =
      sessionStorage.getItem("nexora-seminar-dismissed") === "true";

    if (!dismissed) {
      const timer = window.setTimeout(() => {
        setIsOpen(true);
      }, 1200);

      setIsVisible(true);

      return () => window.clearTimeout(timer);
    }

    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closePopup() {
    setIsOpen(false);
    sessionStorage.setItem("nexora-seminar-dismissed", "true");
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Floating button remains available after the popup is dismissed */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-[90] flex items-center gap-3 rounded-full bg-[#171717] px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#F26A21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21] focus-visible:ring-offset-2"
          aria-label="Open Nexora seminar announcement"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F26A21] opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F26A21]" />
          </span>
          Today&apos;s Seminar
          <ArrowUpRight size={16} />
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm"
          style={{ overscrollBehavior: "none" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePopup();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="nexora-seminar-title"
            className="relative my-auto w-full max-w-2xl overflow-y-auto rounded-[28px] border border-black/10 bg-[#F5F1E8] shadow-2xl"
            style={{
              maxHeight: "calc(100dvh - 2rem)",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Decorative header */}
            <div className="relative overflow-hidden bg-[#171717] px-7 pb-8 pt-7 text-white sm:px-10 sm:pt-9">
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close seminar announcement"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]"
              >
                <X size={20} />
              </button>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F26A21]/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF965F]">
                <span className="h-2 w-2 rounded-full bg-[#F26A21]" />
                Online seminar · Today
              </div>

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                Nexora Staffing LLP
              </p>

              <h2
                id="nexora-seminar-title"
                className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
              >
                The changing
                <br />
                <span className="text-[#F26A21]">US IT job market.</span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-6 text-white/70 sm:text-base">
                Understanding recent U.S. policy developments and what
                students and early-career IT professionals should consider
                next.
              </p>

              <div className="pointer-events-none absolute -bottom-16 -right-10 h-44 w-44 rounded-full border border-[#8FB8D8]/25 sm:h-60 sm:w-60" />
              <div className="pointer-events-none absolute -bottom-10 -right-2 h-32 w-32 rounded-full border border-[#F26A21]/40 sm:h-44 sm:w-44" />
            </div>

            <div className="px-7 py-7 sm:px-10 sm:py-9">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/65 p-4">
                  <CalendarDays
                    size={20}
                    className="mt-0.5 shrink-0 text-[#F26A21]"
                  />
                  <div>
                    <p className="text-xs text-[#77736D]">Date</p>
                    <p className="mt-1 text-sm font-semibold text-[#171717]">
                      October 9, 2026
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/65 p-4">
                  <Clock3
                    size={20}
                    className="mt-0.5 shrink-0 text-[#F26A21]"
                  />
                  <div>
                    <p className="text-xs text-[#77736D]">Time</p>
                    <p className="mt-1 text-sm font-semibold text-[#171717]">
                      5:00–7:00 PM ET
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold tracking-tight text-[#171717]">
                  What&apos;s on your mind?
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#77736D]">
                  Bring your questions about the current IT job market,
                  job-search strategies, OPT, H-1B, employment sponsorship,
                  and career planning. Our team will discuss concerns and
                  practical next steps.
                </p>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F26A21]/10 p-4">
                <MessageCircle
                  size={21}
                  className="mt-0.5 shrink-0 text-[#F26A21]"
                />
                <div>
                  <p className="text-sm font-semibold text-[#171717]">
                    Your questions are welcome.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#77736D]">
                    We&apos;ll do our best to share useful guidance.
                    Individual employment or immigration outcomes cannot
                    be guaranteed.
                  </p>
                </div>
              </div>

              <a
                href={MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#F26A21] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#D95715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21] focus-visible:ring-offset-2"
              >
                Join the Google Meet
                <ExternalLink size={17} />
              </a>

              <button
                type="button"
                onClick={closePopup}
                className="mt-3 min-h-11 w-full rounded-full px-4 py-2 text-sm font-medium text-[#77736D] transition hover:bg-black/5 hover:text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]"
              >
                Maybe later
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-[#77736D]">
                Hosted by Nexora Staffing LLP
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
