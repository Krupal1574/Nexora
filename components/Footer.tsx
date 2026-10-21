"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { navigation, siteConfig, servicesList } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-[#171717] text-white overflow-hidden">
      {/* ── TOP HERO CTA: Career & Hiring (Merged Horizon Transition) ── */}
      <section className="nexora-footer-cta-wrapper" aria-labelledby="nexora-footer-cta-title">
        <div className="nexora-cta-shell">
          <div className="nexora-cta-card">
            {/* Ambient warm backlight behind the model */}
            <div className="nexora-cta-backdrop-glow" aria-hidden="true" />

            <div className="nexora-cta-copy">
              <div className="nexora-cta-eyebrow-badge">
                <span className="nexora-cta-pulse-dot" aria-hidden="true" />
                <span>PEOPLE · TRUST · GROWTH</span>
              </div>
              <h2 id="nexora-footer-cta-title">
                Got a Job Hunt Stress or Hiring Problem?{" "}
                <span className="nexora-cta-accent-text">We Love Those.</span>
              </h2>
              <p className="nexora-cta-description">
                Big careers and great teams usually start with a simple
                conversation. Tell us what you need, and let’s find the right
                next step together.
              </p>
              <div className="nexora-cta-actions">
                <Link
                  className="nexora-cta-button nexora-cta-button-primary"
                  href="/contact"
                >
                  Book a Free Call <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  className="nexora-cta-button nexora-cta-button-secondary"
                  href="/services"
                >
                  Start Your Journey
                </Link>
              </div>
            </div>

            <div className="nexora-cta-model" aria-hidden="true">
              <Image
                src="/images/nexora-career-model.png"
                alt="Nexora career advisor ready to assist"
                fill
                sizes="(max-width: 760px) 80vw, 440px"
                className="nexora-cta-model-image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BACKGROUND GLOWS FOR FOOTER BODY ── */}
      <div className="absolute top-96 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#F26A21]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#8FB8D8]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* ── MAIN FOOTER NAVIGATION COLUMNS ── */}
      <div className="container-wide pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <Image
                src="/LOGO.png"
                alt="Nexora logo"
                width={40}
                height={40}
                className="rounded-xl shadow-[0_0_20px_#F26A2155] group-hover:shadow-[0_0_28px_#F26A2177] transition-shadow duration-300 object-contain"
              />
              <span
                className="text-2xl font-bold tracking-tight"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  background: "linear-gradient(135deg, #ffffff 0%, #F26A21 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nexora
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-[270px]">
              Nexora provides practical career and talent support for people
              navigating their next opportunity.
            </p>
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] animate-pulse" />
              Casper, WY — Serving Nationwide
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest relative pb-3">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#F26A21] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-[#F26A21] transition-all duration-200 group hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21]/40 group-hover:bg-[#F26A21] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest relative pb-3">
              Our Services
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#8FB8D8] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {servicesList.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-[#F26A21] transition-all duration-200 group hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8D8]/40 group-hover:bg-[#8FB8D8] transition-colors flex-shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest relative pb-3">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#F26A21] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F26A21]/15 group-hover:border-[#F26A21]/30 transition-all duration-300">
                    <Phone className="w-4 h-4 text-[#F26A21]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 font-semibold uppercase tracking-widest mb-0.5">
                      Phone
                    </p>
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">
                      {siteConfig.contact.phoneDisplay}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8FB8D8]/15 group-hover:border-[#8FB8D8]/30 transition-all duration-300">
                    <Mail className="w-4 h-4 text-[#8FB8D8]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 font-semibold uppercase tracking-widest mb-0.5">
                      Email
                    </p>
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors font-medium break-all">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E1306C]/15 group-hover:border-[#E1306C]/30 transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-[#E1306C]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center h-10">
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">
                      Instagram
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A66C2]/15 group-hover:border-[#0A66C2]/30 transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-[#0A66C2]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center h-10">
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">
                      LinkedIn
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR: Legal & E-Verify ── */}
      <div className="container-wide pb-24 lg:pb-8 relative z-10">
        <div className="h-px bg-white/10" />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center">
            © {new Date().getFullYear()}{" "}
            <span className="text-white/80 font-medium">Nexora</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/privacy-policy"
              className="text-white/60 text-sm hover:text-[#F26A21] transition-colors px-3 py-1 rounded-md hover:bg-white/5"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/terms-and-conditions"
              className="text-white/60 text-sm hover:text-[#F26A21] transition-colors px-3 py-1 rounded-md hover:bg-white/5"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        {/* E-Verify row */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-4">
            <a
              href="https://www.e-verify.gov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="E-Verify Employer"
              className="group bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
            >
              <Image
                src="/imagec/everyfiy.png"
                alt="E-Verify Employer"
                width={120}
                height={28}
                className="h-6 w-auto object-contain"
              />
            </a>
          </div>
          <p className="text-white/50 text-xs text-center">
            Authorized E-Verify Employer · Employment eligibility verified per federal law
          </p>
        </div>
      </div>

      <style jsx>{`
        .nexora-footer-cta-wrapper {
          --nexora-cream: #f5f1e8;
          --nexora-coal: #171717;
          --nexora-orange: #f26a21;
          --nexora-blue: #8fb8d8;
          background: linear-gradient(
            to bottom,
            var(--nexora-cream) 0%,
            var(--nexora-cream) 48%,
            var(--nexora-coal) 48%,
            var(--nexora-coal) 100%
          );
          padding: 80px 24px 30px;
          overflow: hidden;
        }

        .nexora-cta-shell {
          width: min(var(--container-max, 1360px), 100%);
          margin: 0 auto;
        }

        .nexora-cta-card {
          position: relative;
          isolation: isolate;
          display: flex;
          align-items: center;
          min-height: 320px;
          overflow: visible;
          border-radius: 28px;
          padding: 50px 44% 46px 50px;
          color: #fff;
          background: 
            radial-gradient(circle at 84% 50%, rgba(242, 106, 33, 0.28) 0%, rgba(242, 106, 33, 0.08) 45%, transparent 72%),
            linear-gradient(112deg, #141316 0%, #1a1820 40%, #251c1c 72%, #381b13 100%);
          box-shadow: 
            0 28px 72px -12px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .nexora-cta-backdrop-glow {
          position: absolute;
          right: 6%;
          top: 15%;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(242, 106, 33, 0.32) 0%, rgba(242, 106, 33, 0.08) 50%, transparent 70%);
          filter: blur(48px);
          pointer-events: none;
          z-index: 1;
        }

        .nexora-cta-copy {
          position: relative;
          z-index: 3;
          max-width: 520px;
        }

        .nexora-cta-eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(242, 106, 33, 0.12);
          border: 1px solid rgba(242, 106, 33, 0.26);
          color: #f6c2a5;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.14em;
          margin-bottom: 16px;
          backdrop-filter: blur(8px);
        }

        .nexora-cta-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f26a21;
          box-shadow: 0 0 10px #f26a21;
          animation: nexoraPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes nexoraPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.85); }
        }

        .nexora-cta-copy h2 {
          max-width: 520px;
          margin: 0;
          font-size: clamp(28px, 3.2vw, 42px);
          line-height: 1.1;
          font-weight: 750;
          letter-spacing: -0.04em;
          text-wrap: balance;
          font-family: "Space Grotesk", sans-serif;
        }

        .nexora-cta-accent-text {
          background: linear-gradient(135deg, #ffffff 0%, #f6c2a5 55%, #f26a21 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nexora-cta-description {
          max-width: 440px;
          margin: 16px 0 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 14.5px;
          line-height: 1.65;
        }

        .nexora-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .nexora-cta-button {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid transparent;
          border-radius: 999px;
          padding: 0 22px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .nexora-cta-button:hover {
          transform: translateY(-2px);
        }

        .nexora-cta-button-primary {
          color: var(--nexora-coal);
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .nexora-cta-button-primary:hover {
          background: #fdfaf6;
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
        }

        .nexora-cta-button-secondary {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(8px);
        }

        .nexora-cta-button-secondary:hover {
          border-color: rgba(242, 106, 33, 0.6);
          background: rgba(242, 106, 33, 0.16);
          color: #ffffff;
        }

        .nexora-cta-model {
          position: absolute;
          z-index: 2;
          right: 3%;
          bottom: 0;
          width: min(40%, 420px);
          height: 120%;
          pointer-events: none;
        }

        .nexora-cta-model-image {
          object-fit: contain;
          object-position: center bottom;
          filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.3));
        }

        @media (min-width: 1500px) {
          .nexora-footer-cta-wrapper { padding-top: 100px; padding-bottom: 40px; }
          .nexora-cta-card { min-height: 340px; }
        }

        @media (max-width: 760px) {
          .nexora-footer-cta-wrapper {
            padding: 50px 18px 24px;
            background: linear-gradient(
              to bottom,
              var(--nexora-cream) 0%,
              var(--nexora-cream) 38%,
              var(--nexora-coal) 38%,
              var(--nexora-coal) 100%
            );
          }

          .nexora-cta-card {
            display: block;
            min-height: 0;
            padding: 36px 24px 0;
            border-radius: 22px;
          }

          .nexora-cta-copy { max-width: 100%; padding-bottom: 270px; }
          .nexora-cta-copy h2 { max-width: 440px; font-size: clamp(26px, 7.5vw, 36px); }
          .nexora-cta-description { font-size: 13.5px; }
          .nexora-cta-actions { gap: 10px; margin-top: 20px; }
          .nexora-cta-button { min-height: 42px; padding-inline: 16px; font-size: 12px; }

          .nexora-cta-model {
            right: 4%;
            width: min(76%, 330px);
            height: 285px;
          }

          .nexora-cta-backdrop-glow {
            right: 8%;
            top: auto;
            bottom: 40px;
            width: 240px;
            height: 240px;
          }
        }

        @media (max-width: 390px) {
          .nexora-cta-card { padding-inline: 18px; }
          .nexora-cta-copy { padding-bottom: 240px; }
          .nexora-cta-model { width: 82%; height: 255px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nexora-cta-button { transition: none; }
          .nexora-cta-button:hover { transform: none; }
          .nexora-cta-pulse-dot { animation: none; }
        }
      `}</style>
    </footer>
  );
}
