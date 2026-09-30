"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 p-0 transition-all duration-200",
        scrolled || menuOpen
          ? "bg-[#050505]/85 backdrop-blur-[18px] border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className="max-w-[1320px] h-16 mx-auto px-5 md:px-7 lg:px-8 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center border-none rounded-none bg-transparent shadow-none"
        aria-label="Main navigation"
      >
        <a
          className="inline-flex w-fit items-center gap-2.5 font-semibold text-sm tracking-tight text-[#fafafa]"
          href="#top"
          aria-label="Dewanta, home"
        >
          <span>Dewanta Rahma Satria</span>
        </a>

        <div className="hidden lg:flex items-center gap-[26px]">
          {navItems.map((item) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              className="text-[#999999] text-[13px] hover:text-[#fafafa] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex justify-self-end items-center">
          <a
            className="inline-flex items-center justify-center h-[38px] px-[18px] bg-[#fafafa] text-[#050505] text-[13px] font-semibold rounded-[10px] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] transition-all duration-200"
            href="#contact"
          >
            Let&apos;s Connect
          </a>
        </div>

        <button
          className="flex lg:hidden w-[38px] h-[38px] flex-col justify-center items-center gap-1.5 border border-white/10 rounded-[10px] bg-transparent text-white cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={cn(
              "w-4 h-[1.5px] bg-white transition-all duration-200",
              menuOpen && "translate-y-[3.75px] rotate-45"
            )}
          />
          <span
            className={cn(
              "w-4 h-[1.5px] bg-white transition-all duration-200",
              menuOpen && "-translate-y-[3.75px] -rotate-45"
            )}
          />
        </button>
      </nav>
      <div
        className={cn(
          "w-full max-w-full m-0 px-5 py-4 md:px-7 md:py-5 flex-col gap-1 border-t border-white/10 rounded-none bg-[#050505]/95 backdrop-blur-[18px]",
          menuOpen ? "flex" : "hidden"
        )}
      >
        {navItems.map((item) => (
          <a
            href={`#${item.toLowerCase()}`}
            key={item}
            onClick={() => setMenuOpen(false)}
            className="py-2.5 text-[#999999] hover:text-[#fafafa] text-sm transition-colors duration-200 border-b border-white/5 last:border-0"
          >
            {item}
          </a>
        ))}
        <div className="mt-3 pt-4">
          <a
            className="inline-flex items-center justify-center w-full h-[38px] px-[18px] bg-[#fafafa] text-[#050505] text-[13px] font-semibold rounded-[10px] hover:bg-white transition-all duration-200"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>
    </header>
  );
}
