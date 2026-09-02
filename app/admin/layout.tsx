import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, MessageSquareQuote, FileText, LogOut, Home } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121623] border-r border-[#203548] p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-[#00F2FE] mb-10">Nexora Admin</h2>
        
        <nav className="flex-1 space-y-4">
          <Link href="/admin" className="flex items-center gap-3 text-[#94A3B8] hover:text-[#00F2FE] transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 text-[#94A3B8] hover:text-[#00F2FE] transition-colors">
            <MessageSquareQuote className="w-5 h-5" />
            Testimonials
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 text-[#94A3B8] hover:text-[#00F2FE] transition-colors">
            <FileText className="w-5 h-5" />
            Blog Posts
          </Link>
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-[#203548]">
          <Link href="/" className="flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
