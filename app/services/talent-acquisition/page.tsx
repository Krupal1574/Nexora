"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


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
  "nmg",
];

const services = [
  {
    title: "Recruitment Process Outsourcing (RPO)",
    icon: "⌕",
    description:
      "Build a dependable hiring function with end-to-end recruitment support. We help manage sourcing, screening, candidate communication, and hiring coordination around your business goals.",
    points: [
      "End-to-end recruitment support",
      "Flexible hiring capacity",
      "Candidate pipeline management",
      "Recruitment reporting and coordination",
    ],
  },
  {
    title: "Contingency Recruitment",
    icon: "♧",
    description:
      "Find qualified candidates for specific vacancies through targeted sourcing and structured screening tailored to each role.",
    points: [
      "Role-specific talent sourcing",
      "Candidate screening and shortlisting",
      "Interview coordination",
      "Hiring manager support",
    ],
  },
  {
    title: "Retained / Executive Search",
    icon: "◎",
    description:
      "A focused search process for leadership and specialist positions where experience, discretion, and a strong role fit matter.",
    points: [
      "Leadership talent mapping",
      "Targeted candidate outreach",
      "Structured candidate evaluation",
      "Confidential search coordination",
    ],
  },
  {
    title: "Embedded / On-Demand Talent Acquisition",
    icon: "▱",
    description:
      "Extend your internal recruiting capacity with flexible talent acquisition support that works alongside your team.",
    points: [
      "Dedicated recruiting support",
      "Flexible engagement models",
      "ATS and workflow coordination",
      "Scalable hiring assistance",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Attract",
    bg: "bg-[#8FB8D8]/30",
    description:
      "Build a focused candidate pipeline through role definition, sourcing strategy, and targeted outreach.",
    details: ["Role discovery", "Talent mapping", "Candidate outreach"],
    symbol: "↗",
  },
  {
    number: "02",
    title: "Assess",
    bg: "bg-[#F5F1E8]",
    description:
      "Evaluate candidates against your requirements, experience expectations, and role-specific criteria.",
    details: ["Resume screening", "Initial assessments", "Candidate shortlists"],
    symbol: "◎",
  },
  {
    number: "03",
    title: "Engage",
    bg: "bg-[#F26A21]/20",
    description:
      "Keep the process moving through clear communication and coordinated interviews.",
    details: ["Interview scheduling", "Candidate communication", "Feedback coordination"],
    symbol: "⌘",
  },
  {
    number: "04",
    title: "Onboard",
    bg: "bg-white border border-[#171717]/10",
    description:
      "Support the transition from selected candidate to a confident start with your organization.",
    details: ["Offer coordination", "Joining follow-up", "Onboarding support"],
    symbol: "↗",
  },
  {
    number: "05",
    title: "Analyze",
    bg: "bg-[#8FB8D8]/20",
    description:
      "Review hiring progress and identify opportunities to improve your recruitment process.",
    details: ["Pipeline visibility", "Process review", "Hiring insights"],
    symbol: "◔",
  },
];

const specialistSteps = [
  { title: "Share Your Requirements", description: "Tell us about the role, required skills, team structure, and hiring priorities.", bg: "bg-white", icon: "▤" },
  { title: "Talent Sourcing", description: "We identify potential candidates through targeted sourcing and relevant talent networks.", bg: "bg-[#F5F1E8]", icon: "⌕" },
  { title: "Multi-Timezone Coverage", description: "Coordinate recruiting activity across locations and working hours as needed.", bg: "bg-[#F26A21]/15", icon: "◷" },
  { title: "Data Security", description: "Handle candidate information carefully and follow the agreed recruitment workflow.", bg: "bg-[#8FB8D8]/25", icon: "⬡" },
  { title: "Tech-Enabled Process", description: "Use structured workflows to coordinate candidate pipelines and hiring activities.", bg: "bg-white", icon: "▣" },
  { title: "Dedicated Support", description: "Stay connected with a recruitment contact throughout the hiring process.", bg: "bg-[#F5F1E8]", icon: "◎" },
];

const regions = [
  { flag: "🇺🇸", title: "North America", subtitle: "United States, Canada", timezone: "EST · CST · MST · PST", strength: "Technical, corporate, and specialist hiring" },
  { flag: "🇪🇺", title: "Europe", subtitle: "UK and European markets", timezone: "GMT · CET", strength: "Professional and specialist recruitment" },
  { flag: "🇮🇳", title: "Asia Pacific", subtitle: "India and APAC markets", timezone: "IST · SGT · AEST", strength: "Technology talent and recruitment support" },
  { flag: "🌎", title: "Latin America", subtitle: "Selected regional markets", timezone: "Regional time zones", strength: "Remote and distributed team recruitment" },
  { flag: "🌍", title: "Middle East", subtitle: "UAE and regional markets", timezone: "GST", strength: "Business and technical talent sourcing" },
  { flag: "🌍", title: "Africa", subtitle: "Selected regional markets", timezone: "Regional time zones", strength: "Talent sourcing and hiring coordination" },
];

const faqs = [
  { question: "What is talent acquisition?", answer: "Talent acquisition is the ongoing process of identifying, attracting, assessing, and hiring people whose skills align with an organization's current and future needs." },
  { question: "How is talent acquisition different from recruitment?", answer: "Recruitment often focuses on filling specific vacancies. Talent acquisition can take a broader approach that includes workforce planning, talent pipelines, and longer-term hiring needs." },
  { question: "Can you support multiple open positions?", answer: "Yes. Share your roles, hiring priorities, locations, and expected timelines so the engagement can be scoped to your needs." },
  { question: "Do you support remote and international hiring?", answer: "We can discuss sourcing and recruiting support across locations. Availability and any local employment requirements should be confirmed for each engagement." },
  { question: "How quickly can the hiring process begin?", answer: "Once the requirements and engagement scope are agreed, sourcing and screening can begin. Timelines depend on the role, candidate availability, and interview process." },
  { question: "How do we get started?", answer: "Contact our team with your hiring requirements. We can discuss the positions, skills, locations, and recruitment support your organization needs." },
];

const otherServices = [
  { title: "Job Placement", description: "Connect professionals with relevant career opportunities.", href: "/services/job-placement", bg: "bg-[#F5F1E8]" },
  { title: "Background Verification", description: "Support informed hiring through appropriate verification.", href: "/services/background-verification", bg: "bg-[#8FB8D8]/30" },
  { title: "IT Training", description: "Help candidates build practical, role-relevant skills.", href: "/services/it-training", bg: "bg-[#F26A21]/15" },
  { title: "Accounting & Taxes", description: "Explore accounting and tax support for your business.", href: "/services/accounting-and-taxes", bg: "bg-[#8FB8D8]/20" },
];

export default function TalentAcquisitionPage() {
  const [openService, setOpenService] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  return (
    <div className="overflow-hidden bg-white text-[#171717]">
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden mx-3 mt-3 rounded-[32px] min-h-[640px] flex flex-col bg-[#171717]">
        {/* Nexora glows */}
        <div className="pointer-events-none absolute -left-36 top-0 w-[450px] h-[450px] rounded-full bg-[#8FB8D8]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-[-100px] w-[450px] h-[450px] rounded-full bg-[#F26A21]/15 blur-[120px]" />

        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-7 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
          {/* copy */}
          <div className="text-white max-w-2xl">
            <span className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-[11px] font-bold tracking-[0.13em] text-[#F5F1E8]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#F26A21] shadow-[0_0_10px_#F26A21]" />
              TALENT ACQUISITION
            </span>

            <h1 className="font-bold text-[#F5F1E8] tracking-tight leading-[1.06]" style={{ fontSize: "clamp(42px,5vw,76px)", letterSpacing: "-0.065em", fontFamily: "Space Grotesk, sans-serif" }}>
              Need Talent Fast?<br />Relax.<br />We&apos;re Already<br />
              <span className="text-[#F26A21]">On It.</span>
            </h1>

            <p className="mt-7 max-w-xl text-white/75 text-sm sm:text-base leading-[1.8]">
              From sourcing to screening, Nexora helps businesses identify and engage qualified talent. We bring structure to your hiring process so your team can focus on building the business.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-[#F26A21] text-white text-sm font-semibold hover:bg-[#df5814] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F26A21]/20">
                Hire Talent <span>↗</span>
              </Link>
              <a href="#ta-process" className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all hover:-translate-y-0.5">
                Explore Our Process
              </a>
            </div>

            <div className="flex items-center gap-3 mt-10 text-white/60 text-xs tracking-[0.04em]">
              <span className="w-8 h-px bg-[#F26A21]" />
              A more considered approach to hiring.
            </div>
          </div>

          {/* hero visual featuring authentic Nexora Talent Solutions asset */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[460px]" aria-hidden="true">
            <div className="relative w-full max-w-[500px] h-[460px] flex items-center justify-center">
              <Image
                src="/images/services/statistic-sources.png"
                alt="Strategic Sourcing & Talent Acquisition - Nexora"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                sizes="(max-width: 1200px) 50vw, 500px"
                priority
              />
            </div>

            {/* floating highlight badges */}
            <div className="absolute top-6 right-2 rounded-full border border-white/20 bg-[#171717]/90 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F26A21] animate-pulse" />
              Strategic Talent Sourcing
            </div>

            <div className="absolute bottom-6 left-2 rounded-full border border-white/20 bg-[#171717]/90 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-lg flex items-center gap-2">
              <span className="text-[#8FB8D8]">✓</span>
              Top 1% Candidate Network
            </div>
          </div>
        </div>

        {/* bottom strip */}
        <div className="relative z-10 mx-6 sm:mx-12 lg:mx-16 mb-5 flex items-center gap-4 text-white/55 text-[9px] tracking-[0.16em]">
          <span>PEOPLE FIRST</span>
          <span className="w-12 h-px bg-[#F26A21]/60" />
          <span>HIRING WITH PURPOSE</span>
        </div>
      </section>

      {/* ── PARTNER MARQUEE ─────────────────────────────────────── */}
      <section className="py-20 text-center">
        <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">BUILT ON STRONG RELATIONSHIPS</p>
        <h2 className="text-2xl font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Our Partners</h2>

        <div className="relative mt-10 overflow-hidden"
          style={{ maskImage: "linear-gradient(to right,transparent,#000 7%,#000 93%,transparent)", WebkitMaskImage: "linear-gradient(to right,transparent,#000 7%,#000 93%,transparent)" }}>
          <div className="animate-marquee flex gap-16 w-max">
            {[...partners, ...partners].map((p, i) => (
              <div key={`${p}-${i}`} className="min-w-[135px] flex items-center justify-center text-[#77736D] font-bold text-base tracking-tight hover:text-[#171717] transition-colors whitespace-nowrap">
                {p}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-7 text-[#77736D] text-xs">Every hiring relationship starts with understanding people.</p>
      </section>

      {/* ── METRICS ─────────────────────────────────────────────── */}
      <section className="px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {[
            { icon: "↗", value: "People", heading: "At the center", desc: "We focus on the people behind every role and every hiring decision.", iconBg: "bg-[#8FB8D8]/30", iconColor: "text-[#171717]" },
            { icon: "◎", value: "Purpose", heading: "Behind every search", desc: "We align candidate sourcing with your requirements and team priorities.", iconBg: "bg-[#F26A21]/20", iconColor: "text-[#F26A21]" },
            { icon: "◷", value: "Progress", heading: "At every stage", desc: "Clear communication helps keep your recruitment process moving.", iconBg: "bg-[#8FB8D8]/20", iconColor: "text-[#171717]" },
          ].map((m) => (
            <article key={m.value} className="bg-[#F5F1E8]/70 border border-[#171717]/5 rounded-3xl p-8 min-h-[300px] relative overflow-hidden transition-all hover:shadow-md">
              <div className={`w-11 h-11 rounded-2xl ${m.iconBg} flex items-center justify-center ${m.iconColor} text-2xl`}>{m.icon}</div>
              <p className="mt-8 text-4xl font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{m.value}</p>
              <h3 className="mt-2 text-base font-bold text-[#171717]">{m.heading}</h3>
              <p className="mt-3 text-[#77736D] text-sm leading-[1.7] max-w-[260px]">{m.desc}</p>
            </article>
          ))}

          <article className="bg-[#171717] rounded-3xl p-8 min-h-[300px] text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="pointer-events-none absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#F26A21]/20 blur-2xl" />
            <div className="relative z-10">
              <p className="text-[9px] font-bold tracking-[0.15em] text-[#F26A21]">YOUR NEXT GREAT HIRE</p>
              <h3 className="mt-7 text-[28px] font-bold leading-[1.13] tracking-tight text-[#F5F1E8]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Ready to<br />Build Your Team?</h3>
              <p className="mt-3 text-white/70 text-sm leading-[1.6] max-w-[230px]">Let&apos;s discuss the people your business needs.</p>
            </div>
            <Link href="/contact" className="relative z-10 mt-5 inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-[#F26A21] text-white text-xs font-semibold hover:bg-[#df5814] transition-all w-fit shadow-md">
              Start a Conversation <span>↗</span>
            </Link>
            <span className="absolute right-[-10px] bottom-[-72px] text-white/5 text-[260px] font-black leading-none pointer-events-none select-none">N</span>
          </article>
        </div>
      </section>

      {/* ── SERVICE ACCORDION ────────────────────────────────────── */}
      <section className="bg-[#171717] text-white py-24 px-4" id="ta-services">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* intro – sticky on desktop */}
          <div className="lg:sticky lg:top-10 self-start">
            <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">OUR CAPABILITIES</p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-[#F5F1E8]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.065em" }}>
              Talent Acquisition<br />Services Tailored<br />for You.
            </h2>
            <p className="mt-6 text-white/70 text-sm leading-[1.8] max-w-[500px]">
              From growing businesses to established teams, our recruitment support adapts to your hiring goals, role requirements, and working style.
            </p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-[#F26A21] text-white text-sm font-semibold hover:bg-[#df5814] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F26A21]/20">
              Request Talent <span>↗</span>
            </Link>
            <div className="flex items-center gap-4 mt-16 text-white/40 text-[9px] tracking-[0.13em]">
              <span className="text-[#F26A21] font-semibold">01 — 04</span><span>FLEXIBLE RECRUITMENT SUPPORT</span>
            </div>
          </div>

          {/* accordion */}
          <div className="flex flex-col gap-3.5">
            {services.map((svc, idx) => {
              const isOpen = openService === idx;
              return (
                <article key={svc.title} className={`overflow-hidden rounded-3xl border border-white/5 transition-all ${isOpen ? "bg-[#242424]" : "bg-[#1f1f1f] hover:bg-[#222222]"}`}>
                  <button
                    className="flex items-center gap-4 w-full px-5 py-5 text-left text-white cursor-pointer"
                    onClick={() => setOpenService(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 text-[#F26A21] text-2xl flex items-center justify-center">{svc.icon}</span>
                    <span className="flex-1 text-sm sm:text-base font-semibold tracking-tight text-[#F5F1E8]">{svc.title}</span>
                    <span className="text-2xl font-light text-[#F26A21]">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-7 pb-7 pl-[84px] text-white/70 text-sm leading-[1.8]">
                      <p className="mb-3">{svc.description}</p>
                      <ul className="grid gap-1.5 pl-4 list-disc">
                        {svc.points.map((pt) => <li key={pt}>{pt}</li>)}
                      </ul>
                      <Link href="/contact" className="mt-5 inline-flex items-center gap-3 text-[#F26A21] text-xs font-bold hover:underline">
                        Discuss this service <span>↗</span>
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="py-28 px-4 bg-white" id="ta-process">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">A CLEARER WAY FORWARD</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>
            Full-Cycle Talent Acquisition<br />from Start to Finish.
          </h2>
          <p className="mt-5 text-[#77736D] text-sm leading-[1.8] max-w-xl mx-auto">A structured process designed to keep candidates, hiring teams, and recruitment priorities moving in the same direction.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-7xl mx-auto">
          {processSteps.map((step) => (
            <article key={step.number} className={`${step.bg} flex flex-col min-h-[315px] p-6 rounded-2xl hover:-translate-y-1 transition-all shadow-sm`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1.5 rounded-full bg-[#171717] text-white text-[9px] font-bold">{step.number}</span>
                <span className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-lg">{step.symbol}</span>
              </div>
              <h3 className="mt-7 text-xl font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.05em" }}>{step.title}</h3>
              <p className="mt-2.5 text-[#77736D] text-xs leading-[1.7]">{step.description}</p>
              <ul className="mt-auto pt-5 grid gap-2">
                {step.details.map((d) => (
                  <li key={d} className="text-[10px] text-[#171717]/80 before:content-['→'] before:text-[#F26A21] before:mr-1.5">{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-9">
          <p className="text-[#77736D] text-xs">Better hiring starts with a clear process and the right conversations.</p>
          <Link href="/contact" className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#171717] text-white text-xs font-semibold hover:bg-[#F26A21] transition-all hover:-translate-y-0.5 shadow-md">
            Talk to a Specialist <span>↗</span>
          </Link>
        </div>
      </section>

      {/* ── SPECIALISTS ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#F5F1E8]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">THE PEOPLE BEHIND THE PROCESS</p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.12] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>
            Your Behind-the-Scenes<br />Talent Acquisition Specialists.
          </h2>
          <p className="mt-5 text-[#77736D] text-sm leading-[1.8] max-w-xl mx-auto">Practical recruitment support built around your requirements, candidate experience, and hiring priorities.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-7xl mx-auto">
          {specialistSteps.map((item, idx) => (
            <article key={item.title} className={`${item.bg} border border-[#171717]/5 flex flex-col min-h-[235px] p-5 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all shadow-sm relative`}>
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-white/70 text-[#F26A21] flex items-center justify-center text-xl">{item.icon}</span>
                <span className="text-[#171717]/40 text-[10px] font-bold">0{idx + 1}</span>
              </div>
              <h3 className="mt-6 text-base font-bold leading-[1.25] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.045em" }}>{item.title}</h3>
              <p className="mt-2 text-[#77736D] text-[11px] leading-[1.65]">{item.description}</p>
              <span className="mt-auto pt-3 self-end text-lg text-[#F26A21]">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* ── GLOBAL COVERAGE ──────────────────────────────────────── */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">CONNECTED ACROSS LOCATIONS</p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.12] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>
            Talent Acquisition<br />Without Borders.
          </h2>
          <p className="mt-5 text-[#77736D] text-sm leading-[1.8] max-w-xl mx-auto">Discuss your recruitment needs across markets and time zones. We&apos;ll help determine the right sourcing and coordination approach for your roles.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-5xl mx-auto">
          {regions.map((r) => (
            <article key={r.title} className="p-6 border border-[#171717]/8 rounded-2xl bg-[#F5F1E8]/40 hover:-translate-y-0.5 hover:border-[#F26A21]/40 transition-all shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-2xl flex-shrink-0 shadow-xs">{r.flag}</div>
                <div className="flex-1">
                  <h3 className="text-base font-bold tracking-tight text-[#171717]">{r.title}</h3>
                  <p className="text-[#77736D] text-xs mt-0.5">{r.subtitle}</p>
                </div>
                <span className="text-lg text-[#F26A21]">↗</span>
              </div>
              <div className="flex justify-between mt-7 text-[10px]">
                <span className="text-[#77736D] font-bold tracking-[0.1em]">TIME ZONES</span>
                <strong className="text-[10px] text-[#171717]">{r.timezone}</strong>
              </div>
              <div className="h-px my-4 bg-[#171717]/10" />
              <p className="text-[9px] font-bold tracking-[0.1em] text-[#77736D]">FOCUS AREAS</p>
              <p className="mt-2 text-xs leading-[1.6] text-[#171717] max-w-[280px]">{r.strength}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-3.5 max-w-5xl mx-auto mt-3.5">
          <div className="bg-[#171717] text-white rounded-2xl p-8 relative overflow-hidden shadow-xl">
            <div className="pointer-events-none absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#F26A21]/15 blur-2xl" />
            <div className="relative z-10">
              <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21]">A CONNECTED APPROACH</p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold leading-[1.15] tracking-tight max-w-[420px] text-[#F5F1E8]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Local understanding. Wider reach.</h3>
              <p className="mt-4 text-white/70 text-sm leading-[1.8] max-w-[480px]">Tell us where you&apos;re hiring and what your team needs. We&apos;ll discuss suitable recruitment coverage and next steps.</p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-[#F26A21] text-white text-xs font-semibold hover:bg-[#df5814] transition-all shadow-md">
                Discuss Your Hiring Needs <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="bg-[#F5F1E8] border border-[#171717]/5 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between overflow-hidden relative">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 border border-[#171717]/10 shadow-sm bg-white">
              <Image
                src="/images/services/enterprise-staffing-reach.png"
                alt="Enterprise Staffing Reach - Nexora"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="400px"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>What matters in global hiring?</h3>
              {["Clear role requirements", "Consistent candidate communication", "Thoughtful screening", "Coordinated hiring workflows"].map((b) => (
                <p key={b} className="flex items-center gap-3 mt-2.5 text-[#171717] text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#F26A21] text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {b}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#F5F1E8]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-9">
            <div>
              <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-3">WORKING TOGETHER</p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>
                Good People.<br />Better Outcomes.
              </h2>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {["←", "→"].map((arrow, i) => (
                <button key={arrow} onClick={() => setTestimonialIndex((idx) => (idx + (i === 0 ? 2 : 1)) % 3)}
                  className="w-10 h-10 rounded-full border border-[#171717]/15 bg-white flex items-center justify-center hover:bg-[#171717] hover:text-white transition-all text-sm cursor-pointer shadow-xs">
                  {arrow}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 sm:p-12 grid grid-cols-1 sm:grid-cols-[100px_1fr_auto] items-start gap-6 border border-[#171717]/5 shadow-sm">
            <span className="text-[#F26A21] text-8xl leading-[0.9]" style={{ fontFamily: "Georgia, serif" }}>&ldquo;</span>
            <div>
              <p className="text-xl sm:text-2xl leading-[1.5] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Client feedback can be featured here once an approved testimonial is available. Share the experience, challenge, and outcome in the client&apos;s own words.
              </p>
              <div className="flex items-center gap-3 mt-7">
                <span className="w-11 h-11 rounded-full bg-[#171717] text-[#F5F1E8] text-lg font-bold flex items-center justify-center">
                  {["N", "T", "P"][testimonialIndex]}
                </span>
                <div>
                  <strong className="block text-xs text-[#171717]">{["Client testimonial", "Recruitment partnership", "Hiring experience"][testimonialIndex]}</strong>
                  <span className="text-[#77736D] text-[10px] mt-1 block">Replace with approved client attribution</span>
                </div>
              </div>
            </div>
            <span className="self-end text-xs font-bold text-[#171717]">0{testimonialIndex + 1} <span className="text-[#77736D] mx-1">/</span> 03</span>
          </div>

          <p className="mt-3.5 text-[#77736D] text-[10px]">Replace this sample content with approved client feedback before publishing.</p>
        </div>
      </section>

      {/* ── OTHER SERVICES ───────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between gap-5 mb-9">
            <div>
              <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-3">EXPLORE NEXORA</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>Other Services</h2>
            </div>
            <Link href="/services" className="text-xs font-bold text-[#F26A21] flex items-center gap-2 mb-2 hover:underline">View all services <span>↗</span></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {otherServices.map((svc) => (
              <Link key={svc.title} href={svc.href} className={`${svc.bg} border border-[#171717]/5 flex flex-col min-h-[260px] p-6 rounded-2xl hover:-translate-y-1 transition-all shadow-sm`}>
                <span className="w-10 h-10 rounded-xl bg-white/70 text-[#F26A21] flex items-center justify-center text-xl shadow-xs">↗</span>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{svc.title}</h3>
                <p className="mt-2 text-[#77736D] text-xs leading-[1.65]">{svc.description}</p>
                <span className="mt-auto pt-5 flex items-center justify-between text-[10px] font-bold text-[#171717]">
                  Explore service <span>↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-20">
          <div className="lg:justify-self-end lg:max-w-[440px]">
            <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">GOOD QUESTIONS</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>
              Frequently<br />Asked Questions.
            </h2>
            <p className="mt-5 text-[#77736D] text-sm leading-[1.8]">Everything you need to know before discussing your recruitment requirements with our team.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-3 text-[#F26A21] text-xs font-bold hover:underline">Have another question? Contact us <span>↗</span></Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <article key={faq.question} className="overflow-hidden rounded-xl bg-white border border-[#171717]/6 shadow-xs">
                  <button
                    className="flex items-center justify-between gap-5 w-full px-5 py-5 text-left text-sm font-semibold text-[#171717] cursor-pointer"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-colors ${isOpen ? "bg-[#F26A21] text-white" : "bg-[#171717] text-white"}`}>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-[#77736D] text-xs leading-[1.8]">{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
