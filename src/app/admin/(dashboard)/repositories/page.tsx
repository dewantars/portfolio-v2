import { getRepoConfig } from "@/lib/data/repo-config";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { RepositoriesForm } from "@/components/admin/forms/repositories-form";

export const dynamic = "force-dynamic";

export default async function AdminRepositoriesPage() {
  const config = await getRepoConfig();

  return (
    <div>
      <AdminPageHeader
        code="04 // REPOSITORIES"
        title="GITHUB TELEMETRY CONFIG"
        description="Configure the GitHub source account, repository display limit, pinned priority list, and hidden repository blacklist for /repositories."
      />
      <RepositoriesForm config={config} />
    </div>
  );
}
