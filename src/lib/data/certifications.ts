import "server-only";
import { prisma } from "@/lib/prisma";
import type { CertificationDTO } from "@/lib/types/portfolio";

export async function getCertifications(options?: {
  featuredOnly?: boolean;
}): Promise<CertificationDTO[]> {
  try {
    return await prisma.certification.findMany({
      where: options?.featuredOnly ? { featuredOnHome: true } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch {
    return [];
  }
}
