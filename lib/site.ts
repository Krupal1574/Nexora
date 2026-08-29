export const siteConfig = {
  name: "Nexora",
  // Configure this in production. The fallback is derived from the existing
  // company email domain and must be verified before deployment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexora.info",
  contact: {
    phoneDisplay: "+1 (302) 412-4095",
    phoneHref: "tel:+13024124095",
    email: "support@nexora.info",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Refer", href: "/refer-and-earn" },
  { label: "Contact", href: "/contact" },
] as const;

export const servicesList = [
  { label: "Career Counseling", href: "/services#career-counseling" },
  { label: "Resume Support", href: "/services#resume-optimization" },
  { label: "Interview Preparation", href: "/services#resume-marketing" },
  { label: "Technical Guidance", href: "/services#technical-training" },
  { label: "Career Transition Support", href: "/services#compliance-onboarding" },
];

export function getSiteUrl() {
  return new URL(siteConfig.url);
}
