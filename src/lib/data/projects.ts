import "server-only";
import { prisma } from "@/lib/prisma";
import type { ProjectDTO } from "@/lib/types/portfolio";

export async function getProjects(options?: {
  featuredOnly?: boolean;
}): Promise<ProjectDTO[]> {
  try {
    return await prisma.project.findMany({
      where: options?.featuredOnly ? { featuredOnHome: true } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch {
    return [];
  }
}
