"use client";

import { useEffect } from "react";

/**
 * Client component that activates IntersectionObserver-based
 * scroll reveal animations for elements with the `.reveal` class.
 * Renders nothing — purely a side-effect component.
 */
export function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
