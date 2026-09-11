import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import CartProvider from "@/components/CartProvider";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";

import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Nexora | IT Staffing, Talent Recruitment & Career Consulting",
    template: "%s | Nexora",
  },
  description:
    "Nexora is a premier IT staffing and talent solutions firm connecting top tech professionals with leading U.S. enterprises. Expert career counseling, resume optimization, and placement services.",
  keywords: [
    "IT staffing",
    "tech talent",
    "career consulting",
    "resume optimization",
    "technical training",
    "US job placement",
    "Nexora",
  ],
  authors: [{ name: "Nexora" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nexora",
    title: "Nexora | IT Staffing, Talent Recruitment & Career Consulting",
    description:
      "Premier IT staffing and talent solutions firm connecting top tech professionals with leading U.S. enterprises.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen pt-16 lg:pt-20 pb-20 lg:pb-0">{children}</main>
            <Footer />
            <MobileBottomNav />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
