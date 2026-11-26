"use server";

import { prisma } from "@/lib/prisma";
import { requireAdminAction } from "@/lib/supabase/admin-auth";
import { uploadPortfolioAsset } from "@/lib/supabase/storage";
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

export async function upsertCertificationAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();

    const id = getOptionalStringField(formData, "id");
    const title = getStringField(formData, "title");
    const issuer = getStringField(formData, "issuer");
    const issueDate = getStringField(formData, "issueDate");
    const credentialId = getOptionalStringField(formData, "credentialId");
    const verificationUrl = getOptionalStringField(formData, "verificationUrl");
    const category = getStringField(formData, "category", "Certification");
    const description = getOptionalStringField(formData, "description");
    const tags = parseCommaOrLineList(formData.get("tags"));
    const featuredOnHome = getBoolField(formData, "featuredOnHome");
    const sortOrder = getIntField(formData, "sortOrder", 0);

    if (!title || !issuer || !issueDate) {
      return {
        ok: false,
        message: "TITLE, ISSUER, AND ISSUE DATE ARE REQUIRED.",
      };
    }

    let imageUrl = getOptionalStringField(formData, "imageUrl");
    const imageFile = formData.get("imageFile");
    if (imageFile instanceof File && imageFile.size > 0) {
      const uploaded = await uploadPortfolioAsset(imageFile, "certifications");
      imageUrl = uploaded.url;
    }

    if (id) {
      await prisma.certification.update({
        where: { id },
        data: {
          title,
          issuer,
          issueDate,
          credentialId,
          verificationUrl,
          imageUrl,
          category,
          description,
          tags,
          featuredOnHome,
          sortOrder,
        },
      });
      revalidatePortfolioAll();
      return { ok: true, message: "CERTIFICATION RECORD UPDATED." };
    }

    const baseSlug = slugify(`${title}-${issueDate}`);
    const existing = await prisma.certification.findUnique({
      where: { slug: baseSlug },
    });
    const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

    await prisma.certification.create({
      data: {
        slug,
        title,
        issuer,
        issueDate,
        credentialId,
        verificationUrl,
        imageUrl,
        category,
        description,
        tags,
        featuredOnHome,
        sortOrder,
      },
    });
    revalidatePortfolioAll();
    return { ok: true, message: "CERTIFICATION RECORD CREATED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO SAVE CERTIFICATION.",
    };
  }
}

export async function toggleCertificationFeaturedAction(
  id: string,
  featuredOnHome: boolean
): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.certification.update({
      where: { id },
      data: { featuredOnHome },
    });
    revalidatePortfolioAll();
    return { ok: true, message: "CERTIFICATION HOME VISIBILITY UPDATED." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO TOGGLE STATUS.",
    };
  }
}

export async function deleteCertificationAction(
  id: string
): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.certification.delete({ where: { id } });
    revalidatePortfolioAll();
    return { ok: true, message: "CERTIFICATION RECORD DELETED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO DELETE CERTIFICATION.",
    };
  }
}
