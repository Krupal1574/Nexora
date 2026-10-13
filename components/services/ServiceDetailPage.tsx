"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Globe2,
  Users,
  BadgeCheck,
  Calculator,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  HelpCircle,
  Phone,
  ShoppingBag,
} from "lucide-react";
import PageHero from "@/components/motion/PageHero";
import CtaSection from "@/components/motion/CtaSection";
import type { ServiceDetail } from "@/lib/services-data";

const iconMap = {
  ShieldCheck,
  Globe2,
  Users,
  BadgeCheck,
  Calculator,
  GraduationCap,
};

export default function ServiceDetailPage({
  service,
}: {
  service: ServiceDetail;
}) {
  const Icon = iconMap[service.iconName] || ShieldCheck;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="overflow-x-clip bg-[#F5F1E8]">
      {/* ══════════ HERO ══════════ */}
      <PageHero
        align="center"
        eyebrow={service.heroEyebrow}
        lines={[
          service.heroTitle[0],
          <span key="hero-accent" className="accent block sm:inline sm:ml-2">
            {service.heroTitle[1]}
          </span>,
        ]}
        sub={service.heroSub}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Link
            href="/contact"
            className="btn-primary text-sm font-bold px-7 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-[#F26A21]/20"
          >
            <Phone className="w-4 h-4" />
            Get Started with {service.title}
          </Link>
          <Link
            href="/shop"
            className="btn-ghost text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 border border-[#E5E5E5] bg-white hover:bg-black/5"
          >
            <ShoppingBag className="w-4 h-4 text-[#F26A21]" />
            View Related Packages in Shop →
          </Link>
        </div>
      </PageHero>

      {/* ══════════ STATS STRIP ══════════ */}
      <section className="relative z-10 -mt-6 sm:-mt-8 mb-12 sm:mb-16">
        <div className="container-wide">
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] p-6 sm:p-8 shadow-[0_12px_40px_rgba(23,23,23,0.06)] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {service.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F26A21]"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#77736D] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ OVERVIEW & VALUE PROPOSITION ══════════ */}
      <section className="section-spacing pt-0">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow">ABOUT THIS SERVICE</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight leading-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Comprehensive &amp; Compliant Solutions Designed for Results
              </h2>
              <p className="text-[#77736D] text-base leading-relaxed">
                {service.overview}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#F26A21] hover:text-[#E05A10] transition-colors"
                >
                  Speak with a {service.title} Specialist <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-gradient-to-br from-[#FFFFFF] to-[#F5F1E8] border border-[#E5E5E5] p-8 sm:p-10 shadow-[0_16px_50px_rgba(23,23,23,0.06)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F26A21]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="w-14 h-14 rounded-2xl bg-[#F26A21]/15 border border-[#F26A21]/30 flex items-center justify-center text-[#F26A21] mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#171717] mb-3"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Why Partner with Nexora?
                </h3>
                <p className="text-[#77736D] text-sm leading-relaxed mb-6">
                  Nexora blends high-touch dedicated consulting with deep US technology industry knowledge, certified E-Verify employment standards, and a nationwide network of top employers and candidates.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#171717] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <span>Nationwide coverage across all 50 US states</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#171717] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <span>Strict compliance and transparent communication</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#171717] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <span>Dedicated account mentors and real-time status tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ KEY FEATURES / CAPABILITIES ══════════ */}
      <section className="section-spacing bg-white border-y border-[#E5E5E5]">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="eyebrow">WHAT WE DELIVER</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#171717] mt-3"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Core Capabilities &amp; Features
            </h2>
            <p className="text-[#77736D] text-sm sm:text-base mt-3">
              Explore the detailed features and high-impact services included with {service.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="group rounded-3xl bg-[#F5F1E8]/60 border border-[#E5E5E5] p-7 sm:p-8 hover:bg-[#FFFFFF] hover:border-[#F26A21]/40 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(23,23,23,0.06)]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F26A21]/15 border border-[#F26A21]/30 flex items-center justify-center text-[#F26A21] shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-[#171717] group-hover:text-[#F26A21] transition-colors mb-2"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#77736D] text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STEP-BY-STEP PROCESS ══════════ */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="eyebrow">HOW IT WORKS</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#171717] mt-3"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Our Proven 4-Step Process
            </h2>
            <p className="text-[#77736D] text-sm sm:text-base mt-3">
              A structured and transparent engagement pipeline built for velocity and predictability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] p-7 flex flex-col justify-between hover:border-[#F26A21]/40 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(23,23,23,0.06)] relative group"
              >
                <div>
                  <div
                    className="text-3xl font-extrabold text-[#F26A21]/30 group-hover:text-[#F26A21] transition-colors mb-4"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="text-base font-bold text-[#171717] mb-2 leading-snug"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#77736D] text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHO IS THIS FOR ══════════ */}
      <section className="section-spacing bg-white border-t border-[#E5E5E5]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-[#F5F1E8] to-[#FFFFFF] border border-[#E5E5E5] p-8 sm:p-12 shadow-[0_16px_50px_rgba(23,23,23,0.05)]">
            <div className="text-center mb-8">
              <span className="eyebrow">AUDIENCE ALIGNMENT</span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#171717] mt-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Who Benefits Most from {service.title}?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.whoIsThisFor.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5E5E5]/80 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#F26A21] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#171717] font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ SECTION ══════════ */}
      <section className="section-spacing">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-12">
            <span className="eyebrow">QUESTIONS &amp; ANSWERS</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#171717] mt-3"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[#77736D] text-sm mt-2">
              Everything you need to know about {service.title}.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between p-6 text-left gap-4 hover:bg-black/[0.01]"
                  >
                    <span
                      className="text-sm sm:text-base font-bold text-[#171717]"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#F26A21] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#77736D] leading-relaxed border-t border-[#E5E5E5]/60">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <CtaSection
        lines={[
          "Ready to Advance with ",
          <span key="cta-accent" className="accent">
            {service.title}?
          </span>,
        ]}
        text={`Contact our specialist team today for a free confidential consultation or explore our packaged options in the shop.`}
        primary={{ href: "/contact", label: "Schedule a Consultation" }}
        secondary={{ href: "/shop", label: "Browse Packages & Pricing" }}
      />
    </div>
  );
}
