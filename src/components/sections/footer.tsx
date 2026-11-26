import type { SiteConfigDTO } from "@/lib/types/portfolio";

interface FooterProps {
  siteConfig: SiteConfigDTO;
}

export function Footer({ siteConfig }: FooterProps) {
  const footerLinks = [
    siteConfig.githubUrl
      ? { id: "github", platform: "GitHub", url: siteConfig.githubUrl }
      : null,
    siteConfig.linkedinUrl
      ? { id: "linkedin", platform: "LinkedIn", url: siteConfig.linkedinUrl }
      : null,
    siteConfig.email
      ? { id: "email", platform: "Email", url: `mailto:${siteConfig.email}` }
      : null,
  ].filter((item): item is { id: string; platform: string; url: string } =>
    Boolean(item)
  );

  return (
    <footer className="no-print bg-[#000000]/85 border-t border-[var(--white-15)]">
      <div className="max-w-[1320px] mx-auto px-5 py-7 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono-tech m-0 text-xs tracking-[0.12em] uppercase text-[var(--white-50)]">
          {siteConfig.footerCopyright}
        </p>

        <nav
          aria-label="Direct social links"
          className="flex flex-wrap items-center gap-6"
        >
          {footerLinks.map((link) => {
            const isExternal = link.url.startsWith("http");
            return (
              <a
                key={link.id}
                href={link.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="inline-flex items-center min-h-[44px] font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)] hover:text-[var(--white-100)] transition-colors duration-200"
              >
                {link.platform}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
