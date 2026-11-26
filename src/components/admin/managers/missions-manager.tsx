"use client";

import { useActionState, useState, useTransition } from "react";
import {
  deleteProjectAction,
  toggleProjectFeaturedAction,
  upsertProjectAction,
} from "@/lib/actions/admin/projects";
import {
  AdminStatusBanner,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/admin-primitives";
import type { ProjectDTO } from "@/lib/types/portfolio";

export function MissionsManager({ projects }: { projects: ProjectDTO[] }) {
  const [editing, setEditing] = useState<ProjectDTO | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [isPendingTransition, startTransition] = useTransition();
  const [formState, formAction, isSubmitting] = useActionState(
    upsertProjectAction,
    null
  );

  const handleToggleFeatured = (item: ProjectDTO) => {
    startTransition(async () => {
      const res = await toggleProjectFeaturedAction(
        item.id,
        !item.featuredOnHome
      );
      setActionMsg(res);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteProjectAction(id);
      setActionMsg(res);
      setConfirmDeleteId(null);
      if (editing?.id === id) setEditing(null);
    });
  };

  const bannerState = actionMsg ?? formState;

  return (
    <div className="flex flex-col gap-10">
      <AdminStatusBanner state={bannerState} />

      {/* Editor Form */}
      <section className="border border-[var(--white-15)] bg-[#000000] p-5 md:p-6">
        <div className="pb-4 mb-5 border-b border-[var(--white-15)] flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-80)]">
            {editing
              ? `EDIT MISSION // ${editing.missionCode} ${editing.title}`
              : "REGISTER NEW MISSION"}
          </span>
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="min-h-[38px] px-3 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)]"
            >
              CANCEL EDIT
            </button>
          )}
        </div>

        <form
          key={editing?.id ?? "new-mission"}
          action={formAction}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {editing && <input type="hidden" name="id" value={editing.id} />}

          <div className="flex flex-col gap-2">
            <label htmlFor="mission-title" className={adminLabelClass}>
              MISSION TITLE
            </label>
            <input
              id="mission-title"
              name="title"
              required
              defaultValue={editing?.title ?? ""}
              placeholder="e.g. MyDigiLearn"
              className={adminInputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="mission-code" className={adminLabelClass}>
                MISSION CODE
              </label>
              <input
                id="mission-code"
                name="missionCode"
                required
                defaultValue={
                  editing?.missionCode ??
                  String(projects.length + 1).padStart(2, "0")
                }
                className={adminInputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mission-order" className={adminLabelClass}>
                SORT ORDER
              </label>
              <input
                id="mission-order"
                name="sortOrder"
                type="number"
                defaultValue={editing?.sortOrder ?? projects.length + 1}
                className={adminInputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mission-role" className={adminLabelClass}>
              ASSIGNED ROLE
            </label>
            <input
              id="mission-role"
              name="role"
              required
              defaultValue={editing?.role ?? ""}
              placeholder="e.g. QA Engineer Intern"
              className={adminInputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="mission-status" className={adminLabelClass}>
                STATUS LABEL
              </label>
              <input
                id="mission-status"
                name="statusLabel"
                defaultValue={editing?.statusLabel ?? "INTERNAL // CONFIDENTIAL"}
                className={adminInputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mission-layout" className={adminLabelClass}>
                LAYOUT CLASS
              </label>
              <select
                id="mission-layout"
                name="layoutType"
                defaultValue={editing?.layoutType ?? "standard"}
                className={adminInputClass}
              >
                <option value="standard">standard</option>
                <option value="featured">featured</option>
                <option value="wide">wide</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="mission-summary" className={adminLabelClass}>
              MISSION SUMMARY
            </label>
            <textarea
              id="mission-summary"
              name="summary"
              required
              defaultValue={editing?.summary ?? ""}
              className={adminTextareaClass}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="mission-arch" className={adminLabelClass}>
              ARCHITECTURE &amp; QA DETAIL (DOSSIER MODAL)
            </label>
            <textarea
              id="mission-arch"
              name="architectureDetail"
              defaultValue={editing?.architectureDetail ?? ""}
              className={adminTextareaClass}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="mission-stack" className={adminLabelClass}>
              TECH STACK (COMMA SEPARATED)
            </label>
            <input
              id="mission-stack"
              name="techStack"
              defaultValue={editing?.techStack.join(", ") ?? ""}
              placeholder="Next.js, TypeScript, Playwright, PostgreSQL"
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mission-github" className={adminLabelClass}>
              GITHUB REPOSITORY URL (OPTIONAL)
            </label>
            <input
              id="mission-github"
              name="githubUrl"
              type="url"
              defaultValue={editing?.githubUrl ?? ""}
              className={adminInputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mission-live" className={adminLabelClass}>
              LIVE DEPLOYMENT URL (OPTIONAL)
            </label>
            <input
              id="mission-live"
              name="liveUrl"
              type="url"
              defaultValue={editing?.liveUrl ?? ""}
              className={adminInputClass}
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--white-15)]">
            <label
              htmlFor="mission-featured"
              className="inline-flex items-center gap-3 min-h-[44px]"
            >
              <input
                id="mission-featured"
                name="featuredOnHome"
                type="checkbox"
                defaultChecked={editing?.featuredOnHome ?? true}
                className="w-4 h-4 accent-[var(--white-100)]"
              />
              <span className="font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-80)]">
                SHOW IN HOME MISSION SHOWCASE
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
                  ? "UPDATE MISSION"
                  : "CREATE MISSION"}
            </button>
          </div>
        </form>
      </section>

      {/* Existing Missions Table */}
      <section aria-label="Registered missions">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-3">
          LOGGED MISSIONS ({projects.length})
        </div>

        {projects.length === 0 ? (
          <div className="border border-[var(--white-15)] p-8 text-center font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
            NO MISSIONS CURRENTLY LOGGED
          </div>
        ) : (
          <div className="border border-[var(--white-15)] divide-y divide-[var(--white-15)] bg-[#000000]">
            {projects.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)] mb-1">
                    <span>MISSION // {item.missionCode}</span>
                    <span>ORDER {item.sortOrder}</span>
                    <span>{item.role}</span>
                    <span className="text-[var(--white-100)]">
                      {item.featuredOnHome ? "[HOME VISIBLE]" : "[HIDDEN ON HOME]"}
                    </span>
                  </div>
                  <h2 className="font-display m-0 text-xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                    {item.title}
                  </h2>
                  <p className="m-0 mt-1 text-xs font-mono-tech text-[var(--white-60)] break-words">
                    {item.techStack.join(" / ")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={isPendingTransition}
                    onClick={() => handleToggleFeatured(item)}
                    className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-80)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
                  >
                    {item.featuredOnHome ? "HIDE HOME" : "SHOW HOME"}
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
                        onClick={() => handleDelete(item.id)}
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
