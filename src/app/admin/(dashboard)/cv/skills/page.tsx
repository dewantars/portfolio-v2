import { getSkills } from "@/lib/data/skills";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { SkillsManager } from "@/components/admin/managers/skills-manager";

export const dynamic = "force-dynamic";

export default async function AdminCvSkillsPage() {
  const skills = await getSkills();

  return (
    <div>
      <AdminPageHeader
        code="03 // CV DOSSIER"
        title="SKILLS & TECH SPECS"
        description="Manage granular technical skills grouped by category. Automatically synchronized to Home Technical Specifications and CV Skills."
      />
      <SkillsManager skills={skills} />
    </div>
  );
}
