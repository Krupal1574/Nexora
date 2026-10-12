"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Briefcase, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PLACEMENTS = [
  { role: "Product Manager", co: "Citi", slug: "citi", bg: "#2a5be0", loc: "Texas", pay: "$130k", text: "A candidate has officially secured a Product Mgmt Lead Analyst C13, Vice President role at Citibank, Irving, Texas, with an annual base salary of $130K! A senior-level opportunity with a global financial powerhouse and a career milestone that opens the door to bigger things ahead." },
  { role: "Architect", co: "Slalom", slug: "slalom", bg: "#0c64ff", loc: "Seattle", pay: "$150k", text: "A candidate has secured an Architect role at Slalom with an annual salary of $150K. A bigger role. A bigger opportunity. And another career milestone unlocked. The next chapter starts October 26, 2026." },
  { role: "Marketing Analyst", co: "LifeStance", slug: "lifestance", bg: "#000", loc: "California", pay: "$110k", text: "A candidate has secured the role of Senior Marketing Analyst at LifeStance Health in California, with a starting salary of $110K. A new role, a new milestone, and another career chapter unlocked." },
  { role: "Product Manager", co: "Unilever", slug: "uniliver", bg: "#0070CE", loc: "Hoboken", pay: "$120k", text: "A candidate has officially received an offer from Unilever, Hoboken, New Jersey as an Associate CO Data & Analytics Product Manager, with an annual base salary of $120K, plus a $7.5K sign-on bonus! A global company, a high-impact role, and a new chapter built around bigger opportunities." },
  { role: "Software Developer", co: "Amazon", slug: "amazon", bg: "#000000", loc: "Washington", pay: "$165k", text: "A candidate has officially received an offer from Amazon, Redmond, Washington as a Software Development Engineer Big Data, AWS Elastic MapReduce (EMR) with an annual base salary of $165K! A massive career milestone, a dream opportunity, and a new chapter in innovation and growth." },
  { role: "Senior Consultant", co: "Deloitte", slug: "deloitte", bg: "#86BC25", loc: "Georgia", pay: "$133k", text: "A candidate has officially received an offer from Deloitte, Atlanta, Georgia as a Senior Consultant Strategy, Growth & Transformation, with an annual salary of $133K! A big career milestone, a new chapter of growth, and another opportunity to make an impact." },
  { role: "Data Scientist", co: "American Airlines", slug: "american-airlines", bg: "#0078d2", loc: "Texas", pay: "$124k", text: "A candidate has officially received an offer from American Airlines as a Data Scientist / Senior Data Scientist – Safety, with an annual salary of $124K! A major career milestone and an exciting new chapter with one of the world’s leading airlines." },
  { role: "Developer", co: "Neuberger Berman", slug: "neuberg", bg: "#6B1A3C", loc: "New York", pay: "$140k", text: "A candidate has officially stepped into a Developer III, Assistant Vice President role at Neuberger Berman, New York, with an impressive $140K annual base salary! A well-earned opportunity that reflects the effort behind the journey." },
  { role: "Software Engineer", co: "DriveWealth", slug: "drivewealth", bg: "#0e9f6e", loc: "Chicago", pay: "$190k", text: "A candidate has secured a Software Development Engineer role at DriveWealth, Chicago, in a hybrid setup, with an impressive $190K annual package! A huge payoff for the skills, consistency, and effort that went into the journey." },
  { role: "Engineer", co: "Qualcomm", slug: "qualcomm", bg: "#3253dc", loc: "San Diego", pay: "$229k", text: "A candidate has officially joined Qualcomm, San Diego, California as an Engineer, with a total compensation of $229.3K! One incredible offer, a major milestone, and a well-earned opportunity to take the career to the next level." },
  { role: "Software Engineer", co: "Strategic Insurance", slug: "strategic-insurance", bg: "#7a1f2b", loc: "Texas", pay: "$145k", text: "A candidate has secured a Software Engineer role at Strategic Insurance, Texas, with an impressive $145K package! Months of learning, sharpening skills, and staying committed have led to this moment." },
  { role: "Product Manager", co: "Fiserv", slug: "fiserv", bg: "#ff6600", loc: "Milwaukee, WI", pay: "$180k", text: "A candidate has officially secured a Product Manager role at Fiserv, Milwaukee, Wisconsin, with an impressive $180K package! A milestone like this is built on persistence, preparation, and showing up for every opportunity." }
];

