"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps page content with a smooth fade+slide enter animation
 * triggered on every route change.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Remove class, force reflow, re-add
    el.classList.remove("page-enter");
    void el.offsetHeight; // reflow
    el.classList.add("page-enter");
  }, [pathname]);

  return (
    <div ref={ref} className="page-enter w-full">
      {children}
    </div>
  );
}
