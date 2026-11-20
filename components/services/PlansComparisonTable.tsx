"use client";

import Link from "next/link";
import { Check } from "lucide-react";

// ─── Plan data ────────────────────────────────────────────────────────────────
const plans = [
  {
    id: "application-guarantee",
    name: "Application Guarantee",
    tag: "Great start",
    price: "$1,200",
    href: "/shop?plan=application-guarantee#shop-products",
    highlight: false,
  },
  {
    id: "interview-coaching",
    name: "Interview Coaching",
    tag: "Most chosen",
    price: "$1,500",
    href: "/shop?plan=interview-coaching#shop-products",
    highlight: true, // orange accent — "best seller"
  },
  {
    id: "ultimate-support",
    name: "Ultimate Support",
    tag: "Priority placement",
    price: "$2,200",
    href: "/shop?plan=ultimate-support#shop-products",
    highlight: false,
  },
  {
    id: "all-in-one",
    name: "All In One",
    tag: "Lowest placement fee",
    price: "$3,000",
    href: "/shop?plan=all-in-one#shop-products",
    highlight: false,
  },
];

// Every plan includes these
const everyPlan = [
  "Resume crafting",
  "Resume understanding session",
  "Candidate profile optimization",
  "Job applications support",
  "Dedicated recruiter",
  "365 days profile marketing",
  "Interview scheduling & follow-up",
];

// Benefits that unlock per plan (index = plan index where it first appears)
const unlocks: { label: string; from: number }[] = [
  { label: "2 Interview Support sessions", from: 0 },
  { label: "Mock interview practice", from: 1 },
  { label: "Guidance in initial OPT", from: 1 },
  { label: "6 Interview Support sessions", from: 1 },
  { label: "Interview guarantee", from: 1 },
  { label: "Unlimited Live Interview Sessions", from: 2 },
  { label: "Interview assessment", from: 2 },
  { label: "Tech Interview Support", from: 3 },
  { label: "After-placement fee: 10% (lowest)", from: 3 },
];

// After-placement fee per plan
const placementFees = ["14%", "12%", "12%", "10%"];

