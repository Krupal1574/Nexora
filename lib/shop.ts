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
  category: string;
  icon: LucideIcon;
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "discount";
export type CategoryFilter = "all" | "pro-services" | "add-on-services" | "service-extensions" | "placement-charges";

// ─── Product Catalog ─────────────────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "application-guarantee",
    slug: "application-guarantee",
    name: "Application Guarantee",
    tagline: "Guaranteed job applications to top tech companies with perso...",
    description: "Guaranteed job applications to top tech companies with personalized cover letters and optimized candidate profiles.",
    features: [
      "Targeted job application support",
      "Personalized cover letter preparation",
      "Candidate profile optimization",
      "Application-ready positioning for technology roles",
      "Guidance on presenting skills and experience effectively"
    ],
    originalPrice: 499,
    salePrice: 499,
    discountPercent: 0,
    savings: 0,
    category: "pro-services",
    icon: Briefcase,
  },
  {
    id: "interview-coaching",
    slug: "interview-coaching",
    name: "Interview Coaching",
    tagline: "One-on-one personalized interview coaching with mock intervi...",
    description: "One-on-one personalized interview coaching with mock interviews and real-time feedback.",
    features: [
      "Individual coaching sessions",
      "Mock interview practice",
      "Real-time performance feedback",
      "Interview communication guidance",
      "Preparation for common interview scenarios",
      "Practical improvement recommendations"
    ],
    originalPrice: 999,
    salePrice: 999,
    discountPercent: 0,
    savings: 0,
    category: "pro-services",
    icon: Briefcase,
  },
  {
    id: "3-support",
    slug: "ultimate-support",
    name: "Ultimate Support",
    tagline: "Complete career transformation package including resume, Lin...",
    description: "Complete career transformation package including resume, LinkedIn, portfolio, and ongoing mentorship.",
    features: [
      "Resume improvement and optimization",
      "LinkedIn profile guidance",
      "Portfolio positioning",
      "Ongoing career mentorship",
      "Job-search strategy support",
      "Personalized career guidance"
    ],
    originalPrice: 1999,
    salePrice: 1999,
    discountPercent: 0,
    savings: 0,
    category: "pro-services",
    icon: Briefcase,
  },
  {
    id: "all-in-one",
    slug: "all-in-one",
    name: "All In One",
    tagline: "Premium all-inclusive package with dedicated career coaching...",
    description: "Premium all-inclusive package with dedicated career coaching, interview prep, and placement assistance.",
    features: [
      "Dedicated career coaching",
      "Interview preparation",
      "Placement assistance",
      "Resume and professional-profile support",
      "Job-search guidance",
      "Personalized career strategy"
    ],
    originalPrice: 2999,
    salePrice: 2999,
    discountPercent: 0,
    savings: 0,
    category: "pro-services",
    icon: Briefcase,
  },
  {
    id: "resume-craft",
    slug: "resume-craft",
    name: "Resume Craft",
    tagline: "Professional resume creation and optimization tailored to te...",
    description: "Professional resume creation and optimization tailored to tech industry standards.",
    features: [
      "Professional resume creation",
      "Resume structure and formatting",
      "Technology-industry positioning",
      "Content optimization",
      "Skills and experience presentation",
      "ATS-conscious resume improvement"
    ],
    originalPrice: 199,
    salePrice: 199,
    discountPercent: 0,
    savings: 0,
    category: "add-on-services",
    icon: Briefcase,
  },
  {
    id: "resume-session",
    slug: "resume-session",
    name: "Resume Session",
    tagline: "Expert one-on-one resume review session with actionable feed...",
    description: "Expert one-on-one resume review session with actionable feedback and improvements.",
    features: [
      "One-on-one resume review",
      "Detailed improvement feedback",
      "Identification of weak or unclear sections",
      "Content and presentation recommendations",
      "Actionable next steps"
    ],
    originalPrice: 249,
    salePrice: 249,
    discountPercent: 0,
    savings: 0,
    category: "add-on-services",
    icon: Briefcase,
  },
  {
    id: "interview-sessions",
    slug: "interview-sessions",
    name: "Interview Sessions",
    tagline: "Multiple mock interview sessions covering behavioral, techni...",
    description: "Multiple mock interview sessions covering behavioral, technical, and system design questions.",
    features: [
      "Multiple mock interview sessions",
      "Behavioral interview practice",
      "Technical interview practice",
      "System design question practice",
      "Feedback after practice sessions",
      "Interview improvement guidance"
    ],
    originalPrice: 799,
    salePrice: 799,
    discountPercent: 0,
    savings: 0,
    category: "add-on-services",
    icon: Briefcase,
  },
  {
    id: "technical-interview-prep",
    slug: "technical-interview-prep",
    name: "Technical Interview Prep",
    tagline: "Intensive coding interview preparation with algorithm practi...",
    description: "Intensive coding interview preparation with algorithm practice and problem-solving strategies.",
    features: [
      "Coding interview preparation",
      "Algorithm practice",
      "Problem-solving exercises",
      "Technical interview strategies",
      "Practice-oriented preparation",
      "Guidance on approaching coding problems"
    ],
    originalPrice: 189,
    salePrice: 189,
    discountPercent: 0,
    savings: 0,
    category: "add-on-services",
    icon: Briefcase,
  },
  {
    id: "30-day-extension",
    slug: "30-day-extension",
    name: "30-Day Extension",
    tagline: "Extend your current service package for an additional 30 day...",
    description: "Extend your current service package for an additional 30 days of support and guidance.",
    features: [
      "30 additional days of service access",
      "Continued career guidance",
      "Ongoing support",
      "Continuation of applicable package assistance",
      "Additional time to complete career and job-search activities"
    ],
    originalPrice: 499,
    salePrice: 499,
    discountPercent: 0,
    savings: 0,
    category: "service-extensions",
    icon: Briefcase,
  },
  {
    id: "60-day-extension",
    slug: "60-day-extension",
    name: "60-Day Extension",
    tagline: "Extend your service package for 60 days with continued mento...",
    description: "Extend your service package for 60 days with continued mentorship and job search support.",
    features: [
      "60 additional days of support",
      "Continued mentorship",
      "Job-search support",
      "Ongoing career guidance",
      "Continued access to applicable package assistance"
    ],
    originalPrice: 899,
    salePrice: 899,
    discountPercent: 0,
    savings: 0,
    category: "service-extensions",
    icon: Briefcase,
  },
  {
    id: "90-day-extension",
    slug: "90-day-extension",
    name: "90-Day Extension",
    tagline: "Three-month extension providing comprehensive support throug...",
    description: "Three-month extension providing comprehensive support through your entire job search journey.",
    features: [
      "90 additional days of support",
      "Comprehensive job-search guidance",
      "Continued career assistance",
      "Ongoing mentorship",
      "Support throughout the extended job-search period"
    ],
    originalPrice: 1299,
    salePrice: 1299,
    discountPercent: 0,
    savings: 0,
    category: "service-extensions",
    icon: Briefcase,
  },
  {
    id: "unlimited-support",
    slug: "unlimited-support",
    name: "Unlimited Support",
    tagline: "Six months of unlimited 24/7 support with priority access to...",
    description: "Six months of unlimited 24/7 support with priority access to career coaches and resources.",
    features: [
      "Six months of support",
      "24/7 support access as described by the service",
      "Priority access to career coaches",
      "Priority access to relevant resources",
      "Continued career and job-search guidance"
    ],
    originalPrice: 1999,
    salePrice: 1999,
    discountPercent: 0,
    savings: 0,
    category: "service-extensions",
    icon: Briefcase,
  },
  {
    id: "placement-assistance",
    slug: "placement-assistance",
    name: "Placement Assistance",
    tagline: "Full job placement support including job matching, interview...",
    description: "Full job placement support including job matching, interview preparation, and offer negotiation.",
    features: [
      "Job matching support",
      "Opportunity targeting",
      "Interview preparation",
      "Offer negotiation guidance",
      "Placement-focused career assistance"
    ],
    originalPrice: 1599,
    salePrice: 1599,
    discountPercent: 0,
    savings: 0,
    category: "placement-charges",
    icon: Briefcase,
  },
  {
    id: "direct-company-referral",
    slug: "direct-company-referral",
    name: "Direct Company Referral",
    tagline: "Direct referrals to our network of 500+ partner tech compani...",
    description: "Direct referrals to our network of 500+ partner tech companies.",
    features: [
      "Direct referral support",
      "Access to the stated network of 500+ partner tech companies",
      "Candidate positioning for relevant opportunities",
      "Referral-oriented application support",
      "Guidance through the referral process"
    ],
    originalPrice: 1999,
    salePrice: 1999,
    discountPercent: 0,
    savings: 0,
    category: "placement-charges",
    icon: Briefcase,
  },
  {
    id: "guaranteed-interviews",
    slug: "guaranteed-interviews",
    name: "Guaranteed Interviews",
    tagline: "Guaranteed interviews with top-tier tech companies including...",
    description: "Guaranteed interviews with top-tier tech companies including FAANG and unicorn startups.",
    features: [
      "Interview opportunity support",
      "Preparation for interview processes",
      "Guidance for top-tier technology-company interviews",
      "Support for opportunities involving FAANG and unicorn startups",
      "Interview-focused career assistance"
    ],
    originalPrice: 2999,
    salePrice: 2999,
    discountPercent: 0,
    savings: 0,
    category: "placement-charges",
    icon: Briefcase,
  },
  {
    id: "executive-placement",
    slug: "executive-placement",
    name: "Executive Placement",
    tagline: "Premium placement service with dedicated executive recruiter...",
    description: "Premium placement service with dedicated executive recruiter and senior-level job opportunities.",
    features: [
      "Dedicated executive recruiter support",
      "Senior-level opportunity targeting",
      "Executive placement guidance",
      "Personalized candidate positioning",
      "Support throughout the senior-level hiring process",
      "## Quick Pricing Reference"
    ],
    originalPrice: 3999,
    salePrice: 3999,
    discountPercent: 0,
    savings: 0,
    category: "placement-charges",
    icon: Briefcase,
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
