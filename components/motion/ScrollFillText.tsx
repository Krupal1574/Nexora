"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.14, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">{w}</motion.span>;
}

/** Paragraph whose words light up one by one as you scroll. */
export default function ScrollFillText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
    </p>
  );
}
