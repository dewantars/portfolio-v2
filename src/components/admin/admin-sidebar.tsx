"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOutAdminAction } from "@/lib/actions/admin/auth";

interface SubMenuItem {
  label: string;
  href: string;
}

interface SidebarSection {
  id: string;
  code: string;
  label: string;
  href?: string;
  matchPrefixes: string[];
  children?: SubMenuItem[];
}

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    id: "overview",
    code: "00",
    label: "TELEMETRY OVERVIEW",
    href: "/admin",
    matchPrefixes: ["/admin"],
  },
  {
    id: "global",
    code: "01",
    label: "GLOBAL & IDENTITY",
    matchPrefixes: ["/admin/global"],
    children: [
      { label: "Basics & Profile", href: "/admin/global/basics" },
      { label: "Navbar & Footer", href: "/admin/global/navigation" },
    ],
  },
  {
    id: "home",
    code: "02",
    label: "HOME PAGE",
    matchPrefixes: ["/admin/home"],
    children: [
      { label: "Hero & Manifesto", href: "/admin/home/hero" },
      { label: "Mission Showcase", href: "/admin/home/missions" },
    ],
  },
  {
    id: "cv",
    code: "03",
    label: "CV DOSSIER",
    matchPrefixes: ["/admin/cv"],
    children: [
      { label: "Work Experience", href: "/admin/cv/work" },
      { label: "Education", href: "/admin/cv/education" },
      { label: "Skills & Tech Specs", href: "/admin/cv/skills" },
      { label: "Languages", href: "/admin/cv/languages" },
    ],
  },
  {
    id: "repositories",
    code: "04",
    label: "REPOSITORIES",
    href: "/admin/repositories",
    matchPrefixes: ["/admin/repositories"],
  },
  {
    id: "certifications",
    code: "05",
    label: "CERTIFICATIONS",
    matchPrefixes: ["/admin/certifications"],
    children: [
      { label: "Credentials List", href: "/admin/certifications" },
      { label: "Add Credential", href: "/admin/certifications/new" },
    ],
  },
  {
    id: "gallery",
    code: "06",
    label: "GALLERY ARCHIVE",
    matchPrefixes: ["/admin/gallery"],
    children: [
      { label: "Media Archive", href: "/admin/gallery" },
      { label: "Upload Media", href: "/admin/gallery/upload" },
    ],
  },
];

