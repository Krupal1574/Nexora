import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B0F19]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#2E8BF014_0%,transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #2E8BF0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="relative z-10 text-center max-w-lg mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-[#2E8BF0]/10 border border-[#2E8BF0]/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_#2E8BF033]">
          <Search className="w-10 h-10 text-[#2E8BF0]" />
        </div>
        
        <h1 
          className="text-7xl font-bold text-white mb-4"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        
        <p className="text-[#94A3B8] mb-8 leading-relaxed">
          We couldn't find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/contact" className="btn-ghost w-full sm:w-auto">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
