export interface DisciplineItem {
  code: string;
  title: string;
  detail: string;
}

export interface DeckCardItem {
  id: string;
  code: string;
  year: string;
  role: string;
  title: string;
  subtitle: string;
  objectPosition: string;
  imageUrl?: string | null;
}

export interface NavVisibility {
  home: boolean;
  cv: boolean;
  repositories: boolean;
  certifications: boolean;
  gallery: boolean;
}

export interface SiteConfigDTO {
  id: string;
  fullName: string;
  roleEyebrow: string;
  headline: string;
  bioSummary: string;
  photoUrl: string;
  location: string;
  email: string;
  availabilityStatus: string;
  documentRef: string;
  cvPdfUrl: string | null;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string | null;
  heroHeadline: string;
  heroSubheadline: string;
  heroBackgroundUrl: string | null;
  heroFlightDeckLabel: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  aboutTitle: string;
  aboutBody: string;
  aboutSecondaryBody: string | null;
  aboutDisciplines: DisciplineItem[];
  aboutDeckCards: DeckCardItem[];
  contactHeadline: string;
  contactBody: string;
  navBrandLabel: string;
  navCtaLabel: string;
  navCtaHref: string;
  navVisibility: NavVisibility;
  footerCopyright: string;
  seoTitle: string;
  seoDescription: string;
}

export interface SkillItemDTO {
  id: string;
  slug: string;
  category: string;
  name: string;
  specification: string | null;
  sortOrder: number;
}

export interface SkillCategoryGroup {
  category: string;
  items: SkillItemDTO[];
}

export interface ProjectDTO {
  id: string;
  slug: string;
  title: string;
  missionCode: string;
  summary: string;
  architectureDetail: string | null;
  role: string;
  techStack: string[];
  statusLabel: string;
  layoutType: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featuredOnHome: boolean;
  sortOrder: number;
}

export interface ExperienceDTO {
  id: string;
  slug: string;
  role: string;
  organization: string;
  period: string;
  location: string | null;
  description: string;
  tags: string[];
  featuredOnHome: boolean;
  sortOrder: number;
}

export interface EducationDTO {
  id: string;
  slug: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  period: string;
  metric: string | null;
  description: string;
  sortOrder: number;
}

export interface CertificationDTO {
  id: string;
  slug: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string | null;
  verificationUrl: string | null;
  imageUrl: string | null;
  category: string;
  description: string | null;
  tags: string[];
  featuredOnHome: boolean;
  sortOrder: number;
}

export interface LanguageDTO {
  id: string;
  slug: string;
  name: string;
  proficiency: string;
  sortOrder: number;
}

export interface GalleryItemDTO {
  id: string;
  slug: string;
  code: string;
  title: string;
  caption: string;
  category: string;
  location: string;
  capturedDate: string;
  mediaType: string;
  aspectRatio: string;
  isFeatured: boolean;
  imageUrl: string | null;
  posterUrl: string | null;
  altText: string | null;
  sortOrder: number;
}

export interface RepoConfigDTO {
  id: string;
  githubUsername: string;
  maxRepos: number;
  hiddenRepos: string[];
  pinnedRepoNames: string[];
}
