"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { testimonials as staticTestimonials } from "@/lib/testimonials";
import MaskLines from "@/components/motion/MaskLines";
import Marquee from "@/components/motion/Marquee";
import Magnetic from "@/components/motion/Magnetic";
import ScrollFillText from "@/components/motion/ScrollFillText";
import ParallaxImage from "@/components/motion/ParallaxImage";
import HorizontalScroll from "@/components/motion/HorizontalScroll";
import HoverPreviewList from "@/components/motion/HoverPreviewList";
import DragRail from "@/components/motion/DragRail";
import { useSiteReady } from "@/components/motion/Preloader";

/* ─── Content ──────────────────────────────────────────────────────────── */
const services = [
  { title: "Career Counseling", desc: "1-on-1 career mapping with domain advisors.", tag: "Strategy", image: "/images/modern_tech_team.jpg" },
  { title: "Resume Optimization", desc: "ATS-tailored resumes built to U.S. market standards.", tag: "Branding", image: "/images/software_developer.jpg" },
  { title: "Interview Preparation", desc: "Mock interviews and behavioral coaching with veterans.", tag: "Coaching", image: "/images/tech_interview.jpg" },
  { title: "Technical Training", desc: "Weekly webinars, skill upgrades and mock assessments.", tag: "Training", image: "/images/software_developer.jpg" },
];
const journey = ["Screening & Counseling", "Tech Training", "Resume Building", "Resume Marketing", "Mock Interviews", "Placement", "Background Check", "Onboarding"];
const principles = [
  { n: "01", t: "Personalized Approach", d: "Every candidate gets a plan built around their skills and goals." },
  { n: "02", t: "End-to-End Support", d: "From first call to first day, one team walks the whole placement with you." },
  { n: "03", t: "Direct Recruiter Access", d: "Talk to the people making the introductions, not a ticket queue." },
];
// TODO: replace with your real numbers
const stats = [{ v: 500, s: "+", l: "Candidates coached" }, { v: 8, s: "", l: "Step process" }, { v: 100, s: "%", l: "U.S. market focus" }];
const ticker = ["Career Counseling", "Resume Building", "Mock Interviews", "Tech Training", "Placement", "Onboarding"];

const ease = [0.22, 1, 0.36, 1] as const;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0, t0: number | null = null;
    const step = (t: number) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / 2000, 1);
      setN(Math.round((1 - Math.pow(1 - p, 4)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease, delay },
});