export default function LivePlacements() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedPlacement, setSelectedPlacement] = useState<typeof PLACEMENTS[0] | null>(null);

  // Drag logic state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollByAmount = (amount: number) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const step = () => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector(".placement-card") as HTMLElement;
      if (card) {
        return card.offsetWidth + 22;
      }
    }
    return 300;
  };

  // Mouse drag handlers
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

  const handleCardClick = (e: React.MouseEvent, placement: typeof PLACEMENTS[0]) => {
    if (hasMoved.current) {
      e.stopPropagation();
      e.preventDefault();
      hasMoved.current = false;
      return;
    }
    setSelectedPlacement(placement);
  };

  // Close modal on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPlacement(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-transparent">
      <div className="flex items-center justify-between gap-6 px-6 md:px-12 mb-10 max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-[3.5rem] md:leading-[1.05] font-semibold tracking-[-0.03em] text-[#0f0f0f]">
          Live Placement Updates
        </h2>
        <div className="flex gap-3 shrink-0">
          <button
            disabled={!canScrollLeft}
            onClick={() => scrollByAmount(-step())}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0f0f0f] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-default transition-transform hover:scale-105 active:scale-95"
            aria-label="Previous"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            disabled={!canScrollRight}
            onClick={() => scrollByAmount(step())}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0f0f0f] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-default transition-transform hover:scale-105 active:scale-95"
            aria-label="Next"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-6 cursor-grab select-none [&::-webkit-scrollbar]:hidden"
        onScroll={checkScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="w-[calc(max(0px,(100vw-1400px)/2))] shrink-0" />
        {PLACEMENTS.map((p, i) => (
          <div
            key={i}
            className="placement-card flex-[0_0_min(400px,82vw)] snap-start bg-[#f1eee8] rounded-[28px] flex flex-col overflow-hidden"
            onClickCapture={(e) => {
              if (hasMoved.current) {
                e.stopPropagation();
              }
            }}
          >
            <div className="p-8 pb-6">
              <div className="flex justify-between items-center mb-8">
                <span className="inline-flex items-center gap-2 bg-[#ff2b2b] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live
                </span>
                <span className="text-xs text-[#8a8680]">Recently Updated</span>
              </div>
              <h3 className="text-[34px] font-bold tracking-[-0.03em] text-[#0f0f0f] mb-3 leading-[1.1]">{p.role}</h3>
              <p className="text-[17px] text-[#0f0f0f] mb-6">Received offer letter from {p.co}</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium">
                  <MapPin className="w-4 h-4 text-[#0f0f0f]" /> {p.loc}
                </span>
                <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium">
                  <Briefcase className="w-4 h-4 text-[#0f0f0f]" /> {p.pay}
                </span>
              </div>
            </div>
            <div className="relative h-[268px] mt-auto flex items-center justify-center overflow-hidden rounded-[28px] group" style={{ background: p.bg }}>
              <div 
                className="font-bold text-[44px] tracking-[-0.04em] text-center px-6 leading-none hidden"
                style={{ color: p.bg === '#ffffff' ? '#0f0f0f' : '#ffffff' }}
              >
                {p.co}
              </div>
              <img
                src={`/fwd/${p.slug}.png`}
                alt={`${p.co} logo`}
                loading="lazy"
                className={`z-10 relative pointer-events-none ${
                  ["uniliver", "neuberg"].includes(p.slug)
                    ? "absolute inset-0 w-full h-full object-cover"
                    : "max-w-[62%] max-h-[110px] object-contain"
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const prev = (e.target as HTMLImageElement).previousElementSibling as HTMLElement;
                  if (prev) prev.style.display = "block";
                }}
              />
              <button
                onClick={(e) => handleCardClick(e, p)}
                className="absolute left-4 bottom-4 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-white border-0 rounded-full py-2.5 pl-4 pr-3 text-[13px] font-semibold cursor-pointer transition-colors hover:bg-white/30 z-20"
              >
                View More
                <div className="w-6 h-6 rounded-full bg-white text-[#0f0f0f] flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        ))}
        <div className="w-[calc(max(0px,(100vw-1400px)/2))] shrink-0" />
      </div>

      <AnimatePresence>
        {selectedPlacement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedPlacement(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-[560px] max-h-[92vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedPlacement(null)}
                className="absolute top-3.5 right-3.5 w-[38px] h-[38px] rounded-full bg-white text-[#0f0f0f] flex items-center justify-center z-20 hover:bg-gray-100 transition-colors shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="h-[200px] flex items-center justify-center relative rounded-t-[28px]" style={{ background: selectedPlacement.bg }}>
                <div 
                  className="font-bold text-[44px] tracking-[-0.04em] text-center px-6 leading-none hidden"
                  style={{ color: selectedPlacement.bg === '#ffffff' ? '#0f0f0f' : '#ffffff' }}
                >
                  {selectedPlacement.co}
                </div>
                <img
                  src={`/fwd/${selectedPlacement.slug}.png`}
                  alt={`${selectedPlacement.co} logo`}
                  className={`${ 
                    ["uniliver", "neuberg"].includes(selectedPlacement.slug)
                      ? "absolute inset-0 w-full h-full object-cover rounded-t-[28px]"
                      : "max-w-[62%] max-h-[110px] object-contain"
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const prev = (e.target as HTMLImageElement).previousElementSibling as HTMLElement;
                    if (prev) prev.style.display = "block";
                  }}
                />
              </div>
              <div className="p-7 pt-7 pb-8">
                <h4 className="text-[28px] font-semibold tracking-[-0.02em] text-[#0f0f0f] mb-1.5">{selectedPlacement.role}</h4>
                <p className="text-[#6b6760] text-[15px] font-medium mb-4">
                  {selectedPlacement.co} · {selectedPlacement.loc} · {selectedPlacement.pay}
                </p>
                <p className="text-[#0f0f0f] text-[16px] leading-[1.6]">
                  {selectedPlacement.text}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
