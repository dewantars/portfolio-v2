import Link from "next/link";
import { Arrow } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] max-w-[1320px] mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20 flex items-center">
      <div className="w-full max-w-[680px] border border-[var(--white-25)] p-8 md:p-12 bg-[#000000]">
        <p className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-60)] m-0 mb-3">
          TELEMETRY FAULT // HTTP 404
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)] m-0 mb-4">
          DESTINATION NOT FOUND
        </h1>
        <p className="text-base leading-[1.6] text-[var(--white-80)] m-0 mb-8">
          The requested route does not exist in this portfolio archive. Return
          to the flight deck or choose a route from the navigation bar.
        </p>
        <Link href="/" className="cta-aerospace gap-2.5">
          <span>RETURN TO HOME</span>
          <Arrow />
        </Link>
      </div>
    </main>
  );
}
