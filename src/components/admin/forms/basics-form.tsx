"use client";

import { useActionState } from "react";
import { updateBasicsProfileAction } from "@/lib/actions/admin/site-config";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import { AssetUploadField } from "@/components/admin/asset-upload-field";
import type { SiteConfigDTO } from "@/lib/types/portfolio";

export function BasicsForm({ config }: { config: SiteConfigDTO }) {
  const [state, formAction, isPending] = useActionState(
    updateBasicsProfileAction,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <AdminStatusBanner state={state} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className={adminLabelClass}>
            FULL NAME
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            defaultValue={config.fullName}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="roleEyebrow" className={adminLabelClass}>
            ROLE EYEBROW LABEL
          </label>
          <input
            id="roleEyebrow"
            name="roleEyebrow"
            type="text"
            required
            defaultValue={config.roleEyebrow}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="headline" className={adminLabelClass}>
            PRIMARY HEADLINE SPECIFICATION
          </label>
          <input
            id="headline"
            name="headline"
            type="text"
            required
            defaultValue={config.headline}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="bioSummary" className={adminLabelClass}>
            SHORT BIO / DOSSIER SUMMARY
          </label>
          <textarea
            id="bioSummary"
            name="bioSummary"
            required
            defaultValue={config.bioSummary}
            className={adminTextareaClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="location" className={adminLabelClass}>
            BASE LOCATION
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            defaultValue={config.location}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={adminLabelClass}>
            DIRECT EMAIL ADDRESS
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={config.email}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="availabilityStatus" className={adminLabelClass}>
            AVAILABILITY STATUS
          </label>
          <input
            id="availabilityStatus"
            name="availabilityStatus"
            type="text"
            required
            defaultValue={config.availabilityStatus}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="documentRef" className={adminLabelClass}>
            CV DOCUMENT REF CODE
          </label>
          <input
            id="documentRef"
            name="documentRef"
            type="text"
            required
            defaultValue={config.documentRef}
            className={adminInputClass}
          />
        </div>
      </div>

      <AssetUploadField
        id="profile-photo"
        label="PROFILE PORTRAIT ASSET"
        urlInputName="photoUrl"
        folder="profile"
        initialUrl={state?.data?.photoUrl ?? config.photoUrl}
        required
      />

      <div className="border-t border-[var(--white-15)] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="githubUsername" className={adminLabelClass}>
            GITHUB USERNAME
          </label>
          <input
            id="githubUsername"
            name="githubUsername"
            type="text"
            required
            defaultValue={config.githubUsername}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="githubUrl" className={adminLabelClass}>
            GITHUB PROFILE URL
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            required
            defaultValue={config.githubUrl}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="linkedinUrl" className={adminLabelClass}>
            LINKEDIN URL
          </label>
          <input
            id="linkedinUrl"
            name="linkedinUrl"
            type="url"
            required
            defaultValue={config.linkedinUrl}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="instagramUrl" className={adminLabelClass}>
            INSTAGRAM URL (OPTIONAL)
          </label>
          <input
            id="instagramUrl"
            name="instagramUrl"
            type="url"
            defaultValue={config.instagramUrl ?? ""}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="cvPdfUrl" className={adminLabelClass}>
            STATIC CV PDF URL (OPTIONAL)
          </label>
          <input
            id="cvPdfUrl"
            name="cvPdfUrl"
            type="text"
            defaultValue={config.cvPdfUrl ?? ""}
            className={adminInputClass}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--white-15)] flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="cta-aerospace disabled:opacity-60"
        >
          {isPending ? "SAVING BASICS..." : "SAVE BASICS & PROFILE"}
        </button>
      </div>
    </form>
  );
}
