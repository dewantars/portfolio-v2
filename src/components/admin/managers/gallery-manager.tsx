"use client";

import { useState, useTransition } from "react";
import { deleteGalleryItemAction } from "@/lib/actions/admin/gallery";
import { AdminStatusBanner } from "@/components/admin/admin-primitives";
import { GalleryUploadForm } from "@/components/admin/forms/gallery-upload-form";
import type { GalleryItemDTO } from "@/lib/types/portfolio";

export function GalleryManager({ items }: { items: GalleryItemDTO[] }) {
  const [editing, setEditing] = useState<GalleryItemDTO | null>(null);
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
              EDIT MEDIA FRAME // {editing.code} {editing.title}
            </span>
          </div>
          <GalleryUploadForm
            initial={editing}
            onCancel={() => setEditing(null)}
          />
        </section>
      )}

      {items.length === 0 ? (
        <div className="border border-[var(--white-15)] p-10 text-center font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
          NO GALLERY ITEMS IN ARCHIVE
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="border border-[var(--white-15)] bg-[#000000] flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-video border-b border-[var(--white-15)] bg-[#000000] overflow-hidden flex items-center justify-center">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.altText || item.title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover grayscale contrast-[1.08]"
                    />
                  ) : (
                    <span className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[var(--white-50)]">
                      AWAITING MEDIA MOUNT ({item.aspectRatio})
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] tracking-[0.14em] uppercase text-[var(--white-50)]">
                    <span>
                      {item.code} {"//"} {item.aspectRatio}
                    </span>
                    <span className="text-[var(--white-100)]">
                      {item.isFeatured ? "PRIMARY 19:6" : `ORDER ${item.sortOrder}`}
                    </span>
                  </div>
                  <h2 className="font-display m-0 text-xl font-bold tracking-[0.04em] uppercase text-[var(--white-100)]">
                    {item.title}
                  </h2>
                  <p className="font-mono-tech m-0 text-[11px] uppercase text-[var(--white-60)]">
                    {item.category} {"//"} {item.location} {"//"} {item.capturedDate}
                  </p>
                  <p className="m-0 text-xs leading-[1.55] text-[var(--white-80)]">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-[var(--white-15)] flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(item)}
                  className="min-h-[42px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-100)] hover:bg-[var(--white-100)] hover:text-[#000000]"
                >
                  EDIT / MOUNT
                </button>
                {confirmDeleteId === item.id ? (
                  <>
                    <button
                      type="button"
                      disabled={isPendingTransition}
                      onClick={() =>
                        startTransition(async () => {
                          const res = await deleteGalleryItemAction(item.id);
                          setActionMsg(res);
                          setConfirmDeleteId(null);
                          if (editing?.id === item.id) setEditing(null);
                        })
                      }
                      className="min-h-[42px] px-3.5 border border-[var(--white-100)] bg-[var(--white-100)] text-[#000000] font-mono-tech text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      CONFIRM
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="min-h-[42px] px-3 border border-[var(--white-25)] font-mono-tech text-[11px] text-[var(--white-60)]"
                    >
                      CANCEL
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="min-h-[42px] px-3.5 border border-[var(--white-25)] font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-60)] hover:border-[var(--white-100)] hover:text-[var(--white-100)]"
                  >
                    DELETE
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
