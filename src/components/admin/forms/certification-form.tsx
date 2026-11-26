"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upsertCertificationAction } from "@/lib/actions/admin/certifications";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import { AssetUploadField } from "@/components/admin/asset-upload-field";
import type { CertificationDTO } from "@/lib/types/portfolio";

interface CertificationFormProps {
  initial?: CertificationDTO | null;
  defaultOrder?: number;
  redirectOnCreateTo?: string;
  onCancel?: () => void;
}

export function CertificationForm({
  initial,
  defaultOrder = 1,
  redirectOnCreateTo,
  onCancel,
}: CertificationFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    upsertCertificationAction,
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
      key={initial?.id ?? "new-cert"}
      action={formAction}
      className="flex flex-col gap-6"
    >
      <AdminStatusBanner state={state} />
      {initial && <input type="hidden" name="id" value={initial.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="cert-title" className={adminLabelClass}>
            CREDENTIAL TITLE
          </label>
          <input
            id="cert-title"
            name="title"
            required
            defaultValue={initial?.title ?? ""}
            placeholder="e.g. Junior Web Developer"
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cert-issuer" className={adminLabelClass}>
            ISSUING ORGANIZATION
          </label>
          <input
            id="cert-issuer"
            name="issuer"
            required
            defaultValue={initial?.issuer ?? ""}
            placeholder="e.g. BLSDM Komdigi"
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cert-category" className={adminLabelClass}>
            CATEGORY
          </label>
          <input
            id="cert-category"
            name="category"
            required
            defaultValue={initial?.category ?? "Certification"}
            placeholder="Certification, Award, Telkom Indonesia"
            className={adminInputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="cert-date" className={adminLabelClass}>
              ISSUE DATE / YEAR
            </label>
            <input
              id="cert-date"
              name="issueDate"
              required
              defaultValue={initial?.issueDate ?? "2025"}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cert-order" className={adminLabelClass}>
              SORT ORDER
            </label>
            <input
              id="cert-order"
              name="sortOrder"
              type="number"
              defaultValue={initial?.sortOrder ?? defaultOrder}
              className={adminInputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cert-cred-id" className={adminLabelClass}>
            CREDENTIAL ID (OPTIONAL)
          </label>
          <input
            id="cert-cred-id"
            name="credentialId"
            defaultValue={initial?.credentialId ?? ""}
            placeholder="e.g. KOMDIGI-2025-001"
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cert-url" className={adminLabelClass}>
            VERIFICATION URL (OPTIONAL)
          </label>
          <input
            id="cert-url"
            name="verificationUrl"
            type="url"
            defaultValue={initial?.verificationUrl ?? ""}
            placeholder="https://..."
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="cert-desc" className={adminLabelClass}>
            DESCRIPTION (OPTIONAL)
          </label>
          <textarea
            id="cert-desc"
            name="description"
            defaultValue={initial?.description ?? ""}
            className={adminTextareaClass}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="cert-tags" className={adminLabelClass}>
            TAGS (COMMA SEPARATED)
          </label>
          <input
            id="cert-tags"
            name="tags"
            defaultValue={initial?.tags.join(", ") ?? ""}
            placeholder="QA, Automation, Web"
            className={adminInputClass}
          />
        </div>
      </div>

      <AssetUploadField
        id={`cert-image-${initial?.id ?? "new"}`}
        label="CERTIFICATE DOCUMENT PLATE"
        urlInputName="imageUrl"
        folder="certifications"
        initialUrl={initial?.imageUrl}
      />

      <div className="pt-3 border-t border-[var(--white-15)] flex flex-wrap items-center justify-between gap-4">
        <label
          htmlFor="cert-featured"
          className="inline-flex items-center gap-3 min-h-[44px]"
        >
          <input
            id="cert-featured"
            name="featuredOnHome"
            type="checkbox"
            defaultChecked={initial?.featuredOnHome ?? true}
            className="w-4 h-4 accent-[var(--white-100)]"
          />
          <span className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)]">
            FEATURED IN HOME HONORS &amp; CERTIFICATIONS
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
                ? "UPDATE CREDENTIAL"
                : "CREATE CREDENTIAL"}
          </button>
        </div>
      </div>
    </form>
  );
}
