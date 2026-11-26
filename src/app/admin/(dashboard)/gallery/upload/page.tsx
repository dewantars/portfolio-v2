import { getGalleryItems } from "@/lib/data/gallery";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { GalleryUploadForm } from "@/components/admin/forms/gallery-upload-form";

export const dynamic = "force-dynamic";

export default async function AdminGalleryUploadPage() {
  const { allItems } = await getGalleryItems();

  return (
    <div>
      <AdminPageHeader
        code="06 // GALLERY ARCHIVE"
        title="UPLOAD MEDIA"
        description="Upload a field documentation image (JPG, PNG, WEBP up to 5MB) to Supabase Storage portfolio-assets and publish it to /gallery."
      />
      <div className="border border-[var(--white-15)] bg-[#000000] p-5 md:p-8">
        <GalleryUploadForm
          defaultOrder={allItems.length + 1}
          redirectOnCreateTo="/admin/gallery"
        />
      </div>
    </div>
  );
}
