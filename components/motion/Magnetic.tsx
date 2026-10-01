"use client";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Wrap a button: it gently follows the cursor and springs back. */
export default function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 14, mass: 0.3 });
  const y = useSpring(my, { stiffness: 220, damping: 14, mass: 0.3 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {children}
    </motion.div>
  );
}
