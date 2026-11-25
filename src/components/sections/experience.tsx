import { SectionLabel } from "@/components/ui/icons";
import { Experience as ExperienceType } from "@prisma/client";

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      className="max-w-[1320px] mx-auto px-5 py-20 md:px-8 md:py-28 lg:py-36 border-b border-[var(--white-15)] reveal"
      id="experience"
    >
      <SectionLabel index="02">FLIGHT RECORD // EXPERIENCE</SectionLabel>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-12 lg:mb-16">
        <h2 className="font-display m-0 text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
          OPERATIONAL EXPERIENCE
        </h2>
        <p className="m-0 max-w-[420px] text-base leading-[1.6] text-[var(--white-60)]">
          Engineering delivery, design quality assurance, and academic mentorship
          across production teams.
        </p>
      </div>

      {experiences.length === 0 ? (
        <div className="border border-[var(--white-15)] p-8 text-center">
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)] m-0">
            NO EXPERIENCE RECORDS AVAILABLE
          </p>
        </div>
      ) : (
        <div className="border-t border-[var(--white-15)]">
          {/* Desktop specification table header */}
          <div className="hidden lg:grid lg:grid-cols-[140px_1fr_90px] gap-8 py-3.5 border-b border-[var(--white-15)] font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)]">
            <span>YEAR</span>
            <span>ROLE &amp; SPECIFICATION</span>
            <span className="text-right">INDEX</span>
          </div>

          {experiences.map((item, index) => (
            <article
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-[140px_1fr_90px] gap-4 lg:gap-8 py-8 md:py-10 border-b border-[var(--white-15)] hover:bg-[var(--white-10)] transition-colors duration-200 px-0 lg:px-2"
            >
              <div className="flex items-center justify-between lg:block">
                <span className="font-mono-tech text-sm font-medium tracking-[0.12em] text-[var(--white-80)]">
                  {item.period}
                </span>
                <span className="lg:hidden font-mono-tech text-xs tracking-[0.14em] text-[var(--white-50)]">
                  0{index + 1}
                </span>
              </div>

              <div className="min-w-0">
                <p className="font-mono-tech m-0 mb-2 text-[11px] font-medium tracking-[0.16em] uppercase text-[var(--white-50)]">
                  {item.company}
                </p>
                <h3 className="font-display m-0 mb-3 text-2xl md:text-[30px] font-bold tracking-[0.03em] uppercase text-[var(--white-100)]">
                  {item.role}
                </h3>
                <p className="m-0 mb-5 max-w-[700px] text-base leading-[1.6] text-[var(--white-80)]">
                  {item.description}
                </p>
                <div className="font-mono-tech text-xs tracking-[0.06em] text-[var(--white-60)] break-words">
                  SPEC // {item.tags.join("  /  ")}
                </div>
              </div>

              <div className="hidden lg:block font-mono-tech text-xs tracking-[0.14em] text-[var(--white-50)] text-right pt-1">
                0{index + 1}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
