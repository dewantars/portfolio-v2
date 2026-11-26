"use client";

import { useEffect, useState } from "react";
import {
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-primitives";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

interface AssetUploadFieldProps {
  id: string;
  label: string;
  urlInputName: string;
  folder: "certifications" | "gallery" | "profile" | "hero" | "about";
  initialUrl?: string | null;
  required?: boolean;
}

export function AssetUploadField({
  id,
  label,
  urlInputName,
  folder,
  initialUrl,
  required = false,
}: AssetUploadFieldProps) {
  const [urlValue, setUrlValue] = useState(initialUrl ?? "");
  const [previewSrc, setPreviewSrc] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    setUrlValue(initialUrl ?? "");
    setPreviewSrc(initialUrl ?? "");
  }, [initialUrl]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setError(null);
    setStatusMsg(null);
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const validExt = ["jpg", "jpeg", "png", "webp"].includes(ext);
    if (!ALLOWED_MIME.has(file.type) && !validExt) {
      setError("FORMAT INVALID: ONLY JPG, PNG, AND WEBP IMAGES ARE ALLOWED.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_BYTES) {
      setError("FILE TOO LARGE: MAXIMUM SIZE IS 5MB.");
      event.target.value = "";
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreviewSrc(localPreview);
    setUploading(true);

    try {
      const payload = new FormData();
      payload.append("file", file);
      payload.append("folder", folder);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: payload,
      });

      const body = (await response.json()) as {
        url?: string;
        path?: string;
        error?: string;
      };

      if (!response.ok || !body.url) {
        setError(body.error?.toUpperCase() || "UPLOAD TO STORAGE FAILED.");
        return;
      }

      setUrlValue(body.url);
      setPreviewSrc(body.url);
      setStatusMsg(`UPLOADED TO PORTFOLIO-ASSETS (${body.path})`);
    } catch {
      setError("NETWORK FAULT WHILE UPLOADING TO SUPABASE STORAGE.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-[var(--white-15)] bg-[#000000] p-4 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={`${id}-file`} className={adminLabelClass}>
          {label} (JPG / PNG / WEBP, MAX 5MB)
        </label>
        {urlValue && (
          <button
            type="button"
            onClick={() => {
              setUrlValue("");
              setPreviewSrc("");
              setStatusMsg(null);
              setError(null);
            }}
            className="min-h-[36px] px-3 border border-[var(--white-25)] font-mono-tech text-[10px] tracking-[0.14em] uppercase text-[var(--white-80)] hover:text-[var(--white-100)] hover:border-[var(--white-100)]"
          >
            CLEAR IMAGE
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
        <div className="relative w-full aspect-[4/3] border border-[var(--white-15)] bg-[#000000] overflow-hidden flex items-center justify-center">
          {previewSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt="Asset upload preview"
              width={400}
              height={300}
              className="w-full h-full object-cover grayscale contrast-[1.08]"
            />
          ) : (
            <span className="font-mono-tech text-[10px] tracking-[0.14em] uppercase text-[var(--white-50)] px-3 text-center">
              NO IMAGE MOUNTED
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <input
            id={`${id}-file`}
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full font-mono-tech text-xs text-[var(--white-80)] file:mr-4 file:min-h-[44px] file:px-4 file:border file:border-[var(--white-25)] file:bg-[#000000] file:font-mono-tech file:text-xs file:uppercase file:tracking-[0.12em] file:text-[var(--white-100)] hover:file:border-[var(--white-100)] file:cursor-pointer"
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-url`} className={adminLabelClass}>
              ASSET PUBLIC URL (AUTO-FILLED ON UPLOAD OR PASTE URL)
            </label>
            <input
              id={`${id}-url`}
              name={urlInputName}
              type="text"
              required={required}
              value={urlValue}
              onChange={(e) => {
                setUrlValue(e.target.value);
                setPreviewSrc(e.target.value);
              }}
              placeholder="https://...supabase.co/storage/v1/object/public/portfolio-assets/..."
              className={adminInputClass}
            />
          </div>

          {uploading && (
            <p
              role="status"
              className="m-0 font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-80)]"
            >
              UPLOADING TO SUPABASE STORAGE...
            </p>
          )}
          {statusMsg && !uploading && (
            <p
              role="status"
              className="m-0 font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-100)] break-all"
            >
              {statusMsg}
            </p>
          )}
          {error && (
            <p
              role="alert"
              className="m-0 font-mono-tech text-[11px] tracking-[0.12em] uppercase text-[var(--white-100)] border border-[var(--white-100)] px-3 py-2"
            >
              FAULT // {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
