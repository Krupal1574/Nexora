"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Headline reveal: every line slides up out of an invisible mask, staggered.
 * `onView` (default) triggers on scroll; pass `ready` + onView={false} for the hero.
 */
export default function MaskLines({
  lines, className = "", as: Tag = "div", delay = 0, stagger = 0.12, onView = true, ready = true,
}: {
  lines: ReactNode[]; className?: string; as?: ElementType; delay?: number;
  stagger?: number; onView?: boolean; ready?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const go = onView ? inView : ready;
  return (
    <div ref={ref}>
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className="block origin-left"
              initial={{ y: "115%", rotate: 3 }}
              animate={go ? { y: "0%", rotate: 0 } : undefined}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
