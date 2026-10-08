"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Handshake,
  SearchCheck,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";

const jobSeekerBenefits = [
  {
    icon: Target,
    title: "Personalized Job Matching",
    desc: "We connect you with roles that build long-term careers, not just quick jobs.",
  },
  {
    icon: Zap,
    title: "Faster Interview Scheduling",
    desc: "Our recruiters actively secure interviews so you're not stuck waiting.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Placement Support",
    desc: "From resume building to offer negotiation, we guide every step.",
  },
  {
    icon: Building2,
    title: "Access to Verified U.S. Employers",
    desc: "Work with trusted companies across multiple industries nationwide.",
  },
  {
    icon: GraduationCap,
    title: "Confidence Before Interviews",
    desc: "Mock interviews and preparation sessions help you walk in ready.",
  },
];

const differentiators = [
  {
    icon: CheckCircle2,
    title: "Quality Over Random Applications",
    desc: "We don't spam job portals. Every application is carefully matched to your profile.",
  },
  {
    icon: ShieldCheck,
    title: "Refund Assurance",
    desc: "If expectations aren't met under our service terms, our SLA includes refund protection.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Full-Time Roles Only",
    desc: "We focus on stable full-time roles with real companies, not short-term contracts.",
  },
  {
    icon: GraduationCap,
    title: "Interview-Ready Candidates",
    desc: "We prepare professionals with mock interviews and practical training.",
  },
  {
    icon: Zap,
    title: "Speed Without Chaos",
    desc: "Our recruiters apply strategically and secure interviews faster without compromising quality.",
  },
];

const employerBenefits = [
  {
    icon: Building2,
    title: "Industry-Focused Hiring",
    desc: "We understand your sector and find talent that actually fits.",
  },
  {
    icon: SearchCheck,
    title: "Pre-Screened Candidates",
    desc: "Save time by meeting our pre-screened, qualified and verified professionals.",
  },
  {
    icon: Clock3,
    title: "Faster Hiring Cycles",
    desc: "Our recruitment process reduces hiring delays significantly as we are strict to deadlines.",
  },
  {
    icon: Users,
    title: "Flexible Workforce Solutions",
    desc: "From permanent hires to staffing and talent acquisition support, we do it all for you.",
  },
  {
    icon: Handshake,
    title: "Compliance & Payroll Support",
    desc: "Background checks, payroll, and tax support handled seamlessly.",
  },
];

type Tab = "seekers" | "employers";

