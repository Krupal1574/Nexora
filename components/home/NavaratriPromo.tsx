import Image from "next/image";
import Link from "next/link";

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
        {/* Overlay CTA makes the artwork's visual button functional. */}
        <Link
          href="/shop"
          aria-label="Explore Nexora shop offers"
          className="absolute left-[6.7%] top-[71%] h-[10.5%] w-[17.5%] rounded-full outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#171717]"
        />
      </div>
    </section>
  );
}
