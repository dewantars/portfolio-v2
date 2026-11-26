import "server-only";
import { prisma } from "@/lib/prisma";
import type { ExperienceDTO } from "@/lib/types/portfolio";

export async function getExperiences(options?: {
  featuredOnly?: boolean;
}): Promise<ExperienceDTO[]> {
  try {
    return await prisma.experience.findMany({
      where: options?.featuredOnly ? { featuredOnHome: true } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch {
    return [];
  }
}
