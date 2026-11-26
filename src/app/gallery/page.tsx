import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/icons";
import { getGalleryItems } from "@/lib/data/gallery";
import { getSiteConfig } from "@/lib/data/site-config";
import { GalleryArchive } from "@/components/gallery/gallery-archive";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `Gallery | ${siteConfig.fullName}`,
    description: `Visual documentation and multi-ratio field archive for ${siteConfig.fullName}.`,
  };
}

export default async function GalleryPage() {
  const { featured, frames } = await getGalleryItems();

  return (
    <main className="max-w-[1320px] mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20 md:pb-28">
      <SectionLabel index="04">
        VISUAL DOCUMENTATION &amp; FIELD ARCHIVE
      </SectionLabel>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-10 lg:mb-14">
        <h1 className="font-display m-0 text-[clamp(36px,6vw,72px)] leading-[0.98] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
          VISUAL ARCHIVE
        </h1>
        <p className="m-0 max-w-[440px] text-base leading-[1.6] text-[var(--white-60)]">
          Primary 19:6 showcase paired with a multi-ratio 2:1, 1:1, and 1:2
          field documentation archive managed through Supabase Storage.
        </p>
      </div>

      <GalleryArchive featured={featured} frames={frames} />
    </main>
  );
}
