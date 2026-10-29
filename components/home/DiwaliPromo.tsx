"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DiwaliPromo() {
  const pathname = usePathname();

  const handleExplore = (e: React.MouseEvent) => {
    if (pathname === "/shop") {
      e.preventDefault();
      const el = document.getElementById("shop-products");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollBy({ top: 600, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      aria-labelledby="diwali-promo-title"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#ead8c4]/60 bg-[#FFFDF9] shadow-sm">
        <Image
          src="/images/diwalinexora.svg"
          alt="Nexora Staffing LLP Diwali special offers"
          width={1440}
          height={560}
          priority
          className="h-auto w-full"
        />
        <h2 id="diwali-promo-title" className="sr-only">
          Diwali special offers from Nexora
        </h2>

        {/* Clickable overlay positioned over the SVG's "EXPLORE OFFERS" button */}
        <Link
          href="/shop#shop-products"
          onClick={handleExplore}
          aria-label="Explore Nexora Diwali shop offers"
          className="absolute left-[5%] bottom-[12%] h-[12%] w-[20%] z-10 cursor-pointer rounded-full outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F26A21]"
        />
      </div>
    </section>
  );
}
