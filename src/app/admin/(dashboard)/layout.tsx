import { requireAdminSession } from "@/lib/supabase/admin-auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[#000000] text-[var(--white-100)] flex flex-col lg:flex-row">
      <AdminSidebar adminEmail={user.email ?? "admin"} />
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 w-full max-w-[1160px] mx-auto px-5 py-8 md:px-10 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
