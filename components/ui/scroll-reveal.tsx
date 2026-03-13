"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Attaches an Intersection Observer to .reveal elements inside the container.
 * Re-observes whenever pathname changes (page navigation) or children change.
 */
export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    // Small delay to let React finish painting new children
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -48px 0px", threshold: 0.08 }
      );

      const targets = root.querySelectorAll(".reveal:not(.is-visible)");
      targets.forEach((el) => obs.observe(el));

      return () => obs.disconnect();
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return <div ref={ref}>{children}</div>;
}
