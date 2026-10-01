import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getSocialLinks() {
  return prisma.socialLink.findMany({
    orderBy: { order: 'asc' },
  })
}
