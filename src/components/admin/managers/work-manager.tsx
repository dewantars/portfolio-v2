"use client";

import { useActionState, useState, useTransition } from "react";
import {
  deleteExperienceAction,
  toggleExperienceFeaturedAction,
  upsertExperienceAction,
} from "@/lib/actions/admin/cv";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import type { ExperienceDTO } from "@/lib/types/portfolio";

export function WorkManager({
  experiences,
}: {
  experiences: ExperienceDTO[];
}) {
  const [editing, setEditing] = useState<ExperienceDTO | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [isPendingTransition, startTransition] = useTransition();
  const [formState, formAction, isSubmitting] = useActionState(
    upsertExperienceAction,
    null
  );

  const bannerState = actionMsg ?? formState;

  return (
    <div className="flex flex-col gap-10">
      <AdminStatusBanner state={bannerState} />

      <section className="border border-[var(--white-15)] bg-[#000000] p-5 md:p-6">
        <div className="pb-4 mb-5 border-b border-[var(--white-15)] flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-80)]">
            {editing
              ? `EDIT EXPERIENCE // ${editing.role}`
              : "ADD WORK EXPERIENCE ENTRY"}
          </span>
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="min-h-[38px] px-3 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-80)]"
            >
              CANCEL EDIT
            </button>
          )}
        </div>

        <form
          key={editing?.id ?? "new-work"}
          action={formAction}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {editing && <input type="hidden" name="id" value={editing.id} />}

          <div className="flex flex-col gap-2">
            <label htmlFor="exp-role" className={adminLabelClass}>
              ROLE / POSITION TITLE
            </label>
            <input
              id="exp-role"
              name="role"
              required
              defaultValue={editing?.role ?? ""}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="exp-org" className={adminLabelClass}>
              ORGANIZATION / COMPANY
            </label>
            <input
              id="exp-org"
              name="organization"
              required
              defaultValue={editing?.organization ?? ""}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="exp-period" className={adminLabelClass}>
              PERIOD
            </label>
            <input
              id="exp-period"
              name="period"
              required
              defaultValue={editing?.period ?? ""}
              placeholder="e.g. Agustus 2026 - Sekarang"
              className={adminInputClass}
            />
          </div>

          <div className="grid grid-cols-[1fr_110px] gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="exp-location" className={adminLabelClass}>
                LOCATION (OPTIONAL)
              </label>
              <input
                id="exp-location"
                name="location"
                defaultValue={editing?.location ?? ""}
                placeholder="Bandung, Indonesia"
                className={adminInputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="exp-order" className={adminLabelClass}>
                SORT ORDER
              </label>
              <input
                id="exp-order"
                name="sortOrder"
                type="number"
                defaultValue={editing?.sortOrder ?? experiences.length + 1}
                className={adminInputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="exp-desc" className={adminLabelClass}>
              RESPONSIBILITIES &amp; IMPACT DESCRIPTION
            </label>
            <textarea
              id="exp-desc"
              name="description"
              required
              defaultValue={editing?.description ?? ""}
              className={adminTextareaClass}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="exp-tags" className={adminLabelClass}>
              SPECIFICATION TAGS (COMMA SEPARATED)
            </label>
            <input
              id="exp-tags"
              name="tags"
              defaultValue={editing?.tags.join(", ") ?? ""}
              placeholder="Design QA, Playwright, Functional Testing"
              className={adminInputClass}
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--white-15)]">
            <label
              htmlFor="exp-featured"
              className="inline-flex items-center gap-3 min-h-[44px]"
            >
              <input
                id="exp-featured"
                name="featuredOnHome"
                type="checkbox"
                defaultChecked={editing?.featuredOnHome ?? true}
                className="w-4 h-4 accent-[var(--white-100)]"
              />
              <span className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)]">
                FEATURED IN HOME OPERATIONAL EXPERIENCE
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-aerospace disabled:opacity-60"
            >
              {isSubmitting
                ? "SAVING..."
                : editing
                  ? "UPDATE EXPERIENCE"
                  : "ADD EXPERIENCE"}
            </button>
          </div>
        </form>
      </section>

      <section aria-label="Work experience records">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-3">
          WORK RECORDS ({experiences.length})
        </div>

        {experiences.length === 0 ? (
          <div className="border border-[var(--white-15)] p-8 text-center font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
            NO WORK EXPERIENCE RECORDS AVAILABLE
          </div>
        ) : (
          <div className="border border-[var(--white-15)] divide-y divide-[var(--white-15)] bg-[#000000]">
            {experiences.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)] mb-1">
                    <span>ORDER {item.sortOrder}</span>
                    <span>{item.period}</span>
                    <span>{item.organization}</span>
                    {item.location && <span>{item.location}</span>}
                    <span className="text-[var(--white-100)]">
                      {item.featuredOnHome ? "[HOME VISIBLE]" : "[CV ONLY]"}
                    </span>
                  </div>
                  <h2 className="font-display m-0 text-xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                    {item.role}
                  </h2>
                  <p className="m-0 mt-1 text-sm text-[var(--white-80)]">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={isPendingTransition}
                    onClick={() =>
                      startTransition(async () => {
                        const res = await toggleExperienceFeaturedAction(
                          item.id,
                          !item.featuredOnHome
                        );
                        setActionMsg(res);
                      })
                    }
                    className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-80)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
                  >
                    {item.featuredOnHome ? "CV ONLY" : "SHOW HOME"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(item)}
                    className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000]"
                  >
                    EDIT
                  </button>
                  {confirmDeleteId === item.id ? (
                    <>
                      <button
                        type="button"
                        disabled={isPendingTransition}
                        onClick={() =>
                          startTransition(async () => {
                            const res = await deleteExperienceAction(item.id);
                            setActionMsg(res);
                            setConfirmDeleteId(null);
                            if (editing?.id === item.id) setEditing(null);
                          })
                        }
                        className="min-h-[44px] px-3.5 border border-[var(--white-100)] bg-[var(--white-100)] text-[#000000] font-mono-tech text-[11px] font-bold tracking-[0.12em] uppercase"
                      >
                        CONFIRM DELETE
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="min-h-[44px] px-3 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-60)]"
                      >
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(item.id)}
                      className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-60)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
                    >
                      DELETE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
