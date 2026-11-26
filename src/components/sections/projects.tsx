"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, SectionLabel } from "@/components/ui/icons";
import type { ProjectDTO } from "@/lib/types/portfolio";

interface ProjectsProps {
  projects: ProjectDTO[];
}

function getAccessStatus(project: ProjectDTO): string {
  if (project.statusLabel.trim()) return project.statusLabel;
  if (project.liveUrl && project.githubUrl) return "PUBLIC // LIVE + SOURCE";
  if (project.liveUrl) return "PUBLIC // LIVE DEPLOYMENT";
  if (project.githubUrl) return "PUBLIC // OPEN SOURCE";
  return "INTERNAL // CONFIDENTIAL";
}

function MissionTelemetryFrame({ project }: { project: ProjectDTO }) {
  const accessStatus = getAccessStatus(project);

  return (
    <div className="relative flex flex-col justify-between bg-[#000000]/55 border-b lg:border-b-0 lg:border-r border-[var(--white-15)] min-h-[280px] lg:min-h-[340px]">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[var(--white-15)] bg-[var(--gray-60)]">
        <span className="font-mono-tech text-[11px] font-medium tracking-[0.16em] uppercase text-[var(--white-80)]">
          MISSION // {project.missionCode}
        </span>
        <span className="font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-50)]">
          {accessStatus}
        </span>
      </div>

      <div className="relative flex-1 p-6 md:p-8 flex flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-4">
          <div className="font-display text-[clamp(56px,6vw,88px)] font-bold leading-none tracking-[0.04em] text-[var(--white-100)]">
            {project.missionCode}
          </div>
          <div className="text-right font-mono-tech text-[11px] leading-[1.6] tracking-[0.12em] uppercase text-[var(--white-50)]">
            <div>CLASS // {project.layoutType}</div>
            <div>
              MODULES // {String(project.techStack.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--white-15)] pt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-1">
              ASSIGNED ROLE
            </div>
            <div className="font-mono-tech text-xs text-[var(--white-80)] break-words">
              {project.role}
            </div>
          </div>
          <div>
            <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-1">
              PRIMARY SYSTEMS
            </div>
            <div className="font-mono-tech text-xs text-[var(--white-80)] break-words">
              {project.techStack.slice(0, 3).join(" / ") || "CORE STACK"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(
    null
  );
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [selectedProject]);

  return (
    <section
      className="max-w-[1320px] mx-auto px-5 py-20 md:px-8 md:py-28 lg:py-36 border-b border-[var(--white-15)]"
      id="projects"
    >
      <div className="reveal">
        <SectionLabel index="03">FEATURED MISSIONS // TELEMETRY LOG</SectionLabel>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-12 lg:mb-16">
          <h2 className="font-display m-0 text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
            MISSION SHOWCASE
          </h2>
          <p className="m-0 max-w-[420px] text-base leading-[1.6] text-[var(--white-60)]">
            Production web applications, mobile platforms, and automated quality
            verification suites engineered from architecture to release.
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="border border-[var(--white-15)] p-8 text-center">
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)] m-0">
            NO MISSION RECORDS CURRENTLY LOGGED
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] border border-[var(--white-15)] hover:border-[var(--white-25)] bg-[#000000]/65 transition-colors duration-200 reveal"
            >
              <MissionTelemetryFrame project={project} />

              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between gap-8 min-w-0">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)]">
                      INDEX {project.missionCode}
                    </span>
                    <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-60)]">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="font-display m-0 mb-4 text-3xl md:text-4xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                    {project.title}
                  </h3>

                  <p className="m-0 text-base leading-[1.6] text-[var(--white-80)]">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--white-15)] flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)]">
                      TECH STACK TELEMETRY
                    </span>
                    <p className="font-mono-tech m-0 text-xs md:text-[13px] leading-[1.6] text-[var(--white-60)] break-words">
                      {project.techStack.join("  /  ")}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        lastTriggerRef.current = e.currentTarget;
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center justify-center gap-3 min-h-[44px] px-5 border border-[var(--white-100)] bg-transparent text-[var(--white-100)] font-display text-xs font-bold tracking-[0.14em] uppercase hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-200"
                    >
                      <span>VIEW MISSION</span>
                      <Arrow />
                    </button>

                    <div className="flex flex-wrap items-center gap-5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-[44px] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)] transition-colors duration-200"
                        >
                          <span>LIVE DEPLOYMENT</span>
                          <Arrow diagonal />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-[44px] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)] transition-colors duration-200"
                        >
                          <span>SOURCE REPO</span>
                          <Arrow diagonal />
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)]">
                          {getAccessStatus(project)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[var(--black-80)]"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-dossier-title"
            className="w-full max-w-[720px] max-h-[90vh] overflow-y-auto bg-[#000000] border border-[var(--white-100)] p-6 md:p-10"
          >
            <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[var(--white-15)]">
              <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)]">
                MISSION DOSSIER // {selectedProject.missionCode}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedProject(null)}
                className="min-h-[44px] px-4 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-200"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="mb-6">
              <p className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)] mb-2 m-0">
                {selectedProject.role}
              </p>
              <h3
                id="mission-dossier-title"
                className="font-display text-3xl md:text-5xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)] m-0 mb-5"
              >
                {selectedProject.title}
              </h3>
              <p className="text-base leading-[1.6] text-[var(--white-80)] m-0 mb-4">
                {selectedProject.summary}
              </p>
              {selectedProject.architectureDetail && (
                <div className="border-l-2 border-[var(--white-25)] pl-4 py-1">
                  <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-1">
                    ARCHITECTURE &amp; VERIFICATION DETAIL
                  </div>
                  <p className="text-sm leading-[1.6] text-[var(--white-60)] m-0">
                    {selectedProject.architectureDetail}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-t border-b border-[var(--white-15)] mb-6">
              <div>
                <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-1">
                  ACCESS CLASSIFICATION
                </div>
                <div className="font-mono-tech text-xs uppercase text-[var(--white-80)]">
                  {getAccessStatus(selectedProject)}
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-1">
                  SYSTEM STACK
                </div>
                <div className="font-mono-tech text-xs text-[var(--white-80)] break-words">
                  {selectedProject.techStack.join(" / ")}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-aerospace gap-2.5"
                >
                  <span>LAUNCH LIVE DEPLOYMENT</span>
                  <Arrow diagonal />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-aerospace-secondary gap-2.5"
                >
                  <span>OPEN REPOSITORY</span>
                  <Arrow diagonal />
                </a>
              )}
              {!selectedProject.liveUrl && !selectedProject.githubUrl && (
                <p className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-60)] m-0">
                  EXTERNAL REPOSITORY AND LIVE URL ARE RESTRICTED UNDER CLIENT / INTERNAL NDA.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
