import "server-only";

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
}

export interface GithubReposResult {
  repos: GithubRepo[];
  error: string | null;
  fetchedAt: string;
}

const GITHUB_REPOS_ENDPOINT =
  "https://api.github.com/users/dewantars/repos?sort=updated&per_page=100";

export async function fetchGithubRepos(options?: {
  fresh?: boolean;
}): Promise<GithubReposResult> {
  const fetchedAt = new Date().toISOString();

  try {
    const response = await fetch(GITHUB_REPOS_ENDPOINT, {
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
      };
    }

    const data = (await response.json()) as unknown;

    if (!Array.isArray(data)) {
      return {
        repos: [],
        error: "UNEXPECTED TELEMETRY PAYLOAD FORMAT",
        fetchedAt,
      };
    }

    const repos: GithubRepo[] = data.map((item) => ({
      id: Number(item.id),
      name: String(item.name ?? ""),
      full_name: String(item.full_name ?? ""),
      html_url: String(item.html_url ?? ""),
      description:
        typeof item.description === "string" ? item.description : null,
      language: typeof item.language === "string" ? item.language : null,
      stargazers_count: Number(item.stargazers_count ?? 0),
      forks_count: Number(item.forks_count ?? 0),
      updated_at: String(item.updated_at ?? ""),
      fork: Boolean(item.fork),
      archived: Boolean(item.archived),
    }));

    return {
      repos,
      error: null,
      fetchedAt,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "NETWORK CONNECTION FAILED";
    return {
      repos: [],
      error: `TELEMETRY LINK UNREACHABLE: ${message.toUpperCase()}`,
      fetchedAt,
    };
  }
}
