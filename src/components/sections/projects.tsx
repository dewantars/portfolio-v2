import { Arrow, SectionLabel } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

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

const themeGradients: Record<string, string> = {
  violet: "bg-[radial-gradient(circle_at_65%_30%,#241c2a,#0a090c_60%)]",
  sky: "bg-[radial-gradient(circle_at_30%_40%,#14242b,#090b0c_60%)]",
  emerald: "bg-[radial-gradient(circle_at_30%_70%,#14241e,#090b0a_60%)]",
  amber: "bg-[radial-gradient(circle_at_70%_40%,#272116,#0c0b08_60%)]",
  green: "bg-[radial-gradient(circle_at_50%_50%,#11231a,#090b0a_60%)]",
};

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        "min-h-[340px] lg:min-h-[400px] p-6 lg:p-[50px] flex items-center overflow-hidden relative bg-[#0c0c0d]",
        themeGradients[project.theme] || themeGradients.violet
      )}
    >
      <div className="relative w-full max-w-[660px] mx-auto border border-white/15 rounded-xl bg-[#0b0c0e] shadow-[0_30px_70px_rgba(0,0,0,0.5)] [transform:perspective(900px)_rotateX(2deg)_rotateY(-3deg)] group-hover:[transform:perspective(900px)_rotateX(0)_rotateY(0)_scale(1.02)] transition-transform duration-400 overflow-hidden">
        <div className="h-9 px-4 flex items-center justify-between border-b border-white/10 bg-[#0e0f12]">
          <div className="flex items-center gap-[7px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <b className="text-[10px] tracking-[0.14em] text-[#666666] font-semibold">{project.number} / CASE STUDY</b>
        </div>
        <div className="min-h-[220px] p-[18px] grid grid-cols-[54px_1fr] gap-[18px] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]">
          <div className="flex flex-col gap-2.5 py-1">
            <i className="w-[18px] h-[18px] rounded-[5px] bg-white/15 block" />
            <i className="w-[18px] h-[18px] rounded-[5px] bg-white/10 block" />
            <i className="w-[18px] h-[18px] rounded-[5px] bg-white/10 block" />
            <i className="w-[18px] h-[18px] rounded-[5px] bg-white/10 block" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[9px] tracking-[0.16em] text-[#777777] font-medium">WORKSPACE OVERVIEW</div>
            <div className="w-[130px] h-3 rounded bg-white/20" />
            <div className="grid grid-cols-3 gap-2 my-1">
              <span className="h-10 rounded-md border border-white/10 bg-white/[0.04]" />
              <span className="h-10 rounded-md border border-white/10 bg-white/[0.04]" />
              <span className="h-10 rounded-md border border-white/10 bg-white/[0.04]" />
            </div>
            <div className="h-20 p-2.5 rounded-lg border border-white/10 bg-white/[0.03] flex items-end gap-2">
              <i className="flex-1 bg-white/20 rounded-t h-[40%]" />
              <i className="flex-1 bg-white/20 rounded-t h-[75%]" />
              <i className="flex-1 bg-white/20 rounded-t h-[55%]" />
              <i className="flex-1 bg-white/20 rounded-t h-[90%]" />
              <i className="flex-1 bg-white/20 rounded-t h-[60%]" />
              <i className="flex-1 bg-white/20 rounded-t h-[80%]" />
              <i className="flex-1 bg-white/20 rounded-t h-[45%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section className="max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10" id="projects">
      <div className="reveal">
        <SectionLabel>SELECTED WORK</SectionLabel>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-[60px] mb-14 lg:mb-[88px]">
          <h2 className="m-0 text-[43px] md:text-[clamp(45px,5.6vw,78px)] leading-[1.04] tracking-[-0.05em] font-medium text-[#fafafa]">
            A collection of projects
            <br />
            I&apos;ve worked on.
          </h2>
          <p className="max-w-[380px] mb-1 text-[#999999] leading-[1.6]">
            A selection of products shaped through engineering, quality, and
            close attention to people.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {projects.map((project) => (
          <article
            className={cn(
              "min-w-0 border border-white/10 rounded-[20px] bg-[#0a0a0a] overflow-hidden transition-all duration-350 hover:-translate-y-1.5 hover:border-white/20 group reveal",
              project.type === "featured" && "lg:col-span-full lg:grid lg:grid-cols-[1.4fr_0.6fr]",
              project.type === "wide" && "lg:col-span-full lg:grid lg:grid-cols-[0.8fr_1.2fr]"
            )}
            key={project.name}
          >
            <ProjectVisual project={project} />
            <div className="p-6 lg:p-8 flex flex-col justify-between gap-10 lg:gap-14 border-t border-white/10 lg:border-t-0">
              <div>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-[#666666] text-xs font-semibold tracking-[0.1em]">{project.number}</span>
                  <span className="text-[#888888] text-[11px] font-medium tracking-[0.03em] px-2 py-[3px] rounded-md bg-white/[0.05] border border-white/[0.08]">
                    {project.role}
                  </span>
                </div>
                <h3 className="m-0 mb-3.5 text-2xl lg:text-[28px] font-medium tracking-[-0.02em] text-[#fafafa]">
                  {project.name}
                </h3>
                <p className="text-[#999999] text-sm md:text-[15px] leading-[1.65] m-0">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-col gap-5 pt-5 border-t border-white/10">
                <div className="flex flex-wrap gap-[7px]">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-[7px] text-[#aaaaaa] text-[10px] border border-white/10 rounded-full bg-[#0b0b0b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-[#bbbbbb] text-xs hover:text-white transition-colors duration-200"
                    >
                      GitHub <Arrow diagonal />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-[#bbbbbb] text-xs hover:text-white transition-colors duration-200"
                    >
                      Live Demo <Arrow diagonal />
                    </a>
                  )}
                  {!project.github && !project.liveUrl && (
                    <span className="inline-flex items-center gap-1.5 text-[#666666] text-[11px] tracking-[0.03em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#555555]" /> Confidential / Internal Project
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
