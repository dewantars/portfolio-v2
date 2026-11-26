import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/supabase/admin-auth";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Access | Portfolio Command CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const admin = await getAuthenticatedAdmin();
  if (admin) {
    redirect("/admin");
  }

  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/admin") ? params.next : "/admin";

  return (
    <main className="min-h-screen bg-[#000000] text-[var(--white-100)] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[480px] border border-[var(--white-15)] bg-[#000000]">
        <div className="px-6 py-4 border-b border-[var(--white-15)] bg-[var(--gray-60)] flex items-center justify-between gap-4">
          <span className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-80)]">
            SYS // ADMIN AUTHENTICATION
          </span>
          <span className="font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[var(--white-50)]">
            RESTRICTED
          </span>
        </div>

        <div className="p-6 md:p-8">
          <h1 className="font-display m-0 mb-2 text-3xl md:text-4xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
            COMMAND CONSOLE
          </h1>
          <p className="m-0 mb-7 text-sm leading-[1.6] text-[var(--white-60)]">
            Authenticate with your authorized Supabase administrator account to
            manage portfolio telemetry, media assets, and CV dossiers.
          </p>

          <AdminLoginForm nextPath={nextPath} />
        </div>
      </div>
    </main>
  );
}