export default function BenefitsSection() {
  const [tab, setTab] = useState<Tab>("seekers");

  const isSeekers = tab === "seekers";
  const benefits = isSeekers ? jobSeekerBenefits : employerBenefits;

  return (
    <section
      className={`relative overflow-hidden py-24 md:py-32 transition-colors duration-500 ${
        isSeekers ? "bg-[#F5F1E8]" : "bg-[#EEE5D5]"
      }`}
    >
      {/* Soft background accent */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-32 h-96 w-96 rounded-full blur-3xl transition-all duration-700 ${
          isSeekers
            ? "-right-32 bg-[#8FB8D8]/20"
            : "-left-32 bg-[#F26A21]/10"
        }`}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#F26A21]" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#77736D]">
              Why Choose Us
            </p>

            <span className="h-px w-8 bg-[#F26A21]" />
          </div>

          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#171717] md:text-5xl lg:text-6xl">
            Why Job Seekers &{" "}
            <span className="text-[#F26A21]">Employers</span>
            <br />
            Choose Nexora
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#77736D] md:text-lg">
            Recruitment support built around better matches, stronger
            preparation, and a more structured path to the right opportunity.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-14 flex justify-center">
          <div
            className={`inline-flex rounded-full border p-1.5 shadow-sm backdrop-blur-sm transition-colors duration-500 ${
              isSeekers
                ? "border-[#8FB8D8]/40 bg-[#8FB8D8]/10"
                : "border-[#D8C8B0] bg-white/40"
            }`}
            role="tablist"
            aria-label="Choose audience"
          >
            <button
              type="button"
              role="tab"
              aria-selected={isSeekers}
              onClick={() => setTab("seekers")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 md:px-6 ${
                isSeekers
                  ? "bg-[#31556D] text-white shadow-md"
                  : "text-[#77736D] hover:text-[#171717]"
              }`}
            >
              <BriefcaseBusiness className="h-4 w-4" />
              For Job Seekers
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={!isSeekers}
              onClick={() => setTab("employers")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 md:px-6 ${
                !isSeekers
                  ? "bg-[#171717] text-white shadow-md"
                  : "text-[#77736D] hover:text-[#171717]"
              }`}
            >
              <Building2 className="h-4 w-4" />
              For Employers
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div
          key={tab}
          role="tabpanel"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`group rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_50px_rgba(23,23,23,0.09)] ${
                  isSeekers
                    ? "border-[#8FB8D8]/30 bg-white/65 hover:border-[#8FB8D8]/70"
                    : "border-[#D8C8B0] bg-[#F8F4EC]/80 hover:border-[#F26A21]/40"
                }`}
              >
                <div
                  className={`mb-7 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                    isSeekers
                      ? "bg-[#8FB8D8]/25 text-[#31556D] group-hover:bg-[#31556D] group-hover:text-white"
                      : "bg-[#E8DCC8] text-[#171717] group-hover:bg-[#F26A21] group-hover:text-white"
                  }`}
                >
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mb-3 text-lg font-semibold tracking-tight text-[#171717]">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-[#77736D]">
                  {item.desc}
                </p>

                <div
                  className={`mt-7 h-px transition-all duration-300 group-hover:w-14 ${
                    isSeekers
                      ? "w-8 bg-[#8FB8D8]"
                      : "w-8 bg-[#F26A21]"
                  }`}
                />
              </article>
            );
          })}
        </div>

        {/* Job Seeker Differentiators */}
        {isSeekers && (
          <div className="mt-16 overflow-hidden rounded-3xl bg-[#171717]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative overflow-hidden p-8 md:p-10 lg:p-12">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#8FB8D8]/10 blur-3xl" />

                <div className="relative">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#F26A21] text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                    What Makes Nexora Different
                  </p>

                  <h3 className="max-w-sm text-3xl font-semibold leading-tight tracking-[-0.025em] text-white md:text-4xl">
                    A focused approach to building better careers.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">
                    We combine strategic applications, preparation, and
                    placement support to help professionals navigate the hiring
                    process with confidence.
                  </p>
                </div>
              </div>

              <div className="grid border-t border-white/10 sm:grid-cols-2 lg:border-l lg:border-t-0">
                {differentiators.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className={`p-7 md:p-8 ${
                        index < differentiators.length - 1
                          ? "border-b border-white/10"
                          : ""
                      } ${
                        index % 2 === 0
                          ? "sm:border-r sm:border-white/10"
                          : ""
                      }`}
                    >
                      <Icon
                        className="mb-5 h-5 w-5 text-[#8FB8D8]"
                        strokeWidth={1.8}
                      />

                      <h4 className="mb-2 text-sm font-semibold text-white">
                        {item.title}
                      </h4>

                      <p className="text-xs leading-5 text-white/45">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Employer CTA */}
        {!isSeekers && (
          <div className="mt-12 overflow-hidden rounded-3xl bg-[#171717]">
            <div className="relative flex flex-col items-start justify-between gap-7 p-8 md:flex-row md:items-center md:p-10">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#F26A21]/10 blur-3xl" />

              <div className="relative">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21]">
                  Hiring With Nexora
                </p>

                <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  Find the talent your team needs.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
                  From candidate sourcing to recruitment support, our team
                  helps employers build a stronger hiring pipeline.
                </p>
              </div>

              <a
                href="/contact"
                className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-[#F26A21] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95716] hover:shadow-lg"
              >
                Talk to Our Team
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
