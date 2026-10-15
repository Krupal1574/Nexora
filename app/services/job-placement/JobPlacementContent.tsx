"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Handshake,
  Medal,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  XCircle,
} from "lucide-react";
import CompanyLogos from "@/components/home/CompanyLogos";
import LivePlacements from "@/components/home/LivePlacements";

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const stats = [
  {
    value: "Your Next",
    label: "Career Opportunity",
    description:
      "Get strategic guidance and direct support to move confidently toward your next role.",
    icon: UserRound,
  },
  {
    value: "Personalized",
    label: "Career Strategy",
    description:
      "Build a tailored job-search roadmap that reflects your skills, visa status, and goals.",
    icon: BriefcaseBusiness,
  },
  {
    value: "Targeted",
    label: "Market Outreach",
    description:
      "Connect with enterprise hiring managers and verified roles across major tech hubs.",
    icon: Building2,
  },
  {
    value: "Step by Step",
    label: "Full-Cycle Support",
    description:
      "Receive dedicated guidance through interviews, compensation negotiation, and onboarding.",
    icon: Medal,
  },
];

const services = [
  {
    title: "Full-Time Job Placement",
    description:
      "Identify high-paying full-time and contract-to-hire opportunities at top Fortune 500 and high-growth tech companies.",
    icon: Building2,
  },
  {
    title: "Resume Writing & Optimization",
    description:
      "Present your experience clearly with an ATS-optimized, recruiter-approved resume crafted for U.S. industry standards.",
    icon: FileText,
  },
  {
    title: "Interview Preparation & Coaching",
    description:
      "Prepare for rigorous technical assessments and behavioral interviews with 1-on-1 coaching from industry veterans.",
    icon: MessageCircle,
  },
  {
    title: "Direct Recruiter Outreach & Marketing",
    description:
      "Position your profile proactively in front of active hiring managers and vetted corporate staffing networks.",
    icon: Search,
  },
];

const comparison = {
  without: [
    "Applying blind without a clear job-search strategy",
    "A generic resume that gets rejected by ATS scanners",
    "Difficulty finding visa-friendly (OPT/STEM/H-1B) sponsors",
    "No structured technical or behavioral interview prep",
    "Uncertainty navigating salary negotiation and offer terms",
  ],
  with: [
    "A structured, proactive strategy with dedicated advisors",
    "A precision-engineered resume tailored to U.S. tech roles",
    "Direct connections with verified, visa-supportive employers",
    "1-on-1 mock interviews and real-world question coaching",
    "Expert offer evaluation and compensation guidance",
  ],
};

const processSteps = [
  {
    step: "Step 1",
    time: "30 mins",
    title: "Career Assessment",
    description:
      "Review your background, immigration status, career objectives, and target job titles.",
    icon: Phone,
    color: "#FFFFFF",
  },
  {
    step: "Step 2",
    time: "Days 1-5",
    title: "Profile & Resume Overhaul",
    description:
      "Re-engineer your resume and LinkedIn to highlight high-impact achievements and pass ATS filters.",
    icon: UserRound,
    color: "#FFF7ED",
  },
  {
    step: "Step 3",
    time: "Days 6-12",
    title: "Interview Coaching",
    description:
      "Undergo realistic mock interviews covering system design, coding, and STAR behavioral answers.",
    icon: MessageCircle,
    color: "#EFF6FF",
  },
  {
    step: "Step 4",
    time: "Ongoing",
    title: "Targeted Outreach",
    description:
      "Distribute your profile across Nexora's verified recruiter networks and direct enterprise channels.",
    icon: Target,
    color: "#F0FDF4",
  },
  {
    step: "Step 5",
    time: "Final Step",
    title: "Offer & Onboarding",
    description:
      "Navigate multiple offers, negotiate optimal compensation packages, and onboard smoothly.",
    icon: Handshake,
    color: "#FAF5FF",
  },
];

