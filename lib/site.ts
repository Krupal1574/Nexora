export const siteConfig = {
  name: "Nexora",
  // Configure this in production. The fallback is derived from the existing
  // company email domain and must be verified before deployment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexora.info",
  contact: {
    phoneDisplay: "+1 (484) 317-5613",
    phoneHref: "tel:+14843175613",
    email: "Support@nexorastaffingllp.com",
    instagram: "https://www.instagram.com/nexorastaffingllp?stkn=MXd6bHExejU3cm9iZA==",
    linkedin: "https://www.linkedin.com/company/nexora-staffing-llp/",
    address: "5830 E 2nd St, Ste 7000, Casper, WY 82609, USA",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=5830+E+2nd+St+Ste+7000+Casper+WY+82609",
    mapsEmbed: "https://maps.google.com/maps?q=5830+E+2nd+St+Ste+7000+Casper+WY+82609&output=embed&z=15",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Refer", href: "/refer-and-earn" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const servicesList = [
  { label: "Job Placement", href: "/services/job-placement" },
  { label: "Recruitment & Staffing", href: "/services/recruitment-and-staffing" },
  { label: "Talent Acquisition", href: "/services/talent-acquisition" },
  { label: "Background Verification", href: "/services/background-verification" },
  { label: "Accounting & Taxes", href: "/services/accounting-and-taxes" },
  { label: "IT Training", href: "/services/it-training" },
];

export function getSiteUrl() {
  return new URL(siteConfig.url);
}
