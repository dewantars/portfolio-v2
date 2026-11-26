import { getProjects } from "@/lib/data/projects";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { MissionsManager } from "@/components/admin/managers/missions-manager";

export const dynamic = "force-dynamic";

export default async function AdminHomeMissionsPage() {
  const projects = await getProjects();

  return (
    <div>
      <AdminPageHeader
        code="02 // HOME PAGE"
        title="MISSION SHOWCASE"
        description="Create, edit, reorder, and toggle Home visibility for engineering and QA mission entries."
      />
      <MissionsManager projects={projects} />
    </div>
  );
}
