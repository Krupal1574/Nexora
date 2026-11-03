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
  Briefcase,
  Sparkles,
  Percent,
} from "lucide-react";

import { useCart } from "@/lib/cart";
import { products as staticProducts } from "@/lib/shop";
import DiwaliPromo from "@/components/home/DiwaliPromo";

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

// ─────────────────────────────────────────────────────────────────────────────
// Presentation metadata for Plans & Packages
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
      "2 Interview Support",
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
      "6 Interview Support",
      "100 working days profile marketing",
      "Interview guarantee",
      "After placement fees: 12%",
    ],
    badge: "BEST SELLER",
    icon: TrendingUp,
  },

  "ultimate-support": {
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
      "Tech Interview Support",
      "After placement fees: 10%",
    ],
    badge: "POPULAR",
    icon: Rocket,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Discounted price overrides (slug → new price)
// ─────────────────────────────────────────────────────────────────────────────

const discountedPriceOverrides: Record<string, number> = {
  "application-guarantee": 499,
  "interview-coaching": 999,
  "ultimate-support": 1999,
  "all-in-one": 2999,
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

  const staticProduct = staticProducts.find((p) => p.slug === product.slug);
  const meta =
    productMeta[product.slug] ||
    (staticProduct
      ? {
          tagline: staticProduct.tagline,
          features: staticProduct.features,
          badge: staticProduct.badge,
          icon: staticProduct.icon as typeof Rocket,
        }
      : undefined);

  const Icon = meta?.icon ?? (staticProduct?.icon as typeof Rocket) ?? Briefcase;

  // Apply discounted price override if available
  const overridePrice = discountedPriceOverrides[product.slug];
  const originalPrice = Number(product.originalPrice) || Number(product.price);
  const price = overridePrice ?? Number(product.price);

  const savings = Math.max(originalPrice - price, 0);

  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      tagline: meta?.tagline || product.description,
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
    <div className="group relative rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] overflow-hidden flex flex-col min-h-[420px] hover:border-[#F26A21]/40 transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-full h-52 overflow-hidden bg-[#F5F1E8]">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* Discount Badge on Image */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {discount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-[#F26A21] px-2 py-1 text-[9px] font-bold text-[#171717]">
              <Percent className="w-2.5 h-2.5" />
              {discount}% OFF
            </span>
          )}
          {meta?.badge && (
            <span className="inline-flex items-center rounded-md border border-[#F26A21]/40 bg-white/90 backdrop-blur-sm px-2 py-1 text-[8px] font-bold text-[#171717]">
              {meta.badge}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Icon */}
        <div className="mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#F26A21]/10 border border-[#F26A21]/30 flex items-center justify-center">
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
        <div className="mt-3 pt-3 border-t border-[#E5E5E5]">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-bold text-[#171717]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              ${price.toLocaleString()}
            </span>

            {discount > 0 && (
              <span className="text-[10px] text-[#64748B] line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {savings > 0 && (
            <p className="text-[9px] text-[#8FB8D8] mt-1 font-semibold">
              You save ${savings.toLocaleString()}
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="mt-3 space-y-1.5 flex-1">
          {(meta?.features || []).map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-[9px] text-[#77736D]"
            >
              <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#F26A21]" />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="mt-4 space-y-2">
          <button
            onClick={handleAddToCart}
            className="w-full h-8 rounded-full bg-[#8FB8D8] hover:bg-[#F26A21] text-[#171717] text-[11px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] overflow-hidden min-h-[420px] animate-pulse flex flex-col">
      <div className="w-full h-40 bg-[#E5E5E5]" />
      <div className="p-5 flex flex-col flex-1">
        <div className="w-10 h-10 rounded-xl bg-[#E5E5E5] mb-4" />
        <div className="w-32 h-4 rounded bg-[#E5E5E5] mb-2" />
        <div className="w-full h-8 rounded bg-[#E5E5E5] mb-5" />
        <div className="w-24 h-7 rounded bg-[#E5E5E5] mb-4" />
        <div className="space-y-2">
          <div className="w-full h-2 rounded bg-[#E5E5E5]" />
          <div className="w-4/5 h-2 rounded bg-[#E5E5E5]" />
          <div className="w-3/5 h-2 rounded bg-[#E5E5E5]" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Discounted Prices Page
// ─────────────────────────────────────────────────────────────────────────────

export default function DiscountedPricesPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortOption>("price-asc");

  // ───────────────────────────────────────────────────────
  // Fetch products from API
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
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load products");
        }

        if (mounted) {
          const apiProds: ApiProduct[] = data.products || [];
          // Filter to plans & packages (pro-services)
          const planProds = apiProds.filter(
            (p) => p.category === "pro-services"
          );

          // If API returns plans, use them; otherwise fallback to static catalog
          if (planProds.length > 0) {
            setProducts(planProds);
          } else {
            // Fallback from static catalog
            const staticPlanProds: ApiProduct[] = staticProducts
              .filter((p) => p.category === "pro-services")
              .map((p) => ({
                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.description,
                price: p.salePrice.toString(),
                originalPrice: p.originalPrice.toString(),
                discount: p.discountPercent,
                image: `/images/products/${p.slug}.png`,
                category: p.category,
                status: "ACTIVE",
                stock: 99,
                featured: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }));
            setProducts(staticPlanProds);
          }
        }
      } catch (err) {
        console.error("Discounted products load error:", err);

        if (mounted) {
          // Fallback gracefully from static catalog
          const staticPlanProds: ApiProduct[] = staticProducts
            .filter((p) => p.category === "pro-services")
            .map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              description: p.description,
              price: p.salePrice.toString(),
              originalPrice: p.originalPrice.toString(),
              discount: p.discountPercent,
              image: `/images/products/${p.slug}.png`,
              category: p.category,
              status: "ACTIVE",
              stock: 99,
              featured: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }));

          if (staticPlanProds.length > 0) {
            setProducts(staticPlanProds);
          } else {
            setError("Unable to load products. Please refresh the page.");
          }
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
    result = result.filter((product) => product.status === "ACTIVE");

    // Only plans and packages
    result = result.filter(
      (product) => product.category === "pro-services"
    );

    // Apply discounted price overrides
    result = result.map((p) => {
      const override = discountedPriceOverrides[p.slug];
      if (override !== undefined) {
        const orig = Number(p.originalPrice) || Number(p.price) || override;
        const disc =
          orig > override
            ? Math.round(((orig - override) / orig) * 100)
            : 0;
        return {
          ...p,
          price: override.toString(),
          originalPrice: orig.toString(),
          discount: disc,
        };
      }
      return p;
    });

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-desc":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;

      case "popular":
      default:
        result.sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
        break;
    }

    return result;
  }, [products, sort]);

  // ───────────────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────────────

  return (
    <main className="overflow-x-clip pb-24">
      <div className="container-wide">
        {/* Hero */}
        <PageHero
          align="center"
          eyebrow="Exclusive Client Access"
          lines={[
            "Discounted ",
            <span key="prices" className="accent">
              Prices
            </span>,
          ]}
          sub="Special discounted rates on our premier career plans and packages. Choose the plan that fits your goals and accelerate your job search."
        />

        {/* Diwali Promo Artwork */}
        <DiwaliPromo />

        {/* Header and Controls */}
        <section
          id="shop-products"
          className="mt-8 border-b border-[#E5E5E5] pb-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Tag / Category Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F26A21] px-4 py-2 text-sm font-semibold text-[#171717]">
                <Sparkles className="w-3.5 h-3.5" />
                Plans &amp; Packages
              </span>
              <span className="text-xs text-[#77736D]">
                ({visibleProducts.length} plans available)
              </span>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#77736D]">Sort by</span>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-sm text-[#171717] outline-none focus:border-[#F26A21] cursor-pointer"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </section>

        {/* Error */}
        {error && !loading && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-center">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-xs text-[#171717] underline cursor-pointer"
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
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingCard key={index} />
                ))}
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingCart className="w-10 h-10 text-[#64748B] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#171717]">
                  No plans available
                </h3>
                <p className="text-sm text-[#64748B] mt-2">
                  Please check back later or contact us.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
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
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-xs text-[#64748B]">
              Everything you need to know about our plans and packages.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <details className="group rounded-xl border border-[#E5E5E5] bg-white p-4 sm:p-5 shadow-sm hover:border-[#F26A21]/40 transition-all duration-200">
              <summary className="cursor-pointer list-none text-sm sm:text-base font-bold text-[#171717] flex items-center justify-between group-hover:text-[#F26A21] transition-colors">
                What&apos;s included in each plan?
                <ChevronRight className="w-4 h-4 text-[#F26A21] group-open:rotate-90 transition-transform duration-200 shrink-0 ml-4" />
              </summary>

              <p className="mt-3.5 pt-3.5 border-t border-[#E5E5E5]/70 text-xs sm:text-sm leading-relaxed text-[#77736D]">
                Each plan builds on the previous one. Application Guarantee
                covers resume crafting and targeted profile marketing, Interview
                Coaching adds mock interviews and OPT guidance, Ultimate Support
                provides unlimited live interview sessions with guarantee, and
                All In One includes the full suite with our lowest
                after-placement fee.
              </p>
            </details>

            <details className="group rounded-xl border border-[#E5E5E5] bg-white p-4 sm:p-5 shadow-sm hover:border-[#F26A21]/40 transition-all duration-200">
              <summary className="cursor-pointer list-none text-sm sm:text-base font-bold text-[#171717] flex items-center justify-between group-hover:text-[#F26A21] transition-colors">
                Can I upgrade my plan later?
                <ChevronRight className="w-4 h-4 text-[#F26A21] group-open:rotate-90 transition-transform duration-200 shrink-0 ml-4" />
              </summary>

              <p className="mt-3.5 pt-3.5 border-t border-[#E5E5E5]/70 text-xs sm:text-sm leading-relaxed text-[#77736D]">
                Yes. If you start with any package, you can upgrade at any time.
                Your previous investment will be credited toward the higher-tier
                plan.
              </p>
            </details>

            <details className="group rounded-xl border border-[#E5E5E5] bg-white p-4 sm:p-5 shadow-sm hover:border-[#F26A21]/40 transition-all duration-200">
              <summary className="cursor-pointer list-none text-sm sm:text-base font-bold text-[#171717] flex items-center justify-between group-hover:text-[#F26A21] transition-colors">
                Do you guarantee job placement?
                <ChevronRight className="w-4 h-4 text-[#F26A21] group-open:rotate-90 transition-transform duration-200 shrink-0 ml-4" />
              </summary>

              <p className="mt-3.5 pt-3.5 border-t border-[#E5E5E5]/70 text-xs sm:text-sm leading-relaxed text-[#77736D]">
                We do not guarantee placement because final hiring decisions are
                made by employers. We do provide dedicated professional support
                and interview guarantees throughout the process.
              </p>
            </details>

            <details className="group rounded-xl border border-[#E5E5E5] bg-white p-4 sm:p-5 shadow-sm hover:border-[#F26A21]/40 transition-all duration-200">
              <summary className="cursor-pointer list-none text-sm sm:text-base font-bold text-[#171717] flex items-center justify-between group-hover:text-[#F26A21] transition-colors">
                What payment methods are accepted?
                <ChevronRight className="w-4 h-4 text-[#F26A21] group-open:rotate-90 transition-transform duration-200 shrink-0 ml-4" />
              </summary>

              <p className="mt-3.5 pt-3.5 border-t border-[#E5E5E5]/70 text-xs sm:text-sm leading-relaxed text-[#77736D]">
                We accept ACH, wire transfer, Zelle, and debit card. Credit card
                payments are accepted for qualifying transactions.
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}

