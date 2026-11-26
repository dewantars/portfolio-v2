import "server-only";
import { prisma } from "@/lib/prisma";
import type {
  DeckCardItem,
  DisciplineItem,
  NavVisibility,
  SiteConfigDTO,
} from "@/lib/types/portfolio";

export const DEFAULT_DISCIPLINES: DisciplineItem[] = [
  {
    code: "01",
    title: "Software Engineering",
    detail: "System architecture, data structures, and maintainable production code.",
  },
  {
    code: "02",
    title: "Quality Assurance",
    detail: "End-to-end Playwright automation, API validation, and load testing.",
  },
  {
    code: "03",
    title: "Full-Stack Delivery",
    detail: "Next.js, React, Laravel, and PostgreSQL web applications.",
  },
  {
    code: "04",
    title: "UI/UX Engineering",
    detail: "Design verification, accessibility audits, and interface precision.",
  },
];

export const DEFAULT_DECK_CARDS: DeckCardItem[] = [
  {
    id: "card-01",
    code: "01",
    year: "2026",
    role: "Telkom University",
    title: "SOFTWARE ENGINEER",
    subtitle: "Web & mobile systems engineered for reliability.",
    objectPosition: "object-[center_18%]",
  },
  {
    id: "card-02",
    code: "02",
    year: "2026",
    role: "Telkom Indonesia",
    title: "QA & AUTOMATION",
    subtitle: "Playwright E2E, API validation, and design QA.",
    objectPosition: "object-[center_26%]",
  },
  {
    id: "card-03",
    code: "03",
    year: "2025",
    role: "Full-Stack & UI/UX",
    title: "INTERFACE CRAFT",
    subtitle: "Structural clarity, accessibility, and precision.",
    objectPosition: "object-[center_12%]",
  },
];

export const DEFAULT_NAV_VISIBILITY: NavVisibility = {
  home: true,
  cv: true,
  repositories: true,
  certifications: true,
  gallery: true,
};

export const DEFAULT_SITE_CONFIG: SiteConfigDTO = {
  id: "main",
  fullName: "Dewanta Rahma Satria",
  roleEyebrow: "SOFTWARE ENGINEER // FULL-STACK & QA AUTOMATION",
  headline:
    "Software Engineer | QA Engineer | Intern at Telkom Indonesia | Student Telkom University",
  bioSummary:
    "I am interested in software development, particularly in creating applications as a web and mobile developer, which I have been pursuing for the past few years.",
  photoUrl:
    "https://cgfknwbuesjwyimkawsi.supabase.co/storage/v1/object/public/project-images/Profile/profile.jpg",
  location: "Bandung, West Java, Indonesia",
  email: "dewantarahmasatria@gmail.com",
  availabilityStatus: "AVAILABLE FOR SOFTWARE ENGINEERING & QA COLLABORATION",
  documentRef: "DRS-CV-2026",
  cvPdfUrl:
    "https://cgfknwbuesjwyimkawsi.supabase.co/storage/v1/object/public/project-images/Profile/cv.pdf?download=Dewanta-Rahma-Satria-CV.pdf",
  githubUsername: "dewantars",
  githubUrl: "https://github.com/dewantars",
  linkedinUrl: "https://linkedin.com/in/dewantars",
  instagramUrl: "https://instagram.com/dewanta_rs",
  heroHeadline: "Dewanta Rahma Satria",
  heroSubheadline:
    "I am interested in software development, particularly in creating applications as a web and mobile developer, which I have been pursuing for the past few years.",
  heroBackgroundUrl:
    "https://cgfknwbuesjwyimkawsi.supabase.co/storage/v1/object/public/project-images/Profile/profile.jpg",
  heroFlightDeckLabel: "FLIGHT DECK // 01",
  heroPrimaryCtaLabel: "VIEW MISSIONS",
  heroSecondaryCtaLabel: "INITIATE CONTACT",
  aboutTitle:
    "ENGINEERING SOFTWARE WITH VERIFIABLE QUALITY AND STRUCTURAL CLARITY.",
  aboutBody:
    "I am interested in software development, particularly in creating applications as a web and mobile developer, which I have been pursuing for the past few years.",
  aboutSecondaryBody:
    "I combine full-stack implementation with disciplined quality assurance, ensuring every release holds up under real user workflows, performance loads, and edge cases.",
  aboutDisciplines: DEFAULT_DISCIPLINES,
  aboutDeckCards: DEFAULT_DECK_CARDS,
  contactHeadline: "ESTABLISH DIRECT LINK.",
  contactBody:
    "Available for software engineering, quality assurance automation, and full-stack product collaboration. Select a direct channel below or download the technical curriculum vitae.",
  navBrandLabel: "DEWANTA RAHMA SATRIA",
  navCtaLabel: "CONNECT",
  navCtaHref: "/#contact",
  navVisibility: DEFAULT_NAV_VISIBILITY,
  footerCopyright: "© 2026 DEWANTA RAHMA SATRIA",
  seoTitle: "Dewanta Rahma Satria | Software Engineer & QA",
  seoDescription:
    "Software Engineering student focused on software development, quality assurance, test automation, and UI/UX.",
};

function parseDisciplines(raw: unknown): DisciplineItem[] {
  if (!Array.isArray(raw)) return DEFAULT_DISCIPLINES;
  const parsed = raw
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null
    )
    .map((item, idx) => ({
      code: typeof item.code === "string" ? item.code : `0${idx + 1}`,
      title: typeof item.title === "string" ? item.title : "",
      detail: typeof item.detail === "string" ? item.detail : "",
    }))
    .filter((item) => item.title.trim().length > 0);
  return parsed.length > 0 ? parsed : DEFAULT_DISCIPLINES;
}

