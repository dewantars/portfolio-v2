import "server-only";
import { prisma } from "@/lib/prisma";
import type { LanguageDTO } from "@/lib/types/portfolio";

export async function getLanguages(): Promise<LanguageDTO[]> {
  try {
    return await prisma.language.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch {
    return [];
  }
}