const values = [
  {
    title: "Candidate-First Transparency",
    description:
      "We provide honest feedback, clear milestones, and complete visibility at every stage of your placement journey.",
    icon: ShieldCheck,
  },
  {
    title: "U.S. Market Expertise",
    description:
      "Deep understanding of F-1, OPT, STEM OPT, H-1B, and USC hiring standards across leading enterprises.",
    icon: Medal,
  },
  {
    title: "Direct Recruiter Advocacy",
    description:
      "You work directly with dedicated career advisors who actively position your strengths to hiring managers.",
    icon: Handshake,
  },
  {
    title: "End-to-End Commitment",
    description:
      "Our partnership doesn't end when an interview is scheduled—we support you until your official start date.",
    icon: Sparkles,
  },
];

const otherServices = [
  {
    title: "Recruitment & Staffing",
    description:
      "Enterprise workforce solutions spanning contract, contract-to-hire, and direct placement.",
    color: "#FFF8ED",
    icon: BriefcaseBusiness,
    href: "/services/recruitment-and-staffing",
  },
  {
    title: "Real-World IT Training",
    description:
      "Comprehensive training programs in Full Stack, Cloud, DevOps, and Data Engineering.",
    color: "#F0F7FF",
    icon: Target,
    href: "/services/it-training",
  },
  {
    title: "Accounting & Tax Services",
    description:
      "Compliant corporate and individual tax consulting, payroll processing, and bookkeeping.",
    color: "#F4FBF7",
    icon: FileText,
    href: "/services/accounting-and-taxes",
  },
  {
    title: "Comprehensive Background Check",
    description:
      "Fast, compliant identity, employment history, and education verification services.",
    color: "#FBF5FF",
    icon: ShieldCheck,
    href: "/services/background-check",
  },
];

/* ─── Reusable Section Heading ──────────────────────────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow && (
        <p className="eyebrow mb-4 text-[#F26A21]">
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#77736D]">
          {description}
        </p>
      )}
    </div>
  );
}

/* ─── Hero (Nexora Theme) ───────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative mx-auto mt-4 min-h-[640px] max-w-[1440px] overflow-hidden rounded-[32px] bg-[#10162E] text-white shadow-2xl">
      {/* Background radial ambient glows matching Nexora brand palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10162E] via-[#141A38] to-[#0A0D1D]" />
      <div className="glow-drift absolute -top-40 right-10 h-[500px] w-[500px] rounded-full bg-[#F26A21]/20 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 left-10 h-[450px] w-[450px] rounded-full bg-[#2026D8]/25 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 grid min-h-[640px] items-center gap-10 px-6 pb-12 pt-16 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F26A21]/40 bg-[#F26A21]/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F26A21] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Job Placement Services
          </span>

          <h1
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Turning Job Seekers Into{" "}
            <span className="text-[#F26A21]">Career-Ready</span> Professionals
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Personalized job-search roadmaps, ATS-engineered resumes, 1-on-1
            interview coaching, and proactive recruiter outreach across top U.S.
            employers.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-3 rounded-full bg-[#F26A21] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#F26A21]/25 transition hover:bg-[#D95A19]"
            >
              Start Your Journey <ArrowRight size={17} />
            </Link>
            <Link
              href="#process"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Explore Our Process
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/75">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#F26A21]" /> Personalized 1-on-1 strategy
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#F26A21]" /> OPT, STEM, H-1B &amp; USC support
            </span>
          </div>
        </div>

        {/* Hero Visual: From Graduation to Career Success */}
        <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:max-w-none">
          <div className="relative w-full overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-b from-white/10 to-white/[0.02] p-2.5 shadow-2xl backdrop-blur-sm">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px] shadow-inner">
              <Image
                src="/images/services/from-graduation-to-career-success.png"
                alt="From Graduation to Career Success - Nexora Staffing"
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>

            {/* Floating transformation badge at bottom */}
            <div className="absolute bottom-4 right-4 z-20 rounded-2xl border border-white/20 bg-[#10162E]/90 px-4 py-2.5 text-xs backdrop-blur-md shadow-2xl text-white">
              <span className="block font-bold text-white flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-[#F26A21] animate-pulse" />
                From Graduation to Career Success
              </span>
              <span className="text-[11px] text-white/70">Candidate transformation with Nexora Staffing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─────────────────────────────────────────────────────────── */

function StatsSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="rounded-3xl border border-[#E5E5E5] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#F26A21]/30 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F26A21]/10 text-[#F26A21]">
                <Icon size={22} />
              </div>
              <p
                className="mt-6 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {item.value}
              </p>
              <h3 className="mt-2 text-base font-bold text-[#171717]">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#77736D]">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Services Accordion ────────────────────────────────────────────────────── */

function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(0);

  return (
    <section className="mx-auto my-6 max-w-[1440px] overflow-hidden rounded-[32px] bg-[#10162E] px-6 py-20 text-white shadow-2xl sm:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4 text-[#F26A21]">
            Career support
          </p>
          <h2
            className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Complete Job Search Solution
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            From professional resume engineering to live interview preparation,
            we help you build a reliable, high-converting process for your job
            search.
          </p>
          <Link
            href="/contact"
            className="btn-primary mt-8 inline-flex items-center gap-3 rounded-full bg-[#F26A21] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#F26A21]/20 transition hover:bg-[#D95A19]"
          >
            Start Your Journey <ArrowRight size={17} />
          </Link>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const active = activeService === index;

            return (
              <div
                key={service.title}
                className={`overflow-hidden rounded-2xl border transition duration-300 ${
                  active
                    ? "border-[#F26A21]/40 bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setActiveService(active ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  aria-expanded={active}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                        active
                          ? "bg-[#F26A21] text-white"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      <Icon size={22} />
                    </span>
                    <span className="text-base font-bold sm:text-lg">
                      {service.title}
                    </span>
                  </span>
                  <span className="text-2xl font-light text-[#F26A21]">
                    {active ? "−" : "+"}
                  </span>
                </button>
                {active && (
                  <div className="px-6 pb-6 pl-[80px]">
                    <p className="max-w-lg text-sm leading-relaxed text-white/70">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#F26A21] hover:underline"
                    >
                      Get Started with This Service <ArrowUpRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── With / Without Comparison ─────────────────────────────────────────────── */

function ComparisonSection() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:py-24">
      <SectionHeading
        eyebrow="A more structured approach"
        title="Why Job Seekers Choose Nexora"
        description="A structured, guided process eliminates uncertainty and accelerates your path to formal offers."
      />

      <div className="mx-auto grid max-w-[960px] gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-red-200 bg-[#FFF5F5] p-7 sm:p-9 shadow-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-700">
            <XCircle size={15} /> Without Nexora
          </span>
          <h3
            className="mt-6 text-2xl font-bold text-[#171717]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            The Job Search Struggle
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#77736D]">
            Navigating the competitive U.S. tech job market without guidance.
          </p>
          <ul className="mt-6 space-y-4">
            {comparison.without.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-emerald-200 bg-[#F2FAF4] p-7 sm:p-9 shadow-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={15} /> With Nexora Support
          </span>
          <h3
            className="mt-6 text-2xl font-bold text-[#171717]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            A Strategic, Guided Advantage
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#77736D]">
            Structured coaching and direct connections with active recruiters.
          </p>
          <ul className="mt-6 space-y-4">
            {comparison.with.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

/* ─── 5-Step Process ────────────────────────────────────────────────────────── */

function ProcessSection() {
  return (
    <section
      id="process"
      className="mx-auto my-6 max-w-[1440px] rounded-[32px] border border-[#E5E5E5] bg-white px-6 py-20 shadow-sm sm:px-10 lg:py-24"
    >
      <SectionHeading
        eyebrow="How we work"
        title="A Simple, Transparent 5-Step Process"
        description="Understand each milestone from your initial assessment to your first day on the job."
      />

      <div className="mx-auto grid max-w-[1360px] gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              key={step.step}
              className="flex min-h-[340px] flex-col rounded-3xl border border-[#E5E5E5] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F26A21]/40 hover:shadow-lg"
              style={{ backgroundColor: step.color }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#10162E] px-3 py-1.5 text-[11px] font-bold text-white">
                  {step.step}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-[#171717]">
                  <Clock3 size={12} /> {step.time}
                </span>
              </div>

              <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F26A21]/10 text-[#F26A21]">
                <Icon size={22} />
              </div>

              <h3
                className="mt-5 text-lg font-bold leading-snug text-[#171717]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#77736D]">
                {step.description}
              </p>

              {index < processSteps.length - 1 && (
                <div className="mt-auto hidden pt-4 text-[#F26A21] lg:block">
                  <ArrowRight size={18} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Values ────────────────────────────────────────────────────────────────── */

function ValuesSection() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:py-24">
      <SectionHeading
        eyebrow="Our commitment"
        title="Careers Built on Trust and Transparency"
        description="We believe career guidance should be candid, compliant, and focused entirely on candidate success."
      />

      <div className="mx-auto grid max-w-[1320px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => {
          const Icon = value.icon;
          const isFeatured = index === 1;

          return (
            <article
              key={value.title}
              className={`flex min-h-[300px] flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1 ${
                isFeatured
                  ? "bg-[#10162E] text-white shadow-xl"
                  : "border border-[#E5E5E5] bg-white shadow-sm hover:border-[#F26A21]/30 hover:shadow-lg"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isFeatured
                    ? "bg-[#F26A21] text-white"
                    : "bg-[#F26A21]/10 text-[#F26A21]"
                }`}
              >
                <Icon size={22} />
              </div>
              <h3
                className={`mt-6 text-xl font-bold leading-snug ${
                  isFeatured ? "text-white" : "text-[#171717]"
                }`}
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {value.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isFeatured ? "text-white/70" : "text-[#77736D]"
                }`}
              >
                {value.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Other Services ────────────────────────────────────────────────────────── */

function OtherServices() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:py-24">
      <SectionHeading
        eyebrow="Integrated Ecosystem"
        title="Explore Other Nexora Services"
        description="Discover our complementary talent, training, compliance, and accounting offerings."
      />

      <div className="mx-auto grid max-w-[1320px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {otherServices.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              href={service.href}
              key={service.title}
              className="group flex min-h-[290px] flex-col rounded-3xl border border-[#E5E5E5] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#F26A21]/40 hover:shadow-xl"
              style={{ backgroundColor: service.color }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-[#F26A21]">
                <Icon size={22} />
              </div>
              <h3
                className="mt-6 text-lg font-bold text-[#171717]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#77736D]">
                {service.description}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-bold text-[#F26A21]">
                Learn More
                <ArrowUpRight
                  size={15}
                  className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


function PlacementJourneyBanner() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10">
      <div className="relative overflow-hidden rounded-[32px] border border-[#171717]/10 bg-gradient-to-br from-[#10162E] via-[#171717] to-[#10162E] p-8 sm:p-12 lg:p-16 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#F26A21]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#8FB8D8]/15 blur-3xl" />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F26A21]/30 bg-[#F26A21]/10 px-3.5 py-1.5 text-xs font-bold text-[#F26A21] uppercase tracking-wider">
              Proven Placement Methodology
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F1E8]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Explore, Prepare &amp; <span className="text-[#F26A21]">Get Placed</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
              Navigating the competitive U.S. tech ecosystem requires more than sending generic applications. Our structured framework aligns your technical positioning with enterprise hiring expectations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#F26A21] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#df5814] shadow-md"
              >
                Schedule Career Audit <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl bg-white shadow-2xl p-2 sm:p-2.5 border border-white/80">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/services/explore-prepare-get-placed.png"
                alt="Explore, Prepare, Get Placed - Nexora Placement Roadmap"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 700px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────────────── */

export default function JobPlacementContent() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#171717]">
      <Hero />
      <CompanyLogos />
      <StatsSection />
      <ServicesSection />
      <ComparisonSection />
      <PlacementJourneyBanner />
      <ProcessSection />
      <ValuesSection />
      <LivePlacements />
      <OtherServices />
    </div>
  );
}
