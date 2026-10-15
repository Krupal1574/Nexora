"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Employment Verification",
    icon: "⌕",
    description: "Verify employment history and professional experience to help your organization make informed hiring decisions.",
    points: ["Employment history checks", "Previous employer verification", "Employment dates and role confirmation"],
  },
  {
    title: "Education Verification",
    icon: "◎",
    description: "Review academic credentials and qualifications relevant to a candidate's position.",
    points: ["Degree and qualification checks", "Institution verification", "Credential review"],
  },
  {
    title: "Criminal Background Check",
    icon: "◈",
    description: "Explore appropriate criminal-record screening options based on the role, jurisdiction, and applicable legal requirements.",
    points: ["Jurisdiction-specific screening", "Role-appropriate checks", "Review of available screening results"],
  },
  {
    title: "Reference Verification",
    icon: "▤",
    description: "Gather relevant professional references to better understand a candidate's experience and suitability.",
    points: ["Professional reference checks", "Experience confirmation", "Structured reference feedback"],
  },
];

const highlights = [
  {
    tag: "EMPLOYMENT SCREENING",
    title: "Employment History Verification",
    description: "Confirm relevant employment details and experience as part of a consistent candidate screening process.",
    bg: "bg-[#8FB8D8]/20",
    image: "/images/services/employment-screening.png",
    badge: "Verified History",
  },
  {
    tag: "EDUCATION SCREENING",
    title: "Education & Credential Verification",
    description: "Review qualifications and credentials relevant to the role, following appropriate verification procedures.",
    bg: "bg-[#F26A21]/15",
    image: "/images/services/education-screening.png",
    badge: "Accredited Degrees",
  },
  {
    tag: "CANDIDATE SCREENING",
    title: "Reference & Professional Checks",
    description: "Support hiring decisions with structured professional reference checks and documented findings.",
    bg: "bg-[#F5F1E8]",
    image: "/images/services/candidate-screening.png",
    badge: "Peer References",
  },
];

const faqs = [
  { question: "What is an employee background check?", answer: "An employee background check is a screening process used to verify relevant information about a candidate, such as employment history, education, or professional references. The appropriate checks depend on the role and applicable laws." },
  { question: "What types of background verification are available?", answer: "Depending on the engagement, screening may include employment verification, education verification, professional references, and appropriate criminal-record checks." },
  { question: "How long does background verification take?", answer: "Turnaround times vary depending on the checks requested, the jurisdiction, the availability of records, and responses from employers or educational institutions. We can discuss expected timelines for your requirements." },
  { question: "Is candidate consent required?", answer: "Background screening must follow applicable privacy, employment, and consumer-reporting laws. Depending on the check and jurisdiction, notice, authorization, or consent may be required before screening begins." },
  { question: "Can businesses request verification for multiple candidates?", answer: "Yes. Contact Nexora to discuss the number of candidates, screening requirements, locations, and workflow needed for your hiring process." },
  { question: "How do we get started?", answer: "Contact our team with your screening requirements. We can discuss the scope, applicable checks, expected process, and next steps." },
];

const otherServices = [
  { title: "Talent Acquisition", description: "Recruitment support aligned with your hiring requirements.", href: "/services/talent-acquisition", bg: "bg-[#8FB8D8]/30" },
  { title: "Job Placement", description: "Connect professionals with relevant opportunities.", href: "/services/job-placement", bg: "bg-[#F5F1E8]" },
  { title: "IT Training", description: "Support professional development and technical skills.", href: "/services/it-training", bg: "bg-[#F26A21]/15" },
  { title: "Accounting & Taxes", description: "Explore business accounting and tax support.", href: "/services/accounting-and-taxes", bg: "bg-[#8FB8D8]/20" },
];

const marqueeItems = ["PEOPLE", "TRUST", "INTEGRITY", "VERIFICATION", "PROFESSIONALISM", "PEOPLE", "TRUST", "INTEGRITY", "VERIFICATION", "PROFESSIONALISM"];

