"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an Intersection Observer to .reveal elements inside the container.
 * When they enter the viewport, adds .is-visible which triggers CSS transitions.
 */
export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    const targets = root.querySelectorAll(".reveal");
    targets.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [children]);

  return <div ref={ref}>{children}</div>;
}
