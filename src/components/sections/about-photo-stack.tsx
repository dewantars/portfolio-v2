"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Arrow } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { DeckCardItem } from "@/lib/types/portfolio";

interface AboutPhotoStackProps {
  photoUrl: string;
  name: string;
  cards: DeckCardItem[];
}

interface HoverTiltState {
  rotateX: number;
  rotateY: number;
  cursorX: number;
  cursorY: number;
  active: boolean;
}

const INITIAL_HOVER_TILT: HoverTiltState = {
  rotateX: 0,
  rotateY: 0,
  cursorX: 50,
  cursorY: 50,
  active: false,
};

const SWIPE_THRESHOLD = 56;

export function AboutPhotoStack({
  photoUrl,
  name,
  cards,
}: AboutPhotoStackProps) {
  const deckCards = cards.length > 0 ? cards : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTilt, setHoverTilt] =
    useState<HoverTiltState>(INITIAL_HOVER_TILT);

  const pointerStartRef = useRef<{ x: number; id: number } | null>(null);

  if (deckCards.length === 0) {
    return null;
  }

  const total = deckCards.length;

  const selectIndex = (nextIndex: number) => {
    setHoverTilt(INITIAL_HOVER_TILT);
    setActiveIndex(nextIndex);
  };

  const goNext = () => {
    setHoverTilt(INITIAL_HOVER_TILT);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setHoverTilt(INITIAL_HOVER_TILT);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStartRef.current = { x: event.clientX, id: event.pointerId };
    setIsDragging(true);
    setHoverTilt(INITIAL_HOVER_TILT);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      pointerStartRef.current &&
      pointerStartRef.current.id === event.pointerId
    ) {
      const dx = event.clientX - pointerStartRef.current.x;
      setDragX(Math.max(-160, Math.min(160, dx)));
      return;
    }

    if (event.pointerType === "touch") return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const clampedX = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );
    const clampedY = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / rect.height)
    );

    setHoverTilt({
      rotateX: (0.5 - clampedY) * 11,
      rotateY: (clampedX - 0.5) * 11,
      cursorX: clampedX * 100,
      cursorY: clampedY * 100,
      active: true,
    });
  };

  const handlePointerLeave = () => {
    if (!pointerStartRef.current) {
      setHoverTilt(INITIAL_HOVER_TILT);
    }
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !pointerStartRef.current ||
      pointerStartRef.current.id !== event.pointerId
    ) {
      return;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const dx = event.clientX - pointerStartRef.current.x;
    pointerStartRef.current = null;
    setIsDragging(false);
    setDragX(0);

    if (dx <= -SWIPE_THRESHOLD) {
      goNext();
    } else if (dx >= SWIPE_THRESHOLD) {
      goPrev();
    }
  };

  const handleDeckKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  const dragNorm = Math.max(-1, Math.min(1, dragX / 130));
  const coordX = ((hoverTilt.cursorX - 50) / 50).toFixed(2);
  const coordY = ((hoverTilt.cursorY - 50) / 50).toFixed(2);

  return (
    <div className="w-full max-w-[420px] sm:max-w-[480px] mx-auto lg:ml-auto lg:mr-0 flex flex-col gap-6">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Interactive 3D stacked portrait carousel"
        tabIndex={0}
        onKeyDown={handleDeckKeyDown}
        className="relative w-full py-3 select-none overflow-x-clip focus-visible:outline-2 focus-visible:outline-[var(--white-100)] focus-visible:outline-offset-4"
      >
        <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center [perspective:1200px]">
          {deckCards.map((card, index) => {
            let slot = index - activeIndex;
            if (slot > Math.floor(total / 2)) slot -= total;
            if (slot < -Math.floor(total / 2)) slot += total;

            const isCenter = slot === 0;
            const isLeft = slot < 0;
            const showInteractiveHover =
              isCenter && hoverTilt.active && !isDragging;

            let txPercent = 0;
            let tzPx = 0;
            let rotateX = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isCenter) {
              txPercent = dragNorm * 22;
              tzPx = 0;
              rotateX = isDragging ? 0 : hoverTilt.rotateX;
              rotateY = isDragging ? -dragNorm * 14 : hoverTilt.rotateY;
              scale = 1 - Math.abs(dragNorm) * 0.06;
              opacity = 1;
              zIndex = 30;
            } else if (isLeft) {
              const pull = Math.max(0, dragNorm);
              txPercent = -30 + pull * 16;
              tzPx = -70 + pull * 45;
              rotateY = 24 - pull * 12;
              scale = 0.87 + pull * 0.07;
              opacity = 0.62 + pull * 0.28;
              zIndex = pull > 0.35 ? 25 : 15;
            } else {
              const pull = Math.max(0, -dragNorm);
              txPercent = 30 - pull * 16;
              tzPx = -70 + pull * 45;
              rotateY = -24 + pull * 12;
              scale = 0.87 + pull * 0.07;
              opacity = 0.62 + pull * 0.28;
              zIndex = pull > 0.35 ? 25 : 15;
            }

            const transform = `translate3d(${txPercent.toFixed(2)}%, 0, ${tzPx.toFixed(1)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

            return (
              <div
                key={card.id}
                onPointerDown={isCenter ? handlePointerDown : undefined}
                onPointerMove={isCenter ? handlePointerMove : undefined}
                onPointerLeave={isCenter ? handlePointerLeave : undefined}
                onPointerUp={isCenter ? finishDrag : undefined}
                onPointerCancel={isCenter ? finishDrag : undefined}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                  touchAction: isCenter ? "pan-y" : "auto",
                }}
                className={cn(
                  "group absolute w-[68%] sm:w-[66%] aspect-[3/4] border bg-[#000000] overflow-hidden will-change-transform motion-reduce:transition-none",
                  isCenter
                    ? isDragging
                      ? "border-[var(--white-100)] cursor-grabbing transition-none"
                      : hoverTilt.active
                        ? "border-[var(--white-100)] cursor-grab transition-[transform,border-color] duration-150 ease-out"
                        : "border-[var(--white-100)] cursor-grab transition-[transform,opacity,border-color] duration-300 ease-out"
                    : "border-[var(--white-25)] hover:border-[var(--white-60)] transition-[transform,opacity,border-color] duration-300 ease-out"
                )}
              >
                {!isCenter && (
                  <button
                    type="button"
                    onClick={() => selectIndex(index)}
                    aria-label={`Select frame ${card.code} (${card.title})`}
                    className="absolute inset-0 z-30 bg-transparent"
                  />
                )}

                <Image
                  src={card.imageUrl?.trim() || photoUrl}
                  alt={`${name} portrait card ${card.code}: ${card.title}`}
                  width={720}
                  height={960}
                  draggable={false}
                  unoptimized
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none",
                    card.objectPosition,
                    isCenter
                      ? "grayscale contrast-[1.12] brightness-[0.9] group-hover:grayscale-0 group-hover:contrast-[1.04] group-hover:brightness-100 group-hover:scale-[1.04]"
                      : "grayscale contrast-[1.16] brightness-[0.58]"
                  )}
                />

                {isCenter && (
                  <div
                    aria-hidden="true"
                    style={{
                      opacity: showInteractiveHover ? 1 : 0,
                      background: `radial-gradient(circle 220px at ${hoverTilt.cursorX}% ${hoverTilt.cursorY}%, rgba(255,255,255,0.18), transparent 72%)`,
                    }}
                    className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200 motion-reduce:hidden"
                  />
                )}

                {isCenter && (
                  <>
                    <div
                      aria-hidden="true"
                      style={{
                        opacity: showInteractiveHover ? 1 : 0,
                        left: `${hoverTilt.cursorX}%`,
                      }}
                      className="pointer-events-none absolute inset-y-0 z-10 w-px bg-[var(--white-25)] transition-opacity duration-200 motion-reduce:hidden"
                    />
                    <div
                      aria-hidden="true"
                      style={{
                        opacity: showInteractiveHover ? 1 : 0,
                        top: `${hoverTilt.cursorY}%`,
                      }}
                      className="pointer-events-none absolute inset-x-0 z-10 h-px bg-[var(--white-25)] transition-opacity duration-200 motion-reduce:hidden"
                    />
                  </>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.45)_60%,transparent_100%)]"
                />
                <div className="relative z-20 px-4 pt-3.5 flex items-center justify-between gap-2 font-mono-tech text-[10px] tracking-[0.12em] uppercase text-[var(--white-80)]">
                  <span className="truncate">
                    {card.code} / {card.year} / {card.role}
                  </span>
                  {showInteractiveHover && (
                    <span className="shrink-0 text-[var(--white-100)]">
                      {coordX} / {coordY}
                    </span>
                  )}
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.72)_55%,transparent_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-6 flex flex-col gap-1">
                  <h3 className="font-display m-0 text-xl sm:text-2xl font-bold leading-none tracking-[0.04em] uppercase text-[var(--white-100)]">
                    {card.title}
                  </h3>
                  <p className="m-0 text-xs leading-[1.45] text-[var(--white-80)]">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border border-[var(--white-15)] bg-[#000000]/80 p-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo card"
          className="min-w-[44px] min-h-[44px] px-3 inline-flex items-center justify-center border border-[var(--white-25)] bg-[#000000] text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200"
        >
          <span className="inline-flex rotate-180">
            <Arrow />
          </span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-xs tracking-[0.16em] text-[var(--white-80)] mr-1">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          {deckCards.map((card, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => selectIndex(index)}
                aria-label={`Select photo card ${card.code}`}
                aria-pressed={active}
                className="min-w-[32px] min-h-[44px] inline-flex items-center justify-center group"
              >
                <span
                  className={cn(
                    "block h-[2px] transition-all duration-200",
                    active
                      ? "w-7 bg-[var(--white-100)]"
                      : "w-4 bg-[var(--white-25)] group-hover:bg-[var(--white-60)]"
                  )}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo card"
          className="min-w-[44px] min-h-[44px] px-3 inline-flex items-center justify-center border border-[var(--white-25)] bg-[#000000] text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200"
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}
