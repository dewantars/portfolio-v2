export default function CertificationsLoading() {
  return (
    <main
      className="max-w-[1320px] mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20"
      role="status"
      aria-live="polite"
      aria-label="Loading certifications verification log"
    >
      <div className="border border-[var(--white-15)] p-8 md:p-12">
        <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)] m-0 mb-3">
          SYS // READING CREDENTIAL LEDGER
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)] m-0">
          LOADING CERTIFICATIONS
        </h1>
      </div>
    </main>
  );
}
