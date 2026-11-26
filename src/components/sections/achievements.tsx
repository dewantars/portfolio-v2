"use client";

import { useState } from "react";
import Image from "next/image";
import { Arrow, SectionLabel } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { CertificationDTO } from "@/lib/types/portfolio";

interface AchievementsProps {
  certifications: CertificationDTO[];
}

export function Achievements({ certifications }: AchievementsProps) {
  const [activeId, setActiveId] = useState<string>(
    certifications[0]?.id ?? ""
  );

  if (!certifications.length) {
    return (
      <section
        className="max-w-[1320px] mx-auto px-5 py-20 md:px-8 md:py-28 lg:py-36 border-b border-[var(--white-15)] reveal"
        id="achievements"
      >
        <SectionLabel index="05">VERIFICATION DOSSIER // HONORS</SectionLabel>
        <div className="border border-[var(--white-15)] p-8 text-center">
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)] m-0">
            NO CERTIFICATION RECORDS AVAILABLE
          </p>
        </div>
      </section>
    );
  }

  const activeIndex = Math.max(
    0,
    certifications.findIndex((a) => a.id === activeId)
  );
  const activeCert = certifications[activeIndex] ?? certifications[0];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = certifications[(index + 1) % certifications.length];
      setActiveId(next.id);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev =
        certifications[
          (index - 1 + certifications.length) % certifications.length
        ];
      setActiveId(prev.id);
    }
  };

  return (
    <section
      className="max-w-[1320px] mx-auto px-5 py-20 md:px-8 md:py-28 lg:py-36 border-b border-[var(--white-15)] reveal relative"
      id="achievements"
    >
      <SectionLabel index="05">VERIFICATION DOSSIER // HONORS</SectionLabel>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-12 lg:mb-16">
        <h2 className="font-display m-0 text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
          HONORS &amp; CERTIFICATIONS
        </h2>
        <p className="m-0 max-w-[420px] text-base leading-[1.6] text-[var(--white-60)]">
          Verified milestones, industry certifications, and academic distinctions
          in software engineering and automated quality assurance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start">
        <div
          className="flex flex-col border-t border-[var(--white-15)]"
          role="tablist"
          aria-label="Certifications and achievements"
        >
          {certifications.map((item, index) => {
            const isActive = item.id === activeCert.id;
            return (
              <button
                key={item.id}
                id={`achievement-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="achievement-preview-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "w-full min-h-[64px] p-5 md:p-6 text-left border-b border-l-2 border-r border-[var(--white-15)] transition-colors duration-200 flex flex-col gap-2",
                  isActive
                    ? "border-l-[var(--white-100)] bg-[var(--white-10)]"
                    : "border-l-transparent bg-[#000000]/65 hover:bg-[var(--gray-60)]"
                )}
              >
                <div className="flex flex-wrap justify-between items-baseline gap-3">
                  <h3
                    className={cn(
                      "font-display m-0 text-lg md:text-xl font-bold tracking-[0.04em] uppercase transition-colors duration-200",
                      isActive ? "text-[var(--white-100)]" : "text-[var(--white-60)]"
                    )}
                  >
                    {item.title}
                  </h3>
                  <span className="font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-50)] shrink-0">
                    {item.issueDate} / {item.category}
                  </span>
                </div>
                {item.description && (
                  <p
                    className={cn(
                      "m-0 text-sm leading-[1.55] transition-colors duration-200",
                      isActive ? "text-[var(--white-80)]" : "text-[var(--white-50)]"
                    )}
                  >
                    {item.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <div
          id="achievement-preview-panel"
          role="tabpanel"
          aria-labelledby={`achievement-tab-${activeCert.id}`}
          className="lg:sticky lg:top-24 border border-[var(--white-15)] bg-[#000000]/75"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--white-15)] bg-[var(--gray-60)]">
            <span className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-80)]">
              DOCUMENT // {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-50)]">
              {activeCert.issueDate}
            </span>
          </div>

          <div className="relative w-full aspect-[4/5] max-h-[460px] bg-[#000000] overflow-hidden border-b border-[var(--white-15)] flex items-center justify-center">
            {activeCert.imageUrl ? (
              <>
                <Image
                  src={activeCert.imageUrl}
                  alt={activeCert.title}
                  width={600}
                  height={848}
                  unoptimized
                  className="w-full h-full object-cover block grayscale contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,transparent_45%)] pointer-events-none" />
              </>
            ) : (
              <span className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
                NO CERTIFICATE PLATE UPLOADED
              </span>
            )}
          </div>

          <div className="p-5 md:p-6 flex flex-col gap-3">
            <h4 className="font-display m-0 text-xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
              {activeCert.title}
            </h4>
            {activeCert.description && (
              <p className="m-0 text-sm leading-[1.6] text-[var(--white-80)]">
                {activeCert.description}
              </p>
            )}
            <div className="pt-3 border-t border-[var(--white-15)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)]">
                  ISSUER // {activeCert.issuer}
                </span>
                {activeCert.credentialId && (
                  <span className="font-mono-tech text-[10px] tracking-[0.12em] uppercase text-[var(--white-60)]">
                    ID // {activeCert.credentialId}
                  </span>
                )}
              </div>
              {activeCert.verificationUrl && (
                <a
                  href={activeCert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[44px] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-100)] hover:underline"
                >
                  <span>VERIFY</span>
                  <Arrow diagonal />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
