import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexora Staffing Inc. | Global Payment Details",
  description: "Official bank wire transfer information for Nexora Staffing Inc.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function PaymentDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
