import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discounted Prices",
  description:
    "Exclusive client discounted pricing on Nexora career plans and packages.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function DiscountedPricesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

