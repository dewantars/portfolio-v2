import "server-only";
import { getProfile } from "@/lib/data/profile";
import { getSocialLinks } from "@/lib/data/socials";
import type { Profile, SocialLink } from "@prisma/client";

export interface ShellData {
  profile: Profile | null;
  socials: SocialLink[];
}

export async function getShellData(): Promise<ShellData> {
  try {
    const [profile, socials] = await Promise.all([
      getProfile(),
      getSocialLinks(),
    ]);
    return { profile, socials };
  } catch {
    return { profile: null, socials: [] };
  }
}
