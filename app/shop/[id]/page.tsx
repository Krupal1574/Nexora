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
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const relatedProducts = useMemo(
    () => getRelatedProducts(product.id, 3),
    [product.id]
  );

  const Icon = product.icon;

  return (
    <div className="overflow-x-hidden page-hero-padding pb-24">
      <div className="container-wide">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-8">
          <Link href="/shop" className="hover:text-[#00F2FE] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#94A3B8]">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Visual/Hero */}
          <div className="rounded-3xl bg-gradient-to-br from-[#1A202C] to-[#121623] border border-[#2D3748] p-8 sm:p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00F2FE]/[0.03] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00D2C4]/[0.03] rounded-full blur-[80px] pointer-events-none" />

            {product.badge && (
              <span className="absolute top-6 left-6 bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest z-10">
                {product.badge}
              </span>
            )}

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#00F2FE]/20 to-[#00D2C4]/10 border border-[#00F2FE]/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,242,254,0.15)] mb-8">
                <Icon className="w-12 h-12 text-[#00F2FE]" />
              </div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {product.name}
              </h1>
              <p className="text-[#00F2FE] font-medium max-w-md mx-auto">
                {product.tagline}
              </p>
            </div>
          </div>

          {/* Right Column: Pricing & Features */}
          <div className="flex flex-col h-full">
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price Box */}
            <div className="glass-card mb-8">
              <div className="flex flex-wrap items-baseline gap-4 mb-2">
                <span
                  className="text-5xl font-bold text-white"
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
                  onClick={() => addToCart(product)}
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
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                What's Included
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-[#00F2FE]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#00F2FE]" />
                    </div>
                    <span className="text-[#CBD5E1] leading-relaxed">
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
          <div className="pt-16 border-t border-[#1A202C]">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-8"
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
                    className="glass-card group flex items-start gap-4 hover:border-[#00F2FE]/30"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#121623] border border-[#2D3748] flex items-center justify-center flex-shrink-0 group-hover:border-[#00F2FE]/40 transition-colors">
                      <RelIcon className="w-6 h-6 text-[#94A3B8] group-hover:text-[#00F2FE] transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 group-hover:text-[#00F2FE] transition-colors">
                        {rel.name}
                      </h4>
                      <p className="text-[#00F2FE] font-medium text-sm">
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
            className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
