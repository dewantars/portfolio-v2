import "server-only";
import { prisma } from "@/lib/prisma";
import type { GalleryItemDTO } from "@/lib/types/portfolio";

export interface GalleryOverviewData {
  featured: GalleryItemDTO | null;
  frames: GalleryItemDTO[];
  allItems: GalleryItemDTO[];
}

export async function getGalleryItems(): Promise<GalleryOverviewData> {
  try {
    const allItems = await prisma.galleryItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    const featured =
      allItems.find((item) => item.isFeatured) ?? null;
    const frames = allItems.filter((item) => !item.isFeatured);

    return { featured, frames, allItems };
  } catch {
    return { featured: null, frames: [], allItems: [] };
  }
}
