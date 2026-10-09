"use client";

import Image from "next/image";

const companies = [
  { name: "TikTok", src: "/company-logos/tiktok.svg" },
  { name: "Meta", src: "/company-logos/meta.svg" },
  { name: "Amazon", src: "/company-logos/amazon.svg" },
  { name: "PayPal", src: "/company-logos/paypal.svg" },
  { name: "Microsoft", src: "/company-logos/microsoft.svg" },
  { name: "Discover", src: "/company-logos/discover.svg" },
  { name: "Intel", src: "/company-logos/intel.svg" },
  { name: "Google", src: "/company-logos/google.svg" },
  { name: "Accenture", src: "/company-logos/accenture.png" },
  { name: "Fidelity", src: "/company-logos/fidelity.svg" },
  { name: "Citi", src: "/company-logos/citi.svg" },
  { name: "Qualcomm", src: "/company-logos/qualcomm.svg" },
  { name: "Slalom", src: "/company-logos/slalom.svg" },
  { name: "Stripe", src: "/company-logos/stripe.svg" },
  { name: "Slack", src: "/company-logos/slack.svg" },
];

const marqueeCompanies = [...companies, ...companies];

export default function CompanyLogos() {
  return (
    <section
      aria-label="Companies where Nexora candidates have been placed"
      className="relative overflow-hidden border-y border-black/10 bg-[#F5F1E8] py-14"
    >
      <div className="mx-auto mb-9 max-w-6xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#77736D]">
          Candidates Placed In
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="company-marquee flex w-max items-center gap-16">
          {marqueeCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="group flex h-12 w-[150px] shrink-0 items-center justify-center"
              title={company.name}
            >
              <Image
                src={company.src}
                alt={company.name}
                width={150}
                height={48}
                className="max-h-8 w-auto max-w-[130px] object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#F5F1E8] to-transparent"
      />

      {/* Right fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#F5F1E8] to-transparent"
      />

      <style jsx>{`
        @keyframes company-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .company-marquee {
          animation: company-marquee 40s linear infinite;
        }

        .company-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .company-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
