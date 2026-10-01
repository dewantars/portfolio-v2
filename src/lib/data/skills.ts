import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getSkillGroups() {
  return prisma.skillGroup.findMany({
    orderBy: { order: 'asc' },
  })
}
