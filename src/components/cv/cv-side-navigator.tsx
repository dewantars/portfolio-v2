"use client";

import { useEffect, useState } from "react";
import { FileTextIcon, Arrow } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface CvNavSection {
  id: string;
  code: string;
  label: string;
}

export const CV_SECTIONS: CvNavSection[] = [
  { id: "basics", code: "01", label: "BASICS" },
  { id: "work", code: "02", label: "WORK" },
  { id: "education", code: "03", label: "EDUCATION" },
  { id: "awards", code: "04", label: "AWARDS" },
  { id: "skills", code: "05", label: "SKILLS" },
  { id: "languages", code: "06", label: "LANGUAGES" },
];

interface CvSideNavigatorProps {
  staticPdfUrl?: string;
}

export function CvSideNavigator({ staticPdfUrl }: CvSideNavigatorProps) {
  const [activeId, setActiveId] = useState<string>(CV_SECTIONS[0].id);

  useEffect(() => {
    const sectionElements = CV_SECTIONS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const visibleMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleMap.delete(entry.target.id);
          }
        }

        const nearBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 48;

        if (nearBottom) {
          setActiveId(CV_SECTIONS[CV_SECTIONS.length - 1].id);
          return;
        }

        if (visibleMap.size > 0) {
          let topSection = CV_SECTIONS[0].id;
          for (const section of CV_SECTIONS) {
            if (visibleMap.has(section.id)) {
              topSection = section.id;
              break;
            }
          }
          setActiveId(topSection);
        }
      },
      {
        rootMargin: "-110px 0px -35% 0px",
        threshold: [0, 0.15, 0.4],
      }
    );

    const handleScrollBottom = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 48;
      if (nearBottom) {
        setActiveId(CV_SECTIONS[CV_SECTIONS.length - 1].id);
      }
    };

    for (const el of sectionElements) {
      observer.observe(el);
    }
    window.addEventListener("scroll", handleScrollBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollBottom);
    };
  }, []);

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;

    setActiveId(sectionId);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });

    if (window.history.replaceState) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  return (
    <aside
      aria-label="Curriculum Vitae section navigation"
      className="no-print sticky top-16 md:top-[72px] lg:top-24 z-30 self-start bg-[#000000]/95 lg:bg-transparent border-b border-[var(--white-15)] lg:border-b-0 -mx-5 px-5 py-2.5 lg:mx-0 lg:px-0 lg:py-0"
    >
      {/* Mobile horizontal scrollable anchor bar */}
      <nav
        aria-label="CV sections"
        className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1"
      >
        {CV_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleNavigate(e, section.id)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "min-h-[44px] px-3.5 inline-flex items-center whitespace-nowrap border-b-2 font-mono-tech text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 shrink-0",
                isActive
                  ? "border-[var(--white-100)] text-[var(--white-100)] bg-[var(--white-10)]"
                  : "border-transparent text-[var(--white-50)] hover:text-[var(--white-100)]"
              )}
            >
              {section.code} {"//"} {section.label}
            </a>
          );
        })}
      </nav>

      {/* Desktop sticky vertical side navigator */}
      <div className="hidden lg:flex flex-col border border-[var(--white-15)] bg-[#000000]/80">
        <div className="px-4 py-3 border-b border-[var(--white-15)] bg-[var(--gray-60)]">
          <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[var(--white-80)]">
            DOSSIER INDEX
          </span>
        </div>

        <nav aria-label="CV sections" className="flex flex-col">
          {CV_SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavigate(e, section.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "min-h-[46px] px-4 flex items-center justify-between border-b border-[var(--white-15)] border-l-2 font-mono-tech text-xs tracking-[0.14em] uppercase transition-colors duration-200",
                  isActive
                    ? "border-l-[var(--white-100)] text-[var(--white-100)] bg-[var(--white-10)]"
                    : "border-l-transparent text-[var(--white-50)] hover:text-[var(--white-100)] hover:bg-[var(--white-10)]"
                )}
              >
                <span>
                  {section.code} {"//"} {section.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="p-4 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full min-h-[44px] px-4 inline-flex items-center justify-center gap-2.5 border border-[var(--white-25)] bg-[#000000] text-[var(--white-100)] font-display text-xs font-bold tracking-[0.14em] uppercase hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200"
          >
            <FileTextIcon />
            <span>PRINT / EXPORT PDF</span>
          </button>

          {staticPdfUrl && (
            <a
              href={staticPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full min-h-[44px] px-4 inline-flex items-center justify-center gap-2 border border-[var(--white-15)] bg-transparent text-[var(--white-80)] font-mono-tech text-[11px] tracking-[0.12em] uppercase hover:text-[var(--white-100)] hover:border-[var(--white-25)] transition-colors duration-200"
            >
              <span>STATIC PDF</span>
              <Arrow diagonal />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
