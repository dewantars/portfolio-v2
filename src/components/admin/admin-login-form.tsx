"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAdminAction } from "@/lib/actions/admin/auth";
import { Arrow } from "@/components/ui/icons";

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [state, formAction, isPending] = useActionState(
    signInAdminAction,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={nextPath} />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="admin-email"
          className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-60)]"
        >
          OPERATOR EMAIL
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="operator@domain.com"
          className="w-full min-h-[46px] px-4 bg-[#000000] border border-[var(--white-25)] text-sm text-[var(--white-100)] placeholder:text-[var(--white-50)] focus:border-[var(--white-100)]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="admin-password"
          className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-60)]"
        >
          ACCESS KEY / PASSWORD
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter password"
          className="w-full min-h-[46px] px-4 bg-[#000000] border border-[var(--white-25)] text-sm text-[var(--white-100)] placeholder:text-[var(--white-50)] focus:border-[var(--white-100)]"
        />
      </div>

      {state && !state.ok && (
        <div
          role="alert"
          className="border border-[var(--white-100)] bg-[var(--white-10)] px-4 py-3 font-mono-tech text-xs tracking-[0.1em] uppercase text-[var(--white-100)]"
        >
          FAULT // {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cta-aerospace w-full gap-3 disabled:opacity-60"
      >
        <span>{isPending ? "AUTHENTICATING..." : "INITIATE ADMIN SESSION"}</span>
        <Arrow />
      </button>

      <div className="pt-4 border-t border-[var(--white-15)] flex items-center justify-between gap-4">
        <span className="font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-50)]">
          PUBLIC REGISTRATION DISABLED
        </span>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 min-h-[44px] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)] underline underline-offset-4"
        >
          RETURN TO FLIGHT DECK
        </Link>
      </div>
    </form>
  );
}
