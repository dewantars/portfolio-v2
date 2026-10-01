import { SectionLabel } from "@/components/ui/icons";
import { SkillGroup as SkillGroupType } from "@prisma/client";

interface SkillsProps {
  skillGroups: SkillGroupType[];
}

export function Skills({ skillGroups }: SkillsProps) {
  return (
    <section
      className="max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal"
      id="skills"
    >
      <SectionLabel>CAPABILITIES</SectionLabel>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-[60px] mb-14 lg:mb-[88px]">
        <h2 className="m-0 text-[43px] md:text-[clamp(45px,5.6vw,78px)] leading-[1.04] tracking-[-0.05em] font-medium text-[#fafafa]">
          Tools I work with
        </h2>
        <p className="max-w-[380px] mb-1 text-[#999999] leading-[1.6]">
          A practical toolkit for taking products from first idea to confident
          release.
        </p>
      </div>
      <div className="border-t border-white/10">
        {skillGroups.map((group, groupIndex) => (
          <div
            className="min-h-[130px] py-7 lg:py-0 grid grid-cols-1 lg:grid-cols-[270px_1fr] items-center gap-6 lg:gap-0 border-b border-white/10"
            key={group.id}
          >
            <div className="flex items-center gap-7 text-[17px] text-[#fafafa] font-medium">
              <span className="text-[#555555] text-[10px]">0{groupIndex + 1}</span>
              {group.title}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <div
                  className="px-3.5 py-2 inline-flex items-center border border-white/10 rounded-[11px] text-[#bbbbbb] text-xs bg-[#0a0a0a] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_28px_rgba(255,255,255,0.05)] transition-all duration-200"
                  key={skill}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
