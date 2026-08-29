import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { navigation, siteConfig, servicesList } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0F19] border-t border-[#1A202C] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#2E8BF0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/10 shadow-[0_0_16px_#2E8BF033]">
                <Image
                  src="/brand/nexora-mark.png"
                  alt="Nexora logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <span className="flex flex-col leading-none">
                <span
                  className="text-2xl font-bold"
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
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Empowering teams and accelerating growth. Nexora connects skilled
              professionals with leading enterprises through end-to-end career and
              talent solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4
              className="text-white font-semibold text-base"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#2E8BF0] transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 group-hover:ml-0 duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4
              className="text-white font-semibold text-base"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Our Services
            </h4>
            <ul className="space-y-3">
              {servicesList.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#2E8BF0] transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 group-hover:ml-0 duration-200" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-5">
            <h4
              className="text-white font-semibold text-base"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2E8BF0]/10 border border-[#2E8BF0]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#2E8BF0]/20 transition-all">
                    <Phone className="w-3.5 h-3.5 text-[#2E8BF0]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide mb-0.5">
                      Phone
                    </p>
                    <p className="text-sm text-[#94A3B8] group-hover:text-white transition-colors">
                      {siteConfig.contact.phoneDisplay}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2E8BF0]/10 border border-[#2E8BF0]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#2E8BF0]/20 transition-all">
                    <Mail className="w-3.5 h-3.5 text-[#2E8BF0]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide mb-0.5">
                      Email
                    </p>
                    <p className="text-sm text-[#94A3B8] group-hover:text-white transition-colors">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 pt-8 border-t border-[#1A202C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm text-center">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-[#64748B] text-sm hover:text-[#2E8BF0] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-[#64748B] text-sm hover:text-[#2E8BF0] transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
