import Image from "next/image";
import { Arrow } from "@/components/ui/icons";
import { Profile } from "@prisma/client";

interface HeroProps {
  profile: Profile | null;
}

export function Hero({ profile }: HeroProps) {
  const name = profile?.name ?? "Dewanta Rahma Satria";
  const headline =
    profile?.headline ??
    "Software Engineer | QA Engineer | Intern at Telkom Indonesia | Student Telkom University";
  const summary =
    profile?.summary ??
    "I am interested in software development, particularly in creating applications as a web and mobile developer, which I have been pursuing for the past few years.";
  const photoUrl = profile?.photoUrl ?? "/assets/profile.jpg";

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#000000] border-b border-[var(--white-15)]"
    >
      {/* Full-bleed atmospheric portrait backdrop with SpaceX monochrome vignette */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src={photoUrl}
          alt={`Portrait of ${name}`}
          fill
          priority
          fetchPriority="high"
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_18%] lg:object-[72%_16%] grayscale contrast-[1.16] brightness-[0.62]"
        />
        {/* Bottom-up pitch black vignette (--black-80 -> #000000) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#000000_0%,rgba(0,0,0,0.82)_34%,rgba(0,0,0,0.5)_68%,rgba(0,0,0,0.45)_100%)]" />
        {/* Left-to-right readability vignette for bottom-left anchored text */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_0%,rgba(0,0,0,0.8)_44%,rgba(0,0,0,0.25)_78%,rgba(0,0,0,0.4)_100%)]" />
        {/* Minimalist flight-deck coordinate ticks (desktop) */}
        <div className="hidden lg:block absolute inset-y-0 right-12 w-px bg-[var(--white-15)]" />
        <div className="hidden lg:flex absolute top-28 right-12 items-center gap-3 pr-4">
          <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[var(--white-50)]">
            FLIGHT DECK // 01
          </span>
          <span className="w-6 h-px bg-[var(--white-25)]" />
        </div>
      </div>

      {/* Bottom-left anchored hero payload */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-5 md:px-8 pt-32 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[780px] flex flex-col items-start">
          <p className="font-mono-tech text-[11px] md:text-xs font-medium tracking-[0.18em] uppercase text-[var(--white-60)] mb-4">
            SOFTWARE ENGINEER // FULL-STACK &amp; QA AUTOMATION
          </p>

          <h1 className="font-display m-0 mb-5 text-[clamp(44px,8vw,96px)] font-bold leading-[0.94] tracking-[0.04em] uppercase text-[var(--white-100)]">
            {name}
          </h1>

          <p className="m-0 mb-4 max-w-[600px] text-base md:text-[17px] leading-[1.6] text-[var(--white-80)]">
            {summary}
          </p>

          <p className="font-mono-tech m-0 mb-9 text-xs md:text-[13px] tracking-[0.06em] uppercase text-[var(--white-50)]">
            {headline}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a href="#projects" className="cta-aerospace gap-3">
              <span>VIEW MISSIONS</span>
              <Arrow />
            </a>
            <a href="#contact" className="cta-aerospace-secondary">
              INITIATE CONTACT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
