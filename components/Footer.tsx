import Link from "next/link";
import {
  Phone,
  Mail,
  Zap,
  ArrowRight,
} from "lucide-react";
import { navigation, siteConfig, servicesList } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0F19] border-t border-[#1A202C] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#00F2FE]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide section-spacing">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F2FE] to-[#00D2C4] flex items-center justify-center shadow-[0_0_16px_#00F2FE44]">
                <Zap className="w-5 h-5 text-[#0B0F19]" fill="currentColor" />
              </div>
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  background: "linear-gradient(135deg, #ffffff 0%, #00F2FE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nexora
              </span>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Nexora provides practical career and talent support for people navigating their next opportunity.
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
                    className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00F2FE] transition-colors group"
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
                    className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00F2FE] transition-colors group"
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
                  <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#00F2FE]/20 transition-all">
                    <Phone className="w-3.5 h-3.5 text-[#00F2FE]" />
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
                  <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#00F2FE]/20 transition-all">
                    <Mail className="w-3.5 h-3.5 text-[#00F2FE]" />
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
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-[#64748B] text-sm hover:text-[#00F2FE] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-[#64748B] text-sm hover:text-[#00F2FE] transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
