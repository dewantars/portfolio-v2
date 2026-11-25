"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "CV", href: "/cv" },
  { label: "REPOSITORIES", href: "/repositories" },
  { label: "CERTIFICATIONS", href: "/certifications" },
  { label: "GALLERY", href: "/gallery" },
];

interface NavigationProps {
  name?: string;
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation({ name }: NavigationProps) {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const brandName = (name ?? "Dewanta Rahma Satria").toUpperCase();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
        "no-print fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-200",
        scrolled || menuOpen || !isHome
          ? "bg-[#000000]/95 border-b border-[var(--white-15)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className="max-w-[1320px] h-16 md:h-[72px] mx-auto px-5 md:px-8 flex items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        <Link
          className="inline-flex items-center min-h-[44px] font-display font-bold text-[15px] md:text-base tracking-[0.16em] uppercase text-[var(--white-100)] whitespace-nowrap"
          href="/"
          aria-label="Dewanta Rahma Satria, navigate to home"
        >
          {brandName}
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const active = isRouteActive(pathname, item.href);
            return (
              <Link
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link-line font-display text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200",
                  active
                    ? "nav-link-line--active text-[var(--white-100)]"
                    : "text-[var(--white-60)] hover:text-[var(--white-100)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center">
          <Link
            className="inline-flex items-center justify-center min-h-[44px] px-5 border border-[var(--white-25)] text-[var(--white-100)] font-display text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200"
            href="/#contact"
          >
            CONNECT
          </Link>
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
          "lg:hidden fixed inset-x-0 top-16 md:top-[72px] bottom-0 px-5 pb-8 pt-4 flex-col justify-between border-t border-[var(--white-15)] bg-[#000000] overflow-y-auto",
          menuOpen ? "flex" : "hidden"
        )}
      >
        <div className="flex flex-col border-t border-[var(--white-15)]">
          {navItems.map((item) => {
            const active = isRouteActive(pathname, item.href);
            return (
              <Link
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "min-h-[52px] px-3 flex items-center justify-between font-display text-sm font-semibold tracking-[0.14em] uppercase border-b border-l-2 border-r border-[var(--white-15)] transition-colors duration-200",
                  active
                    ? "border-l-[var(--white-100)] bg-[var(--white-10)] text-[var(--white-100)]"
                    : "border-l-transparent bg-[#000000] text-[var(--white-60)] hover:text-[var(--white-100)]"
                )}
              >
                <span>{item.label}</span>
                <span
                  className={cn(
                    "font-mono-tech text-[11px] tracking-[0.12em]",
                    active ? "text-[var(--white-100)]" : "text-[var(--white-60)]"
                  )}
                >
                  {active ? "ACTIVE" : "GOTO"}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="pt-6 border-t border-[var(--white-15)]">
          <Link
            className="cta-aerospace w-full"
            href="/#contact"
            onClick={() => setMenuOpen(false)}
          >
            INITIATE CONTACT
          </Link>
        </div>
      </div>
    </header>
  );
}
