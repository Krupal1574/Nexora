"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  FileCheck,
  Globe2,
  Handshake,
  HeartPulse,
  MessageCircle,
  Network,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const partners = [
  "rxvantage",
  "BASCOM-TURNER",
  "WANRack",
  "ATOMBEAM",
  "BRIDGEFORCE",
  "RICHMOND",
  "tenant",
  "ECMTEK",
  "UTMB",
  "nmg BENEFITS",
];

const hiringServices = [
  {
    title: "Permanent Placement",
    description:
      "Find professionals whose skills, experience, and career goals align with your long-term hiring needs. We support candidate sourcing, screening, and interview coordination.",
    icon: Building2,
  },
  {
    title: "Temporary & Contract Placement",
    description:
      "Build workforce flexibility with recruitment support for temporary projects, contract assignments, and changing business requirements.",
    icon: FileCheck,
  },
  {
    title: "Outsourcing Solutions",
    description:
      "Explore recruitment process support and workforce solutions designed around your operations, hiring volume, and internal resources.",
    icon: Clock3,
  },
  {
    title: "Workforce Training Solutions",
    description:
      "Identify skill gaps and explore training support that helps teams prepare for evolving responsibilities and business needs.",
    icon: BriefcaseBusiness,
  },
];

const recruitmentServices = [
  {
    title: "Permanent Placement",
    description:
      "Long-term hiring support for specialist, professional, and leadership positions.",
    items: [
      "Mid-to-senior-level hiring",
      "Leadership and management roles",
      "Specialized professional roles",
      "Long-term team building",
    ],
    icon: Target,
  },
  {
    title: "Temporary & Contract Placement",
    description:
      "Flexible recruitment support for changing project and staffing requirements.",
    items: [
      "Project-based professionals",
      "Seasonal workforce support",
      "Short-term operational hiring",
      "Flexible contract talent",
    ],
    icon: Clock3,
  },
  {
    title: "Creative Staffing",
    description:
      "Connect with creative and digital professionals for specialized projects.",
    items: [
      "Branding and storytelling",
      "Marketing and advertising",
      "Branding, UI and UX",
      "Product and innovation",
    ],
    icon: Network,
  },
  {
    title: "Training Solutions",
    description:
      "Support professional development through focused learning and skills development.",
    items: [
      "Skill development training",
      "Industry-specific training",
      "Upskilling initiatives",
      "Technology and tools",
    ],
    icon: TrendingUp,
  },
  {
    title: "Diversity & Inclusion Hiring",
    description:
      "Develop thoughtful hiring strategies that help widen access to talent.",
    items: [
      "Diverse talent sourcing",
      "Inclusive hiring strategies",
      "Equal opportunity solutions",
      "Inclusive workplace development",
    ],
    icon: Users,
  },
  {
    title: "Outsourcing Solutions",
    description:
      "Explore recruitment and operational support aligned with business priorities.",
    items: [
      "Offshore recruitment support",
      "Recruitment operations",
      "Scalable hiring solutions",
      "Compliance-aware workflows",
    ],
    icon: Globe2,
  },
];

const advantages = [
  {
    title: "Rapid Deployment",
    description:
      "Prioritize relevant candidates and coordinate hiring efficiently around your requirements.",
    metric: "Responsive",
    caption: "HIRING SUPPORT",
    icon: Clock3,
  },
  {
    title: "Technical Expertise",
    description:
      "Recruitment support for technical positions with attention to relevant skills and experience.",
    metric: "Role-focused",
    caption: "CANDIDATE SCREENING",
    icon: Code2,
  },
  {
    title: "Global Talent Reach",
    description:
      "Explore talent sourcing strategies for distributed teams and varied hiring requirements.",
    metric: "Flexible",
    caption: "SOURCING STRATEGY",
    icon: Globe2,
  },
  {
    title: "Cost-Conscious Solutions",
    description:
      "Choose a recruitment approach that considers your hiring priorities, team size, and resources.",
    metric: "Tailored",
    caption: "HIRING APPROACH",
    icon: Wallet,
  },
  {
    title: "Compliance Awareness",
    description:
      "Build recruitment workflows that account for applicable employment requirements and processes.",
    metric: "Process-led",
    caption: "HIRING WORKFLOWS",
    icon: ShieldCheck,
  },
  {
    title: "Scalable Support",
    description:
      "Adapt recruitment support as your workforce requirements and business priorities change.",
    metric: "Adaptable",
    caption: "WORKFORCE NEEDS",
    icon: TrendingUp,
  },
];

