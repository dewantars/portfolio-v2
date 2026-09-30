import {
  SectionLabel,
  MailIcon,
  FileTextIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
} from "@/components/ui/icons";

export function Contact() {
  return (
    <section
      className="contact section-pad section-divider reveal"
      id="contact"
    >
      <div className="contact-orb" />
      <SectionLabel>START A CONVERSATION</SectionLabel>
      <h2>
        Let&apos;s build something
        <br />
        <span>meaningful.</span>
      </h2>
      <p>
        Interested in software engineering, quality assurance, product
        development, or collaboration? Let&apos;s connect.
      </p>
      <div className="cta-row contact-actions">
        <a
          className="social-btn"
          href="mailto:dewantarahmasatria@gmail.com"
          aria-label="Email"
          title="Email"
        >
          <MailIcon />
        </a>

        <a
          className="social-btn social-btn-cv"
          href="/assets/cv.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="CV"
          title="Curriculum Vitae"
        >
          <FileTextIcon />
        </a>

        <a
          className="social-btn"
          href="https://instagram.com/dewanta_rs"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          title="Instagram"
        >
          <InstagramIcon />
        </a>

        <a
          className="social-btn"
          href="https://linkedin.com/in/dewantars"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <LinkedinIcon />
        </a>

        <a
          className="social-btn"
          href="https://github.com/dewantars"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <GithubIcon />
        </a>
      </div>
    </section>
  );
}
