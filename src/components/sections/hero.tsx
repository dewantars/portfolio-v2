import Image from "next/image";
import { Arrow } from "@/components/ui/icons";

export function Hero() {
  return (
    <section className="hero section-pad" id="hero">
      <div className="hero-container">
        {/* LEFT COLUMN: Intro & CTA */}
        <div className="hero-left reveal">
          {/* <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>SOFTWARE ENGINEERING STUDENT</span>
          </div> */}

          <h1 className="hero-name">Dewanta Rahma Satria</h1>

          <div className="hero-summary-wrap">
            <p className="hero-summary-primary">
              I am interested in software development,
              particularly in creating applications as a web and mobile developer,
              which I have been pursuing for the past few years.
            </p>
            <p className="hero-summary-secondary">
              Software Engineer | QA Engineer | Intern at Telkom Indonesia | Student Telkom University
            </p>
          </div>

          <div className="cta-row">
            <a className="button button-primary" href="#projects">
              View My Work <Arrow />
            </a>
            <a className="button button-secondary" href="#contact">
              Let&apos;s Connect
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Photo & Visual Treatment */}
        <div className="hero-right reveal">
          <div className="hero-photo-wrapper">
            <div className="photo-backdrop-glow" />
            <div className="photo-backdrop-grid" />

            <div className="photo-card">
              <Image
                src="/assets/profile.jpg"
                alt="Portrait of Dewanta Rahma Satria"
                width={440}
                height={550}
                priority
                unoptimized
                className="hero-photo"
              />
              <div className="photo-overlay-gradient" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

