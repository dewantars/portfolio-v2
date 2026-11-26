import "server-only";
import { prisma } from "@/lib/prisma";
import type { SkillCategoryGroup, SkillItemDTO } from "@/lib/types/portfolio";

export async function getSkills(): Promise<SkillItemDTO[]> {
  try {
    return await prisma.skill.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getSkillGroups(): Promise<SkillCategoryGroup[]> {
  const skills = await getSkills();
  const groupMap = new Map<string, SkillItemDTO[]>();

  for (const skill of skills) {
    const existing = groupMap.get(skill.category);
    if (existing) {
      existing.push(skill);
    } else {
      groupMap.set(skill.category, [skill]);
    }
  }

  return Array.from(groupMap.entries()).map(([category, items]) => ({
    category,
    items,
  }));
}
