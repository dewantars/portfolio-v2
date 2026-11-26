import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/supabase/admin-auth";
import { uploadPortfolioAsset } from "@/lib/supabase/storage";

export async function POST(request: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "UNAUTHORIZED: Admin session required." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = String(formData.get("folder") ?? "gallery");
    const folder =
      folderRaw === "certifications" ||
      folderRaw === "gallery" ||
      folderRaw === "profile" ||
      folderRaw === "hero" ||
      folderRaw === "about"
        ? folderRaw
        : "gallery";

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    const uploaded = await uploadPortfolioAsset(file, folder);
    return NextResponse.json(
      { ok: true, url: uploaded.url, path: uploaded.path },
      { status: 200 }
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
