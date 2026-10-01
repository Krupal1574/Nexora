"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "nx-loaded";

/** True once the intro curtain has finished (or was already seen this session). */
export function useSiteReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem(KEY)) { setReady(true); return; }
    const on = () => setReady(true);
    window.addEventListener("nx:ready", on);
    return () => window.removeEventListener("nx:ready", on);
  }, []);
  return ready;
}

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) { setShow(false); return; }
    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1800, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => {
        sessionStorage.setItem(KEY, "1");
        document.body.style.overflow = "";
        setShow(false);
        setTimeout(() => window.dispatchEvent(new Event("nx:ready")), 500);
      }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[200] bg-[#06080f] flex flex-col justify-between p-6 sm:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between text-[11px] tracking-[0.3em] uppercase text-white/50">
            <span>Nexora</span><span>IT Staffing Studio</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="font-display font-bold leading-none text-[#00F2FE] text-[22vw] sm:text-[16vw] tabular-nums">
              {String(n).padStart(3, "0")}
            </div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/50 pb-4">Loading</span>
          </div>
          <div className="absolute left-0 bottom-0 h-[3px] bg-[#00F2FE]" style={{ width: `${n}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
