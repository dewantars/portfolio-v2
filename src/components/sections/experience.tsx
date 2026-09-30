import { SectionLabel } from "@/components/ui/icons";

export function Experience() {
  return (
    <section
      className="experience section-pad section-divider reveal"
      id="experience"
    >
      <SectionLabel>EXPERIENCE</SectionLabel>
      <div className="section-heading-row">
        <h2>Experience</h2>
        <p>Learning through building, testing, and helping others understand.</p>
      </div>
      <div className="timeline">
        <article className="timeline-item">
          <div className="timeline-date">2026</div>
          <div className="timeline-main">
            <p className="organization">TELKOM CORPORATE UNIVERSITY</p>
            <h3>UI/UX &amp; Design Quality Assurance</h3>
            <p className="timeline-description">
              Performed design QA and software quality checks across web, SaaS,
              CMS, and mobile products, identifying UI inconsistencies and
              functional issues.
            </p>
            <div className="tag-row">
              {["Design QA", "Functional Testing", "UI/UX", "Playwright"].map(
                (tag) => (
                  <span key={tag}>{tag}</span>
                ),
              )}
            </div>
          </div>
          <div className="timeline-index">01</div>
        </article>
        <article className="timeline-item">
          <div className="timeline-date">2025</div>
          <div className="timeline-main">
            <p className="organization">UNIVERSITY ACADEMIC PROGRAM</p>
            <h3>Asisten Dosen Struktur Data</h3>
            <p className="timeline-description">
              Supported students in understanding core data structures and
              algorithmic thinking through practical sessions, reviews, and code
              discussions.
            </p>
            <div className="tag-row">
              {["Go", "Java", "C++", "Data Structures"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="timeline-index">02</div>
        </article>
      </div>
    </section>
  );
}
