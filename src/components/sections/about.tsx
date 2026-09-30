import { SectionLabel } from "@/components/ui/icons";

export function About() {
  return (
    <section className="about section-pad section-divider reveal" id="about">
      <SectionLabel>ABOUT ME</SectionLabel>
      <div className="editorial-grid">
        <h2>
          I build software with a strong focus on quality, usability, and
          detail.
        </h2>
        <div className="about-copy">
          <p>
            Hello! I&apos;m Dewanta, a Software Engineering student focused on building
            reliable, well-crafted digital experiences.

          </p>
          <p>
            I build software where engineering precision meets thoughtful design,
            with a focus on quality, usability, and reliability.
          </p>
        </div>
      </div>
      <div className="metadata-grid">
        {[
          "Software Engineering Student",
          "Quality Assurance",
          "Software Engineer",
          "UI/UX Designer",
        ].map((item, index) => (
          <div className="meta-card" key={item}>
            <span>0{index + 1}</span>
            <p>{item}</p>
            <div className="meta-dot" />
          </div>
        ))}
      </div>
    </section>
  );
}
