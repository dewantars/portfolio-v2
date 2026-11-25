import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/icons";
import { getAchievements } from "@/lib/data/achievements";
import { CertificationsLedger } from "@/components/certifications/certifications-ledger";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certifications | Dewanta Rahma Satria",
  description:
    "Credentials, licenses, academic honors, and verification log for Dewanta Rahma Satria.",
};

export default async function CertificationsPage() {
  const achievements = await getAchievements();

  return (
    <main className="max-w-[1320px] mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20 md:pb-28">
      <SectionLabel index="03">CREDENTIALS &amp; VERIFICATION LOG</SectionLabel>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-10 lg:mb-14">
        <h1 className="font-display m-0 text-[clamp(36px,6vw,72px)] leading-[0.98] tracking-[0.04em] font-bold uppercase text-[var(--white-100)]">
          CERTIFICATIONS &amp; HONORS
        </h1>
        <p className="m-0 max-w-[440px] text-base leading-[1.6] text-[var(--white-60)]">
          Verified certifications, internship recognitions, and academic records
          stored in the portfolio database. Select any record to inspect its
          document plate.
        </p>
      </div>

      <CertificationsLedger achievements={achievements} />
    </main>
  );
}
