import { SectionLabel } from "@/components/ui/icons";
import { Profile } from "@prisma/client";

interface AboutProps {
  profile: Profile | null;
}

const disciplines = [
  {
    code: "01",
    title: "Software Engineering Student",
    detail: "System design, data structures, and production software delivery.",
  },
  {
    code: "02",
    title: "Quality Assurance",
    detail: "End-to-end Playwright automation, API validation, and load testing.",
  },
  {
    code: "03",
    title: "Full-Stack Development",
    detail: "Next.js, React, Laravel, and PostgreSQL web applications.",
  },
  {
    code: "04",
    title: "UI/UX Engineering",
    detail: "Design verification, accessibility checks, and interface precision.",
  },
];

export function About({ profile }: AboutProps) {
  const summary =
    profile?.summary ??
    "Hello! I'm Dewanta, a Software Engineering student focused on building reliable, well-crafted digital experiences.";

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

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-10 lg:gap-16 items-end">
        <h2 className="font-display m-0 text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
          ENGINEERING SOFTWARE WITH VERIFIABLE QUALITY AND STRUCTURAL CLARITY.
        </h2>
        <div className="flex flex-col gap-4 text-[var(--white-80)] text-base leading-[1.6]">
          <p className="m-0">{summary}</p>
          <p className="m-0 text-[var(--white-60)]">
            I combine full-stack implementation with disciplined quality assurance,
            ensuring every release holds up under real user workflows and edge cases.
          </p>
        </div>
      </div>

      {/* Hairline spec strip replacing rounded gradient cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--white-15)] mt-14 lg:mt-20">
        {disciplines.map((item) => (
          <div
            key={item.code}
            className="p-6 md:p-7 border-r border-b border-[var(--white-15)] bg-[#000000]/65 hover:bg-[var(--white-10)] transition-colors duration-200 flex flex-col justify-between min-h-[168px]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono-tech text-[11px] tracking-[0.16em] text-[var(--white-50)]">
                SPEC // {item.code}
              </span>
              <span className="w-2 h-2 border border-[var(--white-25)]" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display m-0 mb-2 text-lg font-bold tracking-[0.05em] uppercase text-[var(--white-100)]">
                {item.title}
              </h3>
              <p className="m-0 text-sm leading-[1.5] text-[var(--white-60)]">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
