import { Star, Sparkles } from "lucide-react";
import prisma from "@/lib/prisma";
import { testimonials as staticTestimonials } from "@/lib/testimonials";

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
    <main className="overflow-x-hidden pb-24">
      <div className="container-wide">
        {/* Hero */}
        <section className="text-center pt-8 sm:pt-12 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00F2FE]/30 bg-[#00F2FE]/5 px-3 py-1 text-[8px] font-semibold text-[#00F2FE] mb-5">
            <Sparkles className="w-2.5 h-2.5" />
            Success Stories
          </div>

          <h1
            className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            Hear from our <span className="text-[#00F2FE]">Clients</span>
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
            Discover how Nexora has helped tech professionals land their dream roles, boost their salaries, and build lasting careers.
          </p>
        </section>

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
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full border border-[#00F2FE]/30"
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
      </div>
    </main>
  );
}
