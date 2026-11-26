import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel, Arrow } from "@/components/ui/icons";
import { CvSideNavigator } from "@/components/cv/cv-side-navigator";
import { CvActions } from "@/components/cv/cv-actions";
import { buildContactChannels, getSiteConfig } from "@/lib/data/site-config";
import { getExperiences } from "@/lib/data/experience";
import { getEducations } from "@/lib/data/education";
import { getSkillGroups } from "@/lib/data/skills";
import { getCertifications } from "@/lib/data/certifications";
import { getLanguages } from "@/lib/data/languages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `Curriculum Vitae | ${siteConfig.fullName}`,
    description: `Personnel Dossier and technical Curriculum Vitae of ${siteConfig.fullName}: basics, work history, education, awards, skills, and languages.`,
  };
}

export default async function CvPage() {
  const [
    siteConfig,
    experiences,
    educations,
    skillGroups,
    certifications,
    languages,
  ] = await Promise.all([
    getSiteConfig(),
    getExperiences(),
    getEducations(),
    getSkillGroups(),
    getCertifications(),
    getLanguages(),
  ]);

  const name = siteConfig.fullName.toUpperCase();
  const cvLink = siteConfig.cvPdfUrl ?? undefined;
  const contactChannels = buildContactChannels(siteConfig).filter(
    (c) => c.id !== "cv-pdf"
  );

  return (
    <main className="max-w-[1320px] mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 md:pb-28 cv-print-sheet">
      <div className="no-print">
        <SectionLabel index="01">
          PERSONNEL DOSSIER // CURRICULUM VITAE
        </SectionLabel>
      </div>

      <div className="no-print lg:hidden mb-6 pb-6 border-b border-[var(--white-15)]">
        <CvActions pdfUrl={cvLink} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start cv-print-grid">
        <CvSideNavigator staticPdfUrl={cvLink} />

        <div className="min-w-0 flex flex-col">
          {/* 01 // BASICS */}
          <section
            id="basics"
            className="scroll-mt-36 lg:scroll-mt-28 pb-12 border-b border-[var(--white-15)] cv-print-break-avoid"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] cv-print-muted">
                01 // BASICS
              </span>
              <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted">
                REF // {siteConfig.documentRef}
              </span>
            </div>

            <h1 className="font-display m-0 mb-3 text-[clamp(36px,6vw,68px)] font-bold leading-[0.96] tracking-[0.04em] uppercase text-[var(--white-100)]">
              {name}
            </h1>

            <p className="font-mono-tech m-0 mb-2 text-xs md:text-[13px] tracking-[0.06em] uppercase text-[var(--white-80)]">
              {siteConfig.headline}
            </p>

            <p className="font-mono-tech m-0 mb-6 text-xs tracking-[0.12em] uppercase text-[var(--white-50)] cv-print-muted">
              BASE {"//"} {siteConfig.location} {"//"} {siteConfig.availabilityStatus}
            </p>

            <p className="m-0 mb-8 max-w-[760px] text-base leading-[1.65] text-[var(--white-80)]">
              {siteConfig.bioSummary}
            </p>

            <div className="border-t border-[var(--white-15)]">
              <div className="py-3 border-b border-[var(--white-15)] flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono-tech text-xs">
                <span className="tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted">
                  PORTFOLIO
                </span>
                <Link
                  href="/"
                  className="text-[var(--white-100)] hover:underline underline-offset-4 break-all"
                >
                  / (MAIN FLIGHT DECK)
                </Link>
              </div>

              {contactChannels.map((channel) => {
                const isExternal = channel.url.startsWith("http");
                return (
                  <div
                    key={channel.id}
                    className="py-3 border-b border-[var(--white-15)] flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono-tech text-xs"
                  >
                    <span className="tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted">
                      {channel.platform.toUpperCase()}
                    </span>
                    <a
                      href={channel.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="text-[var(--white-100)] hover:underline underline-offset-4 break-all"
                    >
                      {channel.label}
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 02 // WORK */}
          <section
            id="work"
            className="scroll-mt-36 lg:scroll-mt-28 py-12 border-b border-[var(--white-15)]"
          >
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <h2 className="font-mono-tech m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--white-50)] cv-print-muted">
                02 // WORK
              </h2>
              <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted">
                {experiences.length} ENTRIES
              </span>
            </div>

            {experiences.length === 0 ? (
              <div className="border border-[var(--white-15)] p-6">
                <p className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-60)] m-0">
                  NO WORK EXPERIENCE RECORDS AVAILABLE
                </p>
              </div>
            ) : (
              <div className="border-t border-[var(--white-15)] divide-y divide-[var(--white-15)]">
                {experiences.map((exp) => (
                  <article
                    key={exp.id}
                    className="py-6 cv-print-break-avoid"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1.5">
                      <h3 className="font-display m-0 text-xl md:text-2xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                        {exp.role}
                      </h3>
                      <span className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <p className="font-mono-tech m-0 mb-3 text-xs tracking-[0.14em] uppercase text-[var(--white-60)] cv-print-muted">
                      {exp.organization}
                      {exp.location ? ` // ${exp.location}` : ""}
                    </p>

                    <p className="m-0 mb-3 max-w-[760px] text-sm md:text-base leading-[1.6] text-[var(--white-80)]">
                      {exp.description}
                    </p>

                    {exp.tags.length > 0 && (
                      <p className="font-mono-tech m-0 text-xs tracking-[0.06em] text-[var(--white-60)] cv-print-muted">
                        SPEC // {exp.tags.join(" / ")}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* 03 // EDUCATION */}
          <section
            id="education"
            className="scroll-mt-36 lg:scroll-mt-28 py-12 border-b border-[var(--white-15)]"
          >
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <h2 className="font-mono-tech m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--white-50)] cv-print-muted">
                03 // EDUCATION
              </h2>
              <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted">
                {educations.length} ENTRIES
              </span>
            </div>

            {educations.length === 0 ? (
              <div className="border border-[var(--white-15)] p-6">
                <p className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-60)] m-0">
                  NO EDUCATION RECORDS AVAILABLE
                </p>
              </div>
            ) : (
              <div className="border-t border-[var(--white-15)] divide-y divide-[var(--white-15)]">
                {educations.map((edu) => (
                  <article
                    key={edu.id}
                    className="py-6 cv-print-break-avoid"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1.5">
                      <h3 className="font-display m-0 text-xl md:text-2xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                        {edu.institution}
                      </h3>
                      <span className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted shrink-0">
                        {edu.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                      <p className="font-mono-tech m-0 text-xs tracking-[0.1em] uppercase text-[var(--white-80)]">
                        {edu.degree} ({edu.fieldOfStudy})
                      </p>
                      {edu.metric && (
                        <span className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-60)] cv-print-muted">
                          {edu.metric}
                        </span>
                      )}
                    </div>

                    <p className="m-0 max-w-[760px] text-sm md:text-base leading-[1.6] text-[var(--white-80)]">
                      {edu.description}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* 04 // AWARDS */}
          <section
            id="awards"
            className="scroll-mt-36 lg:scroll-mt-28 py-12 border-b border-[var(--white-15)]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
              <h2 className="font-mono-tech m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--white-50)] cv-print-muted">
                04 // AWARDS &amp; CREDENTIALS
              </h2>
              <Link
                href="/certifications"
                className="no-print inline-flex items-center gap-2 min-h-[44px] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)] underline underline-offset-4"
              >
                <span>VERIFICATION LOG</span>
                <Arrow />
              </Link>
            </div>

            {certifications.length === 0 ? (
              <div className="border border-[var(--white-15)] p-6">
                <p className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-60)] m-0">
                  NO AWARD OR CERTIFICATION RECORDS AVAILABLE
                </p>
              </div>
            ) : (
              <div className="border-t border-[var(--white-15)] divide-y divide-[var(--white-15)]">
                {certifications.map((item) => (
                  <article
                    key={item.id}
                    className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 cv-print-break-avoid"
                  >
                    <div className="min-w-0">
                      <h3 className="font-display m-0 text-lg md:text-xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                        {item.title}
                      </h3>
                      <p className="font-mono-tech m-0 mt-1 mb-2 text-xs tracking-[0.1em] uppercase text-[var(--white-60)] cv-print-muted">
                        {item.issuer} {"//"} {item.category}
                        {item.credentialId ? ` // ID: ${item.credentialId}` : ""}
                      </p>
                      {item.description && (
                        <p className="m-0 max-w-[680px] text-sm leading-[1.55] text-[var(--white-80)]">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex sm:flex-col sm:items-end justify-between gap-2 shrink-0">
                      <span className="font-mono-tech text-xs tracking-[0.14em] text-[var(--white-50)] cv-print-muted">
                        {item.issueDate}
                      </span>
                      {item.verificationUrl && (
                        <a
                          href={item.verificationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="no-print font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-100)] underline underline-offset-4"
                        >
                          VERIFY
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* 05 // SKILLS */}
          <section
            id="skills"
            className="scroll-mt-36 lg:scroll-mt-28 py-12 border-b border-[var(--white-15)]"
          >
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <h2 className="font-mono-tech m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--white-50)] cv-print-muted">
                05 // SKILLS
              </h2>
              <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted">
                {skillGroups.length} CATEGORIES
              </span>
            </div>

            {skillGroups.length === 0 ? (
              <div className="border border-[var(--white-15)] p-6">
                <p className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-60)] m-0">
                  NO TECHNICAL SPECIFICATIONS LOGGED
                </p>
              </div>
            ) : (
              <div className="border-t border-[var(--white-15)]">
                {skillGroups.map((group) => (
                  <div
                    key={group.category}
                    className="py-4 border-b border-[var(--white-15)] grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-8 items-baseline cv-print-break-avoid"
                  >
                    <h3 className="font-display m-0 text-base font-bold tracking-[0.06em] uppercase text-[var(--white-100)]">
                      {group.category}
                    </h3>
                    <p className="font-mono-tech m-0 text-xs md:text-[13px] leading-[1.65] text-[var(--white-80)]">
                      {group.items.map((item) => item.name).join(" / ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 06 // LANGUAGES */}
          <section
            id="languages"
            className="scroll-mt-36 lg:scroll-mt-28 pt-12 cv-print-break-avoid"
          >
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <h2 className="font-mono-tech m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--white-50)] cv-print-muted">
                06 // LANGUAGES
              </h2>
              <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)] cv-print-muted">
                PROFICIENCY SPEC
              </span>
            </div>

            {languages.length === 0 ? (
              <div className="border border-[var(--white-15)] p-6">
                <p className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-60)] m-0">
                  NO LANGUAGE PROFICIENCY RECORDS AVAILABLE
                </p>
              </div>
            ) : (
              <div className="border-t border-[var(--white-15)]">
                <div className="hidden sm:grid sm:grid-cols-2 gap-6 py-3 border-b border-[var(--white-15)] font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] cv-print-muted">
                  <span>LANGUAGE</span>
                  <span className="sm:text-right">PROFICIENCY LEVEL</span>
                </div>

                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="py-4 border-b border-[var(--white-15)] grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-6 items-center"
                  >
                    <span className="font-display text-base md:text-lg font-bold tracking-[0.06em] uppercase text-[var(--white-100)]">
                      {lang.name}
                    </span>
                    <span className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)] sm:text-right">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
