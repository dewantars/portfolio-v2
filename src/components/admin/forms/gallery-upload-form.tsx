"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upsertGalleryItemAction } from "@/lib/actions/admin/gallery";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import { AssetUploadField } from "@/components/admin/asset-upload-field";
import type { GalleryItemDTO } from "@/lib/types/portfolio";

interface GalleryUploadFormProps {
  initial?: GalleryItemDTO | null;
  defaultOrder?: number;
  redirectOnCreateTo?: string;
  onCancel?: () => void;
}

export function GalleryUploadForm({
  initial,
  defaultOrder = 1,
  redirectOnCreateTo,
  onCancel,
}: GalleryUploadFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    upsertGalleryItemAction,
    null
  );

  useEffect(() => {
    if (state?.ok && redirectOnCreateTo) {
      router.push(redirectOnCreateTo);
      router.refresh();
    }
  }, [state, redirectOnCreateTo, router]);

  return (
    <form
      key={initial?.id ?? "new-gallery"}
      action={formAction}
      className="flex flex-col gap-6"
    >
      <AdminStatusBanner state={state} />
      {initial && <input type="hidden" name="id" value={initial.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="gal-title" className={adminLabelClass}>
            MEDIA TITLE
          </label>
          <input
            id="gal-title"
            name="title"
            required
            defaultValue={initial?.title ?? ""}
            placeholder="e.g. Telkom QA Review Session"
            className={adminInputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="gal-code" className={adminLabelClass}>
              FRAME CODE
            </label>
            <input
              id="gal-code"
              name="code"
              required
              defaultValue={
                initial?.code ??
                `FIG // ${String(defaultOrder).padStart(2, "0")}`
              }
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="gal-order" className={adminLabelClass}>
              SORT ORDER
            </label>
            <input
              id="gal-order"
              name="sortOrder"
              type="number"
              defaultValue={initial?.sortOrder ?? defaultOrder}
              className={adminInputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="gal-category" className={adminLabelClass}>
            CATEGORY
          </label>
          <input
            id="gal-category"
            name="category"
            required
            defaultValue={initial?.category ?? "Engineering"}
            placeholder="Engineering, Academic, Field Archive, Portrait"
            className={adminInputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="gal-location" className={adminLabelClass}>
              LOCATION
            </label>
            <input
              id="gal-location"
              name="location"
              required
              defaultValue={initial?.location ?? "Bandung, Indonesia"}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="gal-date" className={adminLabelClass}>
              CAPTURED DATE
            </label>
            <input
              id="gal-date"
              name="capturedDate"
              required
              defaultValue={initial?.capturedDate ?? "2026"}
              className={adminInputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="gal-ratio" className={adminLabelClass}>
              ASPECT RATIO
            </label>
            <select
              id="gal-ratio"
              name="aspectRatio"
              defaultValue={initial?.aspectRatio ?? "1:1"}
              className={adminInputClass}
            >
              <option value="1:1">1:1 (Square)</option>
              <option value="2:1">2:1 (Landscape)</option>
              <option value="1:2">1:2 (Portrait)</option>
              <option value="19:6">19:6 (Primary Featured)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="gal-media-type" className={adminLabelClass}>
              MEDIA TYPE
            </label>
            <select
              id="gal-media-type"
              name="mediaType"
              defaultValue={initial?.mediaType ?? "image"}
              className={adminInputClass}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="gal-alt" className={adminLabelClass}>
            ACCESSIBLE ALT TEXT
          </label>
          <input
            id="gal-alt"
            name="altText"
            defaultValue={initial?.altText ?? ""}
            placeholder="Concise visual description for screen readers"
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="gal-caption" className={adminLabelClass}>
            CAPTION / FIELD NOTE
          </label>
          <textarea
            id="gal-caption"
            name="caption"
            required
            defaultValue={initial?.caption ?? ""}
            className={adminTextareaClass}
          />
        </div>
      </div>

      <AssetUploadField
        id={`gallery-asset-${initial?.id ?? "new"}`}
        label="GALLERY IMAGE FILE"
        urlInputName="imageUrl"
        folder="gallery"
        initialUrl={initial?.imageUrl}
      />

      <div className="pt-3 border-t border-[var(--white-15)] flex flex-wrap items-center justify-between gap-4">
        <label
          htmlFor="gal-featured"
          className="inline-flex items-center gap-3 min-h-[44px]"
        >
          <input
            id="gal-featured"
            name="isFeatured"
            type="checkbox"
            defaultChecked={initial?.isFeatured ?? false}
            className="w-4 h-4 accent-[var(--white-100)]"
          />
          <span className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)]">
            SET AS PRIMARY 19:6 FEATURED SHOWCASE
          </span>
        </label>

        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="cta-aerospace-secondary"
            >
              CANCEL
            </button>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="cta-aerospace disabled:opacity-60"
          >
            {isPending
              ? "SAVING..."
              : initial
                ? "UPDATE MEDIA"
                : "PUBLISH TO ARCHIVE"}
          </button>
        </div>
      </div>
    </form>
  );
}
