export default function Loading() {
  return (
    <div
      className="min-h-screen bg-[#000000] text-[var(--white-100)] flex flex-col justify-between px-5 md:px-10 py-10"
      role="status"
      aria-live="polite"
      aria-label="Loading mission telemetry"
    >
      <div className="max-w-[1320px] w-full mx-auto border-b border-[var(--white-15)] pb-4 flex items-center justify-between">
        <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)]">
          SYS // INITIALIZING
        </span>
        <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)]">
          PORTFOLIO TELEMETRY
        </span>
      </div>
      <div className="max-w-[1320px] w-full mx-auto my-auto py-16">
        <p className="font-mono-tech text-xs tracking-[0.18em] uppercase text-[var(--white-50)] mb-4">
          FETCHING MISSION RECORDS
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-[0.06em] uppercase text-[var(--white-100)]">
          LOADING FLIGHT DECK
        </h1>
      </div>
      <div className="max-w-[1320px] w-full mx-auto border-t border-[var(--white-15)] pt-4 font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
        STANDBY
      </div>
    </div>
  );
}
