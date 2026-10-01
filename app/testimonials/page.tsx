import { Star, Sparkles } from "lucide-react";
import Image from "next/image";
import prisma from "@/lib/prisma";
import PageHero from "@/components/motion/PageHero";
import { testimonials as staticTestimonials } from "@/lib/testimonials";
import TestimonialForm from "@/components/TestimonialForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Client Testimonials",
  description: "Read what our clients have to say about Nexora's career services.",
};

export default async function TestimonialsPage() {
  let testimonials: any[] = [];

  try {
    testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // fallback to static data if DB is unreachable
  }

  // If no DB entries yet, show static data
  if (testimonials.length === 0) {
    testimonials = staticTestimonials.map((t) => ({
      ...t,
      published: true,
    }));
  }

  return (
    <main className="overflow-x-clip pb-24">
      <div className="container-wide">
        {/* Hero */}
        <PageHero
          align="center"
          eyebrow="Success Stories"
          lines={[
            "Hear from our ",
            <span key="clients" className="accent">Clients</span>,
          ]}
          sub="Discover how Nexora has helped tech professionals land their dream roles, boost their salaries, and build lasting careers."
        />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial: any) => (
            <div
              key={testimonial.id}
              className="group rounded-2xl bg-[#121923] border border-[#203548] p-6 hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-[#00F2FE] fill-[#00F2FE]"
                        : "text-[#203548]"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 flex-grow italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#203548]">
                <Image
                  src={testimonial.avatar}
                  alt={`${testimonial.name}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full border border-[#00F2FE]/30"
                />
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#64748B] text-xs">
                    {testimonial.role}{testimonial.company ? ` at ${testimonial.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submission Form */}
        <TestimonialForm />
      </div>
    </main>
  );
}
