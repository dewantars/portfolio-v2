import { getSiteConfig } from "@/lib/data/site-config";
import { AdminPageHeader } from "@/components/admin/admin-primitives";
import { HeroManifestoForm } from "@/components/admin/forms/hero-manifesto-form";

export const dynamic = "force-dynamic";

export default async function AdminHomeHeroPage() {
  const config = await getSiteConfig();

  return (
    <div>
      <AdminPageHeader
        code="02 // HOME PAGE"
        title="HERO & MANIFESTO"
        description="Control Hero copywriting, CTA labels, About manifesto, 4-column discipline matrix, 3D portrait deck cards, and Direct Communications section copy."
      />
      <HeroManifestoForm config={config} />
    </div>
  );
}
