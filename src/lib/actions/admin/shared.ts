import "server-only";
import { revalidatePath } from "next/cache";

export interface ActionResult<T = undefined> {
  ok: boolean;
  message: string;
  data?: T;
}

export function slugify(input: string): string {
  const clean = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return clean || `item-${Date.now()}`;
}

export function parseCommaOrLineList(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getStringField(
  formData: FormData,
  key: string,
  fallback = ""
): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : fallback;
}

export function getOptionalStringField(
  formData: FormData,
  key: string
): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getIntField(
  formData: FormData,
  key: string,
  fallback = 0
): number {
  const value = formData.get(key);
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getBoolField(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "true" || value === "on" || value === "1";
}

export function revalidatePortfolioAll() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/repositories");
  revalidatePath("/certifications");
  revalidatePath("/gallery");
  revalidatePath("/admin", "layout");
}
