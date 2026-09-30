import {
  SectionLabel,
  MailIcon,
  FileTextIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
} from "@/components/ui/icons";

export function Contact() {
  return (
    <section
      className="relative min-h-[680px] lg:min-h-[730px] flex flex-col items-center justify-center text-center overflow-hidden max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal"
      id="contact"
    >
      <div className="absolute w-[680px] h-[680px] border border-white/[0.05] rounded-full shadow-[0_0_110px_rgba(127,146,169,0.08),inset_0_0_100px_rgba(255,255,255,0.02)] pointer-events-none" />
      <SectionLabel>START A CONVERSATION</SectionLabel>
      <h2 className="relative m-0 text-[50px] md:text-[clamp(54px,7.2vw,98px)] font-medium leading-none tracking-[-0.06em] text-[#fafafa]">
        Let&apos;s build something
        <br />
        <span className="text-[#6f6f6f]">meaningful.</span>
      </h2>
      <p className="relative max-w-[600px] my-9 text-[#999999] text-base leading-[1.6]">
        Interested in software engineering, quality assurance, product
        development, or collaboration? Let&apos;s connect.
      </p>
      <div className="relative flex items-center justify-center gap-3 md:gap-4 flex-wrap mb-[34px]">
        <a
          className="w-[54px] h-[54px] inline-flex items-center justify-center border border-white/10 rounded-[14px] bg-[#0d0d0d] text-white hover:-translate-y-1 hover:border-white/30 hover:bg-[#181818] hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-200"
          href="mailto:dewantarahmasatria@gmail.com"
          aria-label="Email"
          title="Email"
        >
          <MailIcon />
        </a>

        <a
          className="w-[54px] h-[54px] inline-flex items-center justify-center border border-white/10 rounded-[14px] bg-[#0d0d0d] text-white hover:-translate-y-1 hover:border-white/30 hover:bg-[#181818] hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-200 w-auto px-5 gap-2 text-sm font-semibold tracking-[0.04em]"
          href="/assets/cv.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="CV"
          title="Curriculum Vitae"
        >
          <FileTextIcon />
          <span>CV</span>
        </a>

        <a
          className="w-[54px] h-[54px] inline-flex items-center justify-center border border-white/10 rounded-[14px] bg-[#0d0d0d] text-white hover:-translate-y-1 hover:border-white/30 hover:bg-[#181818] hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-200"
          href="https://instagram.com/dewanta_rs"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          title="Instagram"
        >
          <InstagramIcon />
        </a>

        <a
          className="w-[54px] h-[54px] inline-flex items-center justify-center border border-white/10 rounded-[14px] bg-[#0d0d0d] text-white hover:-translate-y-1 hover:border-white/30 hover:bg-[#181818] hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-200"
          href="https://linkedin.com/in/dewantars"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <LinkedinIcon />
        </a>

        <a
          className="w-[54px] h-[54px] inline-flex items-center justify-center border border-white/10 rounded-[14px] bg-[#0d0d0d] text-white hover:-translate-y-1 hover:border-white/30 hover:bg-[#181818] hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-200"
          href="https://github.com/dewantars"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <GithubIcon />
        </a>
      </div>
    </section>
  );
}
