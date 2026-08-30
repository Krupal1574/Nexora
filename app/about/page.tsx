import Link from "next/link";
import type { Metadata } from "next";
import {
  Users,
  Briefcase,
  HeartHandshake,
  Star,
  ArrowRight,
  Target,
  Eye,
  CheckCircle2,
  Globe,
  Award,
  Zap,
} from "lucide-react";



const values = [
  {
    icon: Target,
    title: "Candidate-First Approach",
    desc: "Every decision we make is grounded in the best interest of our candidates. Your success is our metric.",
  },
  {
    icon: Globe,
    title: "U.S. Market Expertise",
    desc: "Deep knowledge of American hiring standards, ATS systems, and enterprise recruitment workflows.",
  },
  {
    icon: Award,
    title: "Proven Excellence",
    desc: "Consistent placements backed by rigorous career coaching and continuous candidate support.",
  },
  {
    icon: Zap,
    title: "Accelerated Placement",
    desc: "Our streamlined process cuts time-to-hire dramatically, getting you employed faster.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ════════════════════════════════════════════════════════
          HERO BANNER
      ════════════════════════════════════════════════════════ */}
      <section className="relative pt-[calc(var(--navbar-mobile)+4rem)] lg:pt-[calc(var(--navbar-desktop)+6rem)] pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F19]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,#00F2FE12_0%,transparent_65%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #00F2FE 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 container-wide text-center">
          <span className="section-label">About Nexora</span>
          <h1
            className="text-[length:var(--hero-title)] font-bold max-w-4xl mx-auto text-white leading-tight mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Your Partner In Achieving{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your Career Goals
            </span>
          </h1>
          <p className="text-[#94A3B8] text-xl max-w-3xl mx-auto leading-relaxed">
            Founded on the belief that every tech professional deserves an equal
            shot at landing a career-defining role, Nexora has been transforming
            futures — one placement at a time.
          </p>
        </div>
      </section>



      {/* ════════════════════════════════════════════════════════
          MISSION & VISION
      ════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#0B0F19]">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="section-label">Purpose & Direction</span>
            <h2
              className="text-[length:var(--section-title)] font-bold text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Our Mission &{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Vision
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FE]/5 rounded-full blur-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-[#00F2FE]/10 border border-[#00F2FE]/25 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#00F2FE]" />
              </div>
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Our Mission
              </h3>
              <p className="text-[#94A3B8] leading-relaxed mb-6">
                Nexora's mission is to bridge the widening gap between elite tech talent
                and forward-thinking enterprise employers across the United States. We
                do this by delivering a holistic, candidate-centric career acceleration
                program that goes far beyond traditional staffing.
              </p>
              <p className="text-[#94A3B8] leading-relaxed">
                We invest deeply in each candidate — understanding their unique strengths,
                career aspirations, and market positioning — to craft personalized
                pathways to meaningful employment at leading technology companies.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Democratize access to top U.S. tech opportunities",
                  "Provide end-to-end career development support",
                  "Build long-term employer-candidate relationships",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00F2FE] mt-0.5 flex-shrink-0" />
                    <span className="text-[#94A3B8] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2C4]/5 rounded-full blur-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-[#00D2C4]/10 border border-[#00D2C4]/25 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#00D2C4]" />
              </div>
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Our Vision
              </h3>
              <p className="text-[#94A3B8] leading-relaxed mb-6">
                We envision a future where geography, background, and access are no
                longer barriers to a thriving technology career. Nexora strives to be
                the most trusted name in IT staffing — a platform where ambition meets
                opportunity on a level playing field.
              </p>
              <p className="text-[#94A3B8] leading-relaxed">
                By continuously innovating our recruitment methodology, deepening
                employer partnerships, and expanding our talent network, we aim to place
                professionals into career-defining roles.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Continuous innovation in recruitment",
                  "Expanding to major U.S. markets",
                  "Industry-leading candidate satisfaction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00D2C4] mt-0.5 flex-shrink-0" />
                    <span className="text-[#94A3B8] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Values Grid */}
          <div>
            <h3
              className="text-2xl font-bold text-white text-center mb-8"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              What Drives Us
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-card p-6 flex flex-col gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#00F2FE]" />
                  </div>
                  <h4
                    className="text-white font-semibold"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {title}
                  </h4>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#121623] border-t border-[#1A202C]">
        <div className="container-narrow text-center">
          <h2
            className="text-[length:var(--section-title)] font-bold text-white mb-5"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Ready to Be Our Next{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Success Story?
            </span>
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Join tech professionals who chose Nexora to accelerate their careers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Talk to a Recruiter <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="btn-ghost">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
