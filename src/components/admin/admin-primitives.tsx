import Link from "next/link";
import type { ActionResult } from "@/lib/actions/admin/shared";

export function AdminPageHeader({
  code,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  code: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="pb-6 mb-8 border-b border-[var(--white-15)] flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-2">
          {code}
        </div>
        <h1 className="font-display m-0 text-3xl md:text-4xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
          {title}
        </h1>
        <p className="m-0 mt-2 max-w-[680px] text-sm leading-[1.6] text-[var(--white-60)]">
          {description}
        </p>
      </div>

      {actionHref && actionLabel && (
        <Link href={actionHref} className="cta-aerospace shrink-0">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function AdminStatusBanner({
  state,
}: {
  state: Pick<ActionResult, "ok" | "message"> | null;
}) {
  if (!state) return null;

  return (
    <div
      role={state.ok ? "status" : "alert"}
      aria-live="polite"
      className={`border px-4 py-3 font-mono-tech text-xs tracking-[0.12em] uppercase ${
        state.ok
          ? "border-[var(--white-60)] bg-[var(--white-10)] text-[var(--white-100)]"
          : "border-[var(--white-100)] bg-[#000000] text-[var(--white-100)]"
      }`}
    >
      {state.ok ? "SYNC // " : "FAULT // "}
      {state.message}
    </div>
  );
}

export const adminInputClass =
  "w-full min-h-[44px] px-3.5 bg-[#000000] border border-[var(--white-25)] text-sm text-[var(--white-100)] placeholder:text-[var(--white-50)] focus:border-[var(--white-100)]";

export const adminTextareaClass =
  "w-full min-h-[104px] p-3.5 bg-[#000000] border border-[var(--white-25)] text-sm text-[var(--white-100)] placeholder:text-[var(--white-50)] focus:border-[var(--white-100)]";

export const adminLabelClass =
  "font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-60)]";
