import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with exact project data...')

  // 1. Profile tset
  await prisma.profile.deleteMany()
  await prisma.profile.create({
    data: {
      name: 'Dewanta Rahma Satria',
      headline: 'Software Engineer | QA Engineer | Intern at Telkom Indonesia | Student Telkom University',
      summary:
        'I am interested in software development, particularly in creating applications as a web and mobile developer, which I have been pursuing for the past few years.',
      photoUrl: '/assets/profile.jpg',
    },
  })
  console.log('Created Profile')

  // 2. Experiences
  await prisma.experience.deleteMany()
  await prisma.experience.createMany({
    data: [
      {
        role: 'UI/UX & Design Quality Assurance',
        company: 'TELKOM CORPORATE UNIVERSITY',
        period: '2026',
        description:
          'Performed design QA and software quality checks across web, SaaS, CMS, and mobile products, identifying UI inconsistencies and functional issues.',
        tags: ['Design QA', 'Functional Testing', 'UI/UX', 'Playwright'],
        order: 1,
      },
      {
        role: 'Asisten Dosen Struktur Data',
        company: 'UNIVERSITY ACADEMIC PROGRAM',
        period: '2025',
        description:
          'Supported students in understanding core data structures and algorithmic thinking through practical sessions, reviews, and code discussions.',
        tags: ['Go', 'Java', 'C++', 'Data Structures'],
        order: 2,
      },
    ],
  })
  console.log('Created Experiences')

  // 3. Projects
  await prisma.project.deleteMany()
  await prisma.project.createMany({
    data: [
      {
        number: '01',
        name: 'MyDigiLearn',
        role: 'QA Engineer Intern',
        description:
          'Contributed to the quality assurance of MyDigiLearn by performing manual and end-to-end (E2E) testing to validate application functionality and user flows. Developed automated E2E test scenarios using Playwright to improve test coverage, identify functional issues, and ensure consistent application behavior across key features.',
        stack: ['Manual', 'Playwright', 'Postman', 'k6', 'Jira'],
        type: 'standard',
        theme: 'violet',
        github: null,
        liveUrl: null,
        order: 1,
      },
      {
        number: '02',
        name: 'Quenza Conference',
        role: 'Full-Stack Engineer Intern',
        description:
          'Worked as a Remote Full-Stack Engineer on the development of the Quenza Conference website. Contributed to both frontend and backend development, implementing features such as event information, speaker details, registration, and other conference-related functionality while ensuring a responsive and reliable user experience.',
        stack: ['Laravel', 'React', 'PHP', 'Tailwind CSS', 'SQLite'],
        type: 'standard',
        theme: 'sky',
        github: null,
        liveUrl: null,
        order: 2,
      },
      {
        number: '03',
        name: 'IDAMAN TSL JABAR',
        role: 'QA Engineer',
        description:
          'Contributed to the quality assurance of IDAMAN TSL West Java by conducting manual testing, end-to-end (E2E) testing using Playwright, and performance testing using JMeter. Tested key user flows and system functionality to identify issues, validate application behavior, and evaluate system performance under different loads.',
        stack: ['Playwright', 'Postman', 'Jira', 'Jest', 'JMeter'],
        type: 'featured',
        theme: 'emerald',
        github: null,
        liveUrl: null,
        order: 3,
      },
      {
        number: '04',
        name: 'Gemarawana',
        role: 'Full-Stack Developer',
        description:
          'Developed the Gemarawana official website as a full-stack developer from initial planning and development to deployment. Built the website using Next.js and PostgreSQL, implementing dynamic content and organizational information while ensuring a responsive and user-friendly experience. Managed the application deployment and production environment using Vercel.',
        stack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'PostgreSQL', 'Vercel'],
        type: 'wide',
        theme: 'amber',
        github: null,
        liveUrl: 'https://www.gemarawana.or.id/',
        order: 4,
      },
      {
        number: '05',
        name: 'HikePass',
        role: 'Mobile Engineer',
        description:
          'Mobile Engineer on HikePass, developing mobile application features using Flutter and integrating backend services with Firebase. Utilized Postman for API testing and validation to ensure smooth data exchange and reliable application functionality.',
        stack: ['Flutter', 'Firebase', 'Postman'],
        type: 'standard',
        theme: 'sky',
        github: 'https://github.com/hikepassapp/hikepassApp',
        liveUrl: null,
        order: 5,
      },
      {
        number: '06',
        name: 'CMS HikePass',
        role: 'Full-Stack Developer',
        description:
          'Developed an admin dashboard to manage application data and administrative processes using Vue.js, Laravel, MySQL, and Bootstrap. Contributed to frontend and backend development, implementing data management features and integrating the user interface with backend services and database operations.',
        stack: ['Vue.js', 'Bootstrap', 'Laravel', 'MySQL', 'PHP'],
        type: 'standard',
        theme: 'green',
        github: 'https://github.com/hikepassapp/hikepassWeb-Vue.git',
        liveUrl: null,
        order: 6,
      },
    ],
  })
  console.log('Created Projects')

  // 4. Skill Groups
  await prisma.skillGroup.deleteMany()
  await prisma.skillGroup.createMany({
    data: [
      {
        title: 'Frontend',
        skills: ['Next.js', 'React', 'Vue', 'Flutter', 'Tailwind CSS'],
        order: 1,
      },
      {
        title: 'Backend',
        skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Laravel', 'ExpressJS', 'FastAPI'],
        order: 2,
      },
      {
        title: 'Quality Assurance',
        skills: ['Playwright', 'Katalon Studio', 'Postman', 'Cucumber', 'k6', 'JMeter', 'Jest', 'Vitest'],
        order: 3,
      },
      {
        title: 'Design',
        skills: ['Figma', 'Canva'],
        order: 4,
      },
      {
        title: 'Other Tools',
        skills: ['Git', 'GitHub', 'GitLab', 'Jira', 'Docker', 'Kubernetes', 'ArgoCD', 'Grafana', 'Microsoft Office'],
        order: 5,
      },
    ],
  })
  console.log('Created Skill Groups')

  // 5. Achievements
  await prisma.achievement.deleteMany()
  await prisma.achievement.createMany({
    data: [
      {
        title: 'Software Engineering & QA Certification',
        category: 'Certification',
        date: '2025',
        issuer: 'Certification Authority',
        description: 'Certified in Software Engineering Rigor, Automated Testing, and System Quality Assurance.',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop',
        tags: ['QA', 'Testing', 'Certification'],
        credentialUrl: null,
        order: 1,
      },
      {
        title: 'Telkom Indonesia Internship Recognition',
        category: 'Telkom Indonesia',
        date: '2025',
        issuer: 'Telkom Indonesia',
        description: 'Recognized for outstanding contribution in QA testing and web software delivery.',
        image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=800&auto=format&fit=crop',
        tags: ['Internship', 'Recognition', 'Telkom'],
        credentialUrl: null,
        order: 2,
      },
      {
        title: 'Telkom University Academic Excellence',
        category: 'Telkom University',
        date: '2024',
        issuer: 'Telkom University',
        description: 'Academic distinction in Software Engineering coursework and capstone project execution.',
        image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=800&auto=format&fit=crop',
        tags: ['Academic', 'Excellence', 'Telkom University'],
        credentialUrl: null,
        order: 3,
      },
      {
        title: 'Test Automation & Quality Engineering Badge',
        category: 'Certification',
        date: '2024',
        issuer: 'Certification Authority',
        description: 'Advanced proficiency in Playwright, Selenium, and automated regression test suites.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
        tags: ['Automation', 'Playwright', 'Selenium'],
        credentialUrl: null,
        order: 4,
      },
      {
        title: 'National Software & QA Competition Award',
        category: 'Award',
        date: '2023',
        issuer: 'National Tech Committee',
        description: 'Awarded top honor in software reliability, code quality, and UI/UX design QA.',
        image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=800&auto=format&fit=crop',
        tags: ['Award', 'Competition', 'Quality'],
        credentialUrl: null,
        order: 5,
      },
    ],
  })
  console.log('Created Achievements')

  // 6. Social Links
  await prisma.socialLink.deleteMany()
  await prisma.socialLink.createMany({
    data: [
      {
        platform: 'Email',
        label: 'dewantarahmasatria@gmail.com',
        url: 'mailto:dewantarahmasatria@gmail.com',
        icon: 'MailIcon',
        order: 1,
      },
      {
        platform: 'CV / Resume',
        label: 'Curriculum Vitae',
        url: '/assets/cv.pdf',
        icon: 'FileTextIcon',
        order: 2,
      },
      {
        platform: 'Instagram',
        label: '@dewanta_rs',
        url: 'https://instagram.com/dewanta_rs',
        icon: 'InstagramIcon',
        order: 3,
      },
      {
        platform: 'LinkedIn',
        label: 'Dewanta Rahma Satria',
        url: 'https://linkedin.com/in/dewantars',
        icon: 'LinkedinIcon',
        order: 4,
      },
      {
        platform: 'GitHub',
        label: 'dewantars',
        url: 'https://github.com/dewantars',
        icon: 'GithubIcon',
        order: 5,
      },
    ],
  })
  console.log('Created Social Links')

  console.log('Seeding with exact original data completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
