"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Arrow } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type {
  GalleryAspectRatio,
  GalleryFeaturedSource,
  GalleryFrame,
} from "@/lib/data/gallery";

interface GalleryArchiveProps {
  featured: GalleryFeaturedSource;
  frames: GalleryFrame[];
}

type LightboxItem = {
  id: string;
  code: string;
  title: string;
  category: string;
  location: string;
  date: string;
  mediaType: "video" | "image";
  src: string | null;
  poster?: string | null;
  alt: string;
  ratio: GalleryAspectRatio;
  targetPath?: string;
  note: string;
};

function getTileClasses(ratio: GalleryFrame["ratio"]): string {
  switch (ratio) {
    case "2:1":
      return "sm:col-span-2 lg:col-span-2 lg:row-span-1 aspect-[2/1] lg:aspect-auto lg:h-full";
    case "1:2":
      return "sm:col-span-1 lg:col-span-1 sm:row-span-2 lg:row-span-2 aspect-[1/2] sm:aspect-auto sm:h-full";
    case "1:1":
    default:
      return "sm:col-span-1 lg:col-span-1 lg:row-span-1 aspect-square lg:aspect-auto lg:h-full";
  }
}

function getTileDimensions(ratio: GalleryFrame["ratio"]): {
  width: number;
  height: number;
} {
  switch (ratio) {
    case "2:1":
      return { width: 1200, height: 600 };
    case "1:2":
      return { width: 600, height: 1200 };
    case "1:1":
    default:
      return { width: 800, height: 800 };
  }
}

