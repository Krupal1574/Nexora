"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Star, Quote, TrendingUp, Briefcase, CheckCircle2, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { testimonials as staticTestimonials } from "@/lib/testimonials";
import MaskLines from "@/components/motion/MaskLines";
import Reveal from "@/components/motion/Reveal";
import DragRail from "@/components/motion/DragRail";
import ScrollFillText from "@/components/motion/ScrollFillText";
import Magnetic from "@/components/motion/Magnetic";
import TestimonialForm from "@/components/TestimonialForm";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease, delay },
});

// Animated counter component
function Counter({ to, suffix, duration = 2000 }: { to: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0, t0: number | null = null;
    const step = (t: number) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - p, 4)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{n}{suffix}</span>;
}

// Star rating component
function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating ? "text-[#00F2FE] fill-[#00F2FE]" : "text-[#203548] fill-[#203548]"
          } transition-all`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    let mounted = true;

    async function loadTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();

        if (mounted) {
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
          } else {
            setTestimonials(staticTestimonials.map(t => ({ ...t, published: true })));
          }
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setTestimonials(staticTestimonials.map(t => ({ ...t, published: true })));
          setLoading(false);
        }
      }
    }

    loadTestimonials();
    return () => { mounted = false; };
  }, []);

  // Calculate stats
  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length).toFixed(1)
    : "5.0";
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length;
  const fiveStarPercentage = testimonials.length > 0
    ? Math.round((fiveStarCount / testimonials.length) * 100)
    : 100;

  // Separate featured
  const featuredTestimonials = testimonials.filter(t => t.isFeatured).slice(0, 2);
  const regularTestimonials = testimonials.filter(t => !t.isFeatured);

  return (
    <div className="overflow-x-clip bg-[#06080f]">
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[85vh] flex flex-col justify-center pt-32 pb-24">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="glow-drift absolute -top-40 left-1/2 w-[900px] h-[500px] bg-[#00F2FE]/15 blur-[140px] rounded-full pointer-events-none" />

        <motion.div style={{ y, opacity: fade }} className="container-wide relative z-10">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
            className="eyebrow mb-8"
          >
            Client Success Stories
          </motion.span>

          {/* Main heading */}
          <MaskLines
            as="h1"
            className="display mb-10"
            lines={[
              "Real people.",
              <><span key="r" className="accent">Real</span> results.</>
            ]}
          />

          {/* Subtext */}
          <motion.div {...fadeUp(0.4)} className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <p className="text-lg sm:text-xl text-[#94A3B8] max-w-xl leading-relaxed">
              Discover how Nexora has helped tech professionals land career-defining roles,
              negotiate better offers, and build lasting careers in the U.S. market.
            </p>

            <Magnetic>
              <Link href="#submit" className="btn-ghost px-8 py-4 text-base">
                Share your story <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-4xl">
            {[
              { icon: Star, value: avgRating, label: "Avg Rating", delay: 0.5 },
              { icon: CheckCircle2, value: `${fiveStarPercentage}%`, label: "Five Stars", delay: 0.6 },
              { icon: Briefcase, value: `${testimonials.length}+`, label: "Success Stories", delay: 0.7 },
              { icon: TrendingUp, value: "95%", label: "Would Recommend", delay: 0.8 },
            ].map(({ icon: Icon, value, label, delay }) => (
              <motion.div
                key={label}
                {...fadeUp(delay)}
                className="glass-card text-center"
              >
                <Icon className="w-5 h-5 text-[#00F2FE] mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {value.includes('%') || value.includes('+') ? value : <Counter to={parseFloat(value)} suffix="" duration={1500} />}
                </div>
                <div className="text-xs text-[#64748B]">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED STORIES - Large Format
      ═══════════════════════════════════════════════════════ */}
      {featuredTestimonials.length > 0 && (
        <section className="section-spacing">
          <div className="container-wide">
            <Reveal>
              <span className="eyebrow mb-8">Featured stories</span>
            </Reveal>
            <MaskLines
              as="h2"
              className="display display-md mb-16"
              lines={["Spotlight", <span key="s" className="thin">success.</span>]}
            />

            <div className="space-y-8">
              {featuredTestimonials.map((testimonial, index) => (
                <motion.article
                  key={testimonial.id}
                  {...fadeUp(index * 0.2)}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] hover:border-[#00F2FE]/50 transition-all duration-500"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00F2FE]/0 via-[#00F2FE]/5 to-[#00D2C4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-8 sm:p-12 lg:p-16">
                    <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-center">
                      {/* Content */}
                      <div>
                        {/* Quote icon */}
                        <div className="font-display text-7xl leading-none text-[#00F2FE] mb-6">"</div>

                        {/* Rating */}
                        <div className="mb-6">
                          <StarRating rating={testimonial.rating} size="lg" />
                        </div>

                        {/* Quote */}
                        <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white/90 leading-relaxed mb-8">
                          {testimonial.content}
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                          <Image
                            src={testimonial.avatar}
                            alt={`${testimonial.name}'s avatar`}
                            width={64}
                            height={64}
                            className="rounded-full border-2 border-[#00F2FE]/30"
                          />
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                              {testimonial.name}
                            </h4>
                            <p className="text-[#00F2FE] text-sm font-semibold mb-1">{testimonial.role}</p>
                            {testimonial.company && (
                              <p className="text-[#64748B] text-sm">{testimonial.company}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stat highlight */}
                      <div className="lg:text-right">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex flex-col items-center lg:items-end gap-4 p-8 rounded-2xl bg-[#00F2FE]/5 border border-[#00F2FE]/10"
                        >
                          <TrendingUp className="w-12 h-12 text-[#00F2FE]" />
                          <div className="text-center lg:text-right">
                            <div className="text-5xl font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                              {index === 0 ? "40%" : "6wk"}
                            </div>
                            <div className="text-sm text-[#94A3B8]">
                              {index === 0 ? "Salary Increase" : "Time to Offer"}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          ALL TESTIMONIALS - Drag Rail
      ═══════════════════════════════════════════════════════ */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <MaskLines
              as="h2"
              className="display display-md"
              lines={["More", <><span key="s" className="thin">success</span> stories.</>]}
            />
            <motion.p {...fadeUp(0.3)} className="text-[#94A3B8] max-w-sm">
              Every testimonial represents a real person whose career was transformed through Nexora.
            </motion.p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-[#00F2FE]/20 border-t-[#00F2FE] rounded-full animate-spin" />
            </div>
          ) : (
            <DragRail>
              {regularTestimonials.map((testimonial, i) => (
                <motion.figure
                  key={testimonial.id}
                  {...fadeUp(i * 0.08)}
                  whileHover={{ y: -8 }}
                  className="w-[82vw] sm:w-[420px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.03] p-8 flex flex-col justify-between min-h-[340px] hover:border-[#00F2FE]/50 transition-all duration-300"
                >
                  <div>
                    {/* Rating */}
                    <div className="mb-5">
                      <StarRating rating={testimonial.rating} size="sm" />
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg leading-relaxed text-white/90 mb-6 italic">
                      &quot;{testimonial.content}&quot;
                    </blockquote>
                  </div>

                  {/* Author */}
                  <figcaption className="flex items-center gap-3 mt-auto pt-6 border-t border-white/10">
                    <div className="relative">
                      <Image
                        src={testimonial.avatar}
                        alt={`${testimonial.name}'s avatar`}
                        width={48}
                        height={48}
                        className="rounded-full border border-[#00F2FE]/20"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00D2C4] border-2 border-[#0B0F19] flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-[#0B0F19]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-white">{testimonial.name}</div>
                      <div className="text-xs text-[#00F2FE]">{testimonial.role}</div>
                      {testimonial.company && (
                        <div className="text-xs text-[#64748B]">{testimonial.company}</div>
                      )}
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </DragRail>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="section-spacing border-t border-white/10">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow mb-8">Why our testimonials matter</span>
          </Reveal>

          <ScrollFillText
            className="text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight max-w-5xl mb-20"
            text="Your success is our only metric. Every testimonial is verified and represents a real client who worked with our team."
          />

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle2, title: "Verified Clients", desc: "All testimonials from real people who used our services", delay: 0 },
              { icon: Sparkles, title: "Recent Results", desc: "Stories from the last 12 months of placements", delay: 0.15 },
              { icon: TrendingUp, title: "Real Outcomes", desc: "Actual salary increases and placement timelines", delay: 0.3 },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <motion.div
                key={title}
                {...scaleIn(delay)}
                whileHover={{ y: -8 }}
                className="glass-card text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#00F2FE]/20 transition-all">
                  <Icon className="w-7 h-7 text-[#00F2FE]" />
                </div>
                <h3 className="text-white font-bold mb-3 text-lg" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SUBMISSION FORM
      ═══════════════════════════════════════════════════════ */}
      <section id="submit" className="section-spacing bg-gradient-to-b from-transparent to-[#0B0F19]">
        <div className="container-wide">
          <motion.div {...fadeUp()}>
            <TestimonialForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
