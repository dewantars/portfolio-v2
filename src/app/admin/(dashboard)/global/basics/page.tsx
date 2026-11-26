import { getSiteConfig } from "@/lib/data/site-config";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { BasicsForm } from "@/components/admin/forms/basics-form";

export const dynamic = "force-dynamic";

export default async function AdminGlobalBasicsPage() {
  const config = await getSiteConfig();

  return (
    <div>
      <AdminPageHeader
        code="01 // GLOBAL & IDENTITY"
        title="BASICS & PROFILE"
        description="Single source of truth for identity, portrait asset, availability, CV Basics metadata, and Direct Communications channels across Home, CV, and Footer."
      />
      <BasicsForm config={config} />
    </div>
  );
}
