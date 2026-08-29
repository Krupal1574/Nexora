"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/lib/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0F19]/90 backdrop-blur-xl border-b border-[#2E8BF0]/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 shadow-[0_0_16px_#2E8BF033] group-hover:shadow-[0_0_24px_#2E8BF066] transition-all duration-300">
                <Image
                  src="/brand/nexora-mark.png"
                  alt="Nexora logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="flex flex-col leading-none">
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    background: "linear-gradient(135deg, #ffffff 0%, #2E8BF0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Nexora
                </span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#F0851F] mt-1">
                  Staffing LLP
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-200 group ${
                    pathname === link.href
                      ? "text-[#2E8BF0]"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#2E8BF0] to-[#F0851F] rounded-full transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a href={siteConfig.contact.phoneHref} className="btn-primary text-sm">
                <Phone className="w-4 h-4" />
                Call Us Now!
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              ref={menuButtonRef}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#94A3B8] hover:text-[#2E8BF0] hover:bg-[#2E8BF0]/10 transition-all"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-50 bg-[#121623] border-l border-[#2E8BF0]/15 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#1A202C]">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/10">
                <Image
                  src="/brand/nexora-mark.png"
                  alt="Nexora logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="flex flex-col leading-none">
                <span
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    background: "linear-gradient(135deg, #ffffff 0%, #2E8BF0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Nexora
                </span>
                <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#F0851F] mt-0.5">
                  Staffing LLP
                </span>
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              ref={closeButtonRef}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1A202C] transition-all"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col gap-1 p-4 flex-1">
            {navigation.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#2E8BF0]/10 text-[#2E8BF0] border border-[#2E8BF0]/20"
                    : "text-[#94A3B8] hover:bg-[#1A202C] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer CTA */}
          <div className="p-6 border-t border-[#1A202C]">
            <a
              href={siteConfig.contact.phoneHref}
              className="btn-primary w-full justify-center"
            >
              <Phone className="w-4 h-4" />
              Call Us Now!
            </a>
            <p className="text-center text-[#64748B] text-xs mt-3">
              {siteConfig.contact.phoneDisplay}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
