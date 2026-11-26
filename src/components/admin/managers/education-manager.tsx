"use client";

import { useActionState, useState, useTransition } from "react";
import {
  deleteEducationAction,
  upsertEducationAction,
} from "@/lib/actions/admin/cv";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import type { EducationDTO } from "@/lib/types/portfolio";

export function EducationManager({
  educations,
}: {
  educations: EducationDTO[];
}) {
  const [editing, setEditing] = useState<EducationDTO | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [isPendingTransition, startTransition] = useTransition();
  const [formState, formAction, isSubmitting] = useActionState(
    upsertEducationAction,
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
              ? `EDIT EDUCATION // ${editing.institution}`
              : "ADD EDUCATION ENTRY"}
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
          key={editing?.id ?? "new-edu"}
          action={formAction}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {editing && <input type="hidden" name="id" value={editing.id} />}

          <div className="flex flex-col gap-2">
            <label htmlFor="edu-inst" className={adminLabelClass}>
              INSTITUTION NAME
            </label>
            <input
              id="edu-inst"
              name="institution"
              required
              defaultValue={editing?.institution ?? ""}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edu-degree" className={adminLabelClass}>
              DEGREE / PROGRAM
            </label>
            <input
              id="edu-degree"
              name="degree"
              required
              defaultValue={editing?.degree ?? ""}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edu-field" className={adminLabelClass}>
              FIELD OF STUDY
            </label>
            <input
              id="edu-field"
              name="fieldOfStudy"
              required
              defaultValue={editing?.fieldOfStudy ?? ""}
              className={adminInputClass}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="edu-period" className={adminLabelClass}>
                PERIOD
              </label>
              <input
                id="edu-period"
                name="period"
                required
                defaultValue={editing?.period ?? ""}
                className={adminInputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edu-metric" className={adminLabelClass}>
                METRIC (GPA)
              </label>
              <input
                id="edu-metric"
                name="metric"
                defaultValue={editing?.metric ?? ""}
                placeholder="GPA 3.76"
                className={adminInputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edu-order" className={adminLabelClass}>
                ORDER
              </label>
              <input
                id="edu-order"
                name="sortOrder"
                type="number"
                defaultValue={editing?.sortOrder ?? educations.length + 1}
                className={adminInputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="edu-desc" className={adminLabelClass}>
              COURSEWORK &amp; FOCUS DESCRIPTION
            </label>
            <textarea
              id="edu-desc"
              name="description"
              required
              defaultValue={editing?.description ?? ""}
              className={adminTextareaClass}
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-3 border-t border-[var(--white-15)]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-aerospace disabled:opacity-60"
            >
              {isSubmitting
                ? "SAVING..."
                : editing
                  ? "UPDATE EDUCATION"
                  : "ADD EDUCATION"}
            </button>
          </div>
        </form>
      </section>

      <section aria-label="Education records">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-3">
          EDUCATION RECORDS ({educations.length})
        </div>

        {educations.length === 0 ? (
          <div className="border border-[var(--white-15)] p-8 text-center font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
            NO EDUCATION RECORDS LOGGED
          </div>
        ) : (
          <div className="border border-[var(--white-15)] divide-y divide-[var(--white-15)] bg-[#000000]">
            {educations.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)] mb-1">
                    <span>ORDER {item.sortOrder}</span>
                    <span>{item.period}</span>
                    {item.metric && (
                      <span className="text-[var(--white-100)]">
                        {item.metric}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display m-0 text-xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                    {item.institution}
                  </h2>
                  <p className="font-mono-tech m-0 mt-1 text-xs uppercase text-[var(--white-80)]">
                    {item.degree} ({item.fieldOfStudy})
                  </p>
                  <p className="m-0 mt-2 text-sm text-[var(--white-60)]">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
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
                            const res = await deleteEducationAction(item.id);
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
