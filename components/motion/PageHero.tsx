"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import MaskLines from "./MaskLines";
import { useSiteReady } from "./Preloader";

const ease = [0.22, 1, 0.36, 1] as const;

/** Shared editorial hero for inner pages: eyebrow, giant masked title, subtitle, optional extras. */
export default function PageHero({
  eyebrow, lines, sub, children, align = "left",
}: { eyebrow: string; lines: ReactNode[]; sub?: string; children?: ReactNode; align?: "left" | "center" }) {
  const ready = useSiteReady();
  const center = align === "center";
  return (
    <section className="relative pt-12 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="glow-drift absolute -top-40 left-1/2 w-[min(900px,140vw)] h-[420px] bg-[#F26A21]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className={`container-wide relative z-10 ${center ? "text-center" : ""}`}>
        <motion.span
          initial={{ opacity: 0, x: -16 }} animate={ready ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, ease }} className="eyebrow mb-6 sm:mb-8"
        >
          {eyebrow}
        </motion.span>
        <MaskLines as="h1" onView={false} ready={ready} delay={0.1} className="display display-md" lines={lines} />
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className={`mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-[#77736D] leading-relaxed max-w-2xl ${center ? "mx-auto" : ""}`}
          >
            {sub}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease, delay: 0.7 }} className="mt-8 sm:mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
