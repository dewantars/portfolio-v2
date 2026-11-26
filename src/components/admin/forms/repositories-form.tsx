"use client";

import { useActionState } from "react";
import { updateRepoConfigAction } from "@/lib/actions/admin/repositories";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import type { RepoConfigDTO } from "@/lib/types/portfolio";

export function RepositoriesForm({ config }: { config: RepoConfigDTO }) {
  const [state, formAction, isPending] = useActionState(
    updateRepoConfigAction,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <AdminStatusBanner state={state} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="repo-username" className={adminLabelClass}>
            GITHUB SOURCE USERNAME
          </label>
          <input
            id="repo-username"
            name="githubUsername"
            required
            defaultValue={config.githubUsername}
            placeholder="dewantars"
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="repo-max" className={adminLabelClass}>
            MAX REPOSITORIES DISPLAYED (1 TO 100)
          </label>
          <input
            id="repo-max"
            name="maxRepos"
            type="number"
            min={1}
            max={100}
            required
            defaultValue={config.maxRepos}
            className={adminInputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="repo-pinned" className={adminLabelClass}>
          PINNED / HIGHLIGHTED REPOSITORY NAMES (COMMA OR NEWLINE SEPARATED)
        </label>
        <textarea
          id="repo-pinned"
          name="pinnedRepoNames"
          defaultValue={config.pinnedRepoNames.join("\n")}
          placeholder="my-portfolio-v2&#10;hikepassApp"
          className={adminTextareaClass}
        />
        <p className="m-0 font-mono-tech text-[11px] text-[var(--white-50)]">
          Repositories listed here appear first in order and receive a PINNED
          telemetry badge on /repositories.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="repo-hidden" className={adminLabelClass}>
          HIDDEN REPOSITORIES BLACKLIST (COMMA OR NEWLINE SEPARATED)
        </label>
        <textarea
          id="repo-hidden"
          name="hiddenRepos"
          defaultValue={config.hiddenRepos.join("\n")}
          placeholder="repo-to-hide&#10;scratch-experiment"
          className={adminTextareaClass}
        />
        <p className="m-0 font-mono-tech text-[11px] text-[var(--white-50)]">
          Matching repository names (case-insensitive) are filtered out from both
          SSR and live refresh telemetry.
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--white-15)] flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="cta-aerospace disabled:opacity-60"
        >
          {isPending ? "SAVING CONFIG..." : "SAVE REPOSITORY CONFIG"}
        </button>
      </div>
    </form>
  );
}
