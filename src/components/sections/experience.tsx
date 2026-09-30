import { SectionLabel } from "@/components/ui/icons";

export function Experience() {
  return (
    <section
      className="max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal"
      id="experience"
    >
      <SectionLabel>EXPERIENCE</SectionLabel>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-[60px] mb-14 lg:mb-[88px]">
        <h2 className="m-0 text-[43px] md:text-[clamp(45px,5.6vw,78px)] leading-[1.04] tracking-[-0.05em] font-medium text-[#fafafa]">
          Experience
        </h2>
        <p className="max-w-[380px] mb-1 text-[#999999] leading-[1.6]">
          Learning through building, testing, and helping others understand.
        </p>
      </div>
      <div className="border-t border-white/10">
        <article className="grid grid-cols-[1fr_auto] lg:grid-cols-[150px_1fr_auto] gap-5 lg:gap-[38px] py-12 border-b border-white/10">
          <div className="text-[#666666] text-xs tracking-[0.1em]">2026</div>
          <div>
            <p className="mb-3 text-[#999999] text-[10px] font-semibold tracking-[0.14em] uppercase">
              TELKOM CORPORATE UNIVERSITY
            </p>
            <h3 className="mb-4 text-[25px] lg:text-[29px] font-medium tracking-[-0.02em] text-[#fafafa]">
              UI/UX &amp; Design Quality Assurance
            </h3>
            <p className="max-w-[670px] text-[#999999] leading-[1.65] mb-5">
              Performed design QA and software quality checks across web, SaaS,
              CMS, and mobile products, identifying UI inconsistencies and
              functional issues.
            </p>
            <div className="flex flex-wrap gap-[7px]">
              {["Design QA", "Functional Testing", "UI/UX", "Playwright"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-[7px] text-[#aaaaaa] text-[10px] border border-white/10 rounded-full bg-[#0b0b0b]"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="text-[#666666] text-xs tracking-[0.1em] text-right">01</div>
        </article>
        <article className="grid grid-cols-[1fr_auto] lg:grid-cols-[150px_1fr_auto] gap-5 lg:gap-[38px] py-12 border-b border-white/10">
          <div className="text-[#666666] text-xs tracking-[0.1em]">2025</div>
          <div>
            <p className="mb-3 text-[#999999] text-[10px] font-semibold tracking-[0.14em] uppercase">
              UNIVERSITY ACADEMIC PROGRAM
            </p>
            <h3 className="mb-4 text-[25px] lg:text-[29px] font-medium tracking-[-0.02em] text-[#fafafa]">
              Asisten Dosen Struktur Data
            </h3>
            <p className="max-w-[670px] text-[#999999] leading-[1.65] mb-5">
              Supported students in understanding core data structures and
              algorithmic thinking through practical sessions, reviews, and code
              discussions.
            </p>
            <div className="flex flex-wrap gap-[7px]">
              {["Go", "Java", "C++", "Data Structures"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-[7px] text-[#aaaaaa] text-[10px] border border-white/10 rounded-full bg-[#0b0b0b]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-[#666666] text-xs tracking-[0.1em] text-right">02</div>
        </article>
      </div>
    </section>
  );
}
