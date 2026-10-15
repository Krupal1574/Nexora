import type { ReactNode } from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";

type ContactItem = {
  label: string;
  icon: ReactNode;
  lines: { text: string; href?: string }[];
};

const CONTACTS: ContactItem[] = [
  {
    label: "Email us on",
    icon: <Mail className="w-5 h-5 text-[#F26A21]" />,
    lines: [{ text: "Support@nexorastaffingllp.com", href: "mailto:Support@nexorastaffingllp.com" }],
  },
  {
    label: "Location",
    icon: <MapPin className="w-5 h-5 text-[#F26A21]" />,
    lines: [
      { text: "Casper, WY" },
      { text: "Serving Nationwide" },
    ],
  },
];

/** Pencil bridging two blocks, drawn as inline SVG */
function Illustration() {
  return (
    <svg
      className="w-full h-full max-h-[380px] lg:max-h-[640px] self-end justify-self-end"
      viewBox="0 0 700 620"
      preserveAspectRatio="xMaxYMax meet"
      role="img"
      aria-label="A person standing at the edge of a gap while a giant pencil draws a bridge across it"
    >
      {/* blocks */}
      <rect x="30" y="445" width="223" height="175" fill="#F26A21" />
      <rect x="447" y="445" width="223" height="175" fill="#F26A21" />

      {/* pencil body: three orange/red facets */}
      <polygon points="382,267 411,279 566,-90 537,-102" fill="#E85D15" transform="translate(0 0)" />
      <polygon points="411,279 439,291 594,-78 566,-90" fill="#D95A19" />
      <polygon points="439,291 460,300 622,-66 594,-78" fill="#F26A21" />
      <polygon points="460,300 538,340 690,-22 622,-66" fill="#C54808" />
      {/* rounded scallops where the wood meets the paint */}
      <path d="M382 267 q14 22 29 12 q14 22 28 12 q10 22 21 9 q36 22 78 40" fill="#F26A21" />

      {/* sharpened wood cone */}
      <polygon points="401,445 382,267 538,340" fill="#fafafa" />
      <polygon points="401,445 440,318 538,340" fill="#ececec" opacity=".75" />
      {/* graphite tip */}
      <polygon points="401,445 392,396 428,418" fill="#14181b" />

      {/* line drawn by the pencil */}
      <line x1="253" y1="445" x2="401" y2="445" stroke="#14181b" strokeWidth="3.5" strokeLinecap="round" />

      {/* figure */}
      <g fill="#14181b">
        <circle cx="244" cy="391" r="4.2" />
        <path d="M240 397h8l3 22-2 12 1 14h-3l-1-12h-3l-1 12h-3l1-14-2-12z" />
      </g>
    </svg>
  );
}

export default function NextStepCta() {
  return (
    <section className="container-wide py-16">
      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-center lg:min-h-[640px] max-w-[1440px] mx-auto overflow-hidden rounded-[28px] lg:rounded-[40px] bg-[#f1eee8]">
        <div className="pt-11 px-6 pb-2 lg:p-[72px_24px_72px_72px] max-w-[560px]">
          <h2 className="mb-6 font-display text-4xl sm:text-5xl lg:text-[68px] leading-[1.05] tracking-[-0.035em] font-semibold text-[#0f0f0f]">
            Ready to Take
            <br />
            the Next Step?
          </h2>
          <p className="mb-9 text-[17px] leading-[1.6] text-[#77736D]">
            Whether you&apos;re a job seeker looking for your next opportunity or a company seeking
            exceptional talent, we&apos;re here to help you succeed. Connect with us today.
          </p>

          <ul className="grid gap-[18px]">
            {CONTACTS.map((c) => (
              <li key={c.label} className="flex items-center gap-3.5">
                <div className="flex-none w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
                  {c.icon}
                </div>
                <div>
                  <span className="block text-[13px] text-[#77736D] mb-0.5">{c.label}</span>
                  {c.lines.map((l) =>
                    l.href ? (
                      <a key={l.text} href={l.href} className="block text-base leading-[1.5] text-[#0f0f0f] hover:underline hover:text-[#F26A21] transition-colors">
                        {l.text}
                      </a>
                    ) : (
                      <span key={l.text} className="block text-base leading-[1.5] text-[#0f0f0f]">
                        {l.text}
                      </span>
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Illustration />
      </div>
    </section>
  );
}
