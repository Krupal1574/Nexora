"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/** Image that drifts slower than the page inside its frame. */
export default function ParallaxImage({ src, alt, sizes, className = "" }: { src: string; alt: string; sizes: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: 1.25 }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
