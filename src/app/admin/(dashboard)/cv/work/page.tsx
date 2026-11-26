import { getExperiences } from "@/lib/data/experience";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { WorkManager } from "@/components/admin/managers/work-manager";

export const dynamic = "force-dynamic";

export default async function AdminCvWorkPage() {
  const experiences = await getExperiences();

  return (
    <div>
      <AdminPageHeader
        code="03 // CV DOSSIER"
        title="WORK EXPERIENCE"
        description="Single source of truth for work, internship, and academic assistant experience synced automatically to Home and CV."
      />
      <WorkManager experiences={experiences} />
    </div>
  );
}
