import "server-only";
import { randomUUID } from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const PORTFOLIO_ASSETS_BUCKET = "portfolio-assets";
export const MAX_ASSET_FILE_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MIME_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

export async function ensurePortfolioAssetsBucket(): Promise<{
  ok: boolean;
  error?: string;
}> {
  try {
    const admin = createSupabaseAdminClient();
    const { data: existing, error: getError } = await admin.storage.getBucket(
      PORTFOLIO_ASSETS_BUCKET
    );

    if (existing) {
      return { ok: true };
    }

    if (getError && !getError.message.toLowerCase().includes("not found")) {
      // Attempt bucket creation anyway if getBucket returned non-fatal status
      const { error: createError } = await admin.storage.createBucket(
        PORTFOLIO_ASSETS_BUCKET,
        {
          public: true,
          fileSizeLimit: MAX_ASSET_FILE_BYTES,
          allowedMimeTypes: Array.from(ALLOWED_MIME_TYPES),
        }
      );
      if (createError && !createError.message.toLowerCase().includes("already exists")) {
        return { ok: false, error: createError.message };
      }
      return { ok: true };
    }

    const { error: createError } = await admin.storage.createBucket(
      PORTFOLIO_ASSETS_BUCKET,
      {
        public: true,
        fileSizeLimit: MAX_ASSET_FILE_BYTES,
        allowedMimeTypes: Array.from(ALLOWED_MIME_TYPES),
      }
    );

    if (createError && !createError.message.toLowerCase().includes("already exists")) {
      return { ok: false, error: createError.message };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Failed to inspect storage bucket.",
    };
  }
}

export async function uploadPortfolioAsset(
  file: File,
  folder: "certifications" | "gallery" | "profile" | "hero" | "about"
): Promise<{ url: string; path: string }> {
  if (!file || file.size === 0) {
    throw new Error("File upload is empty.");
  }

  if (file.size > MAX_ASSET_FILE_BYTES) {
    throw new Error("File exceeds maximum allowed size of 5MB.");
  }

  const rawExt = file.name.split(".").pop()?.toLowerCase() ?? "";
  const isMimeValid = ALLOWED_MIME_TYPES.has(file.type);
  const isExtValid = ALLOWED_EXTENSIONS.has(rawExt);

  if (!isMimeValid && !isExtValid) {
    throw new Error("Unsupported file format. Only JPG, PNG, and WEBP are allowed.");
  }

  if (file.type && !isMimeValid) {
    throw new Error("Invalid MIME type. Only JPG, PNG, and WEBP images are allowed.");
  }

  const bucketCheck = await ensurePortfolioAssetsBucket();
  if (!bucketCheck.ok) {
    throw new Error(
      `Storage bucket error (${PORTFOLIO_ASSETS_BUCKET}): ${bucketCheck.error ?? "unavailable"}`
    );
  }

  const ext = MIME_EXTENSION_MAP[file.type] ?? (rawExt === "jpeg" ? "jpg" : rawExt) ?? "jpg";
  const safeBase = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "asset";

  const objectPath = `${folder}/${Date.now()}-${randomUUID().slice(0, 8)}-${safeBase}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const admin = createSupabaseAdminClient();
  const { error: uploadError } = await admin.storage
    .from(PORTFOLIO_ASSETS_BUCKET)
    .upload(objectPath, buffer, {
      contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Supabase Storage upload failed: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = admin.storage.from(PORTFOLIO_ASSETS_BUCKET).getPublicUrl(objectPath);

  return { url: publicUrl, path: objectPath };
}
