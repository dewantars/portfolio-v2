import { SocialLink } from "@prisma/client";

interface FooterProps {
  name?: string;
  socials?: SocialLink[];
}

export function Footer({ name, socials = [] }: FooterProps) {
  const displayName = (name ?? "Dewanta Rahma Satria").toUpperCase();

  const footerLinks = socials.filter((item) => {
    const p = item.platform.toLowerCase();
    return p.includes("github") || p.includes("linkedin") || p.includes("email");
  });

  return (
    <footer className="bg-[#000000] border-t border-[var(--white-15)]">
      <div className="max-w-[1320px] mx-auto px-5 py-7 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono-tech m-0 text-xs tracking-[0.12em] uppercase text-[var(--white-50)]">
          &copy; 2026 {displayName}
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
