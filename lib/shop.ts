import {
  Briefcase,
  FileText,
  Code2,
  TrendingUp,
  Rocket,
  Crown,
  type LucideIcon,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  savings: number;
  badge?: "BEST SELLER" | "PREMIUM" | "POPULAR" | "NEW";
  category: "package" | "individual";
  icon: LucideIcon;
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "discount";
export type CategoryFilter = "all" | "package" | "individual";

// ─── Product Catalog ─────────────────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "launch-plan",
    slug: "launch-plan",
    name: "Launch Plan",
    tagline: "Kickstart your tech career with essential services",
    description:
      "The Launch Plan is designed for tech professionals who need a solid foundation. You get expert resume optimization, a LinkedIn profile overhaul, and dedicated 1-on-1 career counseling — everything you need to start landing interviews.",
    features: [
      "ATS-optimized resume rewrite",
      "LinkedIn profile overhaul & SEO",
      "1-on-1 career counseling session",
      "Job search strategy roadmap",
      "Cover letter template pack",
      "30-day email support",
    ],
    originalPrice: 1499,
    salePrice: 999,
    discountPercent: 33,
    savings: 500,
    category: "package",
    icon: Rocket,
  },
  {
    id: "accelerate-plan",
    slug: "accelerate-plan",
    name: "Accelerate Plan",
    tagline: "Fast-track your placement with full-spectrum support",
    description:
      "Our most popular package. The Accelerate Plan combines resume marketing, mock interview coaching, technical training sessions, and a dedicated personal recruiter — all working to get you placed faster.",
    features: [
      "Everything in Launch Plan",
      "Dedicated personal recruiter",
      "Resume marketing to top employers",
      "3 mock interview sessions (behavioral + technical)",
      "Technical skills assessment & training plan",
      "Interview scheduling & calendar management",
      "Salary negotiation coaching",
      "60-day priority support",
    ],
    originalPrice: 2499,
    salePrice: 1749,
    discountPercent: 30,
    savings: 750,
    badge: "BEST SELLER",
    category: "package",
    icon: TrendingUp,
  },
  {
    id: "summit-plan",
    slug: "summit-plan",
    name: "Summit Plan",
    tagline: "The complete career transformation experience",
    description:
      "The Summit Plan is our premium, all-inclusive offering. From day one through onboarding at your new company, you'll have a dedicated team handling every aspect of your career transition — resume, training, placement, compliance, and beyond.",
    features: [
      "Everything in Accelerate Plan",
      "Unlimited mock interviews",
      "Advanced technical training (system design, cloud certs)",
      "Portfolio & GitHub project guidance",
      "Direct outreach to hiring managers",
      "Background check & compliance coordination",
      "Onboarding support through first 90 days",
      "Dedicated account manager",
      "Priority placement queue",
      "120-day VIP support",
    ],
    originalPrice: 4999,
    salePrice: 3499,
    discountPercent: 30,
    savings: 1500,
    badge: "PREMIUM",
    category: "package",
    icon: Crown,
  },
  {
    id: "resume-optimization",
    slug: "resume-optimization",
    name: "Resume Optimization",
    tagline: "Get past the ATS and land interviews",
    description:
      "A standalone professional resume service. Our writers rebuild your resume using ATS-compliant formatting, keyword optimization, and achievement-driven narratives tailored to the U.S. tech job market.",
    features: [
      "Complete ATS audit & keyword optimization",
      "Professional rewrite (CAR framework)",
      "Quantified achievement highlights",
      "2 rounds of revisions",
      "Delivered in 5 business days",
    ],
    originalPrice: 499,
    salePrice: 349,
    discountPercent: 30,
    savings: 150,
    badge: "POPULAR",
    category: "individual",
    icon: FileText,
  },
  {
    id: "interview-prep",
    slug: "interview-prep",
    name: "Interview Prep Bundle",
    tagline: "Walk into every interview with confidence",
    description:
      "Prepare for behavioral and technical interviews with mock sessions led by industry practitioners. Includes feedback reports, improvement plans, and common question banks for your target role.",
    features: [
      "3 mock interview sessions",
      "Behavioral + technical coverage",
      "Detailed feedback reports",
      "Question bank for your target role",
      "Negotiation strategy guide",
    ],
    originalPrice: 599,
    salePrice: 449,
    discountPercent: 25,
    savings: 150,
    category: "individual",
    icon: Briefcase,
  },
  {
    id: "tech-training",
    slug: "tech-training",
    name: "Technical Training",
    tagline: "Sharpen your skills with structured learning",
    description:
      "A focused technical training engagement covering your specific domain — cloud, data, DevOps, full-stack, or AI/ML. Includes live sessions, assessments, and certification prep guidance.",
    features: [
      "Domain-specific learning path",
      "4 live training sessions",
      "Mock technical assessment",
      "Certification prep guidance",
      "Access to curated learning resources",
    ],
    originalPrice: 699,
    salePrice: 499,
    discountPercent: 29,
    savings: 200,
    badge: "NEW",
    category: "individual",
    icon: Code2,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentId: string, limit = 3): Product[] {
  return products.filter((p) => p.id !== currentId).slice(0, limit);
}

export function filterAndSort(
  items: Product[],
  category: CategoryFilter,
  sort: SortOption
): Product[] {
  const filtered =
    category === "all" ? [...items] : items.filter((p) => p.category === category);

  switch (sort) {
    case "price-asc":
      filtered.sort((a, b) => a.salePrice - b.salePrice);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.salePrice - a.salePrice);
      break;
    case "discount":
      filtered.sort((a, b) => b.discountPercent - a.discountPercent);
      break;
    case "popular":
    default:
      // Keep original order (packages first, then by position)
      break;
  }

  return filtered;
}

// ─── FAQ Data ────────────────────────────────────────────────────────────────
export const shopFAQ = [
  {
    question: "What's included in each plan?",
    answer:
      "Each plan builds on the previous one. The Launch Plan covers resume and career foundations, Accelerate adds recruitment and interview prep, and Summit provides the full end-to-end career transformation including onboarding support.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes. If you start with a Launch or Accelerate plan, you can upgrade at any time. We'll credit your existing investment toward the higher-tier plan.",
  },
  {
    question: "How long does the placement process take?",
    answer:
      "Timelines vary based on your experience, target role, and market conditions. On average, candidates in our Accelerate and Summit plans see meaningful interview activity within 4–8 weeks.",
  },
  {
    question: "Do you guarantee job placement?",
    answer:
      "We do not guarantee placement, as hiring decisions rest with employers. What we guarantee is dedicated, professional support throughout every step of the process — from resume to onboarding.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept payments via ACH, wire transfer, Zelle, and debit card. Credit card payments are accepted for transactions of $2,999 or above. A 3% payment gateway processing fee applies to all credit card transactions.",
  },
];
