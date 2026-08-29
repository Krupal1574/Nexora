import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Nexora Staffing LLP | Connecting People, Building Futures",
    template: "%s | Nexora Staffing LLP",
  },
  description:
    "Nexora Staffing LLP is a premier talent solutions firm delivering global talent acquisition, executive search, and contract staffing. Empowering teams and accelerating growth.",
  keywords: [
    "staffing solutions",
    "global talent acquisition",
    "executive search",
    "contract staffing",
    "IT staffing",
    "recruitment",
    "career consulting",
    "Nexora Staffing LLP",
  ],
  authors: [{ name: "Nexora Staffing LLP" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nexora Staffing LLP",
    title: "Nexora Staffing LLP | Connecting People, Building Futures",
    description:
      "Global talent acquisition, executive search, and contract staffing solutions. Empowering teams. Accelerating growth.",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexora Staffing LLP",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0F19] text-white antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
