"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

/** Scroll-triggered fade-up for use inside server components. */
export default function Reveal({
  children, delay = 0, y = 30, className = "", as = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "article" | "p" }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}
