import type { Metadata } from "next";
import { SectionLabel, Arrow, GithubIcon } from "@/components/ui/icons";
import { fetchGithubRepos } from "@/lib/data/github";
import { RepositoriesArchive } from "@/components/repositories/repositories-archive";

export const metadata: Metadata = {
  title: "Repositories | Dewanta Rahma Satria",
  description:
    "Live public GitHub repository archive and source code telemetry for dewantars.",
};

export default async function RepositoriesPage() {
  const { repos, error, fetchedAt } = await fetchGithubRepos();

  return (
    <main className="max-w-[1320px] mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20 md:pb-28">
      <SectionLabel index="02">SOURCE CODE &amp; TELEMETRY ARCHIVE</SectionLabel>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-10 lg:mb-14">
        <h1 className="font-display m-0 text-[clamp(36px,6vw,72px)] leading-[0.98] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
          PUBLIC REPOSITORIES
        </h1>
        <a
          href="https://github.com/dewantars"
          target="_blank"
          rel="noreferrer"
          className="cta-aerospace gap-3 shrink-0"
        >
          <GithubIcon />
          <span>VIEW GITHUB PROFILE</span>
          <Arrow diagonal />
        </a>
      </div>

      <RepositoriesArchive
        initialRepos={repos}
        initialError={error}
        initialFetchedAt={fetchedAt}
      />
    </main>
  );
}
