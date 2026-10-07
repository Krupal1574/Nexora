"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageHero from "@/components/motion/PageHero";
import CtaSection from "@/components/motion/CtaSection";
import {
  CheckCircle2,
  Sparkles,
  Shield,
  Layers,
  Zap,
  DollarSign,
  Plus,
  Tag,
} from "lucide-react";

// ─── Plans & Packages ────────────────────────────────────────────────────────
const plansPackages = [
  {
    id: "application-guarantee",
    name: "Application Guarantee Plan",
    badge: "POPULAR",
    badgeColor: "#F26A21",
    accent: "#F26A21",
    borderColor: "#F26A2130",
    bgAccent: "#F26A2108",
    afterPlacementFee: "14%",
    features: [
      "Resume crafting",
      "Resume understanding session",
      "Profile marketing",
      "Candidate profile optimization",
      "60 days of marketing",
      "After placement fees: 14%",
    ],
  },
  {
    id: "interview-coaching",
    name: "Interview Coaching",
    badge: "BEST SELLER",
    badgeColor: "#F59E0B",
    accent: "#8FB8D8",
    borderColor: "#8FB8D830",
    bgAccent: "#8FB8D808",
    afterPlacementFee: "12%",
    features: [
      "Resume crafting",
      "Resume understanding session",
      "Mock interview",
      "Guidance in initial OPT",
      "100 working days profile marketing",
      "Interview guarantee",
      "After placement fees: 12%",
    ],
  },
  {
    id: "ultimate-support",
    name: "Ultimate Session",
    badge: "PREMIUM",
    badgeColor: "#A855F7",
    accent: "#F26A21",
    borderColor: "#F26A2130",
    bgAccent: "#F26A2108",
    afterPlacementFee: "12%",
    features: [
      "Resume crafting",
      "Resume understanding session",
      "Profile marketing",
      "Interview assessment",
      "Interview guarantee",
      "Unlimited Live Interview Sessions",
      "After placement fees: 12%",
    ],
  },
  {
    id: "all-in-one",
    name: "All In One",
    badge: "BEST VALUE",
    badgeColor: "#10B981",
    accent: "#8FB8D8",
    borderColor: "#8FB8D830",
    bgAccent: "#8FB8D808",
    afterPlacementFee: "10%",
    features: [
      "Resume crafting",
      "Resume understanding session",
      "Profile marketing",
      "Interview assessment",
      "Interview guarantee",
      "Unlimited Live Interview Sessions",
      "After placement fees: 10%",
    ],
  },
];

// ─── Individual Services ──────────────────────────────────────────────────────
const individualServices = [
  {
    id: "resume-crafting",
    name: "Resume Crafting",
    description: "Professional resume creation tailored to your target role and tech-industry standards.",
    accent: "#F26A21",
  },
  {
    id: "resume-understanding-session",
    name: "Resume Understanding Session",
    description: "One-on-one session to walk through your resume, identify gaps, and align it with market expectations.",
    accent: "#8FB8D8",
  },
  {
    id: "profile-marketing",
    name: "Profile Marketing",
    description: "Active marketing of your candidate profile directly to hiring managers and decision-makers.",
    accent: "#F26A21",
  },
  {
    id: "candidate-profile-optimization",
    name: "Candidate Profile Optimization",
    description: "End-to-end optimization of your LinkedIn, resume, and online presence for maximum visibility.",
    accent: "#8FB8D8",
  },
  {
    id: "mock-interview",
    name: "Mock Interview",
    description: "Realistic mock interview sessions with detailed performance feedback and improvement guidance.",
    accent: "#F26A21",
  },
  {
    id: "interview-guarantee",
    name: "Interview Guarantee",
    description: "Guaranteed interview opportunities through our employer network and active outreach campaigns.",
    accent: "#8FB8D8",
  },
];

// ─── Placement Charges ────────────────────────────────────────────────────────
const placementCharges = [
  {
    plan: "Application Guarantee Plan",
    fee: "14%",
    note: "After placement, 14% of first-year CTC",
    accent: "#F26A21",
  },
  {
    plan: "Interview Coaching",
    fee: "12%",
    note: "After placement, 12% of first-year CTC",
    accent: "#8FB8D8",
  },
  {
    plan: "Ultimate Session",
    fee: "12%",
    note: "After placement, 12% of first-year CTC",
    accent: "#F26A21",
  },
  {
    plan: "All In One",
    fee: "10%",
    note: "After placement, 10% of first-year CTC — lowest fee",
    accent: "#8FB8D8",
  },
];

