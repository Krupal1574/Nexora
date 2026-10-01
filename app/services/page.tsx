import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/motion/PageHero";
import Reveal from "@/components/motion/Reveal";
import CtaSection from "@/components/motion/CtaSection";
import {
  Briefcase,
  FileText,
  TrendingUp,
  Code2,
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  BarChart3,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description: "From career counseling and resume optimization to technical training and active placement, Nexora provides end-to-end IT staffing solutions.",
};
const services = [
  {
    id: "career-counseling",
    icon: Briefcase,
    number: "01",
    title: "Career Counseling",
    tagline: "Clarity meets strategy",
    description:
      "Navigating the tech job market without direction is the biggest career killer. Nexora's career counseling connects you with specialized technical domain advisors who understand exactly what employers in your target field are looking for.",
    details: [
      "1-on-1 sessions with dedicated domain advisors (Cloud, Data, DevOps, Full-Stack, AI/ML)",
      "Comprehensive skills gap analysis against current market demands",
      "Personalized career roadmap with 30/60/90-day milestones",
      "Salary benchmarking and negotiation coaching",
      "Domain pivot guidance for professionals transitioning into tech",
    ],
    accent: "#00F2FE",
    bgAccent: "#00F2FE12",
    iconBg: "#00F2FE18",
    borderColor: "#00F2FE30",
  },
  {
    id: "resume-optimization",
    icon: FileText,
    number: "02",
    title: "Resume & Portfolio Optimization",
    tagline: "Get past the ATS, land the interview",
    description:
      "Most resumes never make it past automated screening systems. Our expert writers rebuild your resume from the ground up using ATS-compliant formatting, keyword optimization, and compelling achievement-driven narratives tailored to the U.S. job market.",
    details: [
      "Complete ATS audit and keyword optimization for target roles",
      "Professional rewrite using the CAR (Challenge-Action-Result) framework",
      "Tailored cover letter templates for top employers",
      "LinkedIn profile overhaul and SEO optimization",
      "Quantified achievement highlights that stand out to hiring managers",
    ],
    accent: "#00D2C4",
    bgAccent: "#00D2C412",
    iconBg: "#00D2C418",
    borderColor: "#00D2C430",
  },
  {
    id: "resume-marketing",
    icon: TrendingUp,
    number: "03",
    title: "Resume Marketing & Interview Scheduling",
    tagline: "Your personal recruiter, actively working for you",
    description:
      "This is where Nexora truly sets itself apart. You get a dedicated personal recruiter who actively markets your resume directly to decision-makers at top companies, bypassing the black hole of job boards.",
    details: [
      "Direct outreach to hiring managers at U.S. tech employers",
      "Personalized resume submission tailored to each target company",
      "Interview scheduling and calendar management handled for you",
      "Continuous pipeline updates and feedback loops from employers",
      "Negotiation support during offer stage",
    ],
    accent: "#00F2FE",
    bgAccent: "#00F2FE12",
    iconBg: "#00F2FE18",
    borderColor: "#00F2FE30",
  },
  {
    id: "technical-training",
    icon: Code2,
    number: "04",
    title: "Technical Training & Guidance",
    tagline: "Sharpen your skills. Outperform the competition",
    description:
      "The tech landscape evolves rapidly. Nexora keeps you ahead with structured learning paths, weekly live webinars, and hands-on mock technical assessments delivered by industry practitioners.",
    details: [
      "Domain-specific learning paths (AWS, Azure, GCP, Python, SQL, React, and more)",
      "Weekly live webinars with Q&A from industry practitioners",
      "Mock technical assessments mirroring real interview formats (LeetCode-style, system design)",
      "Project portfolio building guidance for hands-on skill demonstration",
      "Access to curated learning resources and certification preparation",
    ],
    accent: "#00D2C4",
    bgAccent: "#00D2C412",
    iconBg: "#00D2C418",
    borderColor: "#00D2C430",
  },
  {
    id: "compliance-onboarding",
    icon: Shield,
    number: "05",
    title: "Compliance, Onboarding & Background Verification",
    tagline: "Seamless from offer to Day 1",
    description:
      "The final mile between an accepted offer and your first day can be filled with administrative friction. Nexora's compliance team handles every piece of documentation, verification, and onboarding coordination so nothing falls through the cracks.",
    details: [
      "End-to-end documentation review and compliance support",
      "Background verification coordination with employers",
      "I-9, E-Verify, and tax form assistance",
      "Benefits enrollment guidance and HR system onboarding",
      "Dedicated point-of-contact through your first 90 days",
    ],
    accent: "#00F2FE",
    bgAccent: "#00F2FE12",
    iconBg: "#00F2FE18",
    borderColor: "#00F2FE30",
  },
];

