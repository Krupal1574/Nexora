import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Nexora Insights | Career & Industry Resources",
    template: "%s",
  },
  description:
    "Explore career advice, recruitment insights, industry trends, and practical resources from Nexora Staffing LLP.",
  openGraph: {
    type: "website",
    siteName: "Nexora Staffing LLP",
    title: "Nexora Insights",
    description:
      "Career advice, industry insights, and practical resources for professionals and employers.",
    url: "https://www.nexorastaffingllp.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