// ─── Add-ons ──────────────────────────────────────────────────────────────────
const addOns = [
  {
    id: "opt-guidance",
    name: "OPT Guidance",
    description: "Step-by-step guidance through OPT application and initial placement phase.",
    accent: "#F26A21",
  },
  {
    id: "linkedin-overhaul",
    name: "LinkedIn Overhaul",
    description: "Complete LinkedIn profile rewrite with SEO optimization and keyword targeting.",
    accent: "#8FB8D8",
  },
  {
    id: "60-day-marketing",
    name: "60-Day Marketing Extension",
    description: "Extend your profile marketing campaign by 60 additional days for broader reach.",
    accent: "#F26A21",
  },
  {
    id: "unlimited-live-sessions",
    name: "Unlimited Live Interview Sessions",
    description: "Access to unlimited live mock interview sessions with industry mentors.",
    accent: "#8FB8D8",
  },
  {
    id: "100-day-marketing",
    name: "100 Working Days Profile Marketing",
    description: "Sustained 100 working-day profile marketing campaign across premium job boards and direct outreach.",
    accent: "#F26A21",
  },
];

// ─── Section Nav ──────────────────────────────────────────────────────────────
const sections = [
  { id: "plans-packages", label: "Plans & Packages", icon: Layers },
  { id: "individual-services", label: "Individual Services", icon: Zap },
  { id: "placement-charges", label: "Placement Charges", icon: DollarSign },
  { id: "add-ons", label: "Add-ons", icon: Plus },
];

