import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { navigation, siteConfig, servicesList } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-[#F5F1E8] overflow-hidden">
      {/* Gradient top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#F26A21] to-transparent" />

      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#F26A21]/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-[#8FB8D8]/[0.03] rounded-full blur-[80px] pointer-events-none" />

      {/* CTA Banner */}
      <div className="container-wide pt-16 pb-10">
        <div className="relative rounded-2xl border border-[#F26A21]/15 bg-gradient-to-br from-[#F26A21]/[0.06] to-transparent p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#F26A21]/[0.05] rounded-full blur-[80px] pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F26A21]/10 border border-[#F26A21]/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#F26A21]" />
            </div>
            <div>
              <h3
                className="text-[#171717] text-lg sm:text-xl font-bold"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Ready to Launch Your Career?
              </h3>
              <p className="text-[#77736D] text-sm mt-0.5">
                Get started with a free consultation today.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="relative btn-primary flex-shrink-0 group"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-wide pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <Image
                src="/logo.jpg"
                alt="Nexora logo"
                width={40}
                height={40}
                className="rounded-full shadow-[0_0_20px_#F26A2155] group-hover:shadow-[0_0_28px_#F26A2177] transition-shadow duration-300"
              />
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #F26A21 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nexora
              </span>
            </Link>
            <p className="text-[#77736D] text-sm leading-relaxed max-w-[260px]">
              Nexora provides practical career and talent support for people
              navigating their next opportunity.
            </p>
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#FFFFFF]/60 border border-[#E5E5E5]/60 text-xs text-[#77736D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] animate-pulse" />
              Tampa, FL — Serving Nationwide
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-[#171717] font-semibold text-sm uppercase tracking-widest relative pb-3">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#F26A21] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-[#77736D] hover:text-[#F26A21] transition-all duration-200 group hover:translate-x-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A5568] group-hover:bg-[#F26A21] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-[#171717] font-semibold text-sm uppercase tracking-widest relative pb-3">
              Our Services
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#8FB8D8] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {servicesList.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2 text-sm text-[#77736D] hover:text-[#F26A21] transition-all duration-200 group hover:translate-x-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A5568] group-hover:bg-[#F26A21] transition-colors flex-shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-5">
            <h4 className="text-[#171717] font-semibold text-sm uppercase tracking-widest relative pb-3">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#F26A21] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-5">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F26A21]/15 to-[#F26A21]/5 border border-[#F26A21]/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_16px_#F26A2133] transition-all duration-300">
                    <Phone className="w-4 h-4 text-[#F26A21]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <p className="text-sm text-[#77736D] group-hover:text-[#171717] transition-colors font-medium">
                      {siteConfig.contact.phoneDisplay}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8FB8D8]/15 to-[#8FB8D8]/5 border border-[#8FB8D8]/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_16px_#8FB8D833] transition-all duration-300">
                    <Mail className="w-4 h-4 text-[#8FB8D8]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <p className="text-sm text-[#77736D] group-hover:text-[#171717] transition-colors font-medium">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E1306C]/15 to-[#E1306C]/5 border border-[#E1306C]/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_16px_#E1306C33] transition-all duration-300">
                    <svg className="w-4 h-4 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                  <div className="flex flex-col justify-center h-10">
                    <p className="text-sm text-[#77736D] group-hover:text-[#171717] transition-colors font-medium">
                      Instagram
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A66C2]/15 to-[#0A66C2]/5 border border-[#0A66C2]/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_16px_#0A66C233] transition-all duration-300">
                    <svg className="w-4 h-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <div className="flex flex-col justify-center h-10">
                    <p className="text-sm text-[#77736D] group-hover:text-[#171717] transition-colors font-medium">
                      LinkedIn
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-wide pb-24 lg:pb-0">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent" />
        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm text-center">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#77736D]">Nexora</span>. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1">
            <Link
              href="/privacy-policy"
              className="text-[#64748B] text-sm hover:text-[#F26A21] transition-colors px-3 py-1 rounded-md hover:bg-[#F26A21]/5"
            >
              Privacy Policy
            </Link>
            <span className="text-[#E5E5E5]">·</span>
            <Link
              href="/terms-and-conditions"
              className="text-[#64748B] text-sm hover:text-[#F26A21] transition-colors px-3 py-1 rounded-md hover:bg-[#F26A21]/5"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
