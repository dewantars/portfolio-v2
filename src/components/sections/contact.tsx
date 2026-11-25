import {
  SectionLabel,
  Arrow,
  MailIcon,
  FileTextIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
} from "@/components/ui/icons";
import { SocialLink } from "@prisma/client";

interface ContactProps {
  socials: SocialLink[];
}

const iconMap: Record<string, React.ComponentType> = {
  MailIcon,
  FileTextIcon,
  DocumentIcon: FileTextIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkedInIcon: LinkedinIcon,
  GithubIcon,
  GitHubIcon: GithubIcon,
};

export function Contact({ socials }: ContactProps) {
  return (
    <section
      className="max-w-[1320px] mx-auto px-5 py-20 md:px-8 md:py-28 lg:py-36 reveal"
      id="contact"
    >
      <SectionLabel index="06">COMMUNICATIONS // CONTACT</SectionLabel>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="font-display m-0 mb-5 text-[clamp(38px,6vw,76px)] font-bold leading-[0.98] tracking-[0.04em] uppercase text-[var(--white-100)]">
            ESTABLISH DIRECT LINK.
          </h2>
          <p className="m-0 max-w-[520px] text-base leading-[1.6] text-[var(--white-80)]">
            Available for software engineering, quality assurance automation,
            and full-stack product collaboration. Select a direct channel below
            or download the technical curriculum vitae.
          </p>
        </div>

        {socials.length === 0 ? (
          <div className="border border-[var(--white-15)] p-8">
            <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)] m-0">
              NO COMMUNICATION CHANNELS CONFIGURED
            </p>
          </div>
        ) : (
          <div className="border-t border-[var(--white-15)]">
            {socials.map((link) => {
              const IconComponent = iconMap[link.icon] || MailIcon;
              const isCV =
                link.icon === "FileTextIcon" ||
                link.icon === "DocumentIcon" ||
                link.platform.toLowerCase().includes("cv");
              const openExternal = link.url.startsWith("http") || isCV;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={openExternal ? "_blank" : undefined}
                  rel={openExternal ? "noreferrer" : undefined}
                  aria-label={`${link.platform}: ${link.label}`}
                  className="min-h-[60px] py-4 px-3 -mx-3 flex items-center justify-between gap-4 border-b border-[var(--white-15)] text-[var(--white-80)] hover:text-[var(--white-100)] hover:bg-[var(--white-10)] transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="w-10 h-10 shrink-0 flex items-center justify-center border border-[var(--white-25)] text-[var(--white-100)] group-hover:border-[var(--white-100)] transition-colors duration-200">
                      <IconComponent />
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-sm font-bold tracking-[0.12em] uppercase text-[var(--white-100)]">
                        {link.platform}
                      </div>
                      <div className="font-mono-tech text-xs text-[var(--white-60)] truncate">
                        {link.label}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-50)] group-hover:text-[var(--white-100)] inline-flex items-center gap-2 shrink-0">
                    <span>{isCV ? "OPEN PDF" : "CONNECT"}</span>
                    <Arrow diagonal={openExternal} />
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
