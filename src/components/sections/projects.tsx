import { Arrow, SectionLabel } from "@/components/ui/icons";

interface Project {
  number: string;
  name: string;
  role: string;
  description: string;
  stack: string[];
  type: string;
  theme: string;
  github?: string | null;
  liveUrl?: string | null;
}

const projects: Project[] = [
  {
    number: "01",
    name: "MyDigiLearn",
    role: "QA Engineer Intern",
    description:
      "Contributed to the quality assurance of MyDigiLearn by performing manual and end-to-end (E2E) testing to validate application functionality and user flows. Developed automated E2E test scenarios using Playwright to improve test coverage, identify functional issues, and ensure consistent application behavior across key features.",
    stack: ["Manual", "Playwright", "Postman", "k6", "Jira"],
    type: "standard",
    theme: "violet",
    github: null,
    liveUrl: null,
  },
  {
    number: "02",
    name: "Quenza Conference",
    role: "Full-Stack Engineer Intern",
    description:
      "Worked as a Remote Full-Stack Engineer on the development of the Quenza Conference website. Contributed to both frontend and backend development, implementing features such as event information, speaker details, registration, and other conference-related functionality while ensuring a responsive and reliable user experience.",
    stack: ["Laravel", "React", "PHP", "Tailwind CSS", "SQLite"],
    type: "standard",
    theme: "sky",
    github: null,
    liveUrl: null,
  },
  {
    number: "03",
    name: "IDAMAN TSL JABAR",
    role: "QA Engineer",
    description:
      "Contributed to the quality assurance of IDAMAN TSL West Java by conducting manual testing, end-to-end (E2E) testing using Playwright, and performance testing using JMeter. Tested key user flows and system functionality to identify issues, validate application behavior, and evaluate system performance under different loads.",
    stack: ["Playwright", "Postman", "Jira", "Jest", "JMeter"],
    type: "featured",
    theme: "emerald",
    github: null,
    liveUrl: null,
  },
  {
    number: "04",
    name: "Gemarawana",
    role: "Full-Stack Developer",
    description:
      "Developed the Gemarawana official website as a full-stack developer from initial planning and development to deployment. Built the website using Next.js and PostgreSQL, implementing dynamic content and organizational information while ensuring a responsive and user-friendly experience. Managed the application deployment and production environment using Vercel.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "PostgreSQL", "Vercel"],
    type: "wide",
    theme: "amber",
    github: null,
    liveUrl: "https://www.gemarawana.or.id/",
  },
  {
    number: "05",
    name: "HikePass",
    role: "Mobile Engineer",
    description:
      "Mobile Engineer on HikePass, developing mobile application features using Flutter and integrating backend services with Firebase. Utilized Postman for API testing and validation to ensure smooth data exchange and reliable application functionality.",
    stack: ["Flutter", "Firebase", "Postman"],
    type: "standard",
    theme: "sky",
    github: "https://github.com/hikepassapp/hikepassApp",
    liveUrl: null,
  },
  {
    number: "06",
    name: "CMS HikePass",
    role: "Full-Stack Developer",
    description:
      "Developed an admin dashboard to manage application data and administrative processes using Vue.js, Laravel, MySQL, and Bootstrap. Contributed to frontend and backend development, implementing data management features and integrating the user interface with backend services and database operations.",
    stack: ["Vue.js", "Bootstrap", "Laravel", "MySQL", "PHP"],
    type: "standard",
    theme: "green",
    github: "https://github.com/hikepassapp/hikepassWeb-Vue.git",
    liveUrl: null,
  }
];

function ProjectVisual({
  project,
}: {
  project: Project;
}) {
  return (
    <div className={`project-visual visual-${project.theme}`}>
      <div className="mock-window">
        <div className="mock-top">
          <span />
          <span />
          <span />
          <b>{project.number} / CASE STUDY</b>
        </div>
        <div className="mock-body">
          <div className="mock-sidebar">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="mock-content">
            <div className="mock-eyebrow">WORKSPACE OVERVIEW</div>
            <div className="mock-title" />
            <div className="mock-stats">
              <span />
              <span />
              <span />
            </div>
            <div className="mock-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section className="projects section-pad section-divider" id="projects">
      <div className="reveal">
        <SectionLabel>SELECTED WORK</SectionLabel>
        <div className="section-heading-row">
          <h2>
            A collection of projects
            <br />
            I&apos;ve worked on.
          </h2>
          <p>
            A selection of products shaped through engineering, quality, and
            close attention to people.
          </p>
        </div>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article
            className={`project-card ${project.type} reveal`}
            key={project.name}
          >
            <ProjectVisual project={project} />
            <div className="project-info">
              <div>
                <div className="project-header">
                  <span className="project-number">{project.number}</span>
                  <span className="project-role">{project.role}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-footer">
                <div className="tag-row">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub <Arrow diagonal />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo <Arrow diagonal />
                    </a>
                  )}
                  {!project.github && !project.liveUrl && (
                    <span className="project-confidential">
                      <span className="confidential-dot" /> Confidential / Internal Project
                    </span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
