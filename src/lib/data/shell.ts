import "server-only";
import { getSiteConfig } from "@/lib/data/site-config";
import type { SiteConfigDTO } from "@/lib/types/portfolio";

export interface ShellData {
  siteConfig: SiteConfigDTO;
}

export async function getShellData(): Promise<ShellData> {
  const siteConfig = await getSiteConfig();
  return { siteConfig };
}
