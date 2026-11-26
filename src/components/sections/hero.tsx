import Image from "next/image";
import { Arrow } from "@/components/ui/icons";
import type { SiteConfigDTO } from "@/lib/types/portfolio";

interface HeroProps {
  siteConfig: SiteConfigDTO;
}

export function Hero({ siteConfig }: HeroProps) {
  const heroBgSrc = siteConfig.heroBackgroundUrl?.trim() || siteConfig.photoUrl;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-transparent"
    >
      {/* Full-bleed atmospheric portrait backdrop blending into deep-space canvas */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src={heroBgSrc}
          alt={`Hero background for ${siteConfig.fullName}`}
          fill
          priority
          fetchPriority="high"
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_18%] lg:object-[72%_16%] grayscale contrast-[1.16] brightness-[0.58] opacity-[0.82]"
        />
        {/* Bottom-up pure black vignette fading smoothly into the About section */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#000000_0%,rgba(0,0,0,0.9)_18%,rgba(0,0,0,0.68)_38%,rgba(0,0,0,0.34)_68%,rgba(0,0,0,0.28)_100%)]" />
        {/* Left-to-right readability vignette for bottom-left anchored text */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.68)_44%,rgba(0,0,0,0.14)_78%,rgba(0,0,0,0.24)_100%)]" />
        {/* Dedicated bottom transition shadow bridge into About */}
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-44 bg-[linear-gradient(to_top,#000000_0%,rgba(0,0,0,0.82)_45%,transparent_100%)]" />
        {/* Minimalist flight-deck coordinate ticks (desktop) */}
        <div className="hidden lg:block absolute inset-y-0 right-12 w-px bg-[var(--white-15)]" />
        <div className="hidden lg:flex absolute top-28 right-12 items-center gap-3 pr-4">
          <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[var(--white-50)]">
            {siteConfig.heroFlightDeckLabel}
          </span>
          <span className="w-6 h-px bg-[var(--white-25)]" />
        </div>
      </div>

      {/* Bottom-left anchored hero payload */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-5 md:px-8 pt-32 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[780px] flex flex-col items-start">
          <p className="font-mono-tech text-[11px] md:text-xs font-medium tracking-[0.18em] uppercase text-[var(--white-60)] mb-4">
            {siteConfig.roleEyebrow}
          </p>

          <h1 className="font-display m-0 mb-5 text-[clamp(44px,8vw,96px)] font-bold leading-[0.94] tracking-[0.04em] uppercase text-[var(--white-100)]">
            {siteConfig.heroHeadline}
          </h1>

          <p className="m-0 mb-4 max-w-[600px] text-base md:text-[17px] leading-[1.6] text-[var(--white-80)]">
            {siteConfig.heroSubheadline}
          </p>

          <p className="font-mono-tech m-0 mb-9 text-xs md:text-[13px] tracking-[0.06em] uppercase text-[var(--white-50)]">
            {siteConfig.headline}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a href="#projects" className="cta-aerospace gap-3">
              <span>{siteConfig.heroPrimaryCtaLabel}</span>
              <Arrow />
            </a>
            <a href="#contact" className="cta-aerospace-secondary">
              {siteConfig.heroSecondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
