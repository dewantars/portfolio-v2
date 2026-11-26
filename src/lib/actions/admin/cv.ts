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

// WORK EXPERIENCE
export async function upsertExperienceAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();

    const id = getOptionalStringField(formData, "id");
    const role = getStringField(formData, "role");
    const organization = getStringField(formData, "organization");
    const period = getStringField(formData, "period");
    const location = getOptionalStringField(formData, "location");
    const description = getStringField(formData, "description");
    const tags = parseCommaOrLineList(formData.get("tags"));
    const featuredOnHome = getBoolField(formData, "featuredOnHome");
    const sortOrder = getIntField(formData, "sortOrder", 0);

    if (!role || !organization || !period || !description) {
      return {
        ok: false,
        message: "ROLE, ORGANIZATION, PERIOD, AND DESCRIPTION ARE REQUIRED.",
      };
    }

    if (id) {
      await prisma.experience.update({
        where: { id },
        data: {
          role,
          organization,
          period,
          location,
          description,
          tags,
          featuredOnHome,
          sortOrder,
        },
      });
      revalidatePortfolioAll();
      return { ok: true, message: "EXPERIENCE RECORD UPDATED." };
    }

    const baseSlug = slugify(`${organization}-${role}`);
    const existing = await prisma.experience.findUnique({
      where: { slug: baseSlug },
    });
    const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

    await prisma.experience.create({
      data: {
        slug,
        role,
        organization,
        period,
        location,
        description,
        tags,
        featuredOnHome,
        sortOrder,
      },
    });
    revalidatePortfolioAll();
    return { ok: true, message: "EXPERIENCE RECORD CREATED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO SAVE EXPERIENCE.",
    };
  }
}

export async function toggleExperienceFeaturedAction(
  id: string,
  featuredOnHome: boolean
): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.experience.update({
      where: { id },
      data: { featuredOnHome },
    });
    revalidatePortfolioAll();
    return { ok: true, message: "EXPERIENCE HOME VISIBILITY UPDATED." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO UPDATE STATUS.",
    };
  }
}

export async function deleteExperienceAction(id: string): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.experience.delete({ where: { id } });
    revalidatePortfolioAll();
    return { ok: true, message: "EXPERIENCE RECORD DELETED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO DELETE EXPERIENCE.",
    };
  }
}

// EDUCATION
export async function upsertEducationAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();

    const id = getOptionalStringField(formData, "id");
    const institution = getStringField(formData, "institution");
    const degree = getStringField(formData, "degree");
    const fieldOfStudy = getStringField(formData, "fieldOfStudy");
    const period = getStringField(formData, "period");
    const metric = getOptionalStringField(formData, "metric");
    const description = getStringField(formData, "description");
    const sortOrder = getIntField(formData, "sortOrder", 0);

    if (!institution || !degree || !fieldOfStudy || !period || !description) {
      return {
        ok: false,
        message:
          "INSTITUTION, DEGREE, FIELD OF STUDY, PERIOD, AND DESCRIPTION ARE REQUIRED.",
      };
    }

    if (id) {
      await prisma.education.update({
        where: { id },
        data: {
          institution,
          degree,
          fieldOfStudy,
          period,
          metric,
          description,
          sortOrder,
        },
      });
      revalidatePortfolioAll();
      return { ok: true, message: "EDUCATION RECORD UPDATED." };
    }

    const baseSlug = slugify(`${institution}-${degree}`);
    const existing = await prisma.education.findUnique({
      where: { slug: baseSlug },
    });
    const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

    await prisma.education.create({
      data: {
        slug,
        institution,
        degree,
        fieldOfStudy,
        period,
        metric,
        description,
        sortOrder,
      },
    });
    revalidatePortfolioAll();
    return { ok: true, message: "EDUCATION RECORD CREATED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO SAVE EDUCATION.",
    };
  }
}

export async function deleteEducationAction(id: string): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.education.delete({ where: { id } });
    revalidatePortfolioAll();
    return { ok: true, message: "EDUCATION RECORD DELETED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO DELETE EDUCATION.",
    };
  }
}

// SKILLS
export async function upsertSkillAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();

    const id = getOptionalStringField(formData, "id");
    const category = getStringField(formData, "category");
    const name = getStringField(formData, "name");
    const specification = getOptionalStringField(formData, "specification");
    const sortOrder = getIntField(formData, "sortOrder", 0);

    if (!category || !name) {
      return { ok: false, message: "CATEGORY AND SKILL NAME ARE REQUIRED." };
    }

    if (id) {
      await prisma.skill.update({
        where: { id },
        data: { category, name, specification, sortOrder },
      });
      revalidatePortfolioAll();
      return { ok: true, message: `SKILL "${name.toUpperCase()}" UPDATED.` };
    }

    const baseSlug = slugify(`${category}-${name}`);
    const existing = await prisma.skill.findUnique({ where: { slug: baseSlug } });
    const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

    await prisma.skill.create({
      data: { slug, category, name, specification, sortOrder },
    });
    revalidatePortfolioAll();
    return { ok: true, message: `SKILL "${name.toUpperCase()}" ADDED.` };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO SAVE SKILL.",
    };
  }
}

export async function deleteSkillAction(id: string): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.skill.delete({ where: { id } });
    revalidatePortfolioAll();
    return { ok: true, message: "SKILL REMOVED." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO DELETE SKILL.",
    };
  }
}

// LANGUAGES
export async function upsertLanguageAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();

    const id = getOptionalStringField(formData, "id");
    const name = getStringField(formData, "name");
    const proficiency = getStringField(formData, "proficiency");
    const sortOrder = getIntField(formData, "sortOrder", 0);

    if (!name || !proficiency) {
      return {
        ok: false,
        message: "LANGUAGE NAME AND PROFICIENCY ARE REQUIRED.",
      };
    }

    if (id) {
      await prisma.language.update({
        where: { id },
        data: { name, proficiency, sortOrder },
      });
      revalidatePortfolioAll();
      return { ok: true, message: `LANGUAGE "${name.toUpperCase()}" UPDATED.` };
    }

    const baseSlug = slugify(name);
    const existing = await prisma.language.findUnique({
      where: { slug: baseSlug },
    });
    const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

    await prisma.language.create({
      data: { slug, name, proficiency, sortOrder },
    });
    revalidatePortfolioAll();
    return { ok: true, message: `LANGUAGE "${name.toUpperCase()}" ADDED.` };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO SAVE LANGUAGE.",
    };
  }
}

export async function deleteLanguageAction(id: string): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.language.delete({ where: { id } });
    revalidatePortfolioAll();
    return { ok: true, message: "LANGUAGE REMOVED." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO DELETE LANGUAGE.",
    };
  }
}
