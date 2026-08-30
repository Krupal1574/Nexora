"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Briefcase,
  FileText,
  Calendar,
  Code2,
  Shield,
  Star,
  Users,
  TrendingUp,
  CheckCircle2,
  Quote,
} from "lucide-react";

// ─── Services Data ────────────────────────────────────────────────────────────
const services = [
  {
    icon: Briefcase,
    title: "Career Counseling",
    desc: "1-on-1 career mapping sessions with expert technical domain advisors to chart your ideal path.",
    color: "#00F2FE",
  },
  {
    icon: FileText,
    title: "Resume Optimization",
    desc: "ATS-tailored resume overhauls crafted for U.S. job market standards that get you noticed.",
    color: "#00D2C4",
  },
  {
    icon: Calendar,
    title: "Interview Preparation",
    desc: "Mock interviews, behavioral coaching, and technical drill sessions with industry veterans.",
    color: "#00F2FE",
  },
  {
    icon: Code2,
    title: "Technical Training",
    desc: "Skill upgrade sessions, weekly webinars, and mock tech assessments to sharpen your edge.",
    color: "#00D2C4",
  },
];

// ─── Candidate Journey Steps ──────────────────────────────────────────────────
const journeySteps = [
  { num: "01", label: "Screening & Counseling", icon: Users },
  { num: "02", label: "Tech Training", icon: Code2 },
  { num: "03", label: "Resume Building", icon: FileText },
  { num: "04", label: "Resume Marketing", icon: TrendingUp },
  { num: "05", label: "Mock Interviews", icon: Calendar },
  { num: "06", label: "Placement", icon: Briefcase },
  { num: "07", label: "Background Check", icon: Shield },
  { num: "08", label: "Onboarding", icon: CheckCircle2 },
];


// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function HomePage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="relative pt-[calc(var(--navbar-mobile)+4rem)] lg:pt-[calc(var(--navbar-desktop)+6rem)] pb-16 lg:pb-24 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#0B0F19]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,#00F2FE18_0%,transparent_60%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F2FE]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#00D2C4]/5 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #00F2FE 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 container-wide text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F2FE]/25 bg-[#00F2FE]/8 text-[#00F2FE] text-sm font-medium mb-8 transition-all duration-700 ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
            IT Staffing & Talent Solutions
          </div>

          {/* Headline */}
          <h1
            className={`text-[length:var(--hero-title)] font-bold max-w-4xl mx-auto leading-[1.1] tracking-tight mb-6 transition-all duration-700 delay-150 ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Your Dream Tech Career{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Is Waiting For You
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg sm:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-300 ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Nexora bridges the gap between elite tech talent and top U.S. enterprises.
            From resume optimization to placement, we're your career acceleration partner.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/services" className="btn-primary text-base px-8 py-4">
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-ghost text-base px-8 py-4">
              Contact Recruiters
            </Link>
          </div>


        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[#64748B] text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00F2FE] to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          COMPANY INTRO
      ════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#0B0F19]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
            <div>
              <span className="section-label">Who We Are</span>
              <h2
                className="text-[length:var(--section-title)] font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                America's Leading IT{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Placement & Talent
                </span>{" "}
                Solutions Firm
              </h2>
              <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
                At Nexora, we specialize in transforming careers. We are a full-spectrum
                IT staffing and talent solutions company operating across the United
                States, connecting highly skilled technology professionals with the
                nation's most innovative companies.
              </p>
              <p className="text-[#94A3B8] leading-relaxed mb-8">
                Our end-to-end approach covers everything from career counseling and
                resume optimization to technical training, active placement, and
                onboarding support — ensuring both candidates and employers experience
                seamless, high-quality talent partnerships.
              </p>
              <Link href="/about" className="btn-primary inline-flex">
                Learn About Nexora <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Capability grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { label: "Personalized Approach", icon: Users },
                { label: "End-to-End Support", icon: Briefcase },
                { label: "U.S. Market Focus", icon: Calendar },
                { label: "Active Placement", icon: Star },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="glass-card p-7 flex flex-col items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00F2FE]" />
                  </div>
                  <span
                    className="text-lg font-bold text-white mt-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVICES OVERVIEW
      ════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#121623]">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label">What We Offer</span>
            <h2
              className="text-[length:var(--section-title)] font-bold text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Services Built for Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Success
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card p-7 flex flex-col gap-5 group">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <h3
                    className="text-white font-semibold text-lg mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
                </div>
                <Link
                  href="/services"
                  className="mt-auto flex items-center gap-2 text-[#00F2FE] text-sm font-medium hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CANDIDATE JOURNEY — 8 STEPS
      ════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#0B0F19] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,#00F2FE08_0%,transparent_70%)] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <span className="section-label">The Nexora Process</span>
            <h2
              className="text-[length:var(--section-title)] font-bold text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Your 8-Step Journey to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Placement
              </span>
            </h2>
            <p className="text-[#94A3B8] mt-4 max-w-xl mx-auto">
              A structured, proven candidate lifecycle designed to maximize your chances
              of landing the right role, fast.
            </p>
          </div>

          {/* Desktop: 4-4 grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {journeySteps.map(({ num, label, icon: Icon }, i) => (
              <div
                key={num}
                className="glass-card p-6 flex flex-col items-center text-center gap-4 group relative overflow-hidden"
              >
                {/* connector arrow for desktop */}
                {i % 4 !== 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-[#00F2FE]/40" />
                  </div>
                )}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00F2FE]/20 to-[#00D2C4]/10 border border-[#00F2FE]/25 flex items-center justify-center group-hover:shadow-[0_0_20px_#00F2FE33] transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#00F2FE]" />
                </div>
                <div>
                  <span
                    className="text-xs font-bold tracking-widest text-[#00F2FE] block mb-1"
                  >
                    STEP {num}
                  </span>
                  <p
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ════════════════════════════════════════════════════════
          BOTTOM CTA BANNER
      ════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#121623] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,#00F2FE12_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 border-y border-[#00F2FE]/10 pointer-events-none" />
        <div className="relative container-narrow text-center">
          <h2
            className="text-[length:var(--section-title)] font-bold text-white mb-5"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Ready to Launch Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tech Career?
            </span>
          </h2>
          <p className="text-[#94A3B8] text-lg mb-10 max-w-2xl mx-auto">
            Join the tech professionals who found their dream roles with Nexora.
            Let's build your success story — together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-10 py-4">
              Get Started Today <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/refer-and-earn" className="btn-ghost text-base px-10 py-4">
              Refer & Earn $500
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
