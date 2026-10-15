import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[#F5F1E8]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#F26A2114_0%,transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #F26A21 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-[#F26A21]/10 border border-[#F26A21]/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_#F26A2133]">
          <svg
            className="w-10 h-10 text-[#F26A21]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <h1
          className="text-7xl font-bold text-[#171717] mb-4"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          404
        </h1>
        <h2 className="text-2xl font-semibold text-[#171717] mb-4">Page Not Found</h2>

        <p className="text-[#77736D] mb-8 leading-relaxed">
          We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
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
