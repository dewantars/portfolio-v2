import { SectionLabel } from "@/components/ui/icons";
import type { SkillCategoryGroup } from "@/lib/types/portfolio";

interface SkillsProps {
  skillGroups: SkillCategoryGroup[];
}

export function Skills({ skillGroups }: SkillsProps) {
  return (
    <section
      className="max-w-[1320px] mx-auto px-5 py-20 md:px-8 md:py-28 lg:py-36 border-b border-[var(--white-15)] reveal"
      id="skills"
    >
      <SectionLabel index="04">TECHNICAL SPECS // CAPABILITIES</SectionLabel>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-12 lg:mb-16">
        <h2 className="font-display m-0 text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
          TECHNICAL SPECIFICATIONS
        </h2>
        <p className="m-0 max-w-[420px] text-base leading-[1.6] text-[var(--white-60)]">
          Core languages, frameworks, verification suites, and infrastructure
          tooling deployed across engineering and QA workflows.
        </p>
      </div>

      {skillGroups.length === 0 ? (
        <div className="border border-[var(--white-15)] p-8 text-center">
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)] m-0">
            NO TECHNICAL SPECIFICATIONS LOGGED
          </p>
        </div>
      ) : (
        <div className="border-t border-[var(--white-15)]">
          {skillGroups.map((group, groupIndex) => (
            <div
              key={group.category}
              className="py-7 md:py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] items-start gap-5 lg:gap-8 border-b border-[var(--white-15)]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono-tech text-xs tracking-[0.16em] text-[var(--white-50)]">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display m-0 text-xl md:text-2xl font-bold tracking-[0.05em] uppercase text-[var(--white-100)]">
                  {group.category}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t border-l border-[var(--white-15)]">
                {group.items.map((skill) => (
                  <div
                    key={skill.id}
                    className="px-4 py-3 border-r border-b border-[var(--white-15)] bg-[#000000]/65 hover:bg-[var(--white-10)] transition-colors duration-200 font-mono-tech text-xs tracking-[0.04em] text-[var(--white-80)]"
                  >
                    <div>{skill.name}</div>
                    {skill.specification && (
                      <div className="text-[10px] text-[var(--white-50)] mt-0.5">
                        {skill.specification}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
