"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B0F19]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#00F2FE14_0%,transparent_65%)]" />
      
      <div className="relative z-10 text-center max-w-lg mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Something went wrong!
        </h1>
        
        <p className="text-[#94A3B8] mb-8 leading-relaxed">
          An unexpected error occurred. We've been notified and are looking into it. Please try again or return home.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          <Link href="/" className="btn-ghost w-full sm:w-auto">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
