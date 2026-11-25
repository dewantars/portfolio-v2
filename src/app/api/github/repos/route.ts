import { NextResponse } from "next/server";
import { fetchGithubRepos } from "@/lib/data/github";

export async function GET() {
  const result = await fetchGithubRepos({ fresh: true });
  return NextResponse.json(result, {
    status: result.error ? 502 : 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
