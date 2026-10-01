import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getExperiences() {
  return prisma.experience.findMany({
    orderBy: { order: 'asc' },
  })
}