function isExactOrParentActive(pathname: string, section: SidebarSection): boolean {
  if (section.href === "/admin") {
    return pathname === "/admin";
  }
  return section.matchPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function isSubItemActive(pathname: string, href: string): boolean {
  return pathname === href;
}

export function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname() ?? "/admin";
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track manually toggled groups in addition to auto-expanding the active group
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of SIDEBAR_SECTIONS) {
      if (section.children && isExactOrParentActive(pathname, section)) {
        initial[section.id] = true;
      }
    }
    return initial;
  });

  useEffect(() => {
    setMobileOpen(false);
    setExpandedMap((prev) => {
      const next = { ...prev };
      for (const section of SIDEBAR_SECTIONS) {
        if (section.children && isExactOrParentActive(pathname, section)) {
          next[section.id] = true;
        }
      }
      return next;
    });
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const toggleGroup = (id: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderNavTree = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col">
        {/* Console Brand Header */}
        <div className="px-5 py-5 border-b border-[var(--white-15)] bg-[#000000]">
          <div className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[var(--white-50)] mb-1">
            CMS // MISSION CONTROL
          </div>
          <Link
            href="/admin"
            className="font-display text-lg font-bold tracking-[0.12em] uppercase text-[var(--white-100)] inline-flex items-center min-h-[32px]"
          >
            PORTFOLIO ADMIN
          </Link>
        </div>

        {/* Navigation Sections */}
        <nav aria-label="Admin CMS navigation" className="py-2 flex flex-col">
          {SIDEBAR_SECTIONS.map((section) => {
            const groupActive = isExactOrParentActive(pathname, section);
            const isExpanded = Boolean(expandedMap[section.id]);

            if (!section.children && section.href) {
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  aria-current={groupActive ? "page" : undefined}
                  className={cn(
                    "min-h-[46px] px-5 flex items-center justify-between gap-3 border-b border-[var(--white-15)] border-l-2 font-mono-tech text-[11px] tracking-[0.14em] uppercase transition-colors duration-150",
                    groupActive
                      ? "border-l-[var(--white-100)] bg-[var(--white-10)] text-[var(--white-100)]"
                      : "border-l-transparent text-[var(--white-60)] hover:text-[var(--white-100)] hover:bg-[var(--white-10)]"
                  )}
                >
                  <span className="truncate">
                    {section.code} {"//"} {section.label}
                  </span>
                </Link>
              );
            }

            return (
              <div
                key={section.id}
                className="border-b border-[var(--white-15)]"
              >
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => toggleGroup(section.id)}
                  className={cn(
                    "w-full min-h-[46px] px-5 flex items-center justify-between gap-3 border-l-2 font-mono-tech text-[11px] tracking-[0.14em] uppercase text-left transition-colors duration-150",
                    groupActive
                      ? "border-l-[var(--white-100)] text-[var(--white-100)] bg-[var(--gray-60)]"
                      : "border-l-transparent text-[var(--white-60)] hover:text-[var(--white-100)] hover:bg-[var(--white-10)]"
                  )}
                >
                  <span className="truncate">
                    {section.code} {"//"} {section.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono-tech text-[11px] text-[var(--white-50)] shrink-0"
                  >
                    {isExpanded ? "[-]" : "[+]"}
                  </span>
                </button>

                {isExpanded && section.children && (
                  <div className="pl-5 pr-2 py-2 bg-[#000000]">
                    <div className="border-l border-[var(--white-15)] flex flex-col">
                      {section.children.map((sub) => {
                        const subActive = isSubItemActive(pathname, sub.href);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            aria-current={subActive ? "page" : undefined}
                            className={cn(
                              "min-h-[44px] pl-4 pr-3 flex items-center gap-2.5 border-l-2 -ml-[1px] font-mono-tech text-xs tracking-[0.06em] transition-colors duration-150",
                              subActive
                                ? "border-l-[var(--white-100)] text-[var(--white-100)] bg-[var(--white-10)]"
                                : "border-l-transparent text-[var(--white-60)] hover:text-[var(--white-100)] hover:bg-[var(--white-10)]"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className="text-[11px] text-[var(--white-50)]"
                            >
                              &gt;
                            </span>
                            <span className="truncate">{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Operator Bar */}
      <div className="p-5 border-t border-[var(--white-15)] bg-[#000000] flex flex-col gap-3">
        <div>
          <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-0.5">
            ACTIVE OPERATOR
          </div>
          <div className="font-mono-tech text-xs text-[var(--white-80)] truncate">
            {adminEmail}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] px-3 inline-flex items-center justify-center border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)] hover:border-[var(--white-100)] transition-colors duration-150"
          >
            LIVE SITE
          </Link>
          <form action={signOutAdminAction}>
            <button
              type="submit"
              className="w-full min-h-[44px] px-3 inline-flex items-center justify-center border border-[var(--white-25)] bg-[#000000] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-150"
            >
              LOGOUT
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 h-16 px-5 bg-[#000000] border-b border-[var(--white-15)] flex items-center justify-between gap-4">
        <Link
          href="/admin"
          className="font-display text-base font-bold tracking-[0.14em] uppercase text-[var(--white-100)]"
        >
          CMS // CONSOLE
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="admin-mobile-drawer"
          aria-label={mobileOpen ? "Close admin sidebar" : "Open admin sidebar"}
          className="min-w-[44px] min-h-[44px] px-3 border border-[var(--white-25)] bg-[#000000] font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-100)] hover:border-[var(--white-100)]"
        >
          {mobileOpen ? "CLOSE" : "MENU"}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="admin-mobile-drawer"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-[#000000] border-t border-[var(--white-15)] overflow-y-auto"
        >
          {renderNavTree()}
        </div>
      )}

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:block w-[290px] shrink-0 border-r border-[var(--white-15)] bg-[#000000] min-h-screen sticky top-0 max-h-screen overflow-y-auto">
        {renderNavTree()}
      </aside>
    </>
  );
}
