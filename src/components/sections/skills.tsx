import { SectionLabel } from "@/components/ui/icons";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "Vue", "Flutter", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "NestJS", "PostgreSQL", "Prisma", "Laravel", "ExpressJS", "FastAPI"],
  },
  {
    title: "Quality Assurance",
    skills: ["Playwright", "Katalon Studio", "Postman", "Cucumber", "k6", "JMeter", "Jest", "Vitest"],
  },
  { title: "Design", skills: ["Figma", "Canva"] },
  { title: "Other Tools", skills: ["Git", "GitHub", "GitLab", "Jira", "Docker", "Kubernetes", "ArgoCD", "Grafana", "Microsoft Office"] },
];

export function Skills() {
  return (
    <section
      className="skills section-pad section-divider reveal"
      id="skills"
    >
      <SectionLabel>CAPABILITIES</SectionLabel>
      <div className="section-heading-row">
        <h2>Tools I work with</h2>
        <p>
          A practical toolkit for taking products from first idea to confident
          release.
        </p>
      </div>
      <div className="skill-list">
        {skillGroups.map((group, groupIndex) => (
          <div className="skill-row" key={group.title}>
            <div className="skill-title">
              <span>0{groupIndex + 1}</span>
              {group.title}
            </div>
            <div className="skill-pills">
              {group.skills.map((skill) => (
                <div className="skill-pill" key={skill}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
