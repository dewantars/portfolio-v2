import { getEducations } from "@/lib/data/education";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { EducationManager } from "@/components/admin/managers/education-manager";

export const dynamic = "force-dynamic";

export default async function AdminCvEducationPage() {
  const educations = await getEducations();

  return (
    <div>
      <AdminPageHeader
        code="03 // CV DOSSIER"
        title="EDUCATION"
        description="Manage formal education institutions, degree programs, GPA metrics, and coursework focus displayed on /cv."
      />
      <EducationManager educations={educations} />
    </div>
  );
}
