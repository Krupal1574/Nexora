"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Filter,
  ShoppingCart,
  ChevronDown,
  CheckCircle2,
  Tag,
  Sparkles,
} from "lucide-react";
import { products, shopFAQ, type CategoryFilter, type SortOption, filterAndSort } from "@/lib/shop";
import { useCart } from "@/lib/cart";
import ShopPromo from "@/components/ShopPromo";

export default function ShopPage() {
  const { addToCart, openCart } = useCart();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortOption>("popular");

  const displayProducts = useMemo(
    () => filterAndSort(products, category, sort),
    [category, sort]
  );

  return (
    <div className="overflow-x-hidden">
      <ShopPromo />

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 lg:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F19]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#00F2FE14_0%,transparent_65%)]" />
        
        <div className="relative container-wide text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F2FE]/25 bg-[#00F2FE]/8 text-[#00F2FE] text-sm font-medium mb-6">
            <Tag className="w-4 h-4" />
            Limited Time Offers
          </div>
          
          <h1 className="hero-title max-w-4xl mx-auto text-white mb-6">
            Invest in Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Career Success
            </span>
          </h1>
          <p className="text-[#94A3B8] text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Choose the perfect plan to accelerate your job search, optimize your profile, and land your dream role faster.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PROMO BANNER
      ════════════════════════════════════════════════════════ */}
      <section className="container-wide mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-[#00F2FE]/10 to-[#00D2C4]/10 border border-[#00F2FE]/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00F2FE]/[0.05] rounded-full blur-[80px] pointer-events-none" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#00F2FE]/20 border border-[#00F2FE]/30 flex items-center justify-center flex-shrink-0 text-[#00F2FE]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white text-lg font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Save up to 33% on Career Packages
                </h3>
                <p className="text-[#94A3B8] text-sm mt-1">
                  Introductory pricing available for a limited time.
                </p>
              </div>
           </div>
           <Link href="#products" className="btn-primary text-sm whitespace-nowrap relative z-10">
             Explore Packages <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PRODUCTS & FILTERS
      ════════════════════════════════════════════════════════ */}
      <section id="products" className="container-wide pb-24 scroll-mt-24">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#2D3748]/60">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <button
              onClick={() => setCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === "all"
                  ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30"
                  : "bg-transparent text-[#94A3B8] border border-transparent hover:text-white hover:bg-[#1A202C]"
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setCategory("package")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === "package"
                   ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30"
                  : "bg-transparent text-[#94A3B8] border border-transparent hover:text-white hover:bg-[#1A202C]"
              }`}
            >
              Career Packages
            </button>
            <button
              onClick={() => setCategory("individual")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === "individual"
                  ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30"
                  : "bg-transparent text-[#94A3B8] border border-transparent hover:text-white hover:bg-[#1A202C]"
              }`}
            >
              Individual Services
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <Filter className="w-4 h-4" />
            <span>Sort by:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none bg-[#1A202C] border border-[#2D3748] rounded-lg pl-3 pr-8 py-1.5 text-white outline-none focus:border-[#00F2FE]/50 transition-colors cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {displayProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="glass-card flex flex-col relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,242,254,0.1)] p-0"
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="bg-gradient-to-r from-[#00F2FE] to-[#00D2C4] text-[#0B0F19] px-2.5 py-1 rounded-md text-xs font-bold shadow-lg">
                    {product.discountPercent}% OFF
                  </span>
                  {product.badge && (
                    <span className="bg-[#1A202C]/90 backdrop-blur-md border border-[#00F2FE]/30 text-white px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Card Header area */}
                <div className="pt-12 px-6 pb-6 border-b border-[#2D3748]/50 bg-gradient-to-b from-[#1A202C] to-transparent relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#00F2FE]" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-[#94A3B8] text-sm line-clamp-2 h-10">
                    {product.description}
                  </p>
                </div>

                {/* Price Area */}
                <div className="px-6 py-5 bg-[#121623]/50">
                  <div className="flex items-end gap-3 mb-1">
                    <span
                      className="text-3xl font-bold text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      ${product.salePrice.toLocaleString()}
                    </span>
                    <span className="text-[#64748B] text-lg line-through mb-1">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-emerald-400 text-sm font-medium">
                    You save ${product.savings.toLocaleString()}
                  </p>
                </div>

                {/* Features Area */}
                <div className="px-6 pb-6 pt-2 flex-1">
                  <ul className="space-y-3 mb-8">
                    {product.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#00F2FE] mt-0.5 flex-shrink-0" />
                        <span className="text-[#94A3B8] text-sm leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                    {product.features.length > 4 && (
                      <li className="text-[#64748B] text-sm italic pl-7">
                        + {product.features.length - 4} more features
                      </li>
                    )}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3">
                    <button
                      onClick={() => {
                        addToCart(product);
                        openCart();
                      }}
                      className="w-full btn-primary justify-center group/btn"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="w-full btn-ghost justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#121623] section-spacing border-t border-[#1A202C]">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="section-label">Common Questions</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Frequently Asked{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Questions
              </span>
            </h2>
          </div>
          <div className="space-y-4">
            {shopFAQ.map((faq, idx) => (
              <div key={idx} className="glass-card !p-6 border-[#2D3748]/50">
                <h4 className="text-white font-semibold text-lg mb-2">{faq.question}</h4>
                <p className="text-[#94A3B8] leading-relaxed text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#0B0F19] border-t border-[#1A202C]">
        <div className="container-narrow text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-5"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Not Sure Which Plan Is Right?
          </h2>
          <p className="text-[#94A3B8] mb-8 text-lg">
            Speak with a Nexora career advisor to get a personalized recommendation.
          </p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4">
            Get a Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
