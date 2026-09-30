"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

const achievementsData: Achievement[] = [
  {
    id: "01",
    title: "Software Engineering & QA Certification",
    date: "2025 • Certification",
    description: "Certified in Software Engineering Rigor, Automated Testing, and System Quality Assurance.",
    image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Telkom Indonesia Internship Recognition",
    date: "2025 • Telkom Indonesia",
    description: "Recognized for outstanding contribution in QA testing and web software delivery.",
    image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Telkom University Academic Excellence",
    date: "2024 • Telkom University",
    description: "Academic distinction in Software Engineering coursework and capstone project execution.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Test Automation & Quality Engineering Badge",
    date: "2024 • Certification",
    description: "Advanced proficiency in Playwright, Selenium, and automated regression test suites.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "National Software & QA Competition Award",
    date: "2023 • Award",
    description: "Awarded top honor in software reliability, code quality, and UI/UX design QA.",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=800&auto=format&fit=crop",
  },
];

export function Achievements() {
  const [activeId, setActiveId] = useState<string>(achievementsData[0].id);

  const activeAchievement =
    achievementsData.find((a) => a.id === activeId) || achievementsData[0];

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
          {achievementsData.map((item) => {
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
                      {item.date}
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
              <span className="text-[10px] text-[#666666] tracking-[0.06em] uppercase font-semibold">{activeAchievement.date}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
