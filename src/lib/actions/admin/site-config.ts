"use server";

import { prisma } from "@/lib/prisma";
import { requireAdminAction } from "@/lib/supabase/admin-auth";
import { uploadPortfolioAsset } from "@/lib/supabase/storage";
import {
  DEFAULT_DECK_CARDS,
  DEFAULT_DISCIPLINES,
  DEFAULT_SITE_CONFIG,
} from "@/lib/data/site-config";
import {
  getBoolField,
  getOptionalStringField,
  getStringField,
  revalidatePortfolioAll,
  type ActionResult,
} from "@/lib/actions/admin/shared";

async function ensureSiteConfigExists() {
  return prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      fullName: DEFAULT_SITE_CONFIG.fullName,
      roleEyebrow: DEFAULT_SITE_CONFIG.roleEyebrow,
      headline: DEFAULT_SITE_CONFIG.headline,
      bioSummary: DEFAULT_SITE_CONFIG.bioSummary,
      photoUrl: DEFAULT_SITE_CONFIG.photoUrl,
      location: DEFAULT_SITE_CONFIG.location,
      email: DEFAULT_SITE_CONFIG.email,
      availabilityStatus: DEFAULT_SITE_CONFIG.availabilityStatus,
      documentRef: DEFAULT_SITE_CONFIG.documentRef,
      cvPdfUrl: DEFAULT_SITE_CONFIG.cvPdfUrl,
      githubUsername: DEFAULT_SITE_CONFIG.githubUsername,
      githubUrl: DEFAULT_SITE_CONFIG.githubUrl,
      linkedinUrl: DEFAULT_SITE_CONFIG.linkedinUrl,
      instagramUrl: DEFAULT_SITE_CONFIG.instagramUrl,
      heroHeadline: DEFAULT_SITE_CONFIG.heroHeadline,
      heroSubheadline: DEFAULT_SITE_CONFIG.heroSubheadline,
      heroBackgroundUrl: DEFAULT_SITE_CONFIG.heroBackgroundUrl,
      heroFlightDeckLabel: DEFAULT_SITE_CONFIG.heroFlightDeckLabel,
      heroPrimaryCtaLabel: DEFAULT_SITE_CONFIG.heroPrimaryCtaLabel,
      heroSecondaryCtaLabel: DEFAULT_SITE_CONFIG.heroSecondaryCtaLabel,
      aboutTitle: DEFAULT_SITE_CONFIG.aboutTitle,
      aboutBody: DEFAULT_SITE_CONFIG.aboutBody,
      aboutSecondaryBody: DEFAULT_SITE_CONFIG.aboutSecondaryBody,
      aboutDisciplines: DEFAULT_DISCIPLINES as unknown as object,
      aboutDeckCards: DEFAULT_DECK_CARDS as unknown as object,
      contactHeadline: DEFAULT_SITE_CONFIG.contactHeadline,
      contactBody: DEFAULT_SITE_CONFIG.contactBody,
      navBrandLabel: DEFAULT_SITE_CONFIG.navBrandLabel,
      navCtaLabel: DEFAULT_SITE_CONFIG.navCtaLabel,
      navCtaHref: DEFAULT_SITE_CONFIG.navCtaHref,
      navVisibility: DEFAULT_SITE_CONFIG.navVisibility as unknown as object,
      footerCopyright: DEFAULT_SITE_CONFIG.footerCopyright,
      seoTitle: DEFAULT_SITE_CONFIG.seoTitle,
      seoDescription: DEFAULT_SITE_CONFIG.seoDescription,
    },
  });
}

export async function updateBasicsProfileAction(
  _prevState: ActionResult<{ photoUrl: string }> | null,
  formData: FormData
): Promise<ActionResult<{ photoUrl: string }>> {
  try {
    await requireAdminAction();
    await ensureSiteConfigExists();

    const fullName = getStringField(formData, "fullName");
    const roleEyebrow = getStringField(formData, "roleEyebrow");
    const headline = getStringField(formData, "headline");
    const bioSummary = getStringField(formData, "bioSummary");
    const location = getStringField(formData, "location");
    const email = getStringField(formData, "email");
    const availabilityStatus = getStringField(formData, "availabilityStatus");
    const documentRef = getStringField(formData, "documentRef");
    const cvPdfUrl = getOptionalStringField(formData, "cvPdfUrl");
    const githubUsername = getStringField(formData, "githubUsername");
    const githubUrl = getStringField(formData, "githubUrl");
    const linkedinUrl = getStringField(formData, "linkedinUrl");
    const instagramUrl = getOptionalStringField(formData, "instagramUrl");

    if (!fullName || !email) {
      return { ok: false, message: "FULL NAME AND EMAIL ARE REQUIRED." };
    }

    let photoUrl = getStringField(formData, "photoUrl", "/assets/profile.jpg");
    const photoFile = formData.get("photoFile");
    if (photoFile instanceof File && photoFile.size > 0) {
      const uploaded = await uploadPortfolioAsset(photoFile, "profile");
      photoUrl = uploaded.url;
    }

    await prisma.siteConfig.update({
      where: { id: "main" },
      data: {
        fullName,
        roleEyebrow,
        headline,
        bioSummary,
        photoUrl,
        location,
        email,
        availabilityStatus,
        documentRef,
        cvPdfUrl,
        githubUsername,
        githubUrl,
        linkedinUrl,
        instagramUrl,
      },
    });

    revalidatePortfolioAll();
    return {
      ok: true,
      message: "BASICS & PROFILE TELEMETRY SAVED.",
      data: { photoUrl },
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "FAILED TO UPDATE BASICS.",
    };
  }
}

