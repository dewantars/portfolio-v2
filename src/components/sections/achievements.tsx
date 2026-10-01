"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Achievement as AchievementType } from "@prisma/client";

interface AchievementsProps {
  achievements: AchievementType[];
}

export function Achievements({ achievements }: AchievementsProps) {
  const [activeId, setActiveId] = useState<string>(
    achievements[0]?.id ?? "1"
  );

  const activeAchievement =
    achievements.find((a) => a.id === activeId) || achievements[0];

  if (!achievements.length) return null;

  return (
    <section className="max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal relative" id="achievements">
      <SectionLabel>HONORS &amp; CERTIFICATIONS</SectionLabel>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-[60px] mb-14 lg:mb-[88px]">
        <h2 className="m-0 text-[43px] md:text-[clamp(45px,5.6vw,78px)] leading-[1.04] tracking-[-0.05em] font-medium text-[#fafafa]">
          Recognizing quality &amp;
          <br />
          <span className="text-[#6f6f6f]">proven dedication.</span>
        </h2>
        <p className="max-w-[380px] mb-1 text-[#999999] leading-[1.6]">
          Milestones, certifications, and awards earned through software engineering, test automation, and academic excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-[60px] items-start">
        {/* LEFT COLUMN — TIMELINE LIST MATCHING DESIGN */}
        <div
          className="relative flex flex-col gap-5 pl-5 before:content-[''] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/[0.12] before:rounded-sm"
          role="tablist"
          aria-label="Achievements list"
        >
          {achievements.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className="relative w-full flex items-start bg-transparent border-0 p-0 text-left cursor-pointer outline-none group"
                onClick={() => setActiveId(item.id)}
              >
                <div
                  className={cn(
                    "absolute -left-5 top-0 bottom-0 w-1 rounded transition-all duration-300",
                    isActive ? "bg-white shadow-[0_0_14px_rgba(255,255,255,0.7)]" : "bg-transparent"
                  )}
                />
                <div
                  className={cn(
                    "w-full p-4 md:p-[18px_22px] rounded-xl border transition-all duration-300",
                    isActive
                      ? "border-white/20 bg-[#121212]/75 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                      : "border-transparent hover:bg-white/[0.02]"
                  )}
                >
                  <div className="flex justify-between items-baseline gap-3 mb-1">
                    <h3
                      className={cn(
                        "text-lg font-medium leading-[1.35] transition-colors duration-200",
                        isActive ? "text-white font-semibold" : "text-[#777777] group-hover:text-[#bbbbbb]"
                      )}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={cn(
                        "text-[11px] font-medium tracking-[0.04em] shrink-0",
                        isActive ? "text-[#888888]" : "text-[#555555]"
                      )}
                    >
                      {item.date} • {item.category}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-sm leading-[1.55] m-0 transition-colors duration-200",
                      isActive ? "text-[#b0b0b0]" : "text-[#555555] group-hover:text-[#777777]"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN — ACHIEVEMENT A4 PORTRAIT IMAGE PREVIEW */}
        {activeAchievement && (
          <div className="flex justify-center lg:sticky lg:top-[100px]">
            <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#080808] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.75),inset_0_1px_rgba(255,255,255,0.08)] flex flex-col gap-4 hover:border-white/20 transition-colors duration-300">
              <div className="w-full relative rounded-2xl border border-white/[0.08] bg-[#030303] overflow-hidden flex items-center justify-center" key={activeAchievement.id}>
                <Image
                  src={activeAchievement.image}
                  alt={activeAchievement.title}
                  width={600}
                  height={848}
                  priority
                  unoptimized
                  className="w-full h-auto max-h-[480px] object-cover block rounded-[14px] hover:scale-[1.02] transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="pt-1 px-1">
                <h4 className="text-base font-medium text-[#fafafa] m-0 mb-1">{activeAchievement.title}</h4>
                <p className="text-xs text-[#999999] leading-[1.6] m-0 mb-2">{activeAchievement.description}</p>
                <span className="text-[10px] text-[#666666] tracking-[0.06em] uppercase font-semibold">{activeAchievement.date} • {activeAchievement.issuer}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
