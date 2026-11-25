"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "ACHIEVEMENTS", href: "#achievements" },
  { label: "CONTACT", href: "#contact" },
];

interface NavigationProps {
  name?: string;
}

export function Navigation({ name }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const brandName = (name ?? "Dewanta Rahma Satria").toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-200",
        scrolled || menuOpen
          ? "bg-[#000000]/95 border-b border-[var(--white-15)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className="max-w-[1320px] h-16 md:h-[72px] mx-auto px-5 md:px-8 flex items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        <a
          className="inline-flex items-center min-h-[44px] font-display font-bold text-[15px] md:text-base tracking-[0.16em] uppercase text-[var(--white-100)] whitespace-nowrap"
          href="#top"
          aria-label="Dewanta Rahma Satria, back to top"
        >
          {brandName}
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.href}
              className="nav-link-line font-display text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--white-60)] hover:text-[var(--white-100)] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center">
          <a
            className="inline-flex items-center justify-center min-h-[44px] px-5 border border-[var(--white-25)] text-[var(--white-100)] font-display text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200"
            href="#contact"
          >
            CONNECT
          </a>
        </div>

        <button
          type="button"
          className="flex lg:hidden w-[44px] h-[44px] flex-col justify-center items-center gap-1.5 border border-[var(--white-25)] bg-transparent text-[var(--white-100)] hover:border-[var(--white-100)] transition-colors duration-200"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-drawer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={cn(
              "w-4 h-[1.5px] bg-[var(--white-100)] transition-transform duration-200",
              menuOpen && "translate-y-[3.75px] rotate-45"
            )}
          />
          <span
            className={cn(
              "w-4 h-[1.5px] bg-[var(--white-100)] transition-transform duration-200",
              menuOpen && "-translate-y-[3.75px] -rotate-45"
            )}
          />
        </button>
      </nav>

      <div
        id="mobile-navigation-drawer"
        className={cn(
          "lg:hidden w-full px-5 pb-6 pt-2 flex-col border-t border-[var(--white-15)] bg-[#000000]",
          menuOpen ? "flex" : "hidden"
        )}
      >
        {navItems.map((item) => (
          <a
            href={item.href}
            key={item.href}
            onClick={() => setMenuOpen(false)}
            className="min-h-[44px] flex items-center justify-between font-display text-sm font-semibold tracking-[0.14em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)] border-b border-[var(--white-15)]"
          >
            <span>{item.label}</span>
            <span className="font-mono-tech text-[11px] text-[var(--white-50)]">GOTO</span>
          </a>
        ))}
        <div className="pt-5">
          <a
            className="cta-aerospace w-full"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            INITIATE CONTACT
          </a>
        </div>
      </div>
    </header>
  );
}
