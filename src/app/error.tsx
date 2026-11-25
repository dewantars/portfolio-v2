"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#000000] text-[var(--white-100)] flex items-center justify-center px-5 py-16">
      <div className="max-w-[640px] w-full border border-[var(--white-25)] p-8 md:p-10 bg-[#000000]">
        <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-50)] mb-3">
          TELEMETRY FAULT // DATA LINK INTERRUPTED
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[0.05em] uppercase text-[var(--white-100)] mb-4">
          UNABLE TO LOAD MISSION DATA
        </h1>
        <p className="text-[var(--white-80)] text-base leading-[1.6] mb-8">
          {error.message || "A connection error occurred while retrieving portfolio records."}
        </p>
        <button type="button" onClick={reset} className="cta-aerospace">
          RETRY CONNECTION
        </button>
      </div>
    </main>
  );
}
