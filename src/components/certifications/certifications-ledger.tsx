"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Arrow } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Achievement } from "@prisma/client";

interface CertificationsLedgerProps {
  achievements: Achievement[];
}

export function CertificationsLedger({
  achievements,
}: CertificationsLedgerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [inspectedItem, setInspectedItem] = useState<Achievement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of achievements) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return Array.from(counts.entries());
  }, [achievements]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "ALL") return achievements;
    return achievements.filter((item) => item.category === selectedCategory);
  }, [achievements, selectedCategory]);

  useEffect(() => {
    if (!inspectedItem) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInspectedItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [inspectedItem]);

  if (achievements.length === 0) {
    return (
      <div className="border border-[var(--white-15)] p-10 text-center">
        <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)] m-0">
          NO CERTIFICATION OR CREDENTIAL RECORDS AVAILABLE
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Category Filter Strip */}
      <div className="border border-[var(--white-15)] bg-[#000000]/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter credentials by category"
        >
          <button
            type="button"
            aria-pressed={selectedCategory === "ALL"}
            onClick={() => setSelectedCategory("ALL")}
            className={cn(
              "min-h-[44px] px-4 border font-mono-tech text-xs tracking-[0.12em] uppercase transition-colors duration-200",
              selectedCategory === "ALL"
                ? "border-[var(--white-100)] bg-[var(--white-100)] text-[#000000]"
                : "border-[var(--white-25)] bg-[#000000] text-[var(--white-80)] hover:border-[var(--white-100)]"
            )}
          >
            ALL ({achievements.length})
          </button>
          {categories.map(([category, count]) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "min-h-[44px] px-4 border font-mono-tech text-xs tracking-[0.12em] uppercase transition-colors duration-200",
                  active
                    ? "border-[var(--white-100)] bg-[var(--white-100)] text-[#000000]"
                    : "border-[var(--white-25)] bg-[#000000] text-[var(--white-80)] hover:border-[var(--white-100)]"
                )}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        <span className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-60)] shrink-0">
          LOGGED // {filteredItems.length} RECORDS
        </span>
      </div>

      {/* Credential Verification Ledger */}
      {filteredItems.length === 0 ? (
        <div className="border border-[var(--white-15)] p-10 flex flex-col items-start gap-4">
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)] m-0">
            NO CREDENTIALS MATCH SELECTED CATEGORY
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className="cta-aerospace-secondary"
          >
            SHOW ALL CREDENTIALS
          </button>
        </div>
      ) : (
        <div className="border border-[var(--white-15)] divide-y divide-[var(--white-15)] bg-[#000000]/80">
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 p-5 md:p-7 items-center hover:bg-[var(--white-10)] transition-colors duration-200"
            >
              <div className="relative w-full aspect-[16/10] border border-[var(--white-15)] bg-[#000000] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={480}
                  height={300}
                  unoptimized
                  className="w-full h-full object-cover grayscale contrast-[1.08]"
                />
              </div>

              <div className="min-w-0 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-60)]">
                  <span>CERT // {String(index + 1).padStart(2, "0")}</span>
                  <span>{item.date}</span>
                  <span>{item.category}</span>
                </div>

                <h2 className="font-display m-0 text-2xl md:text-3xl font-bold tracking-[0.03em] uppercase text-[var(--white-100)]">
                  {item.title}
                </h2>

                <p className="m-0 text-sm md:text-base leading-[1.6] text-[var(--white-80)]">
                  {item.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-tech text-xs tracking-[0.08em] text-[var(--white-60)]">
                  <span>ISSUER: {item.issuer.toUpperCase()}</span>
                  {item.tags.length > 0 && (
                    <span>SPEC: {item.tags.join(" / ")}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    lastTriggerRef.current = e.currentTarget;
                    setInspectedItem(item);
                  }}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 border border-[var(--white-100)] bg-transparent font-display text-xs font-bold tracking-[0.14em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-200"
                >
                  <span>INSPECT DOCUMENT</span>
                  <Arrow />
                </button>

                {item.credentialUrl ? (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)] hover:border-[var(--white-100)] transition-colors duration-200"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <Arrow diagonal />
                  </a>
                ) : (
                  <span className="font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-60)] py-2">
                    ARCHIVE RECORD // NO EXTERNAL URL
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Document Inspection Modal */}
      {inspectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[var(--black-80)]"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setInspectedItem(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certification-modal-title"
            className="w-full max-w-[880px] max-h-[90vh] overflow-y-auto bg-[#000000] border border-[var(--white-100)] p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[var(--white-15)]">
              <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-80)]">
                CREDENTIAL INSPECTION // {inspectedItem.date}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setInspectedItem(null)}
                className="min-h-[44px] px-4 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-200"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="relative w-full aspect-video border border-[var(--white-15)] bg-[#000000] overflow-hidden">
                <Image
                  src={inspectedItem.image}
                  alt={inspectedItem.title}
                  width={1280}
                  height={720}
                  unoptimized
                  className="w-full h-full object-cover grayscale contrast-[1.08]"
                />
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-60)]">
                  {inspectedItem.category}
                </span>
                <h3
                  id="certification-modal-title"
                  className="font-display m-0 text-2xl md:text-4xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]"
                >
                  {inspectedItem.title}
                </h3>
                <p className="m-0 text-sm md:text-base leading-[1.6] text-[var(--white-80)]">
                  {inspectedItem.description}
                </p>

                <div className="border-t border-b border-[var(--white-15)] py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-60)] mb-1">
                      ISSUING AUTHORITY
                    </div>
                    <div className="font-mono-tech text-xs uppercase text-[var(--white-100)]">
                      {inspectedItem.issuer}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-60)] mb-1">
                      ISSUE YEAR
                    </div>
                    <div className="font-mono-tech text-xs text-[var(--white-100)]">
                      {inspectedItem.date}
                    </div>
                  </div>
                  {inspectedItem.tags.length > 0 && (
                    <div>
                      <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-60)] mb-1">
                        CLASSIFICATION TAGS
                      </div>
                      <div className="font-mono-tech text-xs text-[var(--white-80)]">
                        {inspectedItem.tags.join(" / ")}
                      </div>
                    </div>
                  )}
                </div>

                {inspectedItem.credentialUrl ? (
                  <a
                    href={inspectedItem.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cta-aerospace gap-2.5 w-full sm:w-auto self-start"
                  >
                    <span>OPEN VERIFICATION LINK</span>
                    <Arrow diagonal />
                  </a>
                ) : (
                  <p className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-60)] m-0">
                    CREDENTIAL VERIFICATION URL NOT ATTACHED TO THIS ARCHIVE RECORD.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