export default function BackgroundVerificationPage() {
  const [openService, setOpenService] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden bg-white text-[#171717]">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden mx-3 mt-3 rounded-[30px] min-h-[600px] grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] items-center gap-9 px-7 sm:px-14 lg:px-20 py-20 bg-[#171717]">
        {/* Nexora glows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[#8FB8D8]/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[#F26A21]/15 blur-3xl" />

        {/* copy */}
        <div className="relative z-10 text-white max-w-[620px]">
          <span className="inline-flex items-center gap-2.5 mb-6 px-4 py-2.5 rounded-full border border-white/20 bg-white/10 text-[10px] font-bold tracking-[0.12em] text-[#F5F1E8]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#F26A21] shadow-[0_0_10px_#F26A21]" />
            BACKGROUND VERIFICATION
          </span>

          <h1 className="font-bold text-[#F5F1E8] leading-[1.05]" style={{ fontSize: "clamp(42px,5vw,72px)", letterSpacing: "-0.065em", fontFamily: "Space Grotesk, sans-serif" }}>
            Better Hiring<br />Starts With<br /><span className="text-[#F26A21]">Confidence.</span>
          </h1>

          <p className="mt-6 max-w-[550px] text-white/75 text-sm leading-[1.8]">
            Make informed hiring decisions with structured background verification and candidate screening support. Nexora helps organizations review relevant employment, education, and professional information.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/contact" className="inline-flex items-center gap-5 px-6 py-3 rounded-full bg-[#F26A21] text-white text-sm font-semibold hover:bg-[#df5814] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F26A21]/20">
              Start a Consultation <span>↗</span>
            </Link>
            <a href="#bv-solutions" className="inline-flex items-center gap-5 px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all">
              Explore Our Services
            </a>
          </div>

          <div className="flex items-center gap-2.5 mt-9 text-white/55 text-[9px] tracking-[0.16em]">
            <span className="w-7 h-px bg-[#F26A21]" />
            PEOPLE · TRUST · GROWTH
          </div>
        </div>

        {/* hero visual */}
        <div className="relative hidden lg:flex items-center justify-center min-h-[460px]" aria-hidden="true">
          <div className="relative w-full h-[460px] flex items-center justify-center">
            <Image
              src="/images/services/background-verification-hero.png"
              alt="Background Verification - Nexora"
              fill
              priority
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              sizes="(max-width: 1200px) 50vw, 550px"
            />
          </div>
          {/* badges */}
          <div className="absolute top-[18%] right-[2%] flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#171717]/90 border border-white/20 text-white text-xs shadow-lg backdrop-blur-md">
            <span className="w-4 h-4 rounded-full bg-[#F26A21] text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">✓</span>
            Employment Verified
          </div>
          <div className="absolute bottom-[10%] left-[2%] flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#171717]/90 border border-white/20 text-white text-xs shadow-lg backdrop-blur-md">
            <span className="w-4 h-4 rounded-full bg-[#8FB8D8] text-[#171717] text-[11px] font-black flex items-center justify-center flex-shrink-0">✓</span>
            Credential &amp; Reference Review
          </div>
        </div>

        {/* footer strip */}
        <div className="absolute right-6 bottom-5 left-6 flex items-center gap-4 text-white/55 text-[8px] tracking-[0.17em]">
          <span>THOUGHTFUL SCREENING</span>
          <span className="w-10 h-px bg-[#F26A21]/60" />
          <span>INFORMED DECISIONS</span>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <p className="text-[10px] font-bold tracking-[0.15em] text-[#F26A21] mb-3">A TRUST-LED APPROACH</p>
        <h2 className="text-2xl font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Our Approach</h2>
        <div className="relative mt-9 overflow-hidden"
          style={{ maskImage: "linear-gradient(to right,transparent,black 8%,black 92%,transparent)", WebkitMaskImage: "linear-gradient(to right,transparent,black 8%,black 92%,transparent)" }}>
          <div className="animate-marquee flex gap-16 w-max">
            {[...marqueeItems, ...marqueeItems].map((name, i) => (
              <span key={`${name}-${i}`} className="flex items-center gap-2.5 text-[#77736D] text-sm font-bold tracking-[0.06em] hover:text-[#171717] transition-colors whitespace-nowrap">
                <span className="text-[#F26A21] text-xl">✳</span>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW CARDS ───────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-7xl mx-auto">
          {[
            { icon: "⌕", label: "OUR FOCUS", heading: "Relevant Checks", desc: "Screening aligned with the position and your requirements.", iconBg: "bg-[#8FB8D8]/30", iconColor: "text-[#171717]" },
            { icon: "◎", label: "OUR APPROACH", heading: "Structured Process", desc: "Clear screening steps and coordinated verification workflows.", iconBg: "bg-[#F26A21]/20", iconColor: "text-[#F26A21]" },
            { icon: "✓", label: "OUR PRIORITY", heading: "Informed Decisions", desc: "Relevant information to support your recruitment decisions.", iconBg: "bg-[#8FB8D8]/20", iconColor: "text-[#171717]" },
          ].map((c) => (
            <article key={c.heading} className="bg-[#F5F1E8]/70 border border-[#171717]/5 rounded-2xl p-6 min-h-[240px] transition-all hover:shadow-md">
              <span className={`w-9 h-9 rounded-xl ${c.iconBg} ${c.iconColor} text-xl flex items-center justify-center`}>{c.icon}</span>
              <p className="mt-6 text-[8px] font-bold tracking-[0.14em] text-[#F26A21]">{c.label}</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{c.heading}</h3>
              <p className="mt-2.5 text-[#77736D] text-xs leading-[1.7]">{c.desc}</p>
            </article>
          ))}

          <article className="bg-[#171717] text-white rounded-2xl p-6 min-h-[240px] flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#F26A21]/20 blur-xl" />
            <div className="relative z-10">
              <p className="text-[9px] font-bold tracking-[0.14em] text-[#F26A21]">NEED VERIFICATION?</p>
              <h3 className="mt-3 text-[27px] font-bold leading-[1.12] tracking-tight text-[#F5F1E8]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Let&apos;s Discuss<br />Your Requirements.
              </h3>
              <p className="mt-3 text-white/70 text-xs leading-[1.6]">Tell us what your hiring process needs.</p>
            </div>
            <Link href="/contact" className="relative z-10 mt-auto pt-4 inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-[#F26A21] text-white text-xs font-semibold w-fit hover:bg-[#df5814] transition-all shadow-md">
              Get Started <span>↗</span>
            </Link>
          </article>
        </div>
      </section>

      {/* ── DARK ACCORDION ───────────────────────────────────────── */}
      <section className="bg-[#171717] text-white py-24 px-4" id="bv-solutions">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-20">
          <div className="lg:sticky lg:top-10 self-start">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#F26A21] mb-4">OUR CAPABILITIES</p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight text-[#F5F1E8]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.065em" }}>
              Background<br />Verification<br />Solutions.
            </h2>
            <p className="mt-5 max-w-[430px] text-white/70 text-sm leading-[1.8]">Explore screening options that can help you assess relevant candidate information throughout the hiring process.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-5 px-6 py-3 rounded-full bg-[#F26A21] text-white text-sm font-semibold hover:bg-[#df5814] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F26A21]/20">
              Talk to Our Team <span>↗</span>
            </Link>
            <p className="mt-12 text-white/40 text-[9px] tracking-[0.15em]">SCREENING WITH PURPOSE</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {services.map((svc, idx) => {
              const isOpen = openService === idx;
              return (
                <article key={svc.title} className={`overflow-hidden rounded-2xl border border-white/5 transition-all ${isOpen ? "bg-[#252525]" : "bg-[#1f1f1f] hover:bg-[#222222]"}`}>
                  <button
                    className="flex items-center gap-3.5 w-full px-5 py-4 text-left text-white text-sm font-semibold cursor-pointer"
                    onClick={() => setOpenService(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 text-[#F26A21] text-xl flex items-center justify-center">{svc.icon}</span>
                    <span className="flex-1 text-[#F5F1E8]">{svc.title}</span>
                    <span className="text-xl text-[#F26A21]">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pl-16 text-white/70 text-xs leading-[1.8]">
                      <p className="mb-3">{svc.description}</p>
                      <ul className="grid gap-1.5 pl-4 list-disc">
                        {svc.points.map((pt) => <li key={pt}>{pt}</li>)}
                      </ul>
                      <Link href="/contact" className="mt-3 inline-flex items-center gap-3 text-[#F26A21] text-xs font-bold hover:underline">
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

      {/* ── HIGHLIGHTS ───────────────────────────────────────────── */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">A CLOSER LOOK</p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.12] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>
            The Details Matter.<br />So Do the People.
          </h2>
          <p className="mt-5 text-[#77736D] text-sm leading-[1.8] max-w-xl mx-auto">A considered approach to screening helps businesses review relevant information while respecting candidate privacy and applicable requirements.</p>
        </div>

        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {highlights.map((item, idx) => (
            <article key={item.title} className={`grid grid-cols-1 md:grid-cols-2 items-stretch gap-4 border border-[#171717]/5 rounded-2xl overflow-hidden p-2 bg-[#F5F1E8]/30 ${idx % 2 !== 0 ? "direction-rtl" : ""}`}>
              {/* visual with real Nexora asset */}
              <div className={`${item.bg} rounded-2xl min-h-[310px] flex items-center justify-center relative overflow-hidden p-6 ${idx % 2 !== 0 ? "md:order-2" : ""}`}>
                <div className="relative w-full max-w-[380px] h-[260px] rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-white/60 p-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-1 transition-transform duration-500 hover:scale-105"
                    sizes="400px"
                  />
                  
                  {/* Floating verification badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171717]/90 border border-white/20 text-white text-[11px] font-semibold backdrop-blur-md shadow-md">
                    <span className="w-4 h-4 rounded-full bg-[#F26A21] text-white text-[10px] font-black flex items-center justify-center">✓</span>
                    {item.badge}
                  </div>
                </div>
                <span className="absolute right-5 top-4 text-[#171717]/60 text-[9px] font-bold tracking-[0.12em] bg-white/70 px-2.5 py-1 rounded-full">0{idx + 1} / 03</span>
              </div>

              {/* content */}
              <div className={`flex flex-col justify-center bg-white rounded-2xl p-9 sm:p-10 ${idx % 2 !== 0 ? "md:order-1" : ""}`}>
                <span className="px-2.5 py-1.5 rounded-full bg-[#F5F1E8] text-[#F26A21] text-[8px] font-bold tracking-[0.08em] w-fit">{item.tag}</span>
                <h3 className="mt-6 mb-3 text-2xl sm:text-3xl font-bold leading-[1.15] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.title}</h3>
                <p className="text-[#77736D] text-xs leading-[1.8] max-w-[450px]">{item.description}</p>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-3 text-[#F26A21] text-xs font-bold hover:underline">
                  Learn More <span>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#F5F1E8]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">HOW IT WORKS</p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.12] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>
            A Clear Process.<br />From Start to Finish.
          </h2>
          <p className="mt-5 text-[#77736D] text-sm leading-[1.8] max-w-xl mx-auto">Every engagement starts with understanding your requirements and agreeing on the appropriate screening process.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto">
          {[
            { number: "01", title: "Share Requirements", description: "Tell us about your roles, candidate volume, and screening needs.", bg: "bg-[#8FB8D8]/30" },
            { number: "02", title: "Define the Scope", description: "Determine appropriate checks, permissions, and process requirements.", bg: "bg-white border border-[#171717]/10" },
            { number: "03", title: "Verification", description: "Coordinate the agreed checks and verification workflow.", bg: "bg-[#F26A21]/15" },
            { number: "04", title: "Review Results", description: "Review the available findings and discuss any necessary follow-up.", bg: "bg-[#8FB8D8]/20" },
          ].map((step) => (
            <article key={step.number} className={`${step.bg} rounded-2xl p-6 min-h-[235px] flex flex-col shadow-sm transition hover:-translate-y-1`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1.5 rounded-full bg-[#171717] text-white text-[9px] font-bold">{step.number}</span>
                <span className="text-xl text-[#F26A21]">↗</span>
              </div>
              <h3 className="mt-8 text-xl font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{step.title}</h3>
              <p className="mt-2.5 text-[#77736D] text-xs leading-[1.75]">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8">
          <p className="text-[#77736D] text-xs">Need help defining your screening requirements?</p>
          <Link href="/contact" className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#171717] text-white text-xs font-semibold hover:bg-[#F26A21] transition-all hover:-translate-y-0.5 shadow-md">
            Contact Nexora <span>↗</span>
          </Link>
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
            <Link href="/services" className="text-xs font-bold text-[#F26A21] flex items-center gap-2 mb-2 hover:underline">View All Services <span>↗</span></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {otherServices.map((svc) => (
              <Link key={svc.title} href={svc.href} className={`${svc.bg} border border-[#171717]/5 flex flex-col min-h-[225px] p-6 rounded-2xl hover:-translate-y-1 transition-all shadow-sm`}>
                <span className="w-9 h-9 rounded-xl bg-white/70 text-[#F26A21] flex items-center justify-center text-lg shadow-xs">↗</span>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{svc.title}</h3>
                <p className="mt-2 text-[#77736D] text-xs leading-[1.7]">{svc.description}</p>
                <span className="mt-auto pt-5 flex items-center justify-between text-[10px] font-bold text-[#171717]">
                  Explore Service <span>↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-20">
          <div>
            <p className="text-[10px] font-bold tracking-[0.17em] text-[#F26A21] mb-4">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight text-[#171717]" style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.06em" }}>
              Good Questions.<br />Clear Answers.
            </h2>
            <p className="mt-5 text-[#77736D] text-xs leading-[1.8] max-w-[370px]">Find answers to common questions about background verification and screening.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-3 text-[#F26A21] text-xs font-bold hover:underline">
              Still have questions? Contact us <span>↗</span>
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <article key={faq.question} className="overflow-hidden rounded-xl bg-white border border-[#171717]/5 shadow-xs">
                  <button
                    className="flex items-center justify-between gap-5 w-full px-5 py-4 text-left text-xs font-semibold text-[#171717] cursor-pointer"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-colors ${isOpen ? "bg-[#F26A21] text-white" : "bg-[#171717] text-white"}`}>{isOpen ? "−" : "+"}</span>
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
