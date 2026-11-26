import { getCertifications } from "@/lib/data/certifications";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { CertificationForm } from "@/components/admin/forms/certification-form";

export const dynamic = "force-dynamic";

export default async function AdminNewCertificationPage() {
  const existing = await getCertifications();

  return (
    <div>
      <AdminPageHeader
        code="05 // CERTIFICATIONS"
        title="ADD CREDENTIAL"
        description="Register a new certificate or award and upload its document image (JPG, PNG, WEBP up to 5MB) to Supabase Storage portfolio-assets."
      />
      <div className="border border-[var(--white-15)] bg-[#000000] p-5 md:p-8">
        <CertificationForm
          defaultOrder={existing.length + 1}
          redirectOnCreateTo="/admin/certifications"
        />
      </div>
    </div>
  );
}