export default function PlansComparisonTable() {
  return (
    <section
      id="plans-comparison"
      className="section-spacing bg-[#FFFFFF] border-t border-[#E5E5E5]"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">PLANS &amp; PACKAGES</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#171717] mt-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Pick how far we go with you.
          </h2>
          <p className="text-[#77736D] mt-2 text-sm sm:text-base max-w-xl">
            Each plan builds on the one before it. Move right and more of the
            placement journey is handled for you.
          </p>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <div className="min-w-[700px]">

            {/* ── Column headers ── */}
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] gap-0 mb-0">
              {/* empty label cell */}
              <div className="flex items-end pb-4 pr-6">
                <p className="text-xs text-[#77736D] leading-snug">
                  Benefits are grouped by the plan where they first appear.
                </p>
              </div>

              {plans.map((plan, i) => (
                <div
                  key={plan.id}
                  className={`rounded-t-2xl border-t border-l border-r px-4 pt-5 pb-5 flex flex-col justify-between gap-3 -ml-px
                    ${plan.highlight
                      ? "bg-[#F26A21] border-[#F26A21] text-white"
                      : "bg-white border-[#E5E5E5] text-[#171717]"
                    }`}
                >
                  <div>
                    <div
                      className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${
                        plan.highlight ? "text-white/80" : "text-[#F26A21]"
                      }`}
                    >
                      {plan.tag}
                    </div>
                    <h3
                      className="text-base font-bold leading-tight"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {plan.name}
                    </h3>
                  </div>
                  <div>
                    <div
                      className={`text-2xl font-extrabold mb-3 ${
                        plan.highlight ? "text-white" : "text-[#171717]"
                      }`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {plan.price}
                    </div>
                    <Link
                      href={plan.href}
                      className={`inline-block w-full text-center text-xs font-bold py-2 rounded-full border-2 transition-all duration-200
                        ${plan.highlight
                          ? "border-white text-white hover:bg-white hover:text-[#F26A21]"
                          : "border-[#F26A21] text-[#F26A21] hover:bg-[#F26A21] hover:text-white"
                        }`}
                    >
                      Select Plan →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Every Plan Includes row ── */}
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] border border-[#E5E5E5] border-t-0 -mt-px">
              <div className="col-span-5 px-5 py-3.5 bg-[#F5F1E8] border-b border-[#E5E5E5]">
                <span className="text-xs font-bold text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Every plan includes
                </span>
                <span className="text-xs text-[#77736D] ml-2">
                  {everyPlan.join(" · ")}
                </span>
              </div>
            </div>

            {/* ── After-placement fee row ── */}
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px">
              <div className="flex items-center px-4 py-3.5 border-b border-[#E5E5E5]">
                <span className="text-sm text-[#171717]">After-placement fee</span>
              </div>
              {placementFees.map((fee, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center px-3 py-3.5 border-l border-b border-[#E5E5E5] -ml-px font-bold text-sm
                    ${plans[i].highlight ? "bg-[#FFF5EF]" : "bg-white"}`}
                >
                  <span className={plans[i].highlight ? "text-[#F26A21]" : "text-[#171717]"}>
                    {fee}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Unlock rows ── */}
            {/* Group header: "Included in all plans" */}
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px">
              <div className="col-span-5 px-5 py-2 bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <span className="text-[11px] font-bold text-[#77736D] uppercase tracking-wider">
                  Starts at Application Guarantee · all plans
                </span>
              </div>
            </div>

            {unlocks
              .filter((u) => u.from === 0)
              .map((u, rowIdx, arr) => {
                const isLast = rowIdx === arr.length - 1;
                return (
                  <div
                    key={u.label}
                    className={`grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px`}
                  >
                    <div className="flex items-center px-4 py-3 text-sm text-[#171717]">
                      {u.label}
                    </div>
                    {plans.map((plan, i) => (
                      <div
                        key={plan.id}
                        className={`flex items-center justify-center px-3 py-3 border-l border-[#E5E5E5] -ml-px
                          ${i >= u.from
                            ? plan.highlight ? "bg-[#FFF5EF]" : "bg-[#FEF9F5]"
                            : "bg-white"
                          }`}
                      >
                        {i >= u.from ? (
                          <span className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[3]" />
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                );
              })}

            {/* Group: Interview Coaching+ */}
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px">
              <div className="col-span-5 px-5 py-2 bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <span className="text-[11px] font-bold text-[#77736D] uppercase tracking-wider">
                  Starts at Interview Coaching · and everything above
                </span>
              </div>
            </div>

            {unlocks
              .filter((u) => u.from === 1)
              .map((u, rowIdx) => (
                <div
                  key={u.label}
                  className="grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px"
                >
                  <div className="flex items-center px-4 py-3 text-sm text-[#171717]">
                    {u.label}
                  </div>
                  {plans.map((plan, i) => (
                    <div
                      key={plan.id}
                      className={`flex items-center justify-center px-3 py-3 border-l border-[#E5E5E5] -ml-px
                        ${i >= u.from
                          ? plan.highlight ? "bg-[#FFF5EF]" : "bg-[#FEF9F5]"
                          : "bg-white"
                        }`}
                    >
                      {i >= u.from ? (
                        <span className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}

            {/* Group: Ultimate Support+ */}
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px">
              <div className="col-span-5 px-5 py-2 bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <span className="text-[11px] font-bold text-[#77736D] uppercase tracking-wider">
                  Starts at Ultimate Support · and everything above
                </span>
              </div>
            </div>

            {unlocks
              .filter((u) => u.from === 2)
              .map((u) => (
                <div
                  key={u.label}
                  className="grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px"
                >
                  <div className="flex items-center px-4 py-3 text-sm text-[#171717]">
                    {u.label}
                  </div>
                  {plans.map((plan, i) => (
                    <div
                      key={plan.id}
                      className={`flex items-center justify-center px-3 py-3 border-l border-[#E5E5E5] -ml-px
                        ${i >= u.from
                          ? plan.highlight ? "bg-[#FFF5EF]" : "bg-[#FEF9F5]"
                          : "bg-white"
                        }`}
                    >
                      {i >= u.from ? (
                        <span className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}

            {/* Group: All In One */}
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px">
              <div className="col-span-5 px-5 py-2 bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <span className="text-[11px] font-bold text-[#77736D] uppercase tracking-wider">
                  Exclusive to All In One
                </span>
              </div>
            </div>

            {unlocks
              .filter((u) => u.from === 3)
              .map((u, rowIdx, arr) => {
                const isLast = rowIdx === arr.length - 1;
                return (
                  <div
                    key={u.label}
                    className={`grid grid-cols-[1.6fr_repeat(4,1fr)] border-x border-b border-[#E5E5E5] -mt-px ${isLast ? "last-row" : ""}`}
                  >
                    <div className={`flex items-center px-4 py-3 text-sm text-[#171717] ${isLast ? "rounded-bl-2xl" : ""}`}>
                      {u.label}
                    </div>
                    {plans.map((plan, i) => (
                      <div
                        key={plan.id}
                        className={`flex items-center justify-center px-3 py-3 border-l border-[#E5E5E5] -ml-px
                          ${isLast && i === plans.length - 1 ? "rounded-br-2xl" : ""}
                          ${i >= u.from
                            ? plan.highlight ? "bg-[#FFF5EF]" : "bg-[#FEF9F5]"
                            : "bg-white"
                          }`}
                      >
                        {i >= u.from ? (
                          <span className="w-5 h-5 rounded-full bg-[#F26A21] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[3]" />
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                );
              })}

          </div>
        </div>

        {/* Footer note + CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[#77736D] max-w-lg">
            * After-placement fees apply upon successful placement. All plans include 365 days of active profile marketing. Prices listed are one-time service fees.
          </p>
          <Link
            href="/shop#shop-products"
            className="shrink-0 px-6 py-3 rounded-full bg-[#F26A21] text-white text-sm font-bold transition-colors hover:bg-[#E05A10] whitespace-nowrap"
          >
            Browse Plans &amp; Packages →
          </Link>
        </div>
      </div>
    </section>
  );
}
