"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Section pins to the screen while vertical scrolling drives a sideways gallery. */
export default function HorizontalScroll({ header, children, count }: { header: ReactNode; children: ReactNode; count: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const current = useTransform(scrollYProgress, (v) => String(Math.min(count, Math.floor(v * count) + 1)).padStart(2, "0"));

  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <div ref={outer} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center gap-10 overflow-hidden pt-20">
        <div className="container-wide w-full">{header}</div>
        <motion.div ref={track} style={{ x }} className="flex gap-5 w-max px-[var(--container-px)]">
          {children}
        </motion.div>
        <div className="container-wide w-full flex items-center gap-5">
          <motion.span className="font-display text-sm tabular-nums text-[#00F2FE]">{current}</motion.span>
          <div className="relative h-px flex-1 bg-white/15">
            <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-[#00F2FE]" />
          </div>
          <span className="font-display text-sm tabular-nums text-white/40">{String(count).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
