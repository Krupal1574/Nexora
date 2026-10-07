"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, MessageSquareQuote, FileText, Home, 
  Users, BookOpen, Package, ShoppingCart, Mail, Tag, Image as ImageIcon, Settings, Activity, Menu, X
} from "lucide-react";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/courses", icon: BookOpen, label: "Courses" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/blogs", icon: FileText, label: "Blog Posts" },
    { href: "/admin/testimonials", icon: MessageSquareQuote, label: "Testimonials" },
    { href: "/admin/inquiries", icon: Mail, label: "Inquiries" },
    { href: "/admin/coupons", icon: Tag, label: "Coupons" },
    { href: "/admin/media", icon: ImageIcon, label: "Media Library" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
    { href: "/admin/logs", icon: Activity, label: "Audit Logs" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#171717] flex flex-col md:flex-row relative w-full overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-[#FFFFFF] border-b border-[#203548] p-4 sticky top-0 z-20">
        <h2 className="text-xl font-bold text-[#F26A21]">Nexora Admin</h2>
        <button onClick={() => setIsOpen(true)} className="p-2 text-[#77736D] hover:text-[#171717]">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-40 h-screen
        w-64 bg-[#FFFFFF] border-r border-[#203548] p-6 flex flex-col overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        <div className="flex justify-between items-center mb-10 shrink-0">
          <h2 className="text-2xl font-bold text-[#F26A21]">Nexora Admin</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-[#77736D] hover:text-[#171717] -mr-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 rounded transition-colors ${
                  isActive 
                    ? "text-[#F26A21] bg-[#FFFFFF]" 
                    : "text-[#77736D] hover:text-[#F26A21] hover:bg-[#FFFFFF]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-[#203548]">
          <Link href="/" className="flex items-center gap-3 text-[#77736D] hover:text-[#171717] transition-colors p-2">
            <Home className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto min-w-0 w-full">
        {children}
      </main>
    </div>
  );
}
