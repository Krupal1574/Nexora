"use client";
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Ticker that speeds up — and reverses — with your scroll velocity. */
export default function Marquee({ items, speed = 4 }: { items: string[]; speed?: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * speed * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(wrap(-50, 0, baseX.get() + move));
  });
  const x = useTransform(baseX, (v) => `${v}%`);
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 py-5" aria-hidden>
      <motion.div style={{ x }} className="flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-8 pr-8 font-display uppercase text-xl sm:text-3xl tracking-tight whitespace-nowrap">
                {t}<span className="text-[#00F2FE]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
