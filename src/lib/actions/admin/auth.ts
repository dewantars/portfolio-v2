"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAllowedAdminEmail } from "@/lib/supabase/admin-auth";
import type { ActionResult } from "@/lib/actions/admin/shared";

export async function signInAdminAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "/admin").trim();
  const safeNext =
    nextRaw.startsWith("/admin") && !nextRaw.startsWith("/admin/login")
      ? nextRaw
      : "/admin";

  if (!email || !password) {
    return { ok: false, message: "EMAIL AND PASSWORD ARE REQUIRED." };
  }

  if (!isAllowedAdminEmail(email)) {
    return {
      ok: false,
      message: "ACCESS DENIED: EMAIL NOT AUTHORIZED FOR ADMIN CONSOLE.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return {
      ok: false,
      message: error?.message.toUpperCase() || "INVALID CREDENTIALS.",
    };
  }

  if (!isAllowedAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    return {
      ok: false,
      message: "ACCESS DENIED: ACCOUNT LACKS ADMIN CLEARANCE.",
    };
  }

  redirect(safeNext);
}

export async function signOutAdminAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
