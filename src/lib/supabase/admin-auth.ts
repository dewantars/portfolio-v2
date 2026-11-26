import "server-only";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const configured = process.env.ADMIN_EMAIL;
  if (!configured) return false;

  const allowed = configured
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return allowed.includes(email.trim().toLowerCase());
}

export async function getAuthenticatedAdmin(): Promise<User | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !isAllowedAdminEmail(user.email)) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<User> {
  const user = await getAuthenticatedAdmin();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function requireAdminAction(): Promise<User> {
  const user = await getAuthenticatedAdmin();
  if (!user) {
    throw new Error("UNAUTHORIZED: Valid admin session required.");
  }
  return user;
}
