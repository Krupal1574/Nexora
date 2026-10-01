"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MaskLines from "./MaskLines";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

/** Big closing call-to-action reused at the bottom of inner pages. */
export default function CtaSection({
  lines, text, primary, secondary,
}: { lines: ReactNode[]; text: string; primary: { href: string; label: string }; secondary?: { href: string; label: string } }) {
  return (
    <section className="relative section-spacing border-t border-white/10 text-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="glow-drift absolute bottom-0 left-1/2 w-[min(800px,140vw)] h-[400px] bg-[#00F2FE]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="container-wide relative">
        <MaskLines as="h2" className="display display-md" lines={lines} />
        <Reveal delay={0.3}><p className="text-[#94A3B8] text-base sm:text-lg max-w-xl mx-auto mt-6 sm:mt-8 mb-8 sm:mb-10">{text}</p></Reveal>
        <Reveal delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <Magnetic><Link href={primary.href} className="btn-primary w-full sm:w-auto justify-center px-10 py-4 text-base">{primary.label} <ArrowRight className="w-4 h-4" /></Link></Magnetic>
          {secondary && <Magnetic><Link href={secondary.href} className="btn-ghost w-full sm:w-auto justify-center px-10 py-4 text-base">{secondary.label}</Link></Magnetic>}
        </Reveal>
      </div>
    </section>
  );
}
