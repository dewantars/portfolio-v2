import { getSiteConfig } from "@/lib/data/site-config";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { NavigationForm } from "@/components/admin/forms/navigation-form";

export const dynamic = "force-dynamic";

export default async function AdminGlobalNavigationPage() {
  const config = await getSiteConfig();

  return (
    <div>
      <AdminPageHeader
        code="01 // GLOBAL & IDENTITY"
        title="NAVBAR & FOOTER"
        description="Manage top navigation wordmark, public route visibility toggles, footer copyright notice, and global SEO metadata."
      />
      <NavigationForm config={config} />
    </div>
  );
}