export async function updateNavigationFooterAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await ensureSiteConfigExists();

    const navBrandLabel = getStringField(formData, "navBrandLabel");
    const navCtaLabel = getStringField(formData, "navCtaLabel");
    const navCtaHref = getStringField(formData, "navCtaHref", "/#contact");
    const footerCopyright = getStringField(formData, "footerCopyright");
    const seoTitle = getStringField(formData, "seoTitle");
    const seoDescription = getStringField(formData, "seoDescription");

    if (!navBrandLabel || !footerCopyright || !seoTitle) {
      return {
        ok: false,
        message: "BRAND LABEL, FOOTER COPYRIGHT, AND SEO TITLE ARE REQUIRED.",
      };
    }

    const navVisibility = {
      home: getBoolField(formData, "vis_home"),
      cv: getBoolField(formData, "vis_cv"),
      repositories: getBoolField(formData, "vis_repositories"),
      certifications: getBoolField(formData, "vis_certifications"),
      gallery: getBoolField(formData, "vis_gallery"),
    };

    await prisma.siteConfig.update({
      where: { id: "main" },
      data: {
        navBrandLabel,
        navCtaLabel,
        navCtaHref,
        navVisibility,
        footerCopyright,
        seoTitle,
        seoDescription,
      },
    });

    revalidatePortfolioAll();
    return { ok: true, message: "NAVIGATION & FOOTER CONFIGURATION SAVED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO UPDATE NAVIGATION.",
    };
  }
}

export async function updateHomeHeroManifestoAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminAction();
    await ensureSiteConfigExists();

    const heroFlightDeckLabel = getStringField(formData, "heroFlightDeckLabel");
    const heroHeadline = getStringField(formData, "heroHeadline");
    const heroSubheadline = getStringField(formData, "heroSubheadline");
    const heroBackgroundUrl = getOptionalStringField(
      formData,
      "heroBackgroundUrl"
    );
    const heroPrimaryCtaLabel = getStringField(formData, "heroPrimaryCtaLabel");
    const heroSecondaryCtaLabel = getStringField(
      formData,
      "heroSecondaryCtaLabel"
    );
    const aboutTitle = getStringField(formData, "aboutTitle");
    const aboutBody = getStringField(formData, "aboutBody");
    const aboutSecondaryBody = getOptionalStringField(
      formData,
      "aboutSecondaryBody"
    );
    const contactHeadline = getStringField(formData, "contactHeadline");
    const contactBody = getStringField(formData, "contactBody");

    if (!heroHeadline || !aboutTitle || !aboutBody) {
      return {
        ok: false,
        message: "HERO HEADLINE, MANIFESTO TITLE, AND MANIFESTO BODY ARE REQUIRED.",
      };
    }

    const disciplines = [0, 1, 2, 3].map((idx) => ({
      code: getStringField(formData, `disc_code_${idx}`, `0${idx + 1}`),
      title: getStringField(formData, `disc_title_${idx}`),
      detail: getStringField(formData, `disc_detail_${idx}`),
    })).filter((d) => d.title.length > 0);

    const deckCards = [0, 1, 2].map((idx) => ({
      id: `card-0${idx + 1}`,
      code: getStringField(formData, `deck_code_${idx}`, `0${idx + 1}`),
      year: getStringField(formData, `deck_year_${idx}`, "2026"),
      role: getStringField(formData, `deck_role_${idx}`),
      title: getStringField(formData, `deck_title_${idx}`),
      subtitle: getStringField(formData, `deck_subtitle_${idx}`),
      objectPosition: getStringField(
        formData,
        `deck_pos_${idx}`,
        DEFAULT_DECK_CARDS[idx]?.objectPosition ?? "object-[center_18%]"
      ),
      imageUrl: getOptionalStringField(formData, `deck_image_${idx}`),
    })).filter((c) => c.title.length > 0);

    await prisma.siteConfig.update({
      where: { id: "main" },
      data: {
        heroFlightDeckLabel,
        heroHeadline,
        heroSubheadline,
        heroBackgroundUrl,
        heroPrimaryCtaLabel,
        heroSecondaryCtaLabel,
        aboutTitle,
        aboutBody,
        aboutSecondaryBody,
        aboutDisciplines:
          disciplines.length > 0
            ? (disciplines as unknown as object)
            : (DEFAULT_DISCIPLINES as unknown as object),
        aboutDeckCards:
          deckCards.length > 0
            ? (deckCards as unknown as object)
            : (DEFAULT_DECK_CARDS as unknown as object),
        contactHeadline,
        contactBody,
      },
    });

    revalidatePortfolioAll();
    return { ok: true, message: "HERO & MANIFESTO CONFIGURATION SAVED." };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "FAILED TO UPDATE HERO SECTION.",
    };
  }
}
