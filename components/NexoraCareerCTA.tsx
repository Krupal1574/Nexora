"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Nexora career / hiring CTA.
 * Uses the supplied transparent model image at:
 * public/images/nexora-career-model.png
 */
export default function NexoraCareerCTA() {
  return (
    <section className="nexora-cta-section" aria-labelledby="nexora-cta-title">
      <div className="nexora-cta-shell">
        <div className="nexora-cta-card">
          {/* Ambient warm backlight behind the model */}
          <div className="nexora-cta-backdrop-glow" aria-hidden="true" />

          <div className="nexora-cta-copy">
            <div className="nexora-cta-eyebrow-badge">
              <span className="nexora-cta-pulse-dot" aria-hidden="true" />
              <span>PEOPLE · TRUST · GROWTH</span>
            </div>
            <h2 id="nexora-cta-title">
              Got a Job Hunt Stress or Hiring Problem?{" "}
              <span className="nexora-cta-accent-text">We Love Those.</span>
            </h2>
            <p className="nexora-cta-description">
              Big careers and great teams usually start with a simple
              conversation. Tell us what you need, and let’s find the right
              next step together.
            </p>
            <div className="nexora-cta-actions">
              <Link className="nexora-cta-button nexora-cta-button-primary" href="/contact">
                Book a Free Call <span aria-hidden="true">↗</span>
              </Link>
              <Link className="nexora-cta-button nexora-cta-button-secondary" href="/services">
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

      <style jsx>{`
        .nexora-cta-section {
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
          padding: 108px 24px 76px;
          overflow: hidden;
        }

        .nexora-cta-shell {
          width: min(1120px, 100%);
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
          .nexora-cta-section { padding-top: 128px; padding-bottom: 92px; }
          .nexora-cta-card { min-height: 340px; }
        }

        @media (max-width: 760px) {
          .nexora-cta-section {
            padding: 74px 18px 48px;
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
    </section>
  );
}
