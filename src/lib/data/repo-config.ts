import "server-only";
import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/data/site-config";
import type { RepoConfigDTO } from "@/lib/types/portfolio";

export async function getRepoConfig(): Promise<RepoConfigDTO> {
  try {
    const [repoConfig, siteConfig] = await Promise.all([
      prisma.repoConfig.findUnique({ where: { id: "main" } }),
      getSiteConfig(),
    ]);

    if (!repoConfig) {
      return {
        id: "main",
        githubUsername: siteConfig.githubUsername || "dewantars",
        maxRepos: 50,
        hiddenRepos: [],
        pinnedRepoNames: [],
      };
    }

    return {
      id: repoConfig.id,
      githubUsername:
        repoConfig.githubUsername.trim() ||
        siteConfig.githubUsername ||
        "dewantars",
      maxRepos: repoConfig.maxRepos,
      hiddenRepos: repoConfig.hiddenRepos,
      pinnedRepoNames: repoConfig.pinnedRepoNames,
    };
  } catch {
    return {
      id: "main",
      githubUsername: "dewantars",
      maxRepos: 50,
      hiddenRepos: [],
      pinnedRepoNames: [],
    };
  }
}
