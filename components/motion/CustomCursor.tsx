"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Dot + trailing ring that swells over links/buttons. Desktop (fine pointer) only. */
export default function CustomCursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [big, setBig] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => setBig(!!(e.target as HTMLElement).closest("a,button,[data-cursor]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [x, y]);

  if (!on) return null;
  return (
    <>
      <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[150] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#00F2FE]" />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ scale: big ? 2.4 : 1, opacity: big ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-[150] -ml-5 -mt-5 h-10 w-10 rounded-full border border-[#00F2FE] mix-blend-difference"
      />
    </>
  );
}
