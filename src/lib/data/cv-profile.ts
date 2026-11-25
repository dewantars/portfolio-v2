export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  focus: string;
  metric?: string;
}

export interface LanguageProficiency {
  id: string;
  language: string;
  proficiency: string;
}

export const cvPersonalMeta = {
  location: "Bandung, West Java, Indonesia",
  documentRef: "DRS-CV-2026",
} as const;

export const cvEducation: EducationEntry[] = [
  {
    id: "edu-telkom-university",
    institution: "Telkom University",
    degree: "Bachelor of Software Engineering (S1 Rekayasa Perangkat Lunak)",
    period: "SEP 2023 - PRESENT",
    focus:
      "Software engineering architecture, data structures, automated quality assurance, and full-stack web and mobile development.",
    metric: "GPA 3.76",
  },
  {
    id: "edu-mas-baitul-arqom",
    institution: "MAS Baitul Arqom",
    degree: "High School Diploma, Mathematics and Natural Sciences (MIPA)",
    period: "MAY 2020 - JUL 2023",
    focus:
      "Mathematics, natural sciences, and analytical problem-solving foundations.",
  },
];

export const cvLanguages: LanguageProficiency[] = [
  {
    id: "lang-id",
    language: "INDONESIAN",
    proficiency: "NATIVE",
  },
  {
    id: "lang-en",
    language: "ENGLISH",
    proficiency: "INTERMEDIATE / WORKING PROFICIENCY",
  },
  {
    id: "lang-ar",
    language: "ARABIC",
    proficiency: "INTERMEDIATE",
  },
];
