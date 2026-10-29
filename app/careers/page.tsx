import type { Metadata } from "next";
import OpenRolesCarousel from "@/components/OpenRolesCarousel";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore current job openings at Nexora. We connect talented professionals with outstanding career opportunities across engineering, technology, and more.",
};

export default function CareersPage() {
  return (
    <div className="bg-[#F5F1E8] min-h-[60vh]">
      {/* Hero */}
      <section className="pt-12 pb-6 md:pt-20 md:pb-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#F26A21]">
            Join our network
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-[#0f0f0f] max-w-3xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Careers at Nexora
          </h1>
          <p className="mt-5 text-lg text-[#77736D] max-w-2xl leading-relaxed">
            We partner with leading companies to bring you roles that match your
            skills, ambitions, and growth trajectory. Browse what&apos;s open
            right now.
          </p>
        </div>
      </section>

      {/* Carousel section */}
      <OpenRolesCarousel />
    </div>
  );
}

