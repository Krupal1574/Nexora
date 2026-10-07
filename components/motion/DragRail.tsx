"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Drag / swipe / trackpad-friendly rail with momentum, edge clamping and a progress bar.
 * Children should have a fixed width (e.g. w-[82vw] sm:w-[400px] shrink-0).
 */
export default function DragRail({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const progress = useTransform(x, (v) => (max ? Math.min(1, Math.max(0, -v / max)) : 0));
  const bar = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const measure = () => {
      if (!wrap.current || !track.current) return;
      setMax(Math.max(0, track.current.scrollWidth - wrap.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <div>
      <div ref={wrap} className="overflow-hidden" data-cursor>
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ power: 0.25, timeConstant: 300 }}
          style={{ x, cursor: dragging ? "grabbing" : "grab" }}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setTimeout(() => setDragging(false), 0)}
          onClickCapture={(e) => { if (dragging) e.preventDefault(); }}   // don't trigger links after a drag
          className="flex gap-5 w-max select-none touch-pan-y"
        >
          {children}
        </motion.div>
      </div>
      <div className="mt-8 flex items-center gap-5">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#171717]/40">Drag</span>
        <div className="relative h-px flex-1 bg-black/15">
          <motion.div style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-[#F26A21]" />
        </div>
      </div>
    </div>
  );
}
