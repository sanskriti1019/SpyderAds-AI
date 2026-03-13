"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { useActiveBrand, PrimaryBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

const BRANDS: PrimaryBrand[] = ["BeBodywise", "Man Matters", "Little Joys"];

const BRAND_COLORS: Record<PrimaryBrand, string> = {
  "BeBodywise":  "#7C4A4A",
  "Man Matters": "#3A5A6E",
  "Little Joys": "#5A7A4A",
};

/**
 * Brand selector with a sliding background "pill" that animates
 * to the active brand — true spring-based smooth transition.
 */
export function BrandSelector() {
  const { activeBrand, setActiveBrand } = useActiveBrand();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  // Measure and animate pill position to active button
  useLayoutEffect(() => {
    const activeIndex = BRANDS.indexOf(activeBrand);
    const btn = buttonRefs.current[activeIndex];
    const container = containerRef.current;
    if (!btn || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setPillStyle({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
      opacity: 1,
    });
  }, [activeBrand]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-0 rounded-xl border border-border bg-beige/40 p-1 backdrop-blur-sm shadow-inner"
    >
      {/* Sliding pill background */}
      <div
        className="absolute top-1 bottom-1 rounded-lg bg-card border border-border/60 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
        style={{
          left: pillStyle.left,
          width: pillStyle.width,
          opacity: pillStyle.opacity,
        }}
      >
        {/* Subtle color glow matching active brand */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-15 transition-all duration-500"
          style={{
            background: `radial-gradient(circle at center, ${BRAND_COLORS[activeBrand]} 0%, transparent 70%)`,
          }}
        />
      </div>

      {BRANDS.map((brand, i) => {
        const isActive = activeBrand === brand;
        return (
          <button
            key={brand}
            ref={(el) => { buttonRefs.current[i] = el; }}
            onClick={() => setActiveBrand(brand)}
            className={cn(
              "relative z-10 px-5 py-1.5 rounded-lg text-xs font-bold tracking-wider",
              "transition-colors duration-200 ease-out select-none btn-press",
              isActive
                ? "text-maroon"
                : "text-soft-black/55 hover:text-soft-black"
            )}
          >
            {/* Active pulse dot */}
            {isActive && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-maroon opacity-40" />
                <span className="relative rounded-full h-2 w-2 bg-maroon" />
              </span>
            )}
            {brand}
          </button>
        );
      })}
    </div>
  );
}
