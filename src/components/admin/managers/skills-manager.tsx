"use client";

import { useActionState, useState, useTransition } from "react";
import {
  deleteSkillAction,
  upsertSkillAction,
} from "@/lib/actions/admin/cv";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-primitives";
import type { SkillItemDTO } from "@/lib/types/portfolio";

export function SkillsManager({ skills }: { skills: SkillItemDTO[] }) {
  const [editing, setEditing] = useState<SkillItemDTO | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [isPendingTransition, startTransition] = useTransition();
  const [formState, formAction, isSubmitting] = useActionState(
    upsertSkillAction,
    null
  );

  const bannerState = actionMsg ?? formState;

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="flex flex-col gap-10">
      <AdminStatusBanner state={bannerState} />

      <section className="border border-[var(--white-15)] bg-[#000000] p-5 md:p-6">
        <div className="pb-4 mb-5 border-b border-[var(--white-15)] flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-80)]">
            {editing
              ? `EDIT SKILL // ${editing.name}`
              : "ADD TECHNICAL SKILL SPEC"}
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
          key={editing?.id ?? "new-skill"}
          action={formAction}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          {editing && <input type="hidden" name="id" value={editing.id} />}

          <div className="flex flex-col gap-2">
            <label htmlFor="skill-category" className={adminLabelClass}>
              CATEGORY
            </label>
            <input
              id="skill-category"
              name="category"
              list="skill-category-options"
              required
              defaultValue={editing?.category ?? "Frontend"}
              className={adminInputClass}
            />
            <datalist id="skill-category-options">
              {categories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="skill-name" className={adminLabelClass}>
              SKILL NAME
            </label>
            <input
              id="skill-name"
              name="name"
              required
              defaultValue={editing?.name ?? ""}
              placeholder="e.g. Playwright"
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="skill-spec" className={adminLabelClass}>
              SPECIFICATION NOTE (OPTIONAL)
            </label>
            <input
              id="skill-spec"
              name="specification"
              defaultValue={editing?.specification ?? ""}
              placeholder="e.g. E2E Automation"
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="skill-order" className={adminLabelClass}>
              SORT ORDER
            </label>
            <input
              id="skill-order"
              name="sortOrder"
              type="number"
              defaultValue={editing?.sortOrder ?? skills.length + 1}
              className={adminInputClass}
            />
          </div>

          <div className="md:col-span-4 flex justify-end pt-3 border-t border-[var(--white-15)]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-aerospace disabled:opacity-60"
            >
              {isSubmitting
                ? "SAVING..."
                : editing
                  ? "UPDATE SKILL"
                  : "ADD SKILL"}
            </button>
          </div>
        </form>
      </section>

      <section aria-label="Technical skills by category">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-3">
          REGISTERED SKILLS ({skills.length})
        </div>

        {skills.length === 0 ? (
          <div className="border border-[var(--white-15)] p-8 text-center font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
            NO TECHNICAL SPECIFICATIONS LOGGED
          </div>
        ) : (
          <div className="border border-[var(--white-15)] divide-y divide-[var(--white-15)] bg-[#000000]">
            {skills.map((item) => (
              <div
                key={item.id}
                className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex flex-wrap items-center gap-3 min-w-0">
                  <span className="font-mono-tech text-[11px] tracking-[0.12em] text-[var(--white-50)] w-10">
                    #{String(item.sortOrder).padStart(2, "0")}
                  </span>
                  <span className="px-2.5 py-1 border border-[var(--white-25)] font-mono-tech text-[10px] tracking-[0.12em] uppercase text-[var(--white-80)]">
                    {item.category}
                  </span>
                  <span className="font-display text-base font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                    {item.name}
                  </span>
                  {item.specification && (
                    <span className="font-mono-tech text-xs text-[var(--white-60)]">
                      ({item.specification})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditing(item)}
                    className="min-h-[40px] px-3 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000]"
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
                            const res = await deleteSkillAction(item.id);
                            setActionMsg(res);
                            setConfirmDeleteId(null);
                            if (editing?.id === item.id) setEditing(null);
                          })
                        }
                        className="min-h-[40px] px-3 border border-[var(--white-100)] bg-[var(--white-100)] text-[#000000] font-mono-tech text-[11px] font-bold tracking-[0.12em] uppercase"
                      >
                        CONFIRM
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="min-h-[40px] px-2.5 border border-[var(--white-25)] font-mono-tech text-[11px] text-[var(--white-60)]"
                      >
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(item.id)}
                      className="min-h-[40px] px-3 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-60)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
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
