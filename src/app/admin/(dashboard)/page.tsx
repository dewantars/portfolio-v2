import Link from "next/link";
import { getAdminTelemetryStats } from "@/lib/data/admin-telemetry";
import { signOutAdminAction } from "@/lib/actions/admin/auth";
import { Arrow } from "@/components/ui/icons";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const stats = await getAdminTelemetryStats();

  const publicRoutes = [
    { label: "HOME", href: "/", note: "Hero, Manifesto, Featured Missions, Specs" },
    { label: "CV DOSSIER", href: "/cv", note: "Basics, Work, Education, Awards, Skills" },
    { label: "REPOSITORIES", href: "/repositories", note: `GitHub @${stats.githubUsername}` },
    { label: "CERTIFICATIONS", href: "/certifications", note: `${stats.counts.certifications} Logged Credentials` },
    { label: "GALLERY", href: "/gallery", note: `${stats.counts.mountedGalleryItems}/${stats.counts.galleryItems} Mounted` },
  ];

  const telemetryCards = [
    {
      code: "01 // MISSIONS",
      label: "PROJECTS",
      value: `${stats.counts.projects}`,
      sub: `${stats.counts.featuredProjects} FEATURED ON HOME`,
      href: "/admin/home/missions",
    },
    {
      code: "02 // DOSSIER",
      label: "WORK EXPERIENCE",
      value: `${stats.counts.experiences}`,
      sub: "SYNCED TO HOME & CV",
      href: "/admin/cv/work",
    },
    {
      code: "03 // ACADEMIC",
      label: "EDUCATION",
      value: `${stats.counts.educations}`,
      sub: "CV EDUCATION RECORDS",
      href: "/admin/cv/education",
    },
    {
      code: "04 // MATRIX",
      label: "SKILLS & SPECS",
      value: `${stats.counts.skills}`,
      sub: `${stats.counts.languages} LANGUAGES LOGGED`,
      href: "/admin/cv/skills",
    },
    {
      code: "05 // CREDENTIALS",
      label: "CERTIFICATIONS",
      value: `${stats.counts.certifications}`,
      sub: "SYNCED TO HOME, CV & LEDGER",
      href: "/admin/certifications",
    },
    {
      code: "06 // ARCHIVE",
      label: "GALLERY SLOTS",
      value: `${stats.counts.galleryItems}`,
      sub: `${stats.counts.mountedGalleryItems} ASSETS MOUNTED`,
      href: "/admin/gallery",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="pb-6 border-b border-[var(--white-15)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-2">
            00 // TELEMETRY OVERVIEW
          </div>
          <h1 className="font-display m-0 text-3xl md:text-5xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
            MISSION CONTROL
          </h1>
          <p className="m-0 mt-2 max-w-[680px] text-sm leading-[1.6] text-[var(--white-60)]">
            Single-source telemetry dashboard for Supabase PostgreSQL, Storage
            assets, and frontpage module synchronization.
          </p>
        </div>

        <form action={signOutAdminAction}>
          <button type="submit" className="cta-aerospace-secondary">
            LOGOUT SESSION
          </button>
        </form>
      </div>

      {/* System Link Telemetry */}
      <section aria-label="Supabase connection status">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--white-15)] bg-[#000000]">
          <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[var(--white-15)]">
            <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-2">
              POSTGRESQL DATABASE LINK
            </div>
            <div className="font-display text-2xl font-bold tracking-[0.05em] uppercase text-[var(--white-100)] mb-1">
              {stats.databaseConnected ? "ONLINE // CONNECTED" : "FAULT // OFFLINE"}
            </div>
            <p className="font-mono-tech text-xs text-[var(--white-60)] m-0 break-all">
              {stats.databaseConnected
                ? `LAST CONFIG SYNC: ${stats.lastUpdatedAt ? stats.lastUpdatedAt.slice(0, 19).replace("T", " ") : "SEEDED"}`
                : stats.databaseError}
            </p>
          </div>

          <div className="p-5 md:p-6">
            <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-2">
              SUPABASE STORAGE (PORTFOLIO-ASSETS)
            </div>
            <div className="font-display text-2xl font-bold tracking-[0.05em] uppercase text-[var(--white-100)] mb-1">
              {stats.storageBucketReady
                ? "READY // PUBLIC BUCKET"
                : "FAULT // BUCKET MISSING"}
            </div>
            <p className="font-mono-tech text-xs text-[var(--white-60)] m-0 break-all">
              {stats.storageBucketReady
                ? "ACCEPTING JPG, PNG, WEBP ASSETS UP TO 5MB"
                : stats.storageError}
            </p>
          </div>
        </div>
      </section>

      {/* Module Counts */}
      <section aria-label="Database record statistics">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-4">
          DATABASE RECORD TELEMETRY
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--white-15)]">
          {telemetryCards.map((card) => (
            <Link
              key={card.code}
              href={card.href}
              className="p-5 md:p-6 border-r border-b border-[var(--white-15)] bg-[#000000] hover:bg-[var(--white-10)] transition-colors duration-150 flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[var(--white-50)]">
                  {card.code}
                </span>
                <Arrow />
              </div>
              <div>
                <div className="font-display text-4xl font-bold leading-none text-[var(--white-100)] mb-2">
                  {card.value}
                </div>
                <div className="font-display text-base font-bold tracking-[0.05em] uppercase text-[var(--white-100)]">
                  {card.label}
                </div>
                <div className="font-mono-tech text-[11px] tracking-[0.08em] uppercase text-[var(--white-60)] mt-1">
                  {card.sub}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Public Route Preview Shortcuts */}
      <section aria-label="Public page previews">
        <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[var(--white-50)] mb-4">
          FRONTPAGE PREVIEW LINKS
        </div>
        <div className="border border-[var(--white-15)] divide-y divide-[var(--white-15)] bg-[#000000]">
          {publicRoutes.map((route) => (
            <div
              key={route.href}
              className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="font-display text-base font-bold tracking-[0.08em] uppercase text-[var(--white-100)]">
                  {route.label}
                </div>
                <div className="font-mono-tech text-xs text-[var(--white-60)]">
                  {route.note}
                </div>
              </div>

              <Link
                href={route.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 border border-[var(--white-25)] font-mono-tech text-xs tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000] transition-colors duration-150 shrink-0"
              >
                <span>OPEN {route.href}</span>
                <Arrow diagonal />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
