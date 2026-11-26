import { getLanguages } from "@/lib/data/languages";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { LanguagesManager } from "@/components/admin/managers/languages-manager";

export const dynamic = "force-dynamic";

export default async function AdminCvLanguagesPage() {
  const languages = await getLanguages();

  return (
    <div>
      <AdminPageHeader
        code="03 // CV DOSSIER"
        title="LANGUAGES"
        description="Manage spoken and written language proficiencies displayed in the CV Dossier."
      />
      <LanguagesManager languages={languages} />
    </div>
  );
}
