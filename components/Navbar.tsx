"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, Phone, LogOut, User, LayoutDashboard, ChevronDown,
  Settings, ShoppingBag, UserCircle, Edit3,
} from "lucide-react";
import { navigation, siteConfig } from "@/lib/site";
import CartIcon from "@/components/CartIcon";
import { useSession, signOut } from "next-auth/react";

function UserAvatar({ image, name, size = 24 }: { image?: string | null; name?: string | null; size?: number }) {
  const initial = (name || "U").charAt(0).toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={name || "User avatar"}
        width={size}
        height={size}
        className="rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      className="rounded-full bg-gradient-to-br from-[#F26A21] to-[#8FB8D8] flex items-center justify-center font-bold text-black"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {initial}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
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

  // Close user dropdown when clicking outside
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const dropdownLinks = [
    { href: "/profile", label: "My Profile", icon: UserCircle },
    { href: "/profile", label: "Edit Profile", icon: Edit3 },
    { href: "/my/orders", label: "My Orders", icon: ShoppingBag },
    { href: "/my/settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F5F1E8]/95 backdrop-blur-xl border-b border-[#F26A21]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            : "bg-[#F5F1E8]/80 backdrop-blur-md border-b border-[#F26A21]/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Image
                src="/logo.jpg"
                alt="Nexora logo"
                width={36}
                height={36}
                className="rounded-full shadow-[0_0_16px_#F26A2144] group-hover:shadow-[0_0_24px_#F26A2188] transition-all duration-300"
              />
              <span
                className="text-2xl font-bold tracking-tight"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  background: "linear-gradient(135deg, #ffffff 0%, #F26A21 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nexora
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-200 group whitespace-nowrap ${
                    pathname === link.href
                      ? "text-[#F26A21]"
                      : "text-[#77736D] hover:text-[#171717]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#F26A21] to-[#8FB8D8] rounded-full transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="hidden lg:block">
                <a href={siteConfig.contact.phoneHref} className="btn-primary text-sm">
                  <Phone className="w-4 h-4 mr-1.5" />
                  Call Us Now!
                </a>
              </div>

              {/* User Menu Desktop */}
              <div className="hidden lg:flex items-center gap-3 border-l border-[#203548] pl-3 ml-1">
                {session ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#203548] hover:border-[#F26A21]/40 transition-all duration-200"
                    >
                      <UserAvatar
                        image={session.user?.image}
                        name={session.user?.name}
                        size={24}
                      />
                      <span className="text-sm font-medium text-[#171717] max-w-[100px] truncate">
                        {session.user?.name || session.user?.email}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#77736D] transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown */}
                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-60 rounded-xl bg-[#FFFFFF] border border-[#203548] shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-2 z-50">
                        {/* User header */}
                        <div className="px-4 py-3 border-b border-[#203548] flex items-center gap-3">
                          <UserAvatar
                            image={session.user?.image}
                            name={session.user?.name}
                            size={36}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#171717] truncate">{session.user?.name || "User"}</p>
                            <p className="text-xs text-[#64748B] truncate">{session.user?.email}</p>
                          </div>
                        </div>

                        {/* Nav links */}
                        <div className="py-1">
                          {dropdownLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                              key={label}
                              href={href}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#77736D] hover:text-[#F26A21] hover:bg-[#FFFFFF] transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Icon className="w-4 h-4 shrink-0" />
                              {label}
                            </Link>
                          ))}
                        </div>

                        {/* Admin */}
                        {session.user?.role === "ADMIN" && (
                          <div className="border-t border-[#203548] pt-1">
                            <Link
                              href="/admin"
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#77736D] hover:text-[#F26A21] hover:bg-[#FFFFFF] transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              Admin Dashboard
                            </Link>
                          </div>
                        )}

                        {/* Logout */}
                        <div className="border-t border-[#203548] pt-1">
                          <button
                            onClick={() => { setUserMenuOpen(false); signOut(); }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#77736D] hover:text-red-400 hover:bg-[#FFFFFF] transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/auth/login" className="text-sm font-medium text-[#77736D] hover:text-[#171717] transition-colors">
                      Login
                    </Link>
                    <Link href="/auth/register" className="text-sm font-medium px-4 py-2 rounded-full border border-[#F26A21]/30 text-[#F26A21] hover:bg-[#F26A21]/10 transition-colors">
                      Register
                    </Link>
                  </div>
                )}
              </div>

              <CartIcon />

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                ref={menuButtonRef}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#77736D] hover:text-[#F26A21] hover:bg-[#F26A21]/10 transition-all"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
        className={`fixed top-0 right-0 h-full w-80 z-50 bg-[#FFFFFF] border-l border-[#F26A21]/15 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#FFFFFF]">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="Nexora logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span
                className="text-xl font-bold"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  background: "linear-gradient(135deg, #ffffff 0%, #F26A21 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nexora
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              ref={closeButtonRef}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#77736D] hover:text-[#171717] hover:bg-[#FFFFFF] transition-all"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            {navigation.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#F26A21]/10 text-[#F26A21] border border-[#F26A21]/20"
                    : "text-[#77736D] hover:bg-[#FFFFFF] hover:text-[#171717]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-[#FFFFFF]" />

            {session ? (
              <>
                {/* User info in mobile drawer */}
                <div className="flex items-center gap-3 px-4 py-3 mb-1">
                  <UserAvatar image={session.user?.image} name={session.user?.name} size={36} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#171717] truncate">{session.user?.name || "User"}</p>
                    <p className="text-xs text-[#64748B] truncate">{session.user?.email}</p>
                  </div>
                </div>

                {dropdownLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-[#77736D] hover:bg-[#FFFFFF] hover:text-[#171717] transition-all"
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}

                {session.user?.role === "ADMIN" && (
                  <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-[#77736D] hover:bg-[#FFFFFF] hover:text-[#F26A21] transition-all">
                    <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
                  </Link>
                )}

                <div className="border-t border-[#FFFFFF] mt-1 pt-1">
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-[#77736D] hover:bg-[#FFFFFF] hover:text-red-400 transition-all"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-[#77736D] hover:bg-[#FFFFFF] hover:text-[#171717]">
                  <User className="w-5 h-5" /> Login
                </Link>
                <Link href="/auth/register" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-[#F26A21] hover:bg-[#FFFFFF]">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Drawer CTA */}
          <div className="p-6 border-t border-[#FFFFFF]">
            <a
              href={siteConfig.contact.phoneHref}
              className="btn-primary w-full justify-center"
            >
              <Phone className="w-4 h-4 mr-1.5" />
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
