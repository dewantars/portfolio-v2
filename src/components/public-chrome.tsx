"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { BackToTop } from "@/components/back-to-top";
import { SpaceBackdrop } from "@/components/space-backdrop";
import type { SiteConfigDTO } from "@/lib/types/portfolio";

interface PublicChromeProps {
  siteConfig: SiteConfigDTO;
  children: React.ReactNode;
}

export function PublicChrome({ siteConfig, children }: PublicChromeProps) {
  const pathname = usePathname() ?? "/";
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#000000] text-[var(--white-100)]">
        {children}
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen text-[var(--white-100)] flex flex-col">
      <SpaceBackdrop />
      <Navigation siteConfig={siteConfig} />
      <div className="flex-1">{children}</div>
      <Footer siteConfig={siteConfig} />
      <BackToTop />
    </div>
  );
}