/* ─── Testimonials ─────────────────────────────────────────────────────── */
function Testimonials() {
  const [items, setItems] = useState<any[]>(staticTestimonials);
  useEffect(() => {
    fetch("/api/testimonials").then((r) => r.json()).then((d) => Array.isArray(d) && d.length && setItems(d)).catch(() => {});
  }, []);
  return (
    <section className="section-spacing">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <MaskLines as="h2" className="display display-md" lines={["What our", <><span key="c" className="thin">clients</span> say.</>]} />
          <motion.p {...fadeUp(0.3)} className="text-[#94A3B8] max-w-sm">Real words from professionals we&apos;ve placed. No fluff, just results.</motion.p>
        </div>
        <DragRail>
          {items.map((t, i) => (
            <motion.figure key={t.id} {...fadeUp(i * 0.08)} whileHover={{ y: -8 }}
              className="w-[82vw] sm:w-[400px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.03] p-8 flex flex-col justify-between min-h-[320px] hover:border-[#00F2FE]/50 transition-colors">
              <div>
                <div className="font-display text-6xl leading-none text-[#00F2FE] mb-4">“</div>
                <blockquote className="text-lg leading-relaxed text-white/90">{t.content}</blockquote>
              </div>
              <figcaption className="flex items-center gap-3 mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                <div className="flex-1"><div className="font-semibold text-sm">{t.name}</div><div className="text-xs text-[#7c8aa0]">{t.role}</div></div>
                <div className="flex" aria-label={`${t.rating} out of 5`}>{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-[#00F2FE] fill-[#00F2FE]" />)}</div>
              </figcaption>
            </motion.figure>
          ))}
        </DragRail>
        <div className="mt-8"><Link href="/testimonials" className="btn-ghost">All stories <ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const ready = useSiteReady();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div className="overflow-x-clip bg-[#06080f]">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92vh] flex flex-col justify-center pt-10 pb-24">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="glow-drift absolute -top-40 left-1/2 w-[900px] h-[500px] bg-[#00F2FE]/15 blur-[140px] rounded-full pointer-events-none" />
        <motion.div style={{ y, opacity: fade, scale }} className="container-wide relative z-10">
          <motion.span initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : undefined} transition={{ duration: 0.8, ease }} className="eyebrow mb-8">
            IT Staffing &amp; Talent Studio
          </motion.span>
          <MaskLines as="h1" onView={false} ready={ready} delay={0.1} className="display"
            lines={[<>Careers <span key="a" className="outline-text">built</span></>, <>for the <span key="b" className="accent">U.S.</span> tech</>, "market."]} />
          <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, ease, delay: 0.7 }}
              className="text-lg sm:text-xl text-[#94A3B8] max-w-xl leading-relaxed">
              We bridge elite tech talent and top U.S. enterprises, from resume and training to placement and onboarding.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, ease, delay: 0.85 }} className="flex flex-col sm:flex-row gap-4">
              <Magnetic><Link href="/contact" className="btn-primary px-8 py-4 text-base">Start now <ArrowRight className="w-4 h-4" /></Link></Magnetic>
              <Magnetic><Link href="/services" className="btn-ghost px-8 py-4 text-base">What we do</Link></Magnetic>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-6 left-0 right-0 container-wide flex justify-between items-end text-[11px] tracking-[0.25em] uppercase text-white/40">
          <span>Nexora ©2026</span>
          <span className="flex flex-col items-center gap-3">Scroll<i className="scroll-line" /></span>
        </div>
      </section>

      <Marquee items={ticker} />

      {/* ABOUT */}
      <section className="section-spacing">
        <div className="container-wide">
          <motion.span {...fadeUp()} className="eyebrow mb-8">About us</motion.span>
          <MaskLines as="h2" className="display display-md mb-14" lines={["We place.", <><span key="t" className="thin">Not just</span> advise.</>]} />
          <ScrollFillText className="text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight max-w-5xl mb-20"
            text="We take on the roles that need real preparation. Not just a polished resume and a list of job boards, but coaching, positioning and a recruiter who picks up the phone." />

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14">
            <motion.div {...fadeUp()} className="relative">
              <ParallaxImage src="/images/modern_tech_team.jpg" alt="Tech team collaborating" sizes="(max-width:1024px) 100vw, 55vw" className="aspect-[4/3] rounded-3xl border border-white/10" />
            </motion.div>
            <div className="flex flex-col justify-between gap-10">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s, i) => (
                  <motion.div key={s.l} {...fadeUp(i * 0.12)}>
                    <div className="font-display text-4xl sm:text-6xl font-bold text-gradient"><Counter to={s.v} suffix={s.s} /></div>
                    <div className="text-xs sm:text-sm text-[#94A3B8] mt-2">{s.l}</div>
                  </motion.div>
                ))}
              </div>
              <div>
                {principles.map((p, i) => (
                  <motion.div key={p.n} {...fadeUp(i * 0.1)} className="relative flex gap-5 py-5">
                    <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease, delay: i * 0.1 }} className="absolute top-0 left-0 right-0 h-px bg-white/15 origin-left" />
                    <span className="font-display text-[#00F2FE] text-sm pt-1">{p.n}</span>
                    <div><h3 className="font-semibold text-lg">{p.t}</h3><p className="text-[#94A3B8] text-sm mt-1 leading-relaxed">{p.d}</p></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-spacing">
        <div className="container-wide">
          <motion.span {...fadeUp()} className="eyebrow mb-8">What we actually do</motion.span>
          <MaskLines as="h2" className="display display-md mb-6" lines={["Engineering", <><span key="y" className="thin">your</span> next role.</>]} />
          <motion.p {...fadeUp(0.2)} className="text-[#94A3B8] max-w-xl mb-14">The parts of the job search most people get wrong, handled by people who do this every day.</motion.p>
          <HoverPreviewList items={services} />
        </div>
      </section>

      {/* PROCESS — pinned horizontal scroll */}
      <section className="border-t border-white/10">
        <HorizontalScroll count={journey.length}
          header={
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="eyebrow mb-6">The process</span>
                <MaskLines as="h2" className="display display-md" lines={["8 steps.", <><span key="o" className="thin">One</span> outcome.</>]} />
              </div>
              <span className="hidden sm:block text-xs uppercase tracking-[0.25em] text-white/40">Keep scrolling →</span>
            </div>
          }>
          {journey.map((label, i) => (
            <div key={label} className="group w-[72vw] sm:w-[340px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.02] p-8 min-h-[260px] flex flex-col justify-between hover:bg-[#00F2FE] hover:text-[#06080f] transition-colors duration-500">
              <span className="font-display text-7xl font-bold outline-text group-hover:[-webkit-text-stroke:1px_#06080f]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] opacity-60 mb-2">Step {i + 1}</div>
                <h3 className="font-display text-2xl uppercase tracking-tight leading-none">{label}</h3>
              </div>
            </div>
          ))}
        </HorizontalScroll>
      </section>

      <Testimonials />

      {/* CLOSING CTA */}
      <section className="relative section-spacing border-t border-white/10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="glow-drift absolute bottom-0 left-1/2 w-[800px] h-[400px] bg-[#00F2FE]/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="container-wide relative">
          <MaskLines as="h2" className="display" lines={["Let's build", <><span key="y" className="thin">your</span> <span key="c" className="accent">career.</span></>]} />
          <motion.p {...fadeUp(0.3)} className="text-[#94A3B8] text-lg max-w-xl mx-auto mt-8 mb-10">Tell us where you want to be. We&apos;ll map the way there.</motion.p>
          <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Magnetic><Link href="/contact" className="btn-primary px-10 py-4 text-base">Start a conversation <ArrowRight className="w-4 h-4" /></Link></Magnetic>
            <Magnetic><Link href="/refer-and-earn" className="btn-ghost px-10 py-4 text-base">Refer &amp; earn $500</Link></Magnetic>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
