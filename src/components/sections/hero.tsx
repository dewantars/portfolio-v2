import Image from "next/image";
import { Arrow } from "@/components/ui/icons";
import { Profile } from "@prisma/client";

interface HeroProps {
  profile: Profile | null;
}

export function Hero({ profile }: HeroProps) {
  const name = profile?.name ?? "Dewanta Rahma Satria";
  const headline = profile?.headline ?? "Software Engineer | QA Engineer | Intern at Telkom Indonesia | Student Telkom University";
  const summary = profile?.summary ?? "I am interested in software development, particularly in creating applications as a web and mobile developer, which I have been pursuing for the past few years.";
  const photoUrl = profile?.photoUrl ?? "/assets/profile.jpg";

  return (
    <section className="min-h-[calc(100vh-88px)] flex items-center pt-24 pb-16 md:pt-28 lg:pt-[120px] lg:pb-20 max-w-[1320px] mx-auto px-5 md:px-7 lg:px-8" id="hero">
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
        {/* LEFT COLUMN: Intro & CTA */}
        <div className="w-full lg:flex-[0_1_55%] lg:max-w-[680px] flex flex-col reveal">
          <h1 className="m-0 mb-5 lg:mb-7 text-[clamp(42px,8.5vw,52px)] md:text-[clamp(52px,5.2vw,68px)] lg:text-[clamp(64px,5.8vw,88px)] font-bold leading-[1.02] tracking-[-0.04em] text-[#fafafa]">
            {name}
          </h1>

          <div className="flex flex-col gap-3.5 mb-9 lg:mb-10">
            <p className="m-0 text-[#e2e2e2] text-base md:text-[19px] leading-[1.55] font-normal">
              {summary}
            </p>
            <p className="m-0 text-[#999999] text-sm md:text-[15px] leading-[1.6]">
              {headline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              className="h-[50px] px-5 inline-flex items-center justify-center gap-4 border border-[#fafafa] rounded-xl text-sm font-medium text-[#050505] bg-[#fafafa] hover:bg-[#ddd] hover:-translate-y-0.5 transition-all duration-200"
              href="#projects"
            >
              View My Work <Arrow />
            </a>
            <a
              className="h-[50px] px-5 inline-flex items-center justify-center gap-4 border border-white/10 rounded-xl text-sm font-medium text-[#fafafa] bg-[#0c0c0c] hover:border-white/20 hover:bg-[#131313] hover:-translate-y-0.5 transition-all duration-200"
              href="#contact"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Photo & Visual Treatment */}
        <div className="w-full lg:flex-[0_1_45%] flex justify-center items-center relative reveal">
          <div className="relative w-full max-w-[340px] md:max-w-[380px] lg:max-w-[440px] aspect-[4/5] flex items-center justify-center">
            <div className="absolute -inset-6 rounded-[44px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-[28px] pointer-events-none" />
            <div className="absolute -inset-3.5 rounded-[38px] border border-white/[0.06] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(circle_at_50%_50%,black_30%,transparent_80%)] pointer-events-none" />

            <div className="relative w-full h-full rounded-[28px] border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_1px_rgba(255,255,255,0.1)] hover:scale-[1.01] hover:border-white/20 hover:shadow-[0_30px_75px_rgba(0,0,0,0.8),inset_0_1px_rgba(255,255,255,0.16)] transition-all duration-400 group">
              <Image
                src={photoUrl}
                alt={`Portrait of ${name}`}
                width={440}
                height={550}
                priority
                unoptimized
                className="w-full h-full object-cover object-top block grayscale-[15%] contrast-[105%] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.02] transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
