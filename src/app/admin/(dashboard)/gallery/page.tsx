import { getGalleryItems } from "@/lib/data/gallery";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { GalleryManager } from "@/components/admin/managers/gallery-manager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const { allItems } = await getGalleryItems();

  return (
    <div>
      <AdminPageHeader
        code="06 // GALLERY ARCHIVE"
        title="MEDIA ARCHIVE"
        description="Manage documentation frames, aspect ratios, display order, and mounted Supabase Storage assets for /gallery."
        actionHref="/admin/gallery/upload"
        actionLabel="UPLOAD MEDIA"
      />
      <GalleryManager items={allItems} />
    </div>
  );
}
