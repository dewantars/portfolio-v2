import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getAchievements() {
  return prisma.achievement.findMany({
    orderBy: { order: 'asc' },
  })
}
