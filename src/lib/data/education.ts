import "server-only";
import { prisma } from "@/lib/prisma";
import type { EducationDTO } from "@/lib/types/portfolio";

export async function getEducations(): Promise<EducationDTO[]> {
  try {
    return await prisma.education.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch {
    return [];
  }
}
