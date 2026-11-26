import "server-only";
import { getRepoConfig } from "@/lib/data/repo-config";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  isPinned?: boolean;
}

export interface GithubReposResult {
  repos: GithubRepo[];
  error: string | null;
  fetchedAt: string;
  username: string;
  maxRepos: number;
}

export async function fetchGithubRepos(options?: {
  fresh?: boolean;
}): Promise<GithubReposResult> {
  const fetchedAt = new Date().toISOString();
  const repoConfig = await getRepoConfig();
  const username = repoConfig.githubUsername.trim() || "dewantars";
  const endpoint = `https://api.github.com/users/${encodeURIComponent(
    username
  )}/repos?sort=updated&per_page=100`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "my-portfolio-v2-telemetry",
      },
      ...(options?.fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: 3600 } }),
    });

    if (!response.ok) {
      const rateLimitRemaining = response.headers.get("x-ratelimit-remaining");
      const reason =
        response.status === 403 && rateLimitRemaining === "0"
          ? "GITHUB API RATE LIMIT EXCEEDED (HTTP 403)"
          : `GITHUB TELEMETRY HTTP ${response.status}`;

      return {
        repos: [],
        error: reason,
        fetchedAt,
        username,
        maxRepos: repoConfig.maxRepos,
      };
    }

    const data = (await response.json()) as unknown;

    if (!Array.isArray(data)) {
      return {
        repos: [],
        error: "UNEXPECTED TELEMETRY PAYLOAD FORMAT",
        fetchedAt,
        username,
        maxRepos: repoConfig.maxRepos,
      };
    }

    const hiddenSet = new Set(
      repoConfig.hiddenRepos
        .map((r) => r.trim().toLowerCase())
        .filter(Boolean)
    );

    const pinnedOrder = new Map<string, number>();
    repoConfig.pinnedRepoNames.forEach((name, idx) => {
      const clean = name.trim().toLowerCase();
      if (clean && !pinnedOrder.has(clean)) {
        pinnedOrder.set(clean, idx);
      }
    });

    const mapped: GithubRepo[] = data
      .map((item) => {
        const name = String(item.name ?? "");
        const fullName = String(item.full_name ?? "");
        const isPinned =
          pinnedOrder.has(name.toLowerCase()) ||
          pinnedOrder.has(fullName.toLowerCase());
        return {
          id: Number(item.id),
          name,
          full_name: fullName,
          html_url: String(item.html_url ?? ""),
          description:
            typeof item.description === "string" ? item.description : null,
          language: typeof item.language === "string" ? item.language : null,
          stargazers_count: Number(item.stargazers_count ?? 0),
          forks_count: Number(item.forks_count ?? 0),
          updated_at: String(item.updated_at ?? ""),
          fork: Boolean(item.fork),
          archived: Boolean(item.archived),
          isPinned,
        };
      })
      .filter(
        (repo) =>
          !hiddenSet.has(repo.name.toLowerCase()) &&
          !hiddenSet.has(repo.full_name.toLowerCase())
      );

    mapped.sort((a, b) => {
      const aRank =
        pinnedOrder.get(a.name.toLowerCase()) ??
        pinnedOrder.get(a.full_name.toLowerCase());
      const bRank =
        pinnedOrder.get(b.name.toLowerCase()) ??
        pinnedOrder.get(b.full_name.toLowerCase());

      if (aRank !== undefined && bRank !== undefined) return aRank - bRank;
      if (aRank !== undefined) return -1;
      if (bRank !== undefined) return 1;
      return 0;
    });

    const max = repoConfig.maxRepos > 0 ? repoConfig.maxRepos : mapped.length;

    return {
      repos: mapped.slice(0, max),
      error: null,
      fetchedAt,
      username,
      maxRepos: repoConfig.maxRepos,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "NETWORK CONNECTION FAILED";
    return {
      repos: [],
      error: `TELEMETRY LINK UNREACHABLE: ${message.toUpperCase()}`,
      fetchedAt,
      username,
      maxRepos: repoConfig.maxRepos,
    };
  }
}
