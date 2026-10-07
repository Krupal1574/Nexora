"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ShoppingCart,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/shop";
import { useCart } from "@/lib/cart";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductBySlug(id);
  const { addToCart, openCart } = useCart();

  if (!product) {
    notFound();
  }

  const relatedProducts = useMemo(
    () => getRelatedProducts(product.id, 3),
    [product.id]
  );

  const Icon = product.icon;

  return (
    <div className="overflow-x-clip pt-8 pb-24">
      <div className="container-wide">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-8">
          <Link href="/shop" className="hover:text-[#F26A21] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#77736D]">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Visual/Hero */}
          <div className="rounded-3xl bg-[#0a111a] border border-[#E5E5E5] relative overflow-hidden min-h-[500px]">
            {/* Product Image */}
            <div className="relative w-full h-full">
              <img
                src={`/images/products/${product.slug}.png`}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badge Overlay */}
              {product.badge && (
                <span className="absolute top-6 left-6 bg-[#F26A21]/90 backdrop-blur-sm border border-[#F26A21] text-[#171717] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest z-10 shadow-lg">
                  {product.badge}
                </span>
              )}

              {/* Discount Badge */}
              <div className="absolute top-6 right-6 bg-gradient-to-r from-[#F26A21] to-[#8FB8D8] text-[#171717] px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                {product.discountPercent}% OFF
              </div>

              {/* Bottom Gradient Overlay for Text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/80 to-transparent p-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#F26A21]/10 border border-[#F26A21]/30 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-8 h-8 text-[#F26A21]" />
                  </div>
                  <div>
                    <h1
                      className="text-2xl sm:text-3xl font-bold text-[#171717]"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {product.name}
                    </h1>
                    <p className="text-[#F26A21] font-medium text-sm">
                      {product.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Features */}
          <div className="flex flex-col h-full">
            <p className="text-[#77736D] text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price Box */}
            <div className="glass-card mb-8">
              <div className="flex flex-wrap items-baseline gap-4 mb-2">
                <span
                  className="text-5xl font-bold text-[#171717]"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  ${product.salePrice.toLocaleString()}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[#64748B] text-xl line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-gradient-to-r from-emerald-400/20 to-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-md text-sm font-bold">
                    Save ${product.savings.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-[#64748B] text-sm">
                One-time payment. No hidden fees.
              </p>

              <div className="mt-8">
                <button
                  onClick={() => {
                    addToCart(product);
                    openCart();
                  }}
                  className="w-full btn-primary justify-center py-4 text-base group"
                >
                  <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Feature List */}
            <div className="flex-1">
              <h3
                className="text-xl font-bold text-[#171717] mb-6"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                What's Included
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-[#F26A21]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#F26A21]" />
                    </div>
                    <span className="text-[#77736D] leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#FFFFFF]">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#171717] mb-8"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => {
                const RelIcon = rel.icon;
                return (
                  <Link
                    href={`/shop/${rel.slug}`}
                    key={rel.id}
                    className="glass-card group flex items-start gap-4 hover:border-[#F26A21]/30"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center flex-shrink-0 group-hover:border-[#F26A21]/40 transition-colors">
                      <RelIcon className="w-6 h-6 text-[#77736D] group-hover:text-[#F26A21] transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-[#171717] font-semibold mb-1 group-hover:text-[#F26A21] transition-colors">
                        {rel.name}
                      </h4>
                      <p className="text-[#F26A21] font-medium text-sm">
                        ${rel.salePrice.toLocaleString()}{" "}
                        <span className="text-[#64748B] line-through ml-1 text-xs">
                          ${rel.originalPrice.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#77736D] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
