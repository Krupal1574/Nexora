"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

export type PreviewItem = { title: string; desc: string; tag: string; image: string; href?: string };

/**
 * Numbered rows. Hovering a row shows a floating image that trails the cursor
 * (desktop only — on touch the rows just behave as normal links).
 */
export default function HoverPreviewList({ items }: { items: PreviewItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 20, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 20, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left + 28);          // offset from cursor
    my.set(e.clientY - r.top - 110);
  };

  return (
    <div ref={box} className="relative" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
      {items.map((s, i) => (
        <Link key={s.title} href={s.href ?? "/services"} className="row-link group" onMouseEnter={() => setActive(i)}>
          <span className="font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight">{s.title}</h3>
            <p className="muted text-sm text-[#94A3B8] mt-2 max-w-lg">{s.desc}</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="row-tag text-xs uppercase tracking-widest border border-current/30 rounded-full px-3 py-1">{s.tag}</span>
            <ArrowUpRight className="w-7 h-7 transition-transform duration-500 group-hover:rotate-45" />
          </div>
        </Link>
      ))}

      {/* floating preview — hidden on touch / small screens */}
      <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block">
        <AnimatePresence mode="wait">
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-56 w-72 overflow-hidden rounded-2xl border border-white/20 shadow-[0_30px_80px_-20px_rgba(0,242,254,.45)]"
            >
              <Image src={items[active].image} alt="" fill sizes="288px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080f]/60 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
