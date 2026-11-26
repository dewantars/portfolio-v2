export default function AdminLoading() {
  return (
    <div
      className="border border-[var(--white-15)] bg-[#000000] p-8 md:p-12"
      role="status"
      aria-live="polite"
      aria-label="Loading admin telemetry module"
    >
      <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)] m-0 mb-3">
        CMS // QUERYING SUPABASE TELEMETRY
      </p>
      <h1 className="font-display text-2xl md:text-4xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)] m-0">
        LOADING MODULE DATA
      </h1>
    </div>
  );
}
