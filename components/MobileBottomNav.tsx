"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Briefcase, Gift, MessageCircle, ShoppingCart } from "lucide-react";

const mobileNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Users },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Shop", href: "/shop", icon: ShoppingCart },
  { label: "Contact", href: "/contact", icon: MessageCircle },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide the bottom nav when keyboard is open on mobile
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1, interactive-widget=resizes-content"
      );
    }
  }, []);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      aria-label="Mobile navigation"
    >
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#F26A21]/40 to-transparent" />

      <div className="bg-[#F5F1E8]/95 backdrop-blur-xl border-t border-[#FFFFFF]">
        <div className="flex items-center justify-around px-2 py-1.5">
          {mobileNavItems.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/" && pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl min-w-[56px] transition-all duration-200 ${
                  isActive
                    ? "text-[#F26A21]"
                    : "text-[#64748B] active:text-[#77736D]"
                }`}
              >
                <div
                  className={`relative p-1.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#F26A21]/10"
                      : ""
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F26A21] shadow-[0_0_6px_#F26A21]" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium leading-tight ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Safe area spacing for notched phones */}
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </nav>
  );
}
