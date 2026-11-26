import { SectionLabel } from "@/components/ui/icons";
import { AboutPhotoStack } from "@/components/sections/about-photo-stack";
import type { SiteConfigDTO } from "@/lib/types/portfolio";

interface AboutProps {
  siteConfig: SiteConfigDTO;
}

export function About({ siteConfig }: AboutProps) {
  return (
    <div className="relative w-full">
      {/* Top transition shadow bridge continuing smoothly from Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 md:h-52 bg-[linear-gradient(to_bottom,#000000_0%,rgba(0,0,0,0.72)_45%,transparent_100%)]"
      />
      <section
        className="relative max-w-[1320px] mx-auto px-5 py-20 md:px-8 md:py-28 lg:py-36 border-b border-[var(--white-15)] reveal"
        id="about"
      >
        <SectionLabel index="01">MISSION BRIEF // ABOUT</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline, Narrative & Compact 1x4 Strip */}
          <div className="flex flex-col min-w-0">
            <h2 className="font-display m-0 mb-6 text-[clamp(34px,4.8vw,60px)] leading-[1.01] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
              {siteConfig.aboutTitle}
            </h2>

            <div className="flex flex-col gap-4 mb-7 text-base leading-[1.65] max-w-[620px]">
              <p className="m-0 text-[var(--white-80)]">
                {siteConfig.aboutBody}
              </p>
              {siteConfig.aboutSecondaryBody && (
                <p className="m-0 text-[var(--white-60)]">
                  {siteConfig.aboutSecondaryBody}
                </p>
              )}
            </div>

            {/* Compact 1x4 Discipline Specification Strip aligned to narrative width */}
            {siteConfig.aboutDisciplines.length > 0 && (
              <div className="w-full max-w-[620px] grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[var(--white-15)]">
                {siteConfig.aboutDisciplines.map((item) => (
                  <div
                    key={item.code}
                    className="px-3 py-3 border-r border-b border-[var(--white-15)] bg-[#000000]/65 hover:bg-[var(--white-10)] transition-colors duration-200 flex flex-col justify-between gap-2 min-w-0"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono-tech text-[10px] tracking-[0.14em] text-[var(--white-60)]">
                        {item.code}
                      </span>
                      <span
                        className="w-1.5 h-1.5 border border-[var(--white-25)] shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display m-0 mb-1 text-xs md:text-[13px] font-bold leading-[1.2] tracking-[0.04em] uppercase text-[var(--white-100)]">
                        {item.title}
                      </h3>
                      <p className="m-0 text-[11px] leading-[1.4] text-[var(--white-60)]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Interactive 3-Card Stacked Photo Deck */}
          <AboutPhotoStack
            photoUrl={siteConfig.photoUrl}
            name={siteConfig.fullName}
            cards={siteConfig.aboutDeckCards}
          />
        </div>
      </section>
    </div>
  );
}
