"use client";


import Image from "next/image";

export default function NavaratriPromo() {
  return (
    <section
      aria-labelledby="navaratri-promo-title"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src="/images/navaratrinexora_v2.svg"
          alt="Nexora Staffing LLP Navaratri special offers"
          width={1440}
          height={560}
          priority
          className="h-auto w-full"
        />
        <h2 id="navaratri-promo-title" className="sr-only">
          Navaratri special offers from Nexora
        </h2>

        {/* Clickable overlay positioned over the SVG's "EXPLORE OFFERS" button */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("shop-products");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              window.scrollBy({ top: 600, behavior: "smooth" });
            }
          }}
          aria-label="Explore Nexora shop offers"
          className="absolute left-[5%] bottom-[12%] h-[12%] w-[20%] z-10 cursor-pointer rounded-full outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F26A21]"
        />
      </div>
    </section>
  );
}
