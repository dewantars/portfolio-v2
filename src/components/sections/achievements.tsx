"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/icons";

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
    <section className="achievements section-pad section-divider reveal" id="achievements">
      <SectionLabel>HONORS &amp; CERTIFICATIONS</SectionLabel>

      <div className="achievements-header">
        <h2>
          Recognizing quality &amp;
          <br />
          <span>proven dedication.</span>
        </h2>
        <p>
          Milestones, certifications, and awards earned through software engineering, test automation, and academic excellence.
        </p>
      </div>

      <div className="achievements-layout">
        {/* LEFT COLUMN — TIMELINE LIST MATCHING DESIGN */}
        <div className="achievements-list" role="tablist" aria-label="Achievements list">
          {achievementsData.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`achievement-item ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveId(item.id)}
              >
                <div className="achievement-indicator" />
                <div className="achievement-card-content">
                  <div className="achievement-item-header">
                    <h3 className="achievement-title">{item.title}</h3>
                    <span className="achievement-date">{item.date}</span>
                  </div>
                  <p className="achievement-description">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN — ACHIEVEMENT A4 PORTRAIT IMAGE PREVIEW */}
        <div className="achievement-preview">
          <div className="achievement-card-frame">
            <div className="achievement-image-wrap" key={activeAchievement.id}>
              <Image
                src={activeAchievement.image}
                alt={activeAchievement.title}
                width={600}
                height={848}
                priority
                unoptimized
                className="achievement-image"
              />
              <div className="achievement-image-overlay" />
            </div>

            <div className="achievement-caption">
              <h4>{activeAchievement.title}</h4>
              <p>{activeAchievement.description}</p>
              <span className="achievement-caption-date">{activeAchievement.date}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
