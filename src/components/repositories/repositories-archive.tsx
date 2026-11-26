"use client";

import { useMemo, useRef, useState } from "react";
import { Arrow } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { GithubRepo } from "@/lib/data/github";

interface RepositoriesArchiveProps {
  initialRepos: GithubRepo[];
  initialError: string | null;
  initialFetchedAt: string;
  initialUsername: string;
}

const ITEMS_PER_PAGE = 8;

function formatIsoDate(value: string): string {
  if (!value) return "UNKNOWN";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "UNKNOWN";
  return parsed.toISOString().slice(0, 10);
}

function getPageNumbers(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];

  if (current > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  pages.push(total);
  return pages;
}

export function RepositoriesArchive({
  initialRepos,
  initialError,
  initialFetchedAt,
  initialUsername,
}: RepositoriesArchiveProps) {
  const [repos, setRepos] = useState<GithubRepo[]>(initialRepos);
  const [error, setError] = useState<string | null>(initialError);
  const [fetchedAt, setFetchedAt] = useState<string>(initialFetchedAt);
  const [username, setUsername] = useState<string>(initialUsername);
  const [isSyncing, setIsSyncing] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const archiveTopRef = useRef<HTMLDivElement | null>(null);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const repo of repos) {
      const lang = repo.language ?? "UNSPECIFIED";
      counts.set(lang, (counts.get(lang) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [repos]);

  const filteredRepos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return repos.filter((repo) => {
      const lang = repo.language ?? "UNSPECIFIED";
      const matchesLanguage =
        selectedLanguage === "ALL" || lang === selectedLanguage;
      if (!matchesLanguage) return false;
      if (!normalizedQuery) return true;

      const nameMatch = repo.name.toLowerCase().includes(normalizedQuery);
      const descMatch = (repo.description ?? "")
        .toLowerCase()
        .includes(normalizedQuery);
      const langMatch = lang.toLowerCase().includes(normalizedQuery);
      return nameMatch || descMatch || langMatch;
    });
  }, [repos, query, selectedLanguage]);

  const totalPages = Math.max(1, Math.ceil(filteredRepos.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredRepos.length);
  const paginatedRepos = filteredRepos.slice(startIndex, endIndex);
  const pageNumbers = getPageNumbers(safePage, totalPages);

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.max(1, Math.min(nextPage, totalPages));
    if (clamped === safePage) return;
    setCurrentPage(clamped);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    archiveTopRef.current?.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleRetrySync = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch("/api/github/repos", { cache: "no-store" });
      const payload = await response.json();
      setRepos(Array.isArray(payload.repos) ? payload.repos : []);
      setError(typeof payload.error === "string" ? payload.error : null);
      if (typeof payload.fetchedAt === "string") {
        setFetchedAt(payload.fetchedAt);
      }
      if (typeof payload.username === "string") {
        setUsername(payload.username);
      }
      setCurrentPage(1);
    } catch {
      setError("CLIENT TELEMETRY REQUEST FAILED");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleResetFilters = () => {
    setQuery("");
    setSelectedLanguage("ALL");
    setCurrentPage(1);
  };

  return (
    <div ref={archiveTopRef} className="scroll-mt-28 flex flex-col gap-8">
      <div className="border border-[var(--white-15)] bg-[#000000]/80">
        <div className="px-5 py-3.5 border-b border-[var(--white-15)] bg-[var(--gray-60)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-80)]">
            <span>SOURCE // GITHUB REST API</span>
            <span>USER // {username.toUpperCase()}</span>
            <span>SYNCED // {formatIsoDate(fetchedAt)}</span>
          </div>
          <button
            type="button"
            onClick={handleRetrySync}
            disabled={isSyncing}
            className="min-h-[44px] px-4 border border-[var(--white-25)] bg-[#000000] font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-200 disabled:opacity-50"
          >
            {isSyncing ? "SYNCING TELEMETRY..." : "REFRESH TELEMETRY"}
          </button>
        </div>

        <div className="p-5 md:p-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-end">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="repo-search"
                className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-60)]"
              >
                SEARCH ARCHIVE
              </label>
              <input
                id="repo-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Filter by repository name, description, or stack..."
                className="w-full min-h-[44px] px-4 bg-[#000000] border border-[var(--white-25)] text-sm text-[var(--white-100)] placeholder:text-[var(--white-50)] focus:border-[var(--white-100)]"
              />
            </div>

            <div className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-60)] min-h-[44px] flex items-center">
              {filteredRepos.length === 0
                ? `SHOWING 0 OF ${repos.length} REPOSITORIES`
                : `SHOWING ${String(startIndex + 1).padStart(2, "0")}-${String(
                    endIndex
                  ).padStart(2, "0")} OF ${filteredRepos.length} REPOSITORIES`}
            </div>
          </div>

          {languages.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-60)]">
                LANGUAGE FILTER
              </span>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter repositories by primary language"
              >
                <button
                  type="button"
                  aria-pressed={selectedLanguage === "ALL"}
                  onClick={() => {
                    setSelectedLanguage("ALL");
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "min-h-[44px] px-3.5 border font-mono-tech text-xs tracking-[0.1em] uppercase transition-colors duration-200",
                    selectedLanguage === "ALL"
                      ? "border-[var(--white-100)] bg-[var(--white-100)] text-[#000000]"
                      : "border-[var(--white-25)] bg-[#000000] text-[var(--white-80)] hover:border-[var(--white-100)]"
                  )}
                >
                  ALL ({repos.length})
                </button>
                {languages.map(([lang, count]) => {
                  const active = selectedLanguage === lang;
                  return (
                    <button
                      key={lang}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setCurrentPage(1);
                      }}
                      className={cn(
                        "min-h-[44px] px-3.5 border font-mono-tech text-xs tracking-[0.1em] uppercase transition-colors duration-200",
                        active
                          ? "border-[var(--white-100)] bg-[var(--white-100)] text-[#000000]"
                          : "border-[var(--white-25)] bg-[#000000] text-[var(--white-80)] hover:border-[var(--white-100)]"
                      )}
                    >
                      {lang} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {isSyncing && repos.length === 0 ? (
        <div
          className="border border-[var(--white-15)] p-10 text-center"
          role="status"
          aria-live="polite"
        >
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-80)] m-0">
            POLLING GITHUB TELEMETRY ENDPOINT...
          </p>
        </div>
      ) : error && repos.length === 0 ? (
        <div
          className="border border-[var(--white-25)] bg-[#000000] p-8 md:p-10"
          role="alert"
        >
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)] m-0 mb-2">
            TERMINAL FAULT // TELEMETRY UNAVAILABLE
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)] m-0 mb-3">
            UNABLE TO RETRIEVE REPOSITORY FEED
          </h2>
          <p className="font-mono-tech text-xs text-[var(--white-80)] m-0 mb-6">
            DIAGNOSTIC: {error}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRetrySync}
              disabled={isSyncing}
              className="cta-aerospace"
            >
              {isSyncing ? "RETRYING..." : "RETRY CONNECTION"}
            </button>
            <a
              href={`https://github.com/${encodeURIComponent(username)}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="cta-aerospace-secondary gap-2"
            >
              <span>OPEN GITHUB PROFILE</span>
              <Arrow diagonal />
            </a>
          </div>
        </div>
      ) : repos.length === 0 ? (
        <div className="border border-[var(--white-15)] p-10 text-center">
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)] m-0">
            NO PUBLIC REPOSITORIES RETURNED FROM TELEMETRY
          </p>
        </div>
      ) : filteredRepos.length === 0 ? (
        <div className="border border-[var(--white-15)] p-10 flex flex-col items-start gap-4">
          <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)] m-0">
            NO REPOSITORIES MATCH CURRENT FILTER PARAMETERS
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="cta-aerospace-secondary"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <>
          <div className="border border-[var(--white-15)] bg-[#000000]/80">
            <div className="hidden lg:grid lg:grid-cols-[72px_1.6fr_150px_130px_120px_160px] gap-6 px-6 py-3.5 border-b border-[var(--white-15)] bg-[var(--gray-60)] font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-80)]">
              <span>IDX</span>
              <span>REPOSITORY &amp; DESCRIPTION</span>
              <span>LANGUAGE</span>
              <span>STARS / FORKS</span>
              <span>UPDATED</span>
              <span className="text-right">DESTINATION</span>
            </div>

            <div className="divide-y divide-[var(--white-15)]">
              {paginatedRepos.map((repo, index) => {
                const rowNumber = startIndex + index + 1;
                return (
                  <article
                    key={repo.id}
                    className="grid grid-cols-1 lg:grid-cols-[72px_1.6fr_150px_130px_120px_160px] gap-4 lg:gap-6 px-5 py-6 lg:px-6 lg:items-center hover:bg-[var(--white-10)] transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between lg:block">
                      <span className="font-mono-tech text-xs tracking-[0.14em] text-[var(--white-60)]">
                        {String(rowNumber).padStart(2, "0")}
                      </span>
                      <span className="lg:hidden font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-60)]">
                        {repo.language ?? "UNSPECIFIED"}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                        <h2 className="font-display m-0 text-xl md:text-2xl font-bold tracking-[0.03em] uppercase text-[var(--white-100)] break-words">
                          {repo.name}
                        </h2>
                        {repo.isPinned && (
                          <span className="px-2 py-0.5 border border-[var(--white-100)] font-mono-tech text-[10px] tracking-[0.12em] uppercase text-[var(--white-100)]">
                            PINNED
                          </span>
                        )}
                      </div>
                      <p className="m-0 text-sm leading-[1.55] text-[var(--white-80)] break-words">
                        {repo.description ||
                          "No repository summary logged on GitHub."}
                      </p>
                    </div>

                    <div className="hidden lg:block font-mono-tech text-xs tracking-[0.06em] uppercase text-[var(--white-80)] break-words">
                      {repo.language ?? "UNSPECIFIED"}
                    </div>

                    <div className="font-mono-tech text-xs tracking-[0.08em] text-[var(--white-60)] flex lg:block gap-5">
                      <span>STARS: {repo.stargazers_count}</span>
                      <span className="lg:block lg:mt-0.5">
                        FORKS: {repo.forks_count}
                      </span>
                    </div>

                    <div className="font-mono-tech text-xs tracking-[0.08em] text-[var(--white-60)]">
                      <span className="lg:hidden">UPDATED: </span>
                      {formatIsoDate(repo.updated_at)}
                    </div>

                    <div className="lg:flex lg:justify-end">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-4 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200"
                      >
                        <span>OPEN REPO</span>
                        <Arrow />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Repositories pagination"
              className="border border-[var(--white-15)] bg-[#000000] px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <span className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-60)]">
                PAGE {String(safePage).padStart(2, "0")} OF{" "}
                {String(totalPages).padStart(2, "0")}
              </span>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage <= 1}
                  aria-label="Previous page"
                  className="min-h-[44px] px-4 border border-[var(--white-25)] bg-[#000000] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200 disabled:opacity-40 disabled:hover:bg-[#000000] disabled:hover:text-[var(--white-100)] disabled:hover:border-[var(--white-25)]"
                >
                  PREV
                </button>

                {pageNumbers.map((item, idx) =>
                  item === "ellipsis" ? (
                    <span
                      key={`ellipsis-${idx}`}
                      aria-hidden="true"
                      className="min-h-[44px] px-2 inline-flex items-center font-mono-tech text-xs text-[var(--white-60)]"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePageChange(item)}
                      aria-label={`Page ${item}`}
                      aria-current={item === safePage ? "page" : undefined}
                      className={cn(
                        "min-h-[44px] min-w-[44px] px-3 border font-mono-tech text-xs tracking-[0.1em] transition-colors duration-200",
                        item === safePage
                          ? "border-[var(--white-100)] bg-[var(--white-100)] text-[#000000]"
                          : "border-[var(--white-25)] bg-[#000000] text-[var(--white-80)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
                      )}
                    >
                      {String(item).padStart(2, "0")}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage >= totalPages}
                  aria-label="Next page"
                  className="min-h-[44px] px-4 border border-[var(--white-25)] bg-[#000000] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] hover:border-[var(--white-100)] transition-colors duration-200 disabled:opacity-40 disabled:hover:bg-[#000000] disabled:hover:text-[var(--white-100)] disabled:hover:border-[var(--white-25)]"
                >
                  NEXT
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
