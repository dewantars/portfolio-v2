"use client";

import { useActionState } from "react";
import { updateHomeHeroManifestoAction } from "@/lib/actions/admin/site-config";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import { AssetUploadField } from "@/components/admin/asset-upload-field";
import type { SiteConfigDTO } from "@/lib/types/portfolio";

export function HeroManifestoForm({ config }: { config: SiteConfigDTO }) {
  const [state, formAction, isPending] = useActionState(
    updateHomeHeroManifestoAction,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <AdminStatusBanner state={state} />

      {/* Hero Section */}
      <section className="border border-[var(--white-15)] p-5 md:p-6 flex flex-col gap-5">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)]">
          01 // HERO TELEMETRY SECTION
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="heroFlightDeckLabel" className={adminLabelClass}>
              FLIGHT DECK RAIL LABEL
            </label>
            <input
              id="heroFlightDeckLabel"
              name="heroFlightDeckLabel"
              type="text"
              required
              defaultValue={config.heroFlightDeckLabel}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="heroHeadline" className={adminLabelClass}>
              HERO H1 HEADLINE
            </label>
            <input
              id="heroHeadline"
              name="heroHeadline"
              type="text"
              required
              defaultValue={config.heroHeadline}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="heroSubheadline" className={adminLabelClass}>
              HERO SUBHEADLINE COPY
            </label>
            <textarea
              id="heroSubheadline"
              name="heroSubheadline"
              required
              defaultValue={config.heroSubheadline}
              className={adminTextareaClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="heroPrimaryCtaLabel" className={adminLabelClass}>
              PRIMARY CTA LABEL (#PROJECTS)
            </label>
            <input
              id="heroPrimaryCtaLabel"
              name="heroPrimaryCtaLabel"
              type="text"
              required
              defaultValue={config.heroPrimaryCtaLabel}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="heroSecondaryCtaLabel" className={adminLabelClass}>
              SECONDARY CTA LABEL (#CONTACT)
            </label>
            <input
              id="heroSecondaryCtaLabel"
              name="heroSecondaryCtaLabel"
              type="text"
              required
              defaultValue={config.heroSecondaryCtaLabel}
              className={adminInputClass}
            />
          </div>
        </div>

        <AssetUploadField
          id="hero-background"
          label="HERO BACKGROUND IMAGE (LEAVING EMPTY USES PROFILE PHOTO)"
          urlInputName="heroBackgroundUrl"
          folder="hero"
          initialUrl={config.heroBackgroundUrl ?? config.photoUrl}
        />
      </section>

      {/* About / Manifesto Section */}
      <section className="border border-[var(--white-15)] p-5 md:p-6 flex flex-col gap-5">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)]">
          02 // ABOUT &amp; MANIFESTO SECTION
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="aboutTitle" className={adminLabelClass}>
              MANIFESTO HEADLINE
            </label>
            <input
              id="aboutTitle"
              name="aboutTitle"
              type="text"
              required
              defaultValue={config.aboutTitle}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="aboutBody" className={adminLabelClass}>
              MANIFESTO PRIMARY PARAGRAPH
            </label>
            <textarea
              id="aboutBody"
              name="aboutBody"
              required
              defaultValue={config.aboutBody}
              className={adminTextareaClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="aboutSecondaryBody" className={adminLabelClass}>
              MANIFESTO SECONDARY PARAGRAPH
            </label>
            <textarea
              id="aboutSecondaryBody"
              name="aboutSecondaryBody"
              defaultValue={config.aboutSecondaryBody ?? ""}
              className={adminTextareaClass}
            />
          </div>
        </div>

        {/* 4 Discipline Cards */}
        <div className="pt-4 border-t border-[var(--white-15)] flex flex-col gap-4">
          <div className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-60)]">
            DISCIPLINE SPECIFICATION STRIP (4 SLOTS)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((idx) => {
              const disc = config.aboutDisciplines[idx] ?? {
                code: `0${idx + 1}`,
                title: "",
                detail: "",
              };
              return (
                <div
                  key={idx}
                  className="border border-[var(--white-15)] p-4 flex flex-col gap-3"
                >
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={`disc_code_${idx}`}
                        className={adminLabelClass}
                      >
                        CODE
                      </label>
                      <input
                        id={`disc_code_${idx}`}
                        name={`disc_code_${idx}`}
                        defaultValue={disc.code}
                        className={adminInputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={`disc_title_${idx}`}
                        className={adminLabelClass}
                      >
                        TITLE
                      </label>
                      <input
                        id={`disc_title_${idx}`}
                        name={`disc_title_${idx}`}
                        defaultValue={disc.title}
                        className={adminInputClass}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={`disc_detail_${idx}`}
                      className={adminLabelClass}
                    >
                      DETAIL
                    </label>
                    <input
                      id={`disc_detail_${idx}`}
                      name={`disc_detail_${idx}`}
                      defaultValue={disc.detail}
                      className={adminInputClass}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Photo Deck Cards */}
        <div className="pt-4 border-t border-[var(--white-15)] flex flex-col gap-4">
          <div className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-60)]">
            3D STACKED PORTRAIT DECK CARDS (3 SLOTS)
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[0, 1, 2].map((idx) => {
              const card = config.aboutDeckCards[idx] ?? {
                id: `card-0${idx + 1}`,
                code: `0${idx + 1}`,
                year: "2026",
                role: "",
                title: "",
                subtitle: "",
                objectPosition: "object-[center_18%]",
                imageUrl: null,
              };
              return (
                <div
                  key={card.id}
                  className="border border-[var(--white-15)] p-4 flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={`deck_code_${idx}`}
                        className={adminLabelClass}
                      >
                        CODE / YEAR
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          id={`deck_code_${idx}`}
                          name={`deck_code_${idx}`}
                          defaultValue={card.code}
                          className={adminInputClass}
                        />
                        <input
                          id={`deck_year_${idx}`}
                          name={`deck_year_${idx}`}
                          aria-label={`Deck card ${idx + 1} year`}
                          defaultValue={card.year}
                          className={adminInputClass}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={`deck_role_${idx}`}
                        className={adminLabelClass}
                      >
                        AFFILIATION / ROLE
                      </label>
                      <input
                        id={`deck_role_${idx}`}
                        name={`deck_role_${idx}`}
                        defaultValue={card.role}
                        className={adminInputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={`deck_title_${idx}`}
                        className={adminLabelClass}
                      >
                        CARD HEADLINE
                      </label>
                      <input
                        id={`deck_title_${idx}`}
                        name={`deck_title_${idx}`}
                        defaultValue={card.title}
                        className={adminInputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={`deck_subtitle_${idx}`}
                        className={adminLabelClass}
                      >
                        CARD SUBTITLE
                      </label>
                      <input
                        id={`deck_subtitle_${idx}`}
                        name={`deck_subtitle_${idx}`}
                        defaultValue={card.subtitle}
                        className={adminInputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={`deck_pos_${idx}`}
                        className={adminLabelClass}
                      >
                        IMAGE CROP FOCUS
                      </label>
                      <select
                        id={`deck_pos_${idx}`}
                        name={`deck_pos_${idx}`}
                        defaultValue={card.objectPosition}
                        className={adminInputClass}
                      >
                        <option value="object-[center_18%]">Upper Portrait (18%)</option>
                        <option value="object-[center_26%]">Mid-Upper (26%)</option>
                        <option value="object-[center_12%]">Top Focus (12%)</option>
                        <option value="object-center">Center</option>
                        <option value="object-top">Top</option>
                        <option value="object-bottom">Bottom</option>
                      </select>
                    </div>
                  </div>

                  <AssetUploadField
                    id={`deck-image-${idx}`}
                    label={`CARD 0${idx + 1} PHOTO (LEAVING EMPTY USES PROFILE PHOTO)`}
                    urlInputName={`deck_image_${idx}`}
                    folder="about"
                    initialUrl={card.imageUrl ?? config.photoUrl}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section Copy */}
      <section className="border border-[var(--white-15)] p-5 md:p-6 flex flex-col gap-5">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)]">
          03 // DIRECT COMMS SECTION COPY
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contactHeadline" className={adminLabelClass}>
            CONTACT HEADLINE
          </label>
          <input
            id="contactHeadline"
            name="contactHeadline"
            type="text"
            required
            defaultValue={config.contactHeadline}
            className={adminInputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contactBody" className={adminLabelClass}>
            CONTACT DESCRIPTION
          </label>
          <textarea
            id="contactBody"
            name="contactBody"
            required
            defaultValue={config.contactBody}
            className={adminTextareaClass}
          />
        </div>
      </section>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="cta-aerospace disabled:opacity-60"
        >
          {isPending ? "SAVING HOME COPY..." : "SAVE HERO & MANIFESTO"}
        </button>
      </div>
    </form>
  );
}
