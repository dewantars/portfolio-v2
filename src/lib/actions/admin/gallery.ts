"use server";

import { prisma } from "@/lib/prisma";
import { requireAdminAction } from "@/lib/supabase/admin-auth";
import { uploadPortfolioAsset } from "@/lib/supabase/storage";
import {
  getBoolField,
  getIntField,
  getOptionalStringField,
  getStringField,
  revalidatePortfolioAll,
  slugify,
  type ActionResult,
} from "@/lib/actions/admin/shared";

export async function upsertGalleryItemAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();

    const id = getOptionalStringField(formData, "id");
    const code = getStringField(formData, "code", "FIG // NEW");
    const title = getStringField(formData, "title");
    const caption = getStringField(formData, "caption");
    const category = getStringField(formData, "category", "Field Archive");
    const location = getStringField(formData, "location", "Bandung, Indonesia");
    const capturedDate = getStringField(formData, "capturedDate", "2026");
    const mediaType = getStringField(formData, "mediaType", "image");
    const aspectRatio = getStringField(formData, "aspectRatio", "1:1");
    const isFeatured = getBoolField(formData, "isFeatured");
    const posterUrl = getOptionalStringField(formData, "posterUrl");
    const altText = getOptionalStringField(formData, "altText") ?? title;
    const sortOrder = getIntField(formData, "sortOrder", 0);

    if (!title || !caption || !category || !location || !capturedDate) {
      return {
        ok: false,
        message: "TITLE, CAPTION, CATEGORY, LOCATION, AND DATE ARE REQUIRED.",
      };
    }

    let imageUrl = getOptionalStringField(formData, "imageUrl");
    const imageFile = formData.get("imageFile");
    if (imageFile instanceof File && imageFile.size > 0) {
      const uploaded = await uploadPortfolioAsset(imageFile, "gallery");
      imageUrl = uploaded.url;
    }

    if (isFeatured) {
      await prisma.galleryItem.updateMany({
        where: id ? { id: { not: id }, isFeatured: true } : { isFeatured: true },
        data: { isFeatured: false },
      });
    }

    if (id) {
      await prisma.galleryItem.update({
        where: { id },
        data: {
          code,
          title,
          caption,
          category,
          location,
          capturedDate,
          mediaType,
          aspectRatio,
          isFeatured,
          imageUrl,
          posterUrl,
          altText,
          sortOrder,
        },
      });
      revalidatePortfolioAll();
      return { ok: true, message: "GALLERY ITEM UPDATED." };
    }

    const baseSlug = slugify(`${code}-${title}`);
    const existing = await prisma.galleryItem.findUnique({
      where: { slug: baseSlug },
    });
    const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

    await prisma.galleryItem.create({
      data: {
        slug,
        code,
        title,
        caption,
        category,
        location,
        capturedDate,
        mediaType,
        aspectRatio,
        isFeatured,
        imageUrl,
        posterUrl,
        altText,
        sortOrder,
      },
    });
    revalidatePortfolioAll();
    return { ok: true, message: "GALLERY MEDIA RECORD CREATED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO SAVE GALLERY ITEM.",
    };
  }
}

export async function deleteGalleryItemAction(
  id: string
): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await prisma.galleryItem.delete({ where: { id } });
    revalidatePortfolioAll();
    return { ok: true, message: "GALLERY ITEM DELETED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO DELETE GALLERY ITEM.",
    };
  }
}
