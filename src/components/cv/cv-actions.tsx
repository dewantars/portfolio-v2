"use client";

import { FileTextIcon, Arrow } from "@/components/ui/icons";

interface CvActionsProps {
  pdfUrl?: string;
}

export function CvActions({ pdfUrl }: CvActionsProps) {
  return (
    <div className="no-print flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="cta-aerospace gap-2.5"
      >
        <FileTextIcon />
        <span>PRINT / EXPORT PDF</span>
      </button>

      {pdfUrl && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="cta-aerospace-secondary gap-2"
        >
          <span>STATIC PDF</span>
          <Arrow diagonal />
        </a>
      )}
    </div>
  );
}
