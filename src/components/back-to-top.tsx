"use client";

import { useEffect, useState } from "react";
import { Arrow } from "@/components/ui/icons";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 min-w-[44px] min-h-[44px] px-3.5 inline-flex items-center justify-center gap-2 border border-[var(--white-25)] bg-[#000000] text-[var(--white-100)] font-mono-tech text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200"
    >
      <Arrow up />
      <span className="hidden sm:inline">TOP</span>
    </button>
  );
}
