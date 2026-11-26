"use client";

import { useState, useTransition } from "react";
import {
  deleteCertificationAction,
  toggleCertificationFeaturedAction,
} from "@/lib/actions/admin/certifications";
import { AdminStatusBanner } from "@/components/admin/admin-primitives";
import { CertificationForm } from "@/components/admin/forms/certification-form";
import type { CertificationDTO } from "@/lib/types/portfolio";

export function CertificationsManager({
  certifications,
}: {
  certifications: CertificationDTO[];
}) {
  const [editing, setEditing] = useState<CertificationDTO | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [isPendingTransition, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-8">
      <AdminStatusBanner state={actionMsg} />

      {editing && (
        <section className="border border-[var(--white-100)] bg-[#000000] p-5 md:p-6">
          <div className="pb-4 mb-5 border-b border-[var(--white-15)] flex items-center justify-between gap-3">
            <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[var(--white-100)]">
              EDIT CREDENTIAL // {editing.title}
            </span>
          </div>
          <CertificationForm
            initial={editing}
            onCancel={() => setEditing(null)}
          />
        </section>
      )}

      {certifications.length === 0 ? (
        <div className="border border-[var(--white-15)] p-10 text-center font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
          NO CERTIFICATIONS OR AWARDS LOGGED YET
        </div>
      ) : (
        <div className="border border-[var(--white-15)] divide-y divide-[var(--white-15)] bg-[#000000]">
          {certifications.map((item) => (
            <div
              key={item.id}
              className="p-5 grid grid-cols-1 lg:grid-cols-[120px_1fr_auto] gap-5 items-center"
            >
              <div className="relative w-full lg:w-[120px] aspect-[16/10] border border-[var(--white-15)] bg-[#000000] overflow-hidden flex items-center justify-center">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    width={240}
                    height={150}
                    className="w-full h-full object-cover grayscale contrast-[1.08]"
                  />
                ) : (
                  <span className="font-mono-tech text-[10px] text-[var(--white-50)]">
                    NO IMG
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-50)] mb-1">
                  <span>ORDER {item.sortOrder}</span>
                  <span>{item.issueDate}</span>
                  <span>{item.issuer}</span>
                  <span>{item.category}</span>
                  <span className="text-[var(--white-100)]">
                    {item.featuredOnHome ? "[HOME VISIBLE]" : "[LEDGER & CV]"}
                  </span>
                </div>
                <h2 className="font-display m-0 text-xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                  {item.title}
                </h2>
                {item.credentialId && (
                  <p className="font-mono-tech m-0 mt-1 text-xs text-[var(--white-60)]">
                    ID: {item.credentialId}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={isPendingTransition}
                  onClick={() =>
                    startTransition(async () => {
                      const res = await toggleCertificationFeaturedAction(
                        item.id,
                        !item.featuredOnHome
                      );
                      setActionMsg(res);
                    })
                  }
                  className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-80)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
                >
                  {item.featuredOnHome ? "HIDE HOME" : "SHOW HOME"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(item)}
                  className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000]"
                >
                  EDIT
                </button>
                {confirmDeleteId === item.id ? (
                  <>
                    <button
                      type="button"
                      disabled={isPendingTransition}
                      onClick={() =>
                        startTransition(async () => {
                          const res = await deleteCertificationAction(item.id);
                          setActionMsg(res);
                          setConfirmDeleteId(null);
                          if (editing?.id === item.id) setEditing(null);
                        })
                      }
                      className="min-h-[44px] px-3.5 border border-[var(--white-100)] bg-[var(--white-100)] text-[#000000] font-mono-tech text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      CONFIRM
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="min-h-[44px] px-3 border border-[var(--white-25)] font-mono-tech text-[11px] text-[var(--white-60)]"
                    >
                      CANCEL
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="min-h-[44px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-60)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
                  >
                    DELETE
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