function parseDeckCards(raw: unknown): DeckCardItem[] {
  if (!Array.isArray(raw)) return DEFAULT_DECK_CARDS;
  const parsed = raw
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null
    )
    .map((item, idx) => ({
      id: typeof item.id === "string" ? item.id : `card-0${idx + 1}`,
      code: typeof item.code === "string" ? item.code : `0${idx + 1}`,
      year: typeof item.year === "string" ? item.year : "2026",
      role: typeof item.role === "string" ? item.role : "",
      title: typeof item.title === "string" ? item.title : "",
      subtitle: typeof item.subtitle === "string" ? item.subtitle : "",
      objectPosition:
        typeof item.objectPosition === "string"
          ? item.objectPosition
          : "object-[center_18%]",
      imageUrl:
        typeof item.imageUrl === "string" && item.imageUrl.trim()
          ? item.imageUrl.trim()
          : null,
    }))
    .filter((item) => item.title.trim().length > 0);
  return parsed.length > 0 ? parsed : DEFAULT_DECK_CARDS;
}

function parseNavVisibility(raw: unknown): NavVisibility {
  if (typeof raw !== "object" || raw === null) return DEFAULT_NAV_VISIBILITY;
  const obj = raw as Record<string, unknown>;
  return {
    home: typeof obj.home === "boolean" ? obj.home : true,
    cv: typeof obj.cv === "boolean" ? obj.cv : true,
    repositories: typeof obj.repositories === "boolean" ? obj.repositories : true,
    certifications:
      typeof obj.certifications === "boolean" ? obj.certifications : true,
    gallery: typeof obj.gallery === "boolean" ? obj.gallery : true,
  };
}

export async function getSiteConfig(): Promise<SiteConfigDTO> {
  try {
    const row = await prisma.siteConfig.findUnique({
      where: { id: "main" },
    });

    if (!row) {
      return DEFAULT_SITE_CONFIG;
    }

    return {
      id: row.id,
      fullName: row.fullName,
      roleEyebrow: row.roleEyebrow,
      headline: row.headline,
      bioSummary: row.bioSummary,
      photoUrl: row.photoUrl,
      location: row.location,
      email: row.email,
      availabilityStatus: row.availabilityStatus,
      documentRef: row.documentRef,
      cvPdfUrl: row.cvPdfUrl,
      githubUsername: row.githubUsername,
      githubUrl: row.githubUrl,
      linkedinUrl: row.linkedinUrl,
      instagramUrl: row.instagramUrl,
      heroHeadline: row.heroHeadline,
      heroSubheadline: row.heroSubheadline,
      heroBackgroundUrl: row.heroBackgroundUrl,
      heroFlightDeckLabel: row.heroFlightDeckLabel,
      heroPrimaryCtaLabel: row.heroPrimaryCtaLabel,
      heroSecondaryCtaLabel: row.heroSecondaryCtaLabel,
      aboutTitle: row.aboutTitle,
      aboutBody: row.aboutBody,
      aboutSecondaryBody: row.aboutSecondaryBody,
      aboutDisciplines: parseDisciplines(row.aboutDisciplines),
      aboutDeckCards: parseDeckCards(row.aboutDeckCards),
      contactHeadline: row.contactHeadline,
      contactBody: row.contactBody,
      navBrandLabel: row.navBrandLabel,
      navCtaLabel: row.navCtaLabel,
      navCtaHref: row.navCtaHref,
      navVisibility: parseNavVisibility(row.navVisibility),
      footerCopyright: row.footerCopyright,
      seoTitle: row.seoTitle,
      seoDescription: row.seoDescription,
    };
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

export interface ContactChannel {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: "MailIcon" | "FileTextIcon" | "InstagramIcon" | "LinkedinIcon" | "GithubIcon";
}

export function buildContactChannels(config: SiteConfigDTO): ContactChannel[] {
  const channels: ContactChannel[] = [];

  if (config.email.trim()) {
    channels.push({
      id: "email",
      platform: "Email",
      label: config.email.trim(),
      url: `mailto:${config.email.trim()}`,
      icon: "MailIcon",
    });
  }

  if (config.cvPdfUrl?.trim()) {
    channels.push({
      id: "cv-pdf",
      platform: "CV / Resume",
      label: "Curriculum Vitae",
      url: config.cvPdfUrl.trim(),
      icon: "FileTextIcon",
    });
  }

  if (config.instagramUrl?.trim()) {
    const raw = config.instagramUrl.trim();
    const handle = raw.split("/").filter(Boolean).pop() ?? raw;
    channels.push({
      id: "instagram",
      platform: "Instagram",
      label: handle.startsWith("@") ? handle : `@${handle}`,
      url: raw,
      icon: "InstagramIcon",
    });
  }

  if (config.linkedinUrl.trim()) {
    channels.push({
      id: "linkedin",
      platform: "LinkedIn",
      label: config.fullName,
      url: config.linkedinUrl.trim(),
      icon: "LinkedinIcon",
    });
  }

  if (config.githubUrl.trim()) {
    channels.push({
      id: "github",
      platform: "GitHub",
      label: config.githubUsername || config.githubUrl.trim(),
      url: config.githubUrl.trim(),
      icon: "GithubIcon",
    });
  }

  return channels;
}
