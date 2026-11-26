import { getCertifications } from "@/lib/data/certifications";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { CertificationsManager } from "@/components/admin/managers/certifications-manager";

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div>
      <AdminPageHeader
        code="05 // CERTIFICATIONS"
        title="CREDENTIALS LIST"
        description="Single source of truth for certifications and awards synced across Home Honors, CV Awards, and /certifications."
        actionHref="/admin/certifications/new"
        actionLabel="ADD CREDENTIAL"
      />
      <CertificationsManager certifications={certifications} />
    </div>
  );
}
