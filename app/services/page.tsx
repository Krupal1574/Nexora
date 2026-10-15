"use client";

import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/motion/PageHero";
import {
  CheckCircle2,
  Zap,
  Plus,
  ShieldCheck,
  Globe2,
  Users,
  BadgeCheck,
  Calculator,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { servicesData } from "@/lib/services-data";

const serviceIcons = {
  ShieldCheck,
  Globe2,
  Users,
  BadgeCheck,
  Calculator,
  GraduationCap,
};

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
  { id: "core-services", label: "Core Services", icon: ShieldCheck },
  { id: "individual-services", label: "Individual Services", icon: Zap },
  { id: "add-ons", label: "Add-ons", icon: Plus },
];

const serviceImages: Record<string, string> = {
  "job-placement": "/images/services/explore-prepare-get-placed.png",
  "recruitment-and-staffing": "/images/services/staffing-solutions.png",
  "talent-acquisition": "/images/services/talent-acquisition-hero.png",
  "background-verification": "/images/services/background-verification-hero.png",
  "accounting-and-taxes": "/images/services/accounting-taxes-hero.png",
  "it-training": "/images/services/it-training-hero.png",
};

export default function ServicesPage() {
  const scrollTo = (id: string) => {
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
        sub="Explore our specialized core programs, individual services, and targeted add-ons. Looking for full packaged plans? Browse our Shop."
      >
        {/* Section Nav Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border bg-[#FFFFFF] text-[#77736D] border-[#E5E5E5] hover:text-[#171717] hover:border-[#F26A21]/40"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}

          {/* Shop link pill */}
          <Link
            href="/shop"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border bg-[#F26A21] text-[#171717] border-[#F26A21]"
          >
            View Plans &amp; Packages →
          </Link>
        </div>
      </PageHero>


      {/* ══════════════════════════════════════════════
          SECTION 1 — CORE SERVICES
      ══════════════════════════════════════════════ */}
      <section id="core-services" className="section-spacing bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">OUR SPECIALIZED SOLUTIONS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171717] mt-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Core Services &amp; Programs
            </h2>
            <p className="text-[#77736D] mt-2 text-sm sm:text-base">
              Comprehensive technical placement, enterprise staffing, and career consulting designed for the modern US market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((svc) => {
              const Icon = serviceIcons[svc.iconName] || ShieldCheck;
              const imageUrl = serviceImages[svc.slug];
              return (
                <div
                  key={svc.slug}
                  className="overflow-hidden rounded-3xl border border-[#E5E5E5] bg-[#F5F1E8]/50 hover:bg-white hover:border-[#F26A21]/40 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(23,23,23,0.06)] flex flex-col justify-between group"
                >
                  <div>
                    {imageUrl && (
                      <div className="relative h-60 w-full overflow-hidden border-b border-[#E5E5E5]/60 bg-white p-3 flex items-center justify-center">
                        <Image
                          src={imageUrl}
                          alt={svc.title}
                          fill
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F26A21]/10 border border-[#F26A21]/20 flex items-center justify-center text-[#F26A21] shrink-0 group-hover:bg-[#F26A21] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-bold text-[#171717] group-hover:text-[#F26A21] transition-colors" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                          {svc.title}
                        </h3>
                      </div>
                      <p className="text-[#77736D] text-xs sm:text-sm leading-relaxed">
                        {svc.subtext}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F26A21] hover:text-[#E05A10] group-hover:translate-x-0.5 transition-all"
                    >
                      Explore Service Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
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
          SECTION 3 — ADD-ONS
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

          {/* CTA to Shop */}
          <div className="mt-12 rounded-2xl bg-[#F26A21]/8 border border-[#F26A21]/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Looking for a complete package?
              </h3>
              <p className="text-[#77736D] text-sm mt-1">
                Our Plans &amp; Packages bundle everything together at the best value — with after-placement fees starting at just 10%.
              </p>
            </div>
            <Link
              href="/shop"
              className="shrink-0 px-6 py-3 rounded-full bg-[#F26A21] text-[#171717] text-sm font-bold transition-colors hover:bg-[#E05A10] whitespace-nowrap"
            >
              Browse Plans &amp; Packages →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
