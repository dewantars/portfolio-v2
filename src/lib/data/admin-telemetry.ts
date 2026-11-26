import "server-only";
import { prisma } from "@/lib/prisma";
import { PORTFOLIO_ASSETS_BUCKET } from "@/lib/supabase/storage";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export interface AdminTelemetryStats {
  databaseConnected: boolean;
  databaseError: string | null;
  storageBucketReady: boolean;
  storageError: string | null;
  counts: {
    projects: number;
    featuredProjects: number;
    experiences: number;
    educations: number;
    skills: number;
    certifications: number;
    languages: number;
    galleryItems: number;
    mountedGalleryItems: number;
  };
  githubUsername: string;
  maxRepos: number;
  lastUpdatedAt: string | null;
}

export async function getAdminTelemetryStats(): Promise<AdminTelemetryStats> {
  let databaseConnected = false;
  let databaseError: string | null = null;

  let counts = {
    projects: 0,
    featuredProjects: 0,
    experiences: 0,
    educations: 0,
    skills: 0,
    certifications: 0,
    languages: 0,
    galleryItems: 0,
    mountedGalleryItems: 0,
  };
  let githubUsername = "dewantars";
  let maxRepos = 50;
  let lastUpdatedAt: string | null = null;

  try {
    const [
      projects,
      featuredProjects,
      experiences,
      educations,
      skills,
      certifications,
      languages,
      galleryItems,
      mountedGalleryItems,
      siteConfig,
      repoConfig,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featuredOnHome: true } }),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.skill.count(),
      prisma.certification.count(),
      prisma.language.count(),
      prisma.galleryItem.count(),
      prisma.galleryItem.count({ where: { imageUrl: { not: null } } }),
      prisma.siteConfig.findUnique({ where: { id: "main" } }),
      prisma.repoConfig.findUnique({ where: { id: "main" } }),
    ]);

    databaseConnected = true;
    counts = {
      projects,
      featuredProjects,
      experiences,
      educations,
      skills,
      certifications,
      languages,
      galleryItems,
      mountedGalleryItems,
    };
    githubUsername =
      repoConfig?.githubUsername ?? siteConfig?.githubUsername ?? "dewantars";
    maxRepos = repoConfig?.maxRepos ?? 50;
    lastUpdatedAt = siteConfig?.updatedAt.toISOString() ?? null;
  } catch (err) {
    databaseError =
      err instanceof Error ? err.message : "Database telemetry unreachable.";
  }

  let storageBucketReady = false;
  let storageError: string | null = null;
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin.storage.getBucket(PORTFOLIO_ASSETS_BUCKET);
    if (error) {
      storageError = error.message;
    } else if (data) {
      storageBucketReady = true;
    }
  } catch (err) {
    storageError =
      err instanceof Error ? err.message : "Storage telemetry unreachable.";
  }

  return {
    databaseConnected,
    databaseError,
    storageBucketReady,
    storageError,
    counts,
    githubUsername,
    maxRepos,
    lastUpdatedAt,
  };
}
