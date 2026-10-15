"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function ShareArticleButton() {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  async function handleShare() {
    const shareData = {
      title: typeof document !== "undefined" ? document.title : "",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        setSharing(true);
        await navigator.share(shareData);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error("Unable to share article:", error);
        }
      } finally {
        setSharing(false);
      }

      return;
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        window.setTimeout(() => {
          setCopied(false);
        }, 2200);
      } else {
        window.prompt("Copy this article URL:", shareData.url);
      }
    } catch {
      window.prompt("Copy this article URL:", shareData.url);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={sharing}
      aria-label={
        copied ? "Article link copied" : "Share article"
      }
      className="
        group inline-flex h-11 items-center justify-center gap-2
        rounded-full border border-black/10 bg-white
        px-4 text-sm font-medium text-[#171717]
        shadow-sm transition-all duration-300
        hover:border-[#F26A21]/50 hover:bg-[#F5F1E8]
        hover:text-[#F26A21]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#F26A21]
        disabled:opacity-60
      "
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <Share2
          className={`h-4 w-4 transition-transform ${
            sharing ? "animate-pulse" : "group-hover:rotate-6"
          }`}
        />
      )}

      <span>
        {copied ? "Link copied" : "Share article"}
      </span>
    </button>
  );
}
