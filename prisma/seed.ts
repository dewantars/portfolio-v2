import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_DISCIPLINES = [
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

const DEFAULT_DECK_CARDS = [
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

const DEFAULT_NAV_VISIBILITY = {
  home: true,
  cv: true,
  repositories: true,
  certifications: true,
  gallery: true,
};

async function main() {
  console.log("Running idempotent Supabase seed with live + static portfolio data...");

  // 1. SiteConfig (Singleton)
  await prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
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
    },
  });

  // 2. Projects
  const projects = [
    {
      slug: "mydigilearn",
      missionCode: "01",
      title: "MyDigiLearn",
      role: "QA Engineer Intern",
      summary:
        "Contributed to the quality assurance of MyDigiLearn by performing manual and end-to-end (E2E) testing to validate application functionality and user flows. Developed automated E2E test scenarios using Playwright to improve test coverage, identify functional issues, and ensure consistent application behavior across key features.",
      architectureDetail:
        "Automated regression test suites with Playwright, REST API payload validation in Postman, load simulation with k6, and defect lifecycle tracking in Jira.",
      techStack: ["Manual", "Playwright", "Postman", "k6", "Jira"],
      statusLabel: "INTERNAL // CONFIDENTIAL",
      layoutType: "standard",
      githubUrl: null,
      liveUrl: null,
      featuredOnHome: true,
      sortOrder: 1,
    },
    {
      slug: "quenza-conference",
      missionCode: "02",
      title: "Quenza Conference",
      role: "Full-Stack Engineer Intern",
      summary:
        "Worked as a Remote Full-Stack Engineer on the development of the Quenza Conference website. Contributed to both frontend and backend development, implementing features such as event information, speaker details, registration, and other conference-related functionality while ensuring a responsive and reliable user experience.",
      architectureDetail:
        "Laravel backend APIs paired with React frontend modules, Tailwind CSS responsive layout, and SQLite data persistence.",
      techStack: ["Laravel", "React", "PHP", "Tailwind CSS", "SQLite"],
      statusLabel: "INTERNAL // CONFIDENTIAL",
      layoutType: "standard",
      githubUrl: null,
      liveUrl: null,
      featuredOnHome: true,
      sortOrder: 2,
    },
    {
      slug: "idaman-tsl-jabar",
      missionCode: "03",
      title: "IDAMAN TSL JABAR",
      role: "QA Engineer",
      summary:
        "Contributed to the quality assurance of IDAMAN TSL West Java by conducting manual testing, end-to-end (E2E) testing using Playwright, and performance testing using JMeter. Tested key user flows and system functionality to identify issues, validate application behavior, and evaluate system performance under different loads.",
      architectureDetail:
        "Multi-layer verification combining Playwright E2E scripts, Jest unit assertions, Postman API checks, and Apache JMeter concurrency load testing.",
      techStack: ["Playwright", "Postman", "Jira", "Jest", "JMeter"],
      statusLabel: "INTERNAL // CONFIDENTIAL",
      layoutType: "featured",
      githubUrl: null,
      liveUrl: null,
      featuredOnHome: true,
      sortOrder: 3,
    },
    {
      slug: "gemarawana",
      missionCode: "04",
      title: "Gemarawana",
      role: "Full-Stack Developer",
      summary:
        "Developed the Gemarawana official website as a full-stack developer from initial planning and development to deployment. Built the website using Next.js and PostgreSQL, implementing dynamic content and organizational information while ensuring a responsive and user-friendly experience. Managed the application deployment and production environment using Vercel.",
      architectureDetail:
        "Next.js App Router with TypeScript, PostgreSQL database integration, Tailwind CSS styling, and production delivery on Vercel.",
      techStack: ["Next.js", "Tailwind CSS", "TypeScript", "PostgreSQL", "Vercel"],
      statusLabel: "PUBLIC // LIVE DEPLOYMENT",
      layoutType: "wide",
      githubUrl: null,
      liveUrl: "https://www.gemarawana.or.id/",
      featuredOnHome: true,
      sortOrder: 4,
    },
    {
      slug: "hikepass",
      missionCode: "05",
      title: "HikePass",
      role: "Mobile Engineer",
      summary:
        "Mobile Engineer on HikePass, developing mobile application features using Flutter and integrating backend services with Firebase. Utilized Postman for API testing and validation to ensure smooth data exchange and reliable application functionality.",
      architectureDetail:
        "Cross-platform Flutter mobile architecture integrated with Firebase Auth/Firestore and verified via Postman endpoint suites.",
      techStack: ["Flutter", "Firebase", "Postman"],
      statusLabel: "PUBLIC // OPEN SOURCE",
      layoutType: "standard",
      githubUrl: "https://github.com/hikepassapp/hikepassApp",
      liveUrl: null,
      featuredOnHome: true,
      sortOrder: 5,
    },
    {
      slug: "cms-hikepass",
      missionCode: "06",
      title: "CMS HikePass",
      role: "Full-Stack Developer",
      summary:
        "Developed an admin dashboard to manage application data and administrative processes using Vue.js, Laravel, MySQL, and Bootstrap. Contributed to frontend and backend development, implementing data management features and integrating the user interface with backend services and database operations.",
      architectureDetail:
        "Vue.js administrative interface connected to Laravel REST controllers and MySQL relational tables.",
      techStack: ["Vue.js", "Bootstrap", "Laravel", "MySQL", "PHP"],
      statusLabel: "PUBLIC // OPEN SOURCE",
      layoutType: "standard",
      githubUrl: "https://github.com/hikepassapp/hikepassWeb-Vue.git",
      liveUrl: null,
      featuredOnHome: true,
      sortOrder: 6,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  // 3. Experiences (Preserving all 4 live Supabase records)
  const experiences = [
    {
      slug: "telkom-indonesia-quality-assurance",
      role: "Quality Assurance",
      organization: "TELKOM INDONESIA",
      period: "Agustus 2026 - Sekarang",
      location: "Bandung, Indonesia",
      description:
        "Conduct feature testing to ensure the application functions according to requirements and specifications. Identify, document, and report bugs and defects found during the testing process. Perform regression testing to ensure that changes or new features do not affect existing functionality.",
      tags: ["Quality Assurance", "Functional Testing", "Regression Testing"],
      featuredOnHome: true,
      sortOrder: 1,
    },
    {
      slug: "telkom-university-practicum-assistant-informatic-lab",
      role: "Practicum Assistant of Informatic Lab",
      organization: "TELKOM UNIVERSITY",
      period: "Sep 2025 - Sekarang",
      location: "Bandung, Indonesia",
      description:
        "Help develop students’ problem-solving skills during lab sessions. Provide guidance on programming concepts using Go, Java, C, and C++. Ensure academic integrity during exams in accordance with applicable regulations.",
      tags: ["Go", "Java", "C", "C++", "Problem Solving"],
      featuredOnHome: true,
      sortOrder: 2,
    },
    {
      slug: "telkom-indonesia-uiux-design-qa",
      role: "UI/UX and Design Quality Assurance",
      organization: "TELKOM INDONESIA",
      period: "Juni 2026 - Agustus 2026",
      location: "Bandung, Indonesia",
      description:
        "Review the UI implementation to ensure it aligns with the design, design system, and specifications. Identify and document visual and interaction inconsistencies. Ensure design consistency and the quality of the user experience (UX) across all app features.",
      tags: ["Design QA", "UI/UX", "Design System", "Playwright"],
      featuredOnHome: true,
      sortOrder: 3,
    },
    {
      slug: "telkom-university-lecturer-assistant-data-structures",
      role: "Lecturer Assistant for the Data Structures Course",
      organization: "TELKOM UNIVERSITY",
      period: "Sep 2025 - Jan 2026",
      location: "Bandung, Indonesia",
      description:
        "Conducting review sessions to help students deepen their understanding of data structures. Evaluating students’ exams, assignments, and programming projects based on assessment rubrics. Guiding students through review sessions to reinforce their understanding of data structures.",
      tags: ["C++", "Single Linked List", "Multi Linked List", "Struktur Data"],
      featuredOnHome: true,
      sortOrder: 4,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { slug: exp.slug },
      update: {},
      create: exp,
    });
  }

  // 4. Education
  const educations = [
    {
      slug: "telkom-university-rpl",
      institution: "Telkom University",
      degree: "Bachelor of Software Engineering",
      fieldOfStudy: "S1 Rekayasa Perangkat Lunak",
      period: "SEP 2023 - PRESENT",
      metric: "GPA 3.76",
      description:
        "Software engineering architecture, data structures, automated quality assurance, and full-stack web and mobile development.",
      sortOrder: 1,
    },
    {
      slug: "mas-baitul-arqom-mipa",
      institution: "MAS Baitul Arqom",
      degree: "High School Diploma",
      fieldOfStudy: "Mathematics and Natural Sciences (MIPA)",
      period: "MAY 2020 - JUL 2023",
      metric: null,
      description:
        "Mathematics, natural sciences, and analytical problem-solving foundations.",
      sortOrder: 2,
    },
  ];

  for (const edu of educations) {
    await prisma.education.upsert({
      where: { slug: edu.slug },
      update: {},
      create: edu,
    });
  }

  // 5. Skills (granular Single Source of Truth)
  const skillGroups: Array<{ category: string; items: string[] }> = [
    {
      category: "Frontend",
      items: ["Next.js", "React", "Vue", "Flutter", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "Laravel",
        "ExpressJS",
        "FastAPI",
      ],
    },
    {
      category: "Quality Assurance",
      items: [
        "Playwright",
        "Katalon Studio",
        "Postman",
        "Cucumber",
        "k6",
        "JMeter",
        "Jest",
        "Vitest",
      ],
    },
    {
      category: "Design",
      items: ["Figma", "Canva"],
    },
    {
      category: "Other Tools",
      items: [
        "Git",
        "GitHub",
        "GitLab",
        "Jira",
        "Docker",
        "Kubernetes",
        "ArgoCD",
        "Grafana",
        "Microsoft Office",
      ],
    },
  ];

  let skillSort = 1;
  for (const group of skillGroups) {
    for (const name of group.items) {
      const slug = `${group.category}-${name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      await prisma.skill.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          category: group.category,
          name,
          specification: null,
          sortOrder: skillSort++,
        },
      });
    }
  }

  // 6. Certifications (Preserving all 4 live BLSDM Komdigi records from Supabase)
  const certifications = [
    {
      slug: "blsdm-komdigi-junior-web-developer",
      title: "Junior Web Developer",
      category: "Certification",
      issueDate: "2025",
      issuer: "BLSDM Komdigi",
      credentialId: null,
      description: "Certified Junior Web Developer",
      imageUrl:
        "https://cgfknwbuesjwyimkawsi.supabase.co/storage/v1/object/public/project-images/Achievement/1755740763181.jpg",
      tags: ["Web", "Programmer", "Developer"],
      verificationUrl: null,
      featuredOnHome: true,
      sortOrder: 1,
    },
    {
      slug: "blsdm-komdigi-introduction-cyber-security",
      title: "Introduction Cyber Security",
      category: "Certification",
      issueDate: "2025",
      issuer: "BLSDM Komdigi",
      credentialId: null,
      description: "Introduction to Cyber Security and Career Awareness",
      imageUrl:
        "https://cgfknwbuesjwyimkawsi.supabase.co/storage/v1/object/public/project-images/Achievement/1755227408392.jpg",
      tags: ["Cyber Security", "Career", "Malware"],
      verificationUrl: null,
      featuredOnHome: true,
      sortOrder: 2,
    },
    {
      slug: "blsdm-komdigi-introduction-cloud-computing",
      title: "Introduction Cloud Computing",
      category: "Certification",
      issueDate: "2025",
      issuer: "BLSDM Komdigi",
      credentialId: null,
      description: "Introduction To Cloud Computing",
      imageUrl:
        "https://cgfknwbuesjwyimkawsi.supabase.co/storage/v1/object/public/project-images/Achievement/1755000536661.jpg",
      tags: ["Cloud", "Server", "Network"],
      verificationUrl: null,
      featuredOnHome: true,
      sortOrder: 3,
    },
    {
      slug: "blsdm-komdigi-basic-artificial-intelligence",
      title: "Basic Artificial Intelligence",
      category: "Certification",
      issueDate: "2025",
      issuer: "BLSDM Komdigi",
      credentialId: null,
      description: "Dasar-Dasar Implementasi Kecerdasan Artifisial",
      imageUrl:
        "https://cgfknwbuesjwyimkawsi.supabase.co/storage/v1/object/public/project-images/Achievement/1755000317905.jpg",
      tags: ["AI", "Machine Learning", "Generative AI"],
      verificationUrl: null,
      featuredOnHome: true,
      sortOrder: 4,
    },
  ];

  for (const cert of certifications) {
    await prisma.certification.upsert({
      where: { slug: cert.slug },
      update: {},
      create: cert,
    });
  }

  // 7. Languages
  const languages = [
    {
      slug: "indonesian",
      name: "INDONESIAN",
      proficiency: "NATIVE",
      sortOrder: 1,
    },
    {
      slug: "english",
      name: "ENGLISH",
      proficiency: "INTERMEDIATE / WORKING PROFICIENCY",
      sortOrder: 2,
    },
    {
      slug: "arabic",
      name: "ARABIC",
      proficiency: "INTERMEDIATE",
      sortOrder: 3,
    },
  ];

  for (const lang of languages) {
    await prisma.language.upsert({
      where: { slug: lang.slug },
      update: {},
      create: lang,
    });
  }

  // 8. Gallery Items
  const galleryItems = [
    {
      slug: "fig-00-featured-showcase",
      code: "PRIMARY // 19:6",
      title: "Featured Field & Engineering Showcase",
      caption:
        "Primary 19:6 widescreen slot configured for panoramic photography or featured video.",
      category: "Featured Source",
      location: "Bandung, Indonesia",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "video",
      aspectRatio: "19:6",
      isFeatured: true,
      imageUrl: null,
      posterUrl: null,
      altText: "Primary 19:6 featured visual documentation frame",
      sortOrder: 0,
    },
    {
      slug: "fig-01-field-operations",
      code: "FIG // 01",
      title: "Field Operations Overview",
      caption:
        "2:1 landscape slot reserved for team activity and wide-angle field documentation.",
      category: "Field Archive",
      location: "Bandung, Indonesia",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "image",
      aspectRatio: "2:1",
      isFeatured: false,
      imageUrl: null,
      posterUrl: null,
      altText: "2:1 widescreen slot awaiting field photography",
      sortOrder: 1,
    },
    {
      slug: "fig-02-design-qa-review",
      code: "FIG // 02",
      title: "Design QA Review Session",
      caption:
        "1:1 square slot reserved for UI/UX Design Quality Assurance workflow documentation.",
      category: "Engineering",
      location: "Telkom Corporate University",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "image",
      aspectRatio: "1:1",
      isFeatured: false,
      imageUrl: null,
      posterUrl: null,
      altText: "1:1 square slot awaiting QA review capture",
      sortOrder: 2,
    },
    {
      slug: "fig-03-playwright-automation-bench",
      code: "FIG // 03",
      title: "Playwright Automation Bench",
      caption:
        "1:1 square slot reserved for automated E2E and performance testing environment.",
      category: "Engineering",
      location: "Bandung, Indonesia",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "image",
      aspectRatio: "1:1",
      isFeatured: false,
      imageUrl: null,
      posterUrl: null,
      altText: "1:1 square slot awaiting test automation capture",
      sortOrder: 3,
    },
    {
      slug: "fig-04-personnel-editorial-portrait",
      code: "FIG // 04",
      title: "Personnel Editorial Portrait",
      caption:
        "1:2 vertical portrait mounted from local asset archive (/assets/profile.jpg).",
      category: "Portrait",
      location: "Bandung, Indonesia",
      capturedDate: "2026",
      mediaType: "image",
      aspectRatio: "1:2",
      isFeatured: false,
      imageUrl: "/assets/profile.jpg",
      posterUrl: null,
      altText: "Monochrome portrait of Dewanta Rahma Satria",
      sortOrder: 4,
    },
    {
      slug: "fig-05-informatics-lab-practicum",
      code: "FIG // 05",
      title: "Informatics Lab Practicum",
      caption:
        "1:1 square slot reserved for Informatics Lab practicum and mentoring sessions.",
      category: "Academic",
      location: "Telkom University",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "image",
      aspectRatio: "1:1",
      isFeatured: false,
      imageUrl: null,
      posterUrl: null,
      altText: "1:1 square slot awaiting informatics lab photography",
      sortOrder: 5,
    },
    {
      slug: "fig-06-data-structures-review",
      code: "FIG // 06",
      title: "Data Structures Review",
      caption:
        "1:1 square slot reserved for Data Structures teaching assistant sessions.",
      category: "Academic",
      location: "Telkom University",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "image",
      aspectRatio: "1:1",
      isFeatured: false,
      imageUrl: null,
      posterUrl: null,
      altText: "1:1 square slot awaiting academic session photography",
      sortOrder: 6,
    },
    {
      slug: "fig-07-campus-organization-field-log",
      code: "FIG // 07",
      title: "Campus & Organization Field Log",
      caption:
        "1:2 vertical portrait slot reserved for outdoor and campus organization documentation.",
      category: "Field Archive",
      location: "West Java, Indonesia",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "image",
      aspectRatio: "1:2",
      isFeatured: false,
      imageUrl: null,
      posterUrl: null,
      altText: "1:2 vertical portrait slot awaiting organization photography",
      sortOrder: 7,
    },
    {
      slug: "fig-08-fullstack-deployment-sprint",
      code: "FIG // 08",
      title: "Full-Stack Deployment Sprint",
      caption:
        "1:1 square slot reserved for web and mobile release milestone captures.",
      category: "Engineering",
      location: "Bandung, Indonesia",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "image",
      aspectRatio: "1:1",
      isFeatured: false,
      imageUrl: null,
      posterUrl: null,
      altText: "1:1 square slot awaiting engineering sprint photography",
      sortOrder: 8,
    },
    {
      slug: "fig-09-conference-media-production",
      code: "FIG // 09",
      title: "Conference & Media Production",
      caption:
        "1:1 square slot reserved for event documentation and creative media production.",
      category: "Field Archive",
      location: "Bandung, Indonesia",
      capturedDate: "ARCHIVE SLOT",
      mediaType: "image",
      aspectRatio: "1:1",
      isFeatured: false,
      imageUrl: null,
      posterUrl: null,
      altText: "1:1 square slot awaiting media production photography",
      sortOrder: 9,
    },
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }

  // 9. RepoConfig (Singleton)
  await prisma.repoConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      githubUsername: "dewantars",
      maxRepos: 50,
      hiddenRepos: [],
      pinnedRepoNames: [],
    },
  });

  console.log("Idempotent seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
