import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse Nexora's exclusive career services, premium templates, and resources to accelerate your tech career.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
