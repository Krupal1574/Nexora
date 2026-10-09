"use client";

import { useEffect } from "react";

/**
 * Locks background scroll when a modal is open.
 * Works with Lenis smooth-scroll by stopping it,
 * and uses position:fixed to prevent native scroll bleed.
 */
export function useModalScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    // Save current styles
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const prevHtml = html.style.overscrollBehavior;

    // Stop Lenis if it exists
    const lenis = (window as any).__lenis;
    if (lenis) lenis.stop();

    // Lock the body
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    return () => {
      // Restore body styles
      Object.assign(body.style, prev);
      html.style.overscrollBehavior = prevHtml;
      window.scrollTo(0, scrollY);

      // Resume Lenis
      if (lenis) lenis.start();
    };
  }, [isOpen]);
}