const processHighlights = [
  { icon: Users, label: "Dedicated Recruiter" },
  { icon: BarChart3, label: "Data-Driven Matching" },
  { icon: BookOpen, label: "Ongoing Support" },
  { icon: ClipboardCheck, label: "End-to-End Handling" },
];

export default function ServicesPage() {
  return (
    <div className="overflow-x-clip">
      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <PageHero
        align="center"
        eyebrow="What We Do"
        lines={[
          "Turning Your Tech Dreams ",
          <span key="reality" className="accent">Into Reality</span>,
        ]}
        sub="From your first career conversation to your first day on the job — Nexora provides a fully integrated suite of services designed to get you hired faster and in the right role."
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {processHighlights.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A202C] border border-[#2D3748] text-[#94A3B8] text-sm"
            >
              <Icon className="w-4 h-4 text-[#00F2FE]" />
              {label}
            </div>
          ))}
        </div>
      </PageHero>

      {/* ════════════════════════════════════════════════════════
          SERVICES DETAILED BREAKDOWN
      ════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#0B0F19]">
        <div className="container-wide">
          <div className="space-y-8">
            {services.map(
              (
                {
                  id,
                  icon: Icon,
                  number,
                  title,
                  tagline,
                  description,
                  details,
                  accent,
                  bgAccent,
                  iconBg,
                  borderColor,
                },
                index
              ) => (
                <div
                  key={id}
                  id={id}
                  className="rounded-2xl border p-8 lg:p-12 relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,242,254,0.08)]"
                  style={{
                    background: `${bgAccent}`,
                    borderColor: borderColor,
                    backgroundColor: "#1A202C",
                  }}
                >
                  {/* Background accent orb */}
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: accent }}
                  />

                  <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-start">
                    {/* Left: Heading & description */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ background: iconBg, border: `1px solid ${borderColor}` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: accent }} />
                        </div>
                        <div>
                          <span
                            className="text-xs font-bold tracking-widest block mb-1"
                            style={{ color: accent }}
                          >
                            SERVICE {number}
                          </span>
                          <h2
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                          >
                            {title}
                          </h2>
                        </div>
                      </div>
                      <p
                        className="text-sm font-semibold mb-4 italic"
                        style={{ color: accent }}
                      >
                        {tagline}
                      </p>
                      <p className="text-[#94A3B8] leading-relaxed">{description}</p>
                    </div>

                    {/* Right: Feature list */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4" style={{ color: accent }} />
                        <span
                          className="text-white font-semibold text-sm"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          What's Included
                        </span>
                      </div>
                      <ul className="space-y-3.5">
                        {details.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2
                              className="w-4 h-4 mt-0.5 flex-shrink-0"
                              style={{ color: accent }}
                            />
                            <span className="text-[#94A3B8] text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════ */}
      <CtaSection
        lines={["Ready to Start Your ", <span key="journey" className="accent">Nexora Journey?</span>]}
        text="Speak with a Nexora specialist today and get a personalized roadmap for your career."
        primary={{ href: "/contact", label: "Get a Free Consultation" }}
        secondary={{ href: "/refer-and-earn", label: "Refer & Earn $500" }}
      />
    </div>
  );
}