const processSteps = [
  {
    step: "Step 1",
    title: "Share Your Requirements",
    description:
      "Tell us about the roles, skills, experience, team structure, and timeline you need.",
    icon: MessageCircle,
    color: "#FFFFFF",
  },
  {
    step: "Step 2",
    title: "Talent Sourcing",
    description:
      "We identify potential candidates using a sourcing approach aligned with your requirements.",
    icon: Search,
    color: "#FFF7ED",
  },
  {
    step: "Step 3",
    title: "Screening & Vetting",
    description:
      "Candidate qualifications and relevant experience are reviewed against the role requirements.",
    icon: ShieldCheck,
    color: "#EFF6FF",
  },
  {
    step: "Step 4",
    title: "Client Interviews",
    description:
      "Coordinate candidate introductions, interview schedules, and feedback between both sides.",
    icon: Users,
    color: "#F0FDF4",
  },
  {
    step: "Step 5",
    title: "Onboarding Support",
    description:
      "Move through hiring decisions and next steps with clear communication and coordination.",
    icon: CheckCircle2,
    color: "#FAF5FF",
  },
];

const industries = [
  {
    title: "Technology",
    description:
      "Software development, cloud engineering, IT operations, and technical roles.",
    icon: Code2,
  },
  {
    title: "Finance & Banking",
    description:
      "Financial operations, accounting, risk, and business support positions.",
    icon: Wallet,
  },
  {
    title: "Healthcare",
    description:
      "Healthcare administration, operations, and relevant support positions.",
    icon: HeartPulse,
  },
  {
    title: "E-commerce & Retail",
    description:
      "Retail operations, digital commerce, logistics, and supply chain roles.",
    icon: Building2,
  },
  {
    title: "Travel & Hospitality",
    description:
      "Hospitality operations, guest services, and business support positions.",
    icon: Globe2,
  },
  {
    title: "Manufacturing",
    description:
      "Industrial operations, production, engineering, and supply chain roles.",
    icon: Network,
  },
];

