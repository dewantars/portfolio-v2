"use client";

import { useActionState, useState, useTransition } from "react";
import {
  deleteLanguageAction,
  upsertLanguageAction,
} from "@/lib/actions/admin/cv";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-primitives";
import type { LanguageDTO } from "@/lib/types/portfolio";

export function LanguagesManager({ languages }: { languages: LanguageDTO[] }) {
  const [editing, setEditing] = useState<LanguageDTO | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [isPendingTransition, startTransition] = useTransition();
  const [formState, formAction, isSubmitting] = useActionState(
    upsertLanguageAction,
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
              ? `EDIT LANGUAGE // ${editing.name}`
              : "ADD LANGUAGE PROFICIENCY"}
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
          key={editing?.id ?? "new-lang"}
          action={formAction}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          {editing && <input type="hidden" name="id" value={editing.id} />}

          <div className="flex flex-col gap-2">
            <label htmlFor="lang-name" className={adminLabelClass}>
              LANGUAGE NAME
            </label>
            <input
              id="lang-name"
              name="name"
              required
              defaultValue={editing?.name ?? ""}
              placeholder="e.g. ENGLISH"
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lang-prof" className={adminLabelClass}>
              PROFICIENCY LEVEL
            </label>
            <input
              id="lang-prof"
              name="proficiency"
              required
              defaultValue={editing?.proficiency ?? ""}
              placeholder="e.g. INTERMEDIATE / WORKING PROFICIENCY"
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lang-order" className={adminLabelClass}>
              SORT ORDER
            </label>
            <input
              id="lang-order"
              name="sortOrder"
              type="number"
              defaultValue={editing?.sortOrder ?? languages.length + 1}
              className={adminInputClass}
            />
          </div>

          <div className="md:col-span-3 flex justify-end pt-3 border-t border-[var(--white-15)]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-aerospace disabled:opacity-60"
            >
              {isSubmitting
                ? "SAVING..."
                : editing
                  ? "UPDATE LANGUAGE"
                  : "ADD LANGUAGE"}
            </button>
          </div>
        </form>
      </section>

      <section aria-label="Registered languages">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-3">
          LANGUAGES ({languages.length})
        </div>

        {languages.length === 0 ? (
          <div className="border border-[var(--white-15)] p-8 text-center font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
            NO LANGUAGES CONFIGURED
          </div>
        ) : (
          <div className="border border-[var(--white-15)] divide-y divide-[var(--white-15)] bg-[#000000]">
            {languages.map((item) => (
              <div
                key={item.id}
                className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-display text-lg font-bold tracking-[0.06em] uppercase text-[var(--white-100)]">
                    {item.name}
                  </div>
                  <div className="font-mono-tech text-xs tracking-[0.1em] uppercase text-[var(--white-60)]">
                    {item.proficiency} (ORDER {item.sortOrder})
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(item)}
                    className="min-h-[42px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000]"
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
                            const res = await deleteLanguageAction(item.id);
                            setActionMsg(res);
                            setConfirmDeleteId(null);
                            if (editing?.id === item.id) setEditing(null);
                          })
                        }
                        className="min-h-[42px] px-3.5 border border-[var(--white-100)] bg-[var(--white-100)] text-[#000000] font-mono-tech text-[11px] font-bold tracking-[0.12em] uppercase"
                      >
                        CONFIRM
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="min-h-[42px] px-3 border border-[var(--white-25)] font-mono-tech text-[11px] text-[var(--white-60)]"
                      >
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(item.id)}
                      className="min-h-[42px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-60)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
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
