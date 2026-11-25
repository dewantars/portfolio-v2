export type GalleryAspectRatio = "19:6" | "1:1" | "1:2" | "2:1";

export interface GalleryFeaturedSource {
  id: string;
  code: string;
  title: string;
  category: string;
  location: string;
  date: string;
  mediaType: "video" | "image";
  src: string | null;
  poster?: string | null;
  alt: string;
  ratio: "19:6";
  targetPath?: string;
  note: string;
}

export interface GalleryFrame {
  id: string;
  code: string;
  title: string;
  category: string;
  location: string;
  date: string;
  src: string | null;
  alt: string;
  ratio: "1:1" | "1:2" | "2:1";
  targetPath?: string;
  note: string;
}

/**
 * Primary 19:6 featured source (supports local MP4/WebM video or widescreen photo).
 * Place file in `public/gallery/` and set `src` + `mediaType` to activate.
 */
export const galleryFeaturedSource: GalleryFeaturedSource = {
  id: "fig-00",
  code: "PRIMARY // 19:6",
  title: "Featured Field & Engineering Showcase",
  category: "Featured Source",
  location: "Bandung, Indonesia",
  date: "ARCHIVE SLOT",
  mediaType: "video",
  src: null,
  poster: null,
  alt: "Primary 19:6 featured visual documentation frame",
  ratio: "19:6",
  targetPath: "public/gallery/featured-19x6.mp4",
  note: "Primary 19:6 widescreen slot configured for local video (.mp4 / .webm) or panoramic photography.",
};

/**
 * Multi-ratio mosaic archive frames (1:1, 1:2, 2:1).
 * Ordered to interlock into a balanced 4-column dense grid on desktop.
 */
export const galleryFrames: GalleryFrame[] = [
  {
    id: "fig-01",
    code: "FIG // 01",
    title: "Field Operations Overview",
    category: "Field Archive",
    location: "Bandung, Indonesia",
    date: "ARCHIVE SLOT",
    src: null,
    alt: "2:1 widescreen slot awaiting local field photography",
    ratio: "2:1",
    targetPath: "public/gallery/fig-01-2x1.jpg",
    note: "2:1 landscape slot reserved for team activity and wide-angle field documentation.",
  },
  {
    id: "fig-02",
    code: "FIG // 02",
    title: "Design QA Review Session",
    category: "Engineering",
    location: "Telkom Corporate University",
    date: "ARCHIVE SLOT",
    src: null,
    alt: "1:1 square slot awaiting local QA review capture",
    ratio: "1:1",
    targetPath: "public/gallery/fig-02-1x1.jpg",
    note: "1:1 square slot reserved for UI/UX Design Quality Assurance workflow documentation.",
  },
  {
    id: "fig-03",
    code: "FIG // 03",
    title: "Playwright Automation Bench",
    category: "Engineering",
    location: "Bandung, Indonesia",
    date: "ARCHIVE SLOT",
    src: null,
    alt: "1:1 square slot awaiting local test automation capture",
    ratio: "1:1",
    targetPath: "public/gallery/fig-03-1x1.jpg",
    note: "1:1 square slot reserved for automated E2E and performance testing environment.",
  },
  {
    id: "fig-04",
    code: "FIG // 04",
    title: "Personnel Editorial Portrait",
    category: "Portrait",
    location: "Bandung, Indonesia",
    date: "2026",
    src: "/assets/profile.jpg",
    alt: "Monochrome portrait of Dewanta Rahma Satria",
    ratio: "1:2",
    note: "1:2 vertical portrait mounted from local asset archive (/assets/profile.jpg).",
  },
  {
    id: "fig-05",
    code: "FIG // 05",
    title: "Informatics Lab Practicum",
    category: "Academic",
    location: "Telkom University",
    date: "ARCHIVE SLOT",
    src: null,
    alt: "1:1 square slot awaiting local informatics lab photography",
    ratio: "1:1",
    targetPath: "public/gallery/fig-05-1x1.jpg",
    note: "1:1 square slot reserved for Informatics Lab practicum and mentoring sessions.",
  },
  {
    id: "fig-06",
    code: "FIG // 06",
    title: "Data Structures Review",
    category: "Academic",
    location: "Telkom University",
    date: "ARCHIVE SLOT",
    src: null,
    alt: "1:1 square slot awaiting local academic session photography",
    ratio: "1:1",
    targetPath: "public/gallery/fig-06-1x1.jpg",
    note: "1:1 square slot reserved for Data Structures teaching assistant sessions.",
  },
  {
    id: "fig-07",
    code: "FIG // 07",
    title: "Campus & Organization Field Log",
    category: "Field Archive",
    location: "West Java, Indonesia",
    date: "ARCHIVE SLOT",
    src: null,
    alt: "1:2 vertical portrait slot awaiting local organization photography",
    ratio: "1:2",
    targetPath: "public/gallery/fig-07-1x2.jpg",
    note: "1:2 vertical portrait slot reserved for outdoor and campus organization documentation.",
  },
  {
    id: "fig-08",
    code: "FIG // 08",
    title: "Full-Stack Deployment Sprint",
    category: "Engineering",
    location: "Bandung, Indonesia",
    date: "ARCHIVE SLOT",
    src: null,
    alt: "1:1 square slot awaiting local engineering sprint photography",
    ratio: "1:1",
    targetPath: "public/gallery/fig-08-1x1.jpg",
    note: "1:1 square slot reserved for web and mobile release milestone captures.",
  },
  {
    id: "fig-09",
    code: "FIG // 09",
    title: "Conference & Media Production",
    category: "Field Archive",
    location: "Bandung, Indonesia",
    date: "ARCHIVE SLOT",
    src: null,
    alt: "1:1 square slot awaiting local media production photography",
    ratio: "1:1",
    targetPath: "public/gallery/fig-09-1x1.jpg",
    note: "1:1 square slot reserved for event documentation and creative media production.",
  },
];
