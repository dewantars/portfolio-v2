"use client";

import { useActionState } from "react";
import { updateNavigationFooterAction } from "@/lib/actions/admin/site-config";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import type { SiteConfigDTO } from "@/lib/types/portfolio";

export function NavigationForm({ config }: { config: SiteConfigDTO }) {
  const [state, formAction, isPending] = useActionState(
    updateNavigationFooterAction,
    null
  );

  const navRoutes = [
    { key: "home", label: "HOME (/)", checked: config.navVisibility.home },
    { key: "cv", label: "CV (/cv)", checked: config.navVisibility.cv },
    {
      key: "repositories",
      label: "REPOSITORIES (/repositories)",
      checked: config.navVisibility.repositories,
    },
    {
      key: "certifications",
      label: "CERTIFICATIONS (/certifications)",
      checked: config.navVisibility.certifications,
    },
    {
      key: "gallery",
      label: "GALLERY (/gallery)",
      checked: config.navVisibility.gallery,
    },
  ];

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <AdminStatusBanner state={state} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="navBrandLabel" className={adminLabelClass}>
            NAVBAR BRAND WORDMARK
          </label>
          <input
            id="navBrandLabel"
            name="navBrandLabel"
            type="text"
            required
            defaultValue={config.navBrandLabel}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="footerCopyright" className={adminLabelClass}>
            FOOTER COPYRIGHT STRING
          </label>
          <input
            id="footerCopyright"
            name="footerCopyright"
            type="text"
            required
            defaultValue={config.footerCopyright}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="navCtaLabel" className={adminLabelClass}>
            NAVBAR CTA LABEL
          </label>
          <input
            id="navCtaLabel"
            name="navCtaLabel"
            type="text"
            required
            defaultValue={config.navCtaLabel}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="navCtaHref" className={adminLabelClass}>
            NAVBAR CTA DESTINATION
          </label>
          <input
            id="navCtaHref"
            name="navCtaHref"
            type="text"
            required
            defaultValue={config.navCtaHref}
            className={adminInputClass}
          />
        </div>
      </div>

      {/* Menu Visibility Toggles */}
      <fieldset className="border border-[var(--white-15)] p-5 flex flex-col gap-4">
        <legend className={`${adminLabelClass} px-2`}>
          PUBLIC NAVBAR ROUTE VISIBILITY
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {navRoutes.map((route) => (
            <label
              key={route.key}
              htmlFor={`vis_${route.key}`}
              className="min-h-[46px] px-4 border border-[var(--white-15)] bg-[#000000] hover:border-[var(--white-60)] flex items-center justify-between gap-3"
            >
              <span className="font-mono-tech text-xs tracking-[0.1em] uppercase text-[var(--white-80)]">
                {route.label}
              </span>
              <input
                id={`vis_${route.key}`}
                name={`vis_${route.key}`}
                type="checkbox"
                defaultChecked={route.checked}
                className="w-4 h-4 accent-[var(--white-100)]"
              />
            </label>
          ))}
        </div>
      </fieldset>

      {/* SEO Metadata */}
      <div className="border-t border-[var(--white-15)] pt-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="seoTitle" className={adminLabelClass}>
            ROOT SEO TITLE
          </label>
          <input
            id="seoTitle"
            name="seoTitle"
            type="text"
            required
            defaultValue={config.seoTitle}
            className={adminInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="seoDescription" className={adminLabelClass}>
            ROOT SEO META DESCRIPTION
          </label>
          <textarea
            id="seoDescription"
            name="seoDescription"
            required
            defaultValue={config.seoDescription}
            className={adminTextareaClass}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--white-15)] flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="cta-aerospace disabled:opacity-60"
        >
          {isPending ? "SAVING NAVIGATION..." : "SAVE NAVIGATION & FOOTER"}
        </button>
      </div>
    </form>
  );
}
