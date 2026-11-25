import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/icons";
import { galleryFeaturedSource, galleryFrames } from "@/lib/data/gallery";
import { GalleryArchive } from "@/components/gallery/gallery-archive";

export const metadata: Metadata = {
  title: "Gallery | Dewanta Rahma Satria",
  description:
    "Visual documentation with a 19:6 primary showcase and multi-ratio 1:1, 1:2, and 2:1 field archive.",
};

export default function GalleryPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20 md:pb-28">
      <SectionLabel index="04">VISUAL DOCUMENTATION &amp; FIELD ARCHIVE</SectionLabel>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-10 lg:mb-14">
        <h1 className="font-display m-0 text-[clamp(36px,6vw,72px)] leading-[0.98] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
          VISUAL ARCHIVE
        </h1>
        <p className="m-0 max-w-[440px] text-base leading-[1.6] text-[var(--white-60)]">
          Primary 19:6 showcase source paired with a multi-ratio 2:1, 1:1, and
          1:2 field archive configured in{" "}
          <span className="font-mono-tech text-[var(--white-80)]">
            src/lib/data/gallery.ts
          </span>
          .
        </p>
      </div>

      <GalleryArchive featured={galleryFeaturedSource} frames={galleryFrames} />
    </main>
  );
}
