import { SectionLabel } from "@/components/ui/icons";

export function About() {
  return (
    <section className="max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal" id="about">
      <SectionLabel>ABOUT ME</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_0.65fr] gap-12 lg:gap-[9vw] items-end">
        <h2 className="max-w-[850px] m-0 text-[43px] md:text-[clamp(45px,5.6vw,78px)] leading-[1.04] tracking-[-0.05em] font-medium text-[#fafafa]">
          I build software with a strong focus on quality, usability, and
          detail.
        </h2>
        <div className="max-w-[650px] flex flex-col gap-4 text-[#999999] text-base leading-[1.7]">
          <p>
            Hello! I&apos;m Dewanta, a Software Engineering student focused on building
            reliable, well-crafted digital experiences.
          </p>
          <p>
            I build software where engineering precision meets thoughtful design,
            with a focus on quality, usability, and reliability.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-14 lg:mt-[88px]">
        {[
          "Software Engineering Student",
          "Quality Assurance",
          "Software Engineer",
          "UI/UX Designer",
        ].map((item, index) => (
          <div
            className="min-h-[145px] lg:min-h-[176px] p-[22px] flex flex-col border border-white/10 rounded-2xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] hover:-translate-y-1 hover:border-white/20 transition-all duration-200 group"
            key={item}
          >
            <span className="text-[#555555] text-[10px] tracking-[0.12em]">0{index + 1}</span>
            <p className="max-w-[170px] mt-auto text-[17px] leading-[1.25] text-[#fafafa] font-medium">{item}</p>
            <div className="w-[5px] h-[5px] mt-5 ml-auto rounded-full bg-[#555555] group-hover:bg-[#888888] transition-colors duration-200" />
          </div>
        ))}
      </div>
    </section>
  );
}
