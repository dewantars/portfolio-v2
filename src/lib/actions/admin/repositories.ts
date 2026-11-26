"use server";

import { prisma } from "@/lib/prisma";
import { requireAdminAction } from "@/lib/supabase/admin-auth";
import {
  getIntField,
  getStringField,
  parseCommaOrLineList,
  revalidatePortfolioAll,
  type ActionResult,
} from "@/lib/actions/admin/shared";

export async function updateRepoConfigAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();

    const githubUsername = getStringField(formData, "githubUsername", "dewantars");
    const maxReposRaw = getIntField(formData, "maxRepos", 50);
    const maxRepos = Math.max(1, Math.min(100, maxReposRaw));
    const hiddenRepos = parseCommaOrLineList(formData.get("hiddenRepos"));
    const pinnedRepoNames = parseCommaOrLineList(formData.get("pinnedRepoNames"));

    if (!githubUsername) {
      return { ok: false, message: "GITHUB USERNAME IS REQUIRED." };
    }

    await prisma.repoConfig.upsert({
      where: { id: "main" },
      update: {
        githubUsername,
        maxRepos,
        hiddenRepos,
        pinnedRepoNames,
      },
      create: {
        id: "main",
        githubUsername,
        maxRepos,
        hiddenRepos,
        pinnedRepoNames,
      },
    });

    revalidatePortfolioAll();
    return { ok: true, message: "REPOSITORY TELEMETRY CONFIG SAVED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO SAVE REPOSITORY CONFIG.",
    };
  }
}
