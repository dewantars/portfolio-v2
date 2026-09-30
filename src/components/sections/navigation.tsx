"use client";

import { useState } from "react";

const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Dewanta, home">
          <span>Dewanta Rahma Satria</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </div>

        <div className="nav-socials">
          <a className="nav-cta-btn" href="#contact">
            Let&apos;s Connect
          </a>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a
            href={`#${item.toLowerCase()}`}
            key={item}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <div style={{ marginTop: "12px", paddingTop: "16px" }}>
          <a
            className="nav-cta-btn"
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{ width: "100%", justifyContent: "center" }}
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>
    </header>
  );
}
