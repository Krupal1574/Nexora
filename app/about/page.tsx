import type { Metadata } from "next";
import { Target, Eye, CheckCircle2, Globe, Award, Zap } from "lucide-react";
import PageHero from "@/components/motion/PageHero";
import Reveal from "@/components/motion/Reveal";
import MaskLines from "@/components/motion/MaskLines";
import ScrollFillText from "@/components/motion/ScrollFillText";
import CtaSection from "@/components/motion/CtaSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Nexora connects tech professionals with leading U.S. enterprises through candidate-first career coaching and placement.",
};

const values = [
  { icon: Target, title: "Candidate-First Approach", desc: "Every decision is grounded in the best interest of our candidates. Your success is our metric." },
  { icon: Globe, title: "U.S. Market Expertise", desc: "Deep knowledge of American hiring standards, ATS systems and enterprise recruitment workflows." },
  { icon: Award, title: "Proven Excellence", desc: "Consistent placements backed by rigorous career coaching and continuous candidate support." },
  { icon: Zap, title: "Accelerated Placement", desc: "A streamlined process that cuts time-to-hire and gets you employed faster." },
];

const pillars = [
  {
    icon: Target, n: "01", title: "Our Mission", color: "#F26A21",
    paras: [
      "Nexora's mission is to bridge the widening gap between elite tech talent and forward-thinking enterprise employers across the United States, through a holistic, candidate-centric career acceleration program that goes far beyond traditional staffing.",
      "We invest deeply in each candidate, understanding strengths, aspirations and market positioning, to craft personalized pathways to meaningful employment.",
    ],
    points: ["Democratize access to top U.S. tech opportunities", "Provide end-to-end career development support", "Build long-term employer-candidate relationships"],
  },
  {
    icon: Eye, n: "02", title: "Our Vision", color: "#8FB8D8",
    paras: [
      "We envision a future where geography, background and access are no longer barriers to a thriving technology career, with Nexora as the most trusted name in IT staffing.",
      "By continuously innovating our methodology, deepening employer partnerships and expanding our talent network, we aim to place professionals into career-defining roles.",
    ],
    points: ["Continuous innovation in recruitment", "Expanding to major U.S. markets", "Industry-leading candidate satisfaction"],
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-clip">
      <PageHero
        eyebrow="About Nexora"
        lines={["Your partner in", <>achieving <span key="a" className="accent">your</span></>, "career goals."]}
        sub="Founded on the belief that every tech professional deserves an equal shot at a career-defining role, Nexora transforms futures one placement at a time."
      />

      {/* Statement */}
      <section className="section-spacing border-t border-black/10">
        <div className="container-wide">
          <Reveal><span className="eyebrow mb-8">Why we exist</span></Reveal>
          <ScrollFillText
            className="text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight max-w-5xl"
            text="We believe talent is everywhere but opportunity is not. So we coach, position and place tech professionals into the roles they have earned, with a real person beside them at every step."
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-spacing">
        <div className="container-wide">
          <Reveal><span className="eyebrow mb-8">Purpose &amp; direction</span></Reveal>
          <MaskLines as="h2" className="display display-md mb-12 sm:mb-16" lines={["Mission", <><span key="v" className="thin">&amp;</span> vision.</>]} />
          <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
            {pillars.map(({ icon: Icon, n, title, color, paras, points }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <article className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-black/[0.03] p-6 sm:p-10 transition-colors hover:border-[#F26A21]/40">
                  <span className="absolute -top-4 right-4 sm:right-8 font-display font-bold text-[7rem] sm:text-[10rem] leading-none outline-text opacity-60 select-none pointer-events-none">{n}</span>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl grid place-items-center mb-6" style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <h3 className="font-display uppercase text-3xl sm:text-4xl tracking-tight mb-5">{title}</h3>
                    {paras.map((p) => <p key={p} className="text-[#77736D] leading-relaxed mb-4">{p}</p>)}
                    <ul className="mt-6 space-y-3 border-t border-black/10 pt-6">
                      {points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-sm text-[#B6C2D2]">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} />{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing border-t border-black/10">
        <div className="container-wide">
          <Reveal><span className="eyebrow mb-8">What drives us</span></Reveal>
          <MaskLines as="h2" className="display display-md mb-12 sm:mb-16" lines={["Four", <><span key="v" className="thin">core</span> values.</>]} />
          <div>
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="row-link">
                  <span className="font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-xl sm:text-3xl uppercase tracking-tight">{title}</h3>
                    <p className="muted text-sm text-[#77736D] mt-2 max-w-xl">{desc}</p>
                  </div>
                  <Icon className="row-tag w-7 h-7" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        lines={["Be our next", <><span key="s" className="accent">success</span> <span key="t" className="thin">story.</span></>]}
        text="Join tech professionals who chose Nexora to accelerate their careers."
        primary={{ href: "/contact", label: "Talk to a recruiter" }}
        secondary={{ href: "/services", label: "View services" }}
      />
    </div>
  );
}
