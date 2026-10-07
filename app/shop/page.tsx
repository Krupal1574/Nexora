"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/motion/PageHero";
import {
  ChevronRight,
  ShoppingCart,
  CheckCircle2,
  Rocket,
  TrendingUp,
  Crown,
  FileText,
  Briefcase,
  Code2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useCart } from "@/lib/cart";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ProductCategory = string;

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: number;
  image: string;
  category: ProductCategory;
  status: string;
  stock: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "discount";

type CategoryFilter = "all" | "pro-services" | "add-on-services" | "service-extensions" | "placement-charges";

// ─────────────────────────────────────────────────────────────────────────────
// Extra presentation data
// The actual price/name/category comes from the database.
// ─────────────────────────────────────────────────────────────────────────────

const productMeta: Record<
  string,
  {
    tagline: string;
    features: string[];
    badge?: "BEST SELLER" | "PREMIUM" | "POPULAR" | "NEW";
    icon: typeof Rocket;
  }
> = {
  "application-guarantee": {
    tagline: "Guaranteed applications with profile marketing & optimization",
    features: [
      "Resume crafting",
      "Resume understanding session",
      "Profile marketing",
      "Candidate profile optimization",
      "60 days of marketing",
      "After placement fees: 14%",
    ],
    badge: "POPULAR",
    icon: Briefcase,
  },

  "interview-coaching": {
    tagline: "Mock interviews, OPT guidance & 100-day profile marketing",
    features: [
      "Resume crafting",
      "Resume understanding session",
      "Mock interview",
      "Guidance in initial OPT",
      "100 working days profile marketing",
      "Interview guarantee",
      "After placement fees: 12%",
    ],
    badge: "BEST SELLER",
    icon: TrendingUp,
  },

  "ultimate-session": {
    tagline: "Unlimited live interview sessions with interview guarantee",
    features: [
      "Resume crafting",
      "Resume understanding session",
      "Profile marketing",
      "Interview assessment",
      "Interview guarantee",
      "Unlimited Live Interview Sessions",
      "After placement fees: 12%",
    ],
    badge: "PREMIUM",
    icon: Crown,
  },

  "all-in-one": {
    tagline: "Everything included — lowest after-placement fee of 10%",
    features: [
      "Resume crafting",
      "Resume understanding session",
      "Profile marketing",
      "Interview assessment",
      "Interview guarantee",
      "Unlimited Live Interview Sessions",
      "After placement fees: 10%",
    ],
    badge: "POPULAR",
    icon: Rocket,
  },

  // Individual services
  "resume-craft": {
    tagline: "Professional resume creation & optimization",
    features: [
      "Professional resume creation",
      "ATS-conscious formatting",
      "Tech-industry positioning",
      "Skills and experience presentation",
      "Content optimization",
    ],
    icon: FileText,
  },

  "resume-session": {
    tagline: "One-on-one resume review with actionable feedback",
    features: [
      "One-on-one resume review",
      "Detailed improvement feedback",
      "Gap identification",
      "Content and presentation recommendations",
      "Actionable next steps",
    ],
    icon: Briefcase,
  },

  "interview-sessions": {
    tagline: "Mock interview practice across behavioral & technical rounds",
    features: [
      "Multiple mock interview sessions",
      "Behavioral interview practice",
      "Technical interview practice",
      "Real-time performance feedback",
      "Interview improvement guidance",
    ],
    icon: Briefcase,
  },

  "technical-interview-prep": {
    tagline: "Intensive coding interview prep with algorithm practice",
    features: [
      "Coding interview preparation",
      "Algorithm practice",
      "Problem-solving strategies",
      "Technical interview tactics",
      "Guidance on approaching coding problems",
    ],
    badge: "NEW",
    icon: Code2,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Product card
// ─────────────────────────────────────────────────────────────────────────────

function ProductCard({
  product,
}: {
  product: ApiProduct;
}) {
  const { addToCart, openCart } = useCart();

  const meta = productMeta[product.slug];

  const Icon = meta?.icon ?? Briefcase;

  const price = Number(product.price);
  const originalPrice = Number(product.originalPrice);

  const savings = Math.max(originalPrice - price, 0);

  const discount =
    product.discount ||
    Math.round(
      ((originalPrice - price) / originalPrice) * 100
    );

  const handleAddToCart = () => {
    /*
     * Your cart currently uses the Product type from lib/shop.ts.
     * The metadata below gives it the additional fields it expects.
     */

    const cartProduct = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      tagline:
        meta?.tagline || product.description,
      description: product.description,
      features: meta?.features || [],
      originalPrice,
      salePrice: price,
      discountPercent: discount,
      savings,
      badge: meta?.badge,
      category: product.category,
      icon: Icon,
    };

    addToCart(cartProduct);
    openCart();
  };

  // Product image mapping
  const productImage = `/images/products/${product.slug}.png`;

  return (
    <div className="group relative rounded-2xl bg-[#FFFFFF] border border-[#203548] overflow-hidden flex flex-col min-h-[420px] hover:border-[#F26A21]/40 transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-full h-40 overflow-hidden bg-[#0a111a]">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Discount Badge on Image */}
        <div className="absolute top-2 left-2 z-10">
          <span className="inline-flex items-center rounded-md bg-[#F26A21] px-2 py-1 text-[9px] font-bold text-[#171717]">
            {discount}% OFF
          </span>
          {meta?.badge && (
            <div className="mt-1">
              <span className="inline-flex items-center rounded-md border border-[#F26A21]/40 bg-[#07151d]/90 backdrop-blur-sm px-2 py-1 text-[8px] font-bold text-[#171717]">
                {meta.badge}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Icon */}
        <div className="mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#06242b] border border-[#F26A21]/30 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#F26A21]" />
          </div>
        </div>

        {/* Name */}
        <h3
          className="text-base font-bold text-[#171717] mb-1"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[9px] leading-relaxed text-[#77736D] line-clamp-3 min-h-[40px]">
          {meta?.tagline || product.description}
        </p>

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-[#263241]">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-bold text-[#171717]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              ${price.toLocaleString()}
            </span>

            <span className="text-[10px] text-[#64748B] line-through">
              ${originalPrice.toLocaleString()}
            </span>
          </div>

          <p className="text-[9px] text-[#8FB8D8] mt-1">
            You save ${savings.toLocaleString()}
          </p>
        </div>

        {/* Features */}
        <ul className="mt-3 space-y-1.5 flex-1">
          {(meta?.features || []).slice(0, 4).map(
            (feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-[8px] text-[#77736D]"
              >
                <CheckCircle2 className="w-2.5 h-2.5 mt-0.5 flex-shrink-0 text-[#F26A21]" />
                <span className="line-clamp-1">
                  {feature}
                </span>
              </li>
            )
          )}

          {(meta?.features?.length || 0) > 4 && (
            <li className="text-[7px] text-[#64748B] pl-4">
              + {(meta?.features?.length || 0) - 4} more
              features
            </li>
          )}
        </ul>

        {/* Buttons */}
        <div className="mt-4 space-y-2">
          <button
            onClick={handleAddToCart}
            className="w-full h-8 rounded-full bg-[#00D2D2] hover:bg-[#F26A21] text-[#171717] text-[9px] font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-3 h-3" />
            Add to Cart
          </button>

          <Link
            href={`/shop/${product.slug}`}
            className="w-full h-8 rounded-full border border-[#F26A21] text-[#F26A21] hover:bg-[#F26A21]/10 text-[9px] font-bold flex items-center justify-center transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading Card
// ─────────────────────────────────────────────────────────────────────────────

function LoadingCard() {
  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#203548] overflow-hidden min-h-[420px] animate-pulse flex flex-col">
      <div className="w-full h-40 bg-[#1d2a38]" />
      <div className="p-5 flex flex-col flex-1">
        <div className="w-10 h-10 rounded-xl bg-[#1d2a38] mb-4" />
        <div className="w-32 h-4 rounded bg-[#1d2a38] mb-2" />
        <div className="w-full h-8 rounded bg-[#1d2a38] mb-5" />
        <div className="w-24 h-7 rounded bg-[#1d2a38] mb-4" />
        <div className="space-y-2">
          <div className="w-full h-2 rounded bg-[#1d2a38]" />
          <div className="w-4/5 h-2 rounded bg-[#1d2a38]" />
          <div className="w-3/5 h-2 rounded bg-[#1d2a38]" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Shop Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [products, setProducts] = useState<ApiProduct[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [category, setCategory] =
    useState<CategoryFilter>("all");

  const [sort, setSort] =
    useState<SortOption>("popular");

  // ───────────────────────────────────────────────────────
  // Fetch products from Prisma API
  // ───────────────────────────────────────────────────────

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message ||
            "Failed to load products"
          );
        }

        if (mounted) {
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error("Shop products error:", err);

        if (mounted) {
          setError(
            "Unable to load products. Please refresh the page."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  // ───────────────────────────────────────────────────────
  // Filter + Sort
  // ───────────────────────────────────────────────────────

  const visibleProducts = useMemo(() => {
    let result = [...products];

    // Only show active products
    result = result.filter(
      (product) => product.status === "ACTIVE"
    );

    // Category
    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort(
          (a, b) =>
            Number(a.price) - Number(b.price)
        );
        break;

      case "price-desc":
        result.sort(
          (a, b) =>
            Number(b.price) - Number(a.price)
        );
        break;

      case "discount":
        result.sort(
          (a, b) =>
            b.discount - a.discount
        );
        break;

      case "popular":
      default:
        result.sort(
          (a, b) =>
            Number(b.featured) -
            Number(a.featured)
        );
        break;
    }

    return result;
  }, [products, category, sort]);

  // ───────────────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────────────

  return (
    <main className="overflow-x-clip pb-24">
      <div className="container-wide">

        {/* Hero */}
        <PageHero
          align="center"
          eyebrow="Limited Time Offers"
          lines={[
            "Invest in Your ",
            <span key="career" className="accent">Career</span>,
            <br key="br" />,
            <span key="success" className="accent">Success</span>,
          ]}
          sub="Choose the perfect plan to accelerate your job search, optimize your profile, and land your dream role faster."
        />

        {/* Promo Banner */}
        <section className="mt-10 rounded-xl border border-[#F26A21]/30 bg-[#06262d]/70 px-4 py-4 sm:px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F26A21]/10 border border-[#F26A21]/20 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-[#F26A21]" />
              </div>

              <div>
                <p className="text-[10px] sm:text-xs font-bold text-[#171717]">
                  35% off Plans &amp; Packages · 15% off Individual Services
                </p>

                <p className="text-[8px] text-[#77736D] mt-0.5">
                  Limited-time introductory pricing — don't miss out.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setCategory("pro-services")
              }
              className="shrink-0 rounded-full bg-[#00D2D2] hover:bg-[#F26A21] px-5 py-2 text-[9px] font-bold text-[#171717] flex items-center gap-2 transition-colors"
            >
              Explore Plans
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </section>

        {/* Filters */}
        <section className="mt-8 border-b border-[#E5E5E5] pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() =>
                  setCategory("all")
                }
                className={`rounded-full px-3 py-1.5 text-[8px] font-semibold transition-colors ${category === "all"
                    ? "bg-[#F26A21] text-[#171717]"
                    : "text-[#77736D] hover:text-[#171717]"
                  }`}
              >
                All
              </button>

              <button
                onClick={() =>
                  setCategory("pro-services")
                }
                className={`rounded-full px-3 py-1.5 text-[8px] font-semibold transition-colors ${category === "pro-services"
                    ? "bg-[#F26A21] text-[#171717]"
                    : "text-[#77736D] hover:text-[#171717]"
                  }`}
              >
                Plans &amp; Packages
              </button>

              <button
                onClick={() =>
                  setCategory("add-on-services")
                }
                className={`rounded-full px-3 py-1.5 text-[8px] font-semibold transition-colors ${category === "add-on-services"
                    ? "bg-[#F26A21] text-[#171717]"
                    : "text-[#77736D] hover:text-[#171717]"
                  }`}
              >
                Individual Services
              </button>
              
              <button
                onClick={() =>
                  setCategory("placement-charges")
                }
                className={`rounded-full px-3 py-1.5 text-[8px] font-semibold transition-colors ${category === "placement-charges"
                    ? "bg-[#F26A21] text-[#171717]"
                    : "text-[#77736D] hover:text-[#171717]"
                  }`}
              >
                Placement Charges
              </button>

              <button
                onClick={() =>
                  setCategory("service-extensions")
                }
                className={`rounded-full px-3 py-1.5 text-[8px] font-semibold transition-colors ${category === "service-extensions"
                    ? "bg-[#F26A21] text-[#171717]"
                    : "text-[#77736D] hover:text-[#171717]"
                  }`}
              >
                Add-ons
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-[#64748B]">
                Sort by
              </span>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value as SortOption
                  )
                }
                className="rounded-md border border-[#294052] bg-[#101821] px-2 py-1.5 text-[8px] text-[#171717] outline-none focus:border-[#F26A21]"
              >
                <option value="popular">
                  Most Popular
                </option>

                <option value="price-asc">
                  Price: Low to High
                </option>

                <option value="price-desc">
                  Price: High to Low
                </option>

                <option value="discount">
                  Biggest Discount
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* Error */}
        {error && !loading && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-center">
            <p className="text-sm text-red-400">
              {error}
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="mt-3 text-xs text-[#171717] underline"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Products */}
        {!error && (
          <section className="mt-5">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map(
                  (_, index) => (
                    <LoadingCard key={index} />
                  )
                )}
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingCart className="w-10 h-10 text-[#64748B] mx-auto mb-4" />

                <h3 className="text-lg font-semibold text-[#171717]">
                  No products found
                </h3>

                <p className="text-sm text-[#64748B] mt-2">
                  Try another category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}
              </div>
            )}
          </section>
        )}

        {/* FAQ */}
        <section className="mt-20 pt-12 border-t border-[#E5E5E5]">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#171717]"
              style={{
                fontFamily:
                  "Space Grotesk, sans-serif",
              }}
            >
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-xs text-[#64748B]">
              Everything you need to know about our
              services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <details className="group rounded-xl border border-[#203548] bg-[#101821] p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[#171717] flex items-center justify-between">
                What's included in each plan?
                <ChevronRight className="w-4 h-4 text-[#F26A21] group-open:rotate-90 transition-transform" />
              </summary>

              <p className="mt-3 text-xs leading-relaxed text-[#77736D]">
                Each plan builds on the previous one.
                Launch covers resume and career
                foundations, Accelerate adds recruitment
                and interview preparation, and Summit
                provides comprehensive career support.
              </p>
            </details>

            <details className="group rounded-xl border border-[#203548] bg-[#101821] p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[#171717] flex items-center justify-between">
                Can I upgrade my plan later?
                <ChevronRight className="w-4 h-4 text-[#F26A21] group-open:rotate-90 transition-transform" />
              </summary>

              <p className="mt-3 text-xs leading-relaxed text-[#77736D]">
                Yes. If you start with a Launch or
                Accelerate plan, you can upgrade later.
              </p>
            </details>

            <details className="group rounded-xl border border-[#203548] bg-[#101821] p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[#171717] flex items-center justify-between">
                Do you guarantee job placement?
                <ChevronRight className="w-4 h-4 text-[#F26A21] group-open:rotate-90 transition-transform" />
              </summary>

              <p className="mt-3 text-xs leading-relaxed text-[#77736D]">
                We do not guarantee placement because
                final hiring decisions are made by
                employers. We do provide dedicated
                professional support throughout the
                process.
              </p>
            </details>

            <details className="group rounded-xl border border-[#203548] bg-[#101821] p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[#171717] flex items-center justify-between">
                What payment methods are accepted?
                <ChevronRight className="w-4 h-4 text-[#F26A21] group-open:rotate-90 transition-transform" />
              </summary>

              <p className="mt-3 text-xs leading-relaxed text-[#77736D]">
                We accept ACH, wire transfer, Zelle,
                and debit card. Credit card payments are
                accepted for qualifying transactions.
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}