const faqs = [
  {
    question: "What types of recruitment services do you offer?",
    answer:
      "Our service categories include permanent placement, temporary and contract placement, recruitment outsourcing, and workforce training support. The right approach depends on your hiring requirements.",
  },
  {
    question: "Can you help with technical staffing?",
    answer:
      "Yes. We can discuss technical hiring requirements, including the roles, experience, skills, and timelines involved, and determine an appropriate recruitment approach.",
  },
  {
    question: "How does the recruitment process work?",
    answer:
      "The process starts with your requirements, followed by talent sourcing, candidate screening, interview coordination, and support with the next hiring steps.",
  },
  {
    question: "Can you support multiple open positions?",
    answer:
      "We can discuss multi-role hiring and recurring workforce needs to understand the scope, priorities, and suitable recruitment workflow.",
  },
  {
    question: "Do you offer temporary and contract staffing?",
    answer:
      "Temporary and contract recruitment can be discussed based on the position, project duration, required skills, location, and engagement requirements.",
  },
  {
    question: "Which industries do you support?",
    answer:
      "Our industry areas of interest include technology, finance, healthcare, retail, hospitality, and manufacturing. Availability depends on the specific role and requirements.",
  },
  {
    question: "How do we get started?",
    answer:
      "Contact our team with the role details, required skills, number of positions, location, and desired timeline. We can then discuss the appropriate next steps.",
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#10162E] via-[#141A38] to-[#0A0D1D]" />
      <div className="glow-drift absolute -top-40 right-10 h-[500px] w-[500px] rounded-full bg-[#F26A21]/20 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 left-10 h-[450px] w-[450px] rounded-full bg-[#2026D8]/25 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 grid min-h-[640px] items-center gap-10 px-6 pb-12 pt-16 sm:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-16 lg:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F26A21]/40 bg-[#F26A21]/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F26A21] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Recruitment &amp; Staffing
          </span>

          <h1
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Consider Us Your Behind-the-Scenes{" "}
            <span className="text-[#F26A21]">Hiring Partner</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Hiring great people shouldn&apos;t slow down your business. Nexora
            works alongside your team to understand hiring needs, identify
            relevant talent, and coordinate the recruitment process across
            technical and professional roles.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-3 rounded-full bg-[#F26A21] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#F26A21]/25 transition hover:bg-[#D95A19]"
            >
              Request Talent <ArrowRight size={17} />
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
              <CheckCircle2 size={16} className="text-[#F26A21]" /> Contract, C2H &amp; Direct Hire
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#F26A21]" /> Pre-vetted technical talent
            </span>
          </div>
        </div>

        {/* Hero Interactive Workflow Card */}
        <div className="relative mx-auto flex w-full max-w-[460px] items-center justify-center lg:max-w-none">
          <div className="relative w-full rounded-[30px] border border-white/15 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F26A21]">
                Recruitment workflow
              </span>
              <span className="flex h-3 w-3 rounded-full bg-[#F26A21] animate-pulse" />
            </div>

            <div className="relative mb-5 h-36 w-full rounded-2xl overflow-hidden border border-white/20 shadow-md">
              <Image
                src="/images/updates/digital-handshake-across-the-desk.png"
                alt="Digital Handshake - Employer & Candidate Placement"
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 rounded-full bg-[#10162E]/80 px-2.5 py-1 text-[10px] font-bold text-white border border-white/20 backdrop-blur-sm">
                Direct Client Outreach
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-[#F5F1E8] p-5 text-[#171717] shadow-inner">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10162E] text-white">
                  <Users size={22} className="text-[#F26A21]" />
                </div>
                <div>
                  <p className="font-bold text-sm">Your Hiring Goals</p>
                  <p className="text-xs text-[#77736D]">
                    Customized to your technical stack
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  "Understand the role & culture",
                  "Source pre-screened talent",
                  "Coordinate technical interviews",
                  "Facilitate seamless onboarding",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-black/5 bg-white p-3 shadow-sm"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F26A21]/15 text-xs font-bold text-[#F26A21]">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#171717]">{item}</span>
                    <Check size={14} className="ml-auto text-emerald-600 font-bold" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-white">
              <Handshake size={22} className="text-[#F26A21]" />
              <div>
                <p className="text-xs font-bold">Collaborative Partnership</p>
                <p className="text-[11px] text-white/70">
                  Built around your timelines and hiring volume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Partners Section ──────────────────────────────────────────────────────── */

function PartnersSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10">
      <div className="mx-auto mb-8 max-w-6xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#77736D]">
          Trusted by Innovative Employers
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-7 lg:justify-between">
        {partners.map((partner, index) => (
          <span
            key={partner}
            className={`text-base font-extrabold tracking-tight sm:text-lg ${
              index % 3 === 0
                ? "text-[#F26A21]"
                : index % 3 === 1
                  ? "text-[#10162E]"
                  : "text-[#77736D]"
            }`}
          >
            {partner}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── Stats Section ─────────────────────────────────────────────────────────── */

function StatsSection() {
  const stats = [
    {
      value: "Candidate-Centric",
      label: "Quality Over Quantity",
      description:
        "Every candidate is deeply evaluated for technical proficiency, culture match, and longevity.",
      icon: Users,
    },
    {
      value: "Flexible Models",
      label: "Direct & Contract Staffing",
      description:
        "Choose between contract, contract-to-hire, and executive direct-hire models.",
      icon: BriefcaseBusiness,
    },
    {
      value: "Scalable Sourcing",
      label: "Rapid Talent Deployment",
      description:
        "Scale your engineering or operations teams rapidly with pre-screened candidate pipelines.",
      icon: Building2,
    },
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-3xl border border-[#E5E5E5] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#F26A21]/30 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F26A21]/10 text-[#F26A21]">
                <Icon size={22} />
              </div>
              <p
                className="mt-6 text-2xl font-extrabold tracking-tight text-[#171717]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {stat.value}
              </p>
              <h3 className="mt-2 text-base font-bold text-[#171717]">{stat.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#77736D]">
                {stat.description}
              </p>
            </article>
          );
        })}

        <article className="flex flex-col justify-between rounded-3xl bg-[#10162E] p-8 text-white shadow-xl">
          <div>
            <span className="eyebrow mb-2 text-[#F26A21]">GET STARTED</span>
            <h3
              className="mt-2 text-2xl font-bold tracking-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Ready to Hire?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Discuss your technical requirements with our recruitment directors today.
            </p>
          </div>

          <Link
            href="/contact"
            className="btn-primary mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#F26A21] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F26A21]/20 transition hover:bg-[#D95A19]"
          >
            Start Now <ArrowRight size={16} />
          </Link>
        </article>
      </div>
    </section>
  );
}

/* ─── Hiring Services Section ───────────────────────────────────────────────── */

function HiringServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(0);

  return (
    <section className="mx-auto my-6 max-w-[1440px] overflow-hidden rounded-[32px] bg-[#10162E] px-6 py-20 text-white shadow-2xl sm:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4 text-[#F26A21]">
            Staffing solutions
          </p>

          <h2
            className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Helping Employers Hire Without the Headache
          </h2>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            Whether you need permanent staffing, temporary support, outsourced
            recruitment, or workforce training, we engineer an approach
            tailored to your engineering roadmap and culture.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            <Link
              href="/contact"
              className="btn-primary inline-flex w-fit items-center gap-3 rounded-full bg-[#F26A21] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#F26A21]/25 transition hover:bg-[#D95A19]"
            >
              Request Talent <ArrowRight size={17} />
            </Link>

            <div className="relative aspect-[16/9] w-full max-w-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 p-1.5 backdrop-blur-sm">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/services/staffing-solutions.png"
                  alt="Nexora Staffing Solutions"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="500px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {hiringServices.map((service, index) => {
            const Icon = service.icon;
            const active = activeService === index;

            return (
              <article
                key={service.title}
                className={`overflow-hidden rounded-2xl border transition duration-300 ${
                  active
                    ? "border-[#F26A21]/40 bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setActiveService(active ? null : index)}
                  aria-expanded={active}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
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
                      Discuss your requirements <ArrowUpRight size={16} />
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Recruitment Services Section ─────────────────────────────────────────── */

function RecruitmentServicesSection() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:py-24">
      <SectionHeading
        eyebrow="Our capabilities"
        title="Hiring Great People Shouldn't Be This Hard"
        description="Explore recruitment and workforce services designed to support diverse technical and executive requirements."
      />

      <div className="mx-auto grid max-w-[1320px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recruitmentServices.map((service) => {
          const Icon = service.icon;

          return (
            <article
              key={service.title}
              className="rounded-3xl border border-[#E5E5E5] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#F26A21]/30 hover:shadow-xl sm:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F26A21]/10 text-[#F26A21]">
                <Icon size={22} />
              </div>

              <h3
                className="mt-6 text-xl font-bold text-[#171717]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#77736D]">
                {service.description}
              </p>

              <ul className="mt-6 space-y-3">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-xs font-medium text-neutral-700"
                  >
                    <ArrowRight
                      size={14}
                      className="mt-0.5 shrink-0 text-[#F26A21]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#F26A21] hover:underline"
              >
                Discuss this service <ArrowRight size={14} />
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-14 max-w-2xl text-center">
        <p className="text-sm leading-relaxed text-[#77736D]">
          Not sure which staffing model fits your needs? Tell us about the
          position and we&apos;ll discuss the available options.
        </p>
        <Link
          href="/contact"
          className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full bg-[#10162E] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#F26A21]"
        >
          Discuss Your Hiring Needs <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

/* ─── Advantages Section ────────────────────────────────────────────────────── */

function AdvantagesSection() {
  return (
    <section className="mx-auto my-6 max-w-[1440px] rounded-[32px] border border-[#E5E5E5] bg-white px-6 py-20 shadow-sm sm:px-10 lg:py-24">
      <SectionHeading
        eyebrow="The Nexora approach"
        title="A Hiring Partner Built Around Your Needs"
        description="A structured recruitment process helps employers evaluate talent and manage hiring with precision and compliance."
      />

      <div className="mx-auto grid max-w-[1320px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="flex min-h-[250px] flex-col rounded-3xl border border-[#E5E5E5] bg-[#F5F1E8]/50 p-6 transition duration-300 hover:border-[#F26A21]/30 hover:bg-white hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F26A21]/10 text-[#F26A21]">
                <Icon size={20} />
              </div>

              <h3
                className="mt-5 text-lg font-bold text-[#171717]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#77736D]">
                {item.description}
              </p>

              <div className="mt-auto border-t border-black/5 pt-4">
                <p className="text-sm font-extrabold text-[#171717]">{item.metric}</p>
                <p className="mt-0.5 text-[10px] font-bold tracking-[0.12em] text-[#F26A21]">
                  {item.caption}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Process Section ────────────────────────────────────────────────────────── */

function ProcessSection() {
  return (
    <section id="process" className="px-6 py-20 sm:px-10 lg:py-24">
      <SectionHeading
        eyebrow="How it works"
        title="A Simple, Transparent 5-Step Process"
        description="Hiring should feel organized, collaborative, and aligned with your operational roadmap."
      />

      <div className="mx-auto grid max-w-[1360px] gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step) => {
          const Icon = step.icon;

          return (
            <article
              key={step.step}
              className="flex min-h-[340px] flex-col rounded-3xl border border-[#E5E5E5] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F26A21]/40 hover:shadow-lg"
              style={{ backgroundColor: step.color }}
            >
              <span className="w-fit rounded-full bg-[#10162E] px-3 py-1.5 text-[11px] font-bold text-white">
                {step.step}
              </span>

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
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Industries Section ────────────────────────────────────────────────────── */

function IndustriesSection() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:py-24">
      <SectionHeading
        eyebrow="Industry coverage"
        title="From Code to Cloud, We Deliver Talent"
        description="Domain-specific recruitment models tailored to specialized technical requirements."
      />

      <div className="mx-auto grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => {
          const Icon = industry.icon;

          return (
            <Link
              href="/contact"
              key={industry.title}
              className="group rounded-3xl border border-[#E5E5E5] bg-white p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[#F26A21]/40 hover:shadow-xl"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F26A21]/10 text-[#F26A21] transition group-hover:bg-[#F26A21] group-hover:text-white">
                <Icon size={22} />
              </div>

              <h3
                className="mt-5 text-lg font-bold text-[#171717]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {industry.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#77736D]">
                {industry.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#F26A21]">
                Discuss hiring needs <ArrowRight size={13} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ─── FAQ Section ───────────────────────────────────────────────────────────── */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto my-6 max-w-[1440px] rounded-[32px] border border-[#E5E5E5] bg-white px-6 py-20 shadow-sm sm:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="eyebrow mb-4 text-[#F26A21]">
            FAQs
          </p>

          <h2
            className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Frequently Asked Questions
          </h2>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#77736D]">
            Answers to common questions about our corporate recruitment models,
            compliance protocols, and talent guarantees.
          </p>

          <Link
            href="/contact"
            className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full bg-[#10162E] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#F26A21]"
          >
            Ask a Question <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#F5F1E8]/40"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-sm sm:text-base text-[#171717]"
                >
                  <span>{faq.question}</span>

                  <span className="shrink-0 text-xl font-light text-[#F26A21]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-[#77736D]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────────────── */

export default function RecruitmentStaffingContent() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#171717]">
      <Hero />
      <PartnersSection />
      <StatsSection />
      <HiringServicesSection />
      <RecruitmentServicesSection />
      <AdvantagesSection />
      <ProcessSection />
      <IndustriesSection />
      <FAQSection />
    </div>
  );
}