function PlanCard({ plan, pricing }: { plan: typeof plansPackages[0]; pricing?: { price: number; originalPrice: number; discount: number } }) {
  const price = pricing?.price ?? 0;
  const originalPrice = pricing?.originalPrice ?? 0;
  const discount = pricing?.discount ?? (originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);
  const savings = Math.max(originalPrice - price, 0);

  return (
    <div
      className="rounded-2xl border p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,23,23,0.08)]"
      style={{
        background: plan.bgAccent,
        borderColor: plan.borderColor,
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Orb */}
      <div
        className="absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: plan.accent }}
      />

      <div className="relative z-10">
        {/* Badge + discount */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span
            className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full"
            style={{ background: `${plan.badgeColor}22`, color: plan.badgeColor, border: `1px solid ${plan.badgeColor}44` }}
          >
            {plan.badge}
          </span>
          {discount > 0 && (
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#F26A2122] text-[#F26A21] border border-[#F26A2133]">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="text-xl sm:text-2xl font-bold text-[#171717] mb-3"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {plan.name}
        </h3>

        {/* Price */}
        {price > 0 ? (
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl sm:text-4xl font-bold text-[#171717]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                ${price.toLocaleString()}
              </span>
              {originalPrice > price && (
                <span className="text-sm text-[#77736D] line-through">
                  ${originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {savings > 0 && (
              <p className="text-xs mt-1" style={{ color: plan.accent }}>
                You save ${savings.toLocaleString()}
              </p>
            )}
          </div>
        ) : (
          <div className="mb-4">
            <div className="h-10 w-32 rounded bg-[#E5E5E5] animate-pulse" />
          </div>
        )}

        <p className="text-xs text-[#64748B] mb-5">
          After placement fee:{" "}
          <span className="font-bold" style={{ color: plan.accent }}>
            {plan.afterPlacementFee}
          </span>
        </p>

        {/* What's Included */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5" style={{ color: plan.accent }} />
          <span className="text-[#171717] font-semibold text-xs" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            What&apos;s Included
          </span>
        </div>

        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: plan.accent }} />
              <span className="text-[#77736D] text-sm leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <Link
            href="/shop"
            className="flex-1 text-center rounded-full py-2.5 text-xs font-bold transition-colors"
            style={{ background: plan.accent, color: "#171717" }}
          >
            Get This Plan
          </Link>
          <Link
            href="/contact"
            className="flex-1 text-center rounded-full py-2.5 text-xs font-bold border transition-colors hover:bg-black/5"
            style={{ borderColor: plan.accent, color: plan.accent }}
          >
            Talk to an Advisor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState("plans-packages");
  const [priceMap, setPriceMap] = useState<Record<string, { price: number; originalPrice: number; discount: number }>>({});

  // Fetch live prices from the same API the shop uses
  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          const map: Record<string, { price: number; originalPrice: number; discount: number }> = {};
          for (const p of data.products) {
            map[p.slug] = {
              price: Number(p.price),
              originalPrice: Number(p.originalPrice),
              discount: p.discount || Math.round(((Number(p.originalPrice) - Number(p.price)) / Number(p.originalPrice)) * 100),
            };
          }
          setPriceMap(map);
        }
      })
      .catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="overflow-x-clip">
      {/* ══════════ HERO ══════════ */}
      <PageHero
        align="center"
        eyebrow="What We Offer"
        lines={[
          "Your Career, ",
          <span key="our" className="accent">Our Commitment</span>,
        ]}
        sub="Choose from our career packages, individual services, or add-ons. Transparent pricing, real results."
      >
        {/* Section Nav Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                activeSection === id
                  ? "bg-[#F26A21] text-[#171717] border-[#F26A21]"
                  : "bg-[#FFFFFF] text-[#77736D] border-[#E5E5E5] hover:text-[#171717]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Offer banner */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F26A21]/10 border border-[#F26A21]/30">
          <Tag className="w-3.5 h-3.5 text-[#F26A21]" />
          <span className="text-xs font-semibold text-[#F26A21]">35% off Plans &amp; Packages · 15% off Individual Services</span>
        </div>
      </PageHero>

      {/* ══════════════════════════════════════════════
          SECTION 1 — PLANS & PACKAGES
      ══════════════════════════════════════════════ */}
      <section id="plans-packages" className="section-spacing bg-[#F5F1E8]">
        <div className="container-wide">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Plans &amp; Packages
            </h2>
            <p className="text-[#77736D] mt-2 max-w-xl">
              All plans include a{" "}
              <span className="text-[#F26A21] font-semibold">35% limited-time discount</span>. Pick the plan that fits your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plansPackages.map((plan) => (
              <PlanCard key={plan.id} plan={plan} pricing={priceMap[plan.id]} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — INDIVIDUAL SERVICES
      ══════════════════════════════════════════════ */}
      <section id="individual-services" className="section-spacing bg-[#F5F1E8]">
        <div className="container-wide">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Individual Services
            </h2>
            <p className="text-[#77736D] mt-2 max-w-xl">
              Pick only what you need.{" "}
              <span className="text-[#F26A21] font-semibold">15% off</span> all individual services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {individualServices.map((svc) => (
              <div
                key={svc.id}
                className="rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 hover:border-[#F26A21]/40 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,23,23,0.08)] flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${svc.accent}15`, border: `1px solid ${svc.accent}30` }}
                >
                  <CheckCircle2 className="w-5 h-5" style={{ color: svc.accent }} />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {svc.name}
                    </h3>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: `${svc.accent}18`, color: svc.accent, border: `1px solid ${svc.accent}30` }}
                    >
                      15% OFF
                    </span>
                  </div>
                  <p className="text-[#77736D] text-xs leading-relaxed">{svc.description}</p>
                </div>
                <Link
                  href="/contact"
                  className="mt-auto text-center rounded-full py-2 text-[10px] font-bold border transition-colors hover:bg-black/5"
                  style={{ borderColor: svc.accent, color: svc.accent }}
                >
                  Enquire
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — PLACEMENT CHARGES
      ══════════════════════════════════════════════ */}
      <section id="placement-charges" className="section-spacing bg-[#F5F1E8]">
        <div className="container-wide">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Placement Charges
            </h2>
            <p className="text-[#77736D] mt-2 max-w-xl">
              After-placement fees are charged as a percentage of your first-year CTC. You only pay after you land the job.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {placementCharges.map((pc) => (
              <div
                key={pc.plan}
                className="rounded-2xl border p-6 text-center flex flex-col items-center gap-3 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,23,23,0.08)]"
                style={{
                  borderColor: `${pc.accent}30`,
                  backgroundColor: "#FFFFFF",
                  background: `${pc.accent}06`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: `${pc.accent}15`, border: `2px solid ${pc.accent}30` }}
                >
                  <span className="text-xl font-black" style={{ color: pc.accent, fontFamily: "Space Grotesk, sans-serif" }}>
                    {pc.fee}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#171717] text-center" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {pc.plan}
                </h3>
                <p className="text-[10px] text-[#77736D] leading-relaxed">{pc.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-[#F26A21]/20 bg-[#F26A21]/5 px-6 py-4 flex items-start gap-3">
            <Shield className="w-4 h-4 text-[#F26A21] mt-0.5 shrink-0" />
            <p className="text-xs text-[#77736D] leading-relaxed">
              <span className="text-[#171717] font-semibold">Pay after placement.</span> Placement fees are only due once you successfully land a job through Nexora. No placement, no fee.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — ADD-ONS
      ══════════════════════════════════════════════ */}
      <section id="add-ons" className="section-spacing bg-[#F5F1E8]">
        <div className="container-wide">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Add-ons
            </h2>
            <p className="text-[#77736D] mt-2 max-w-xl">
              Enhance any plan or service with targeted add-ons for extra reach, sessions, or support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {addOns.map((addon) => (
              <div
                key={addon.id}
                className="rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 hover:border-[#F26A21]/40 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,23,23,0.08)] flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${addon.accent}15`, border: `1px solid ${addon.accent}30` }}
                >
                  <Plus className="w-5 h-5" style={{ color: addon.accent }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171717] mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {addon.name}
                  </h3>
                  <p className="text-[#77736D] text-xs leading-relaxed">{addon.description}</p>
                </div>
                <Link
                  href="/contact"
                  className="mt-auto text-center rounded-full py-2 text-[10px] font-bold border transition-colors hover:bg-black/5"
                  style={{ borderColor: addon.accent, color: addon.accent }}
                >
                  Add to Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <CtaSection
        lines={["Ready to Start Your ", <span key="journey" className="accent">Nexora Journey?</span>]}
        text="Speak with a Nexora specialist today and get a personalized roadmap for your career."
        primary={{ href: "/contact", label: "Get a Free Consultation" }}
        secondary={{ href: "/refer-and-earn", label: "Refer & Earn $500" }}
      />
    </div>
  );
}
