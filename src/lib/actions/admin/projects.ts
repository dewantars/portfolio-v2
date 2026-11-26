"use server";

import { prisma } from "@/lib/prisma";
import { requireAdminAction } from "@/lib/supabase/admin-auth";
import {
  getBoolField,
  getIntField,
  getOptionalStringField,
  getStringField,
  parseCommaOrLineList,
  revalidatePortfolioAll,
  slugify,
  type ActionResult,
} from "@/lib/actions/admin/shared";

export async function upsertProjectAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();

    const id = getOptionalStringField(formData, "id");
    const title = getStringField(formData, "title");
    const missionCode = getStringField(formData, "missionCode", "01");
    const role = getStringField(formData, "role");
    const summary = getStringField(formData, "summary");
    const architectureDetail = getOptionalStringField(
      formData,
      "architectureDetail"
    );
    const techStack = parseCommaOrLineList(formData.get("techStack"));
    const statusLabel = getStringField(
      formData,
      "statusLabel",
      "PUBLIC // DEPLOYED"
    );
    const layoutType = getStringField(formData, "layoutType", "standard");
    const githubUrl = getOptionalStringField(formData, "githubUrl");
    const liveUrl = getOptionalStringField(formData, "liveUrl");
    const featuredOnHome = getBoolField(formData, "featuredOnHome");
    const sortOrder = getIntField(formData, "sortOrder", 0);

    if (!title || !role || !summary) {
      return {
        ok: false,
        message: "TITLE, ROLE, AND SUMMARY ARE REQUIRED.",
      };
    }

    if (id) {
      await prisma.project.update({
        where: { id },
        data: {
          title,
          missionCode,
          role,
          summary,
          architectureDetail,
          techStack,
          statusLabel,
          layoutType,
          githubUrl,
          liveUrl,
          featuredOnHome,
          sortOrder,
        },
      });
      revalidatePortfolioAll();
      return { ok: true, message: `MISSION "${title.toUpperCase()}" UPDATED.` };
    }

    const baseSlug = slugify(title);
    const existing = await prisma.project.findUnique({
      where: { slug: baseSlug },
    });
    const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

    await prisma.project.create({
      data: {
        slug,
        title,
        missionCode,
        role,
        summary,
        architectureDetail,
        techStack,
        statusLabel,
        layoutType,
        githubUrl,
        liveUrl,
        featuredOnHome,
        sortOrder,
      },
    });

    revalidatePortfolioAll();
    return { ok: true, message: `MISSION "${title.toUpperCase()}" CREATED.` };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO SAVE MISSION.",
    };
  }
}

export async function toggleProjectFeaturedAction(
  id: string,
  featuredOnHome: boolean
): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.project.update({
      where: { id },
      data: { featuredOnHome },
    });
    revalidatePortfolioAll();
    return { ok: true, message: "FEATURED STATUS UPDATED." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO TOGGLE STATUS.",
    };
  }
}

export async function deleteProjectAction(id: string): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.project.delete({ where: { id } });
    revalidatePortfolioAll();
    return { ok: true, message: "MISSION DELETED FROM DATABASE." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO DELETE MISSION.",
    };
  }
}