export function GalleryArchive({ featured, frames }: GalleryArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const frame of frames) {
      counts.set(frame.category, (counts.get(frame.category) ?? 0) + 1);
    }
    return Array.from(counts.entries());
  }, [frames]);

  const visibleFrames = useMemo(() => {
    if (selectedCategory === "ALL") return frames;
    return frames.filter((f) => f.category === selectedCategory);
  }, [frames, selectedCategory]);

  const lightboxItems = useMemo<LightboxItem[]>(() => {
    const featuredItem: LightboxItem = {
      id: featured.id,
      code: featured.code,
      title: featured.title,
      category: featured.category,
      location: featured.location,
      date: featured.date,
      mediaType: featured.mediaType,
      src: featured.src,
      poster: featured.poster,
      alt: featured.alt,
      ratio: featured.ratio,
      targetPath: featured.targetPath,
      note: featured.note,
    };

    const gridItems: LightboxItem[] = visibleFrames.map((frame) => ({
      id: frame.id,
      code: frame.code,
      title: frame.title,
      category: frame.category,
      location: frame.location,
      date: frame.date,
      mediaType: "image",
      src: frame.src,
      alt: frame.alt,
      ratio: frame.ratio,
      targetPath: frame.targetPath,
      note: frame.note,
    }));

    return [featuredItem, ...gridItems];
  }, [featured, visibleFrames]);

  const activeItem =
    activeIndex !== null && lightboxItems[activeIndex]
      ? lightboxItems[activeIndex]
      : null;

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % lightboxItems.length
        );
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + lightboxItems.length) % lightboxItems.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [activeIndex, lightboxItems.length]);

  const mountedCount =
    (featured.src ? 1 : 0) + frames.filter((f) => Boolean(f.src)).length;
  const totalCount = 1 + frames.length;

  return (
    <div className="flex flex-col gap-8">
      {/* 01 // Primary 19:6 Source (Video / Photo) */}
      <section aria-label="Primary 19:6 featured media">
        <div className="border border-[var(--white-15)] bg-[#000000]">
          <div className="relative w-full aspect-[16/9] sm:aspect-[19/6] bg-[#000000] border-b border-[var(--white-15)] overflow-hidden">
            {featured.src && featured.mediaType === "video" ? (
              <video
                src={featured.src}
                poster={featured.poster ?? undefined}
                controls
                playsInline
                preload="metadata"
                width={1900}
                height={600}
                className="w-full h-full object-cover grayscale contrast-[1.06]"
              />
            ) : featured.src ? (
              <button
                type="button"
                onClick={(e) => {
                  lastTriggerRef.current = e.currentTarget;
                  setActiveIndex(0);
                }}
                aria-label={`Inspect ${featured.title} in lightbox`}
                className="group relative w-full h-full block bg-[#000000]"
              >
                <Image
                  src={featured.src}
                  alt={featured.alt}
                  width={1900}
                  height={600}
                  priority
                  fetchPriority="high"
                  unoptimized
                  className="w-full h-full object-cover grayscale contrast-[1.08] group-hover:scale-[1.01] transition-transform duration-300"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  lastTriggerRef.current = e.currentTarget;
                  setActiveIndex(0);
                }}
                className="w-full h-full p-6 md:p-10 flex flex-col justify-between text-left bg-[#000000]/80 hover:bg-[var(--white-10)] transition-colors duration-200"
              >
                <div className="w-full flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-60)]">
                  <span>{featured.code} {"//"} VIDEO OR WIDESCREEN PHOTO</span>
                  <span>RATIO 19:6</span>
                </div>

                <div className="my-auto py-4">
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)] m-0 mb-2">
                    PRIMARY 19:6 MEDIA SLOT
                  </p>
                  {featured.targetPath && (
                    <p className="font-mono-tech text-xs text-[var(--white-60)] m-0 break-all">
                      MOUNT TARGET: {featured.targetPath} (OR WIDESCREEN IMAGE)
                    </p>
                  )}
                </div>

                <div className="w-full flex items-center justify-between gap-4 font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-80)]">
                  <span>STATUS: AWAITING LOCAL MEDIA</span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--white-100)]">
                    <span>INSPECT SLOT</span>
                    <Arrow />
                  </span>
                </div>
              </button>
            )}
          </div>

          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#000000]">
            <div className="min-w-0">
              <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-60)] mb-1">
                {featured.code} {"//"} {featured.location} {"//"} {featured.date}
              </div>
              <h2 className="font-display m-0 text-xl md:text-2xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                {featured.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={(e) => {
                lastTriggerRef.current = e.currentTarget;
                setActiveIndex(0);
              }}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200 shrink-0"
            >
              <span>VIEW LIGHTBOX</span>
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Status Bar for Mosaic Grid */}
      <div className="border border-[var(--white-15)] bg-[#000000]/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter gallery frames by category"
        >
          <button
            type="button"
            aria-pressed={selectedCategory === "ALL"}
            onClick={() => {
              setSelectedCategory("ALL");
              setActiveIndex(null);
            }}
            className={cn(
              "min-h-[44px] px-4 border font-mono-tech text-xs tracking-[0.12em] uppercase transition-colors duration-200",
              selectedCategory === "ALL"
                ? "border-[var(--white-100)] bg-[var(--white-100)] text-[#000000]"
                : "border-[var(--white-25)] bg-[#000000] text-[var(--white-80)] hover:border-[var(--white-100)]"
            )}
          >
            ALL ({frames.length})
          </button>
          {categories.map(([category, count]) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(null);
                }}
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

        <span className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-60)]">
          MOUNTED // {mountedCount} OF {totalCount} SLOTS
        </span>
      </div>

      {/* 02 // Multi-Ratio Dense Mosaic Grid (2:1, 1:1, 1:2) */}
      {visibleFrames.length === 0 ? (
        <div className="border border-[var(--white-15)] p-10 flex flex-col items-start gap-4">
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)] m-0">
            NO ARCHIVE FRAMES MATCH SELECTED CATEGORY
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className="cta-aerospace-secondary"
          >
            SHOW ALL FRAMES
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[260px] lg:auto-rows-[296px] grid-flow-dense gap-4">
          {visibleFrames.map((frame, index) => {
            const dims = getTileDimensions(frame.ratio);
            return (
              <button
                key={frame.id}
                type="button"
                onClick={(e) => {
                  lastTriggerRef.current = e.currentTarget;
                  setActiveIndex(index + 1);
                }}
                className={cn(
                  "group relative text-left border border-[var(--white-15)] hover:border-[var(--white-100)] bg-[#000000] transition-colors duration-200 overflow-hidden flex flex-col justify-between",
                  getTileClasses(frame.ratio)
                )}
              >
                {frame.src ? (
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    width={dims.width}
                    height={dims.height}
                    unoptimized
                    className="absolute inset-0 w-full h-full object-cover object-[center_18%] grayscale contrast-[1.08] group-hover:scale-[1.02] transition-transform duration-300"
                  />
                ) : (
                  <div className="flex-1 w-full p-5 flex flex-col justify-between bg-[#000000]">
                    <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-60)]">
                      <span>ARCHIVE SLOT</span>
                      <span>RATIO {frame.ratio}</span>
                    </div>

                    <div className="my-auto py-3">
                      <p className="font-display text-xl md:text-2xl font-bold tracking-[0.04em] uppercase text-[var(--white-80)] m-0 mb-1.5">
                        AWAITING MEDIA
                      </p>
                      {frame.targetPath && (
                        <p className="font-mono-tech text-[11px] text-[var(--white-60)] m-0 break-all">
                          {frame.targetPath}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Top-right ratio telemetry badge on mounted images */}
                {frame.src && (
                  <div className="relative z-10 p-3 flex justify-end">
                    <span className="px-2.5 py-1 bg-[#000000]/90 border border-[var(--white-25)] font-mono-tech text-[10px] tracking-[0.14em] uppercase text-[var(--white-100)]">
                      {frame.ratio}
                    </span>
                  </div>
                )}

                {/* Bottom high-contrast caption strip */}
                <div className="relative z-10 w-full px-4 py-3 bg-[#000000]/90 border-t border-[var(--white-15)] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-60)]">
                      {frame.code} {"//"} {frame.ratio}
                    </div>
                    <h3 className="font-display m-0 text-base md:text-lg font-bold tracking-[0.04em] uppercase text-[var(--white-100)] truncate">
                      {frame.title}
                    </h3>
                  </div>
                  <span className="font-mono-tech text-[10px] tracking-[0.14em] uppercase text-[var(--white-100)] inline-flex items-center gap-1 shrink-0">
                    <span>VIEW</span>
                    <Arrow />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[var(--black-80)]"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveIndex(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            className="w-full max-w-[960px] max-h-[92vh] overflow-y-auto bg-[#000000] border border-[var(--white-100)] p-5 md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--white-15)]">
              <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-80)]">
                {activeItem.code} {"//"} RATIO {activeItem.ratio} {"//"}{" "}
                {activeItem.category}
              </span>

              <div className="flex items-center gap-2">
                {lightboxItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((prev) =>
                          prev === null
                            ? 0
                            : (prev - 1 + lightboxItems.length) %
                            lightboxItems.length
                        )
                      }
                      aria-label="Previous gallery frame"
                      className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-200"
                    >
                      PREV
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((prev) =>
                          prev === null ? 0 : (prev + 1) % lightboxItems.length
                        )
                      }
                      aria-label="Next gallery frame"
                      className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-200"
                    >
                      NEXT
                    </button>
                  </>
                )}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="min-h-[44px] px-4 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-200"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-video border border-[var(--white-15)] bg-[#000000] overflow-hidden mb-6">
              {activeItem.src && activeItem.mediaType === "video" ? (
                <video
                  src={activeItem.src}
                  poster={activeItem.poster ?? undefined}
                  controls
                  playsInline
                  width={1280}
                  height={720}
                  className="w-full h-full object-contain bg-[#000000]"
                />
              ) : activeItem.src ? (
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={1440}
                  height={900}
                  unoptimized
                  className="w-full h-full object-contain bg-[#000000] grayscale contrast-[1.08]"
                />
              ) : (
                <div className="w-full h-full p-8 flex flex-col justify-center items-start gap-3">
                  <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)]">
                    ARCHIVE STATUS // UNMOUNTED LOCAL SLOT ({activeItem.ratio})
                  </span>
                  <p className="font-display text-3xl md:text-4xl font-bold uppercase text-[var(--white-100)] m-0">
                    NO MEDIA FILE MOUNTED YET
                  </p>
                  {activeItem.targetPath && (
                    <p className="font-mono-tech text-xs text-[var(--white-80)] m-0">
                      PLACE LOCAL ASSET AT: {activeItem.targetPath}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2
                  id="gallery-lightbox-title"
                  className="font-display m-0 text-2xl md:text-3xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]"
                >
                  {activeItem.title}
                </h2>
                <span className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-60)]">
                  {activeItem.location} {"//"} {activeItem.date}
                </span>
              </div>
              <p className="m-0 text-sm md:text-base leading-[1.6] text-[var(--white-80)]">
                {activeItem.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
