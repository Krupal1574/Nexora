"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Briefcase } from "lucide-react";

const roles = [
  {
    title: "Civil Engineer Project Manager",
    subtitle: "Land Development",
    location: "Doylestown, PA",
    salary: "$110k–$150k",
    type: "Full-time, office-based with flexible work model",
    href: "/careers/civil-engineer-project-manager-land-development",
    image: "/images/careers/civil-engineer-project-manager.jpg",
  },
  {
    title: "Full-Stack Software Engineer",
    subtitle: "Retell AI",
    location: "Redwood City, CA",
    salary: "$215k–$290k",
    type: "Full-time, on-site",
    href: "/careers/full-stack-software-engineer-retell-ai",
    image: "/images/careers/full-stack-software-engineer.jpg",
  },
];

export default function OpenRolesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag logic state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft: sLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(sLeft > 4);
      setCanScrollRight(sLeft + clientWidth < scrollWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const step = () => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector(".role-card") as HTMLElement;
      if (card) return card.offsetWidth + 24;
    }
    return 420;
  };

  const scrollByAmount = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByAmount(-step());
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByAmount(step());
    }
  };

  // Pointer drag handlers for mouse users
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    isDown.current = true;
    hasMoved.current = false;
    startX.current = e.clientX;
    scrollLeft.current = trackRef.current?.scrollLeft || 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDown.current) return;
    const d = e.clientX - startX.current;
    if (Math.abs(d) > 4) {
      hasMoved.current = true;
      if (trackRef.current) trackRef.current.classList.add("cursor-grabbing");
    }
    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollLeft.current - d;
    }
  };

  const handlePointerUp = () => {
    isDown.current = false;
    if (trackRef.current) trackRef.current.classList.remove("cursor-grabbing");
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-transparent">
      <div className="flex items-center justify-between gap-6 px-6 md:px-12 mb-10 max-w-[1400px] mx-auto">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F26A21]">
            Opportunities
          </p>
          <h2 className="text-3xl md:text-[3.5rem] md:leading-[1.05] font-semibold tracking-[-0.03em] text-[#0f0f0f]">
            Current Openings
          </h2>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            disabled={!canScrollLeft}
            onClick={() => scrollByAmount(-step())}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0f0f0f] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-default transition-transform hover:scale-105 active:scale-95 hover:bg-[#F26A21]"
            aria-label="Previous openings"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            type="button"
            disabled={!canScrollRight}
            onClick={() => scrollByAmount(step())}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0f0f0f] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-default transition-transform hover:scale-105 active:scale-95 hover:bg-[#F26A21]"
            aria-label="Next openings"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onScroll={checkScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-6 cursor-grab select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]/50 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="region"
        aria-label="Current openings list. Use left and right arrow keys to navigate."
      >
        <div className="w-[calc(max(0px,(100vw-1400px)/2))] shrink-0" />
        {roles.map((role) => (
          <article
            key={role.href}
            className="role-card flex-[0_0_min(400px,82vw)] snap-start bg-[#f1eee8] rounded-[28px] flex flex-col overflow-hidden"
          >
            <div className="p-8 pb-6">
              <div className="flex justify-between items-center mb-8">
                <span className="inline-flex items-center gap-2 bg-[#ff2b2b] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Open
                </span>
                <span className="text-xs text-[#8a8680]">Now hiring</span>
              </div>

              <h3 className="text-[34px] font-bold tracking-[-0.03em] text-[#0f0f0f] mb-1 leading-[1.1]">
                {role.title}
              </h3>
              <p className="text-[17px] text-[#0f0f0f]/70 mb-6">{role.subtitle}</p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium">
                  <MapPin className="w-4 h-4 text-[#0f0f0f]" /> {role.location}
                </span>
                <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium">
                  <Briefcase className="w-4 h-4 text-[#0f0f0f]" /> {role.salary}
                </span>
              </div>

              <p className="mt-3 text-sm text-[#8a8680]">{role.type}</p>
            </div>

            <div
              className="relative h-[268px] mt-auto flex items-center justify-center overflow-hidden rounded-[28px] bg-[#1a1a1a] group"
            >
              <Image
                src={role.image}
                alt={`${role.title} – ${role.subtitle}`}
                fill
                sizes="(max-width: 768px) 82vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <Link
                href={role.href}
                onClick={(e) => {
                  if (hasMoved.current) {
                    e.preventDefault();
                    hasMoved.current = false;
                  }
                }}
                className="absolute left-4 bottom-4 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-white border-0 rounded-full py-2.5 pl-4 pr-3 text-[13px] font-semibold transition-colors hover:bg-white/30 z-20 shadow-md"
              >
                View Role
                <span className="w-6 h-6 rounded-full bg-white text-[#0f0f0f] flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </article>
        ))}
        <div className="w-[calc(max(0px,(100vw-1400px)/2))] shrink-0" />
      </div>
    </section>
  );
}
