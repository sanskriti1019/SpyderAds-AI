"use client";

import { useEffect, useRef } from "react";

/**
 * Adds a subtle 3D magnetic tilt effect to any wrapped element.
 * On mousemove, the card tilts toward the cursor for a premium depth feel.
 */
export function MagneticCard({
  children,
  className = "",
  intensity = 5, // Lowered for more professional, subtle feel
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      
      // Buttery Physics
      const rx = dy * intensity;
      const ry = -dx * intensity;
      
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      
      // Advanced Multi-Layer Shine
      const shine = el.querySelector<HTMLDivElement>(".card-shine");
      const spotlight = el.querySelector<HTMLDivElement>(".card-spotlight");
      
      const xPct = ((dx + 1) / 2) * 100;
      const yPct = ((dy + 1) / 2) * 100;

      if (shine) {
        shine.style.opacity = "1";
        shine.style.background = `radial-gradient(400px circle at ${xPct}% ${yPct}%, rgba(255,255,255,0.15) 0%, transparent 80%)`;
      }
      if (spotlight) {
        spotlight.style.opacity = "1";
        spotlight.style.background = `radial-gradient(1000px circle at ${xPct}% ${yPct}%, rgba(110,44,44,0.03) 0%, transparent 60%)`;
      }
    };

    const onLeave = () => {
      el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
      const shine = el.querySelector<HTMLDivElement>(".card-shine");
      const spotlight = el.querySelector<HTMLDivElement>(".card-spotlight");
      if (shine) shine.style.opacity = "0";
      if (spotlight) spotlight.style.opacity = "0";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={`relative rounded-[2rem] border border-border/60 bg-card designer-shadow transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${className}`}
      style={{ willChange: "transform, box-shadow" }}
    >
      {/* 1. Subtle Spotlight Background */}
      <div
        className="card-spotlight absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-700 mix-blend-multiply"
        aria-hidden="true"
      />
      
      {/* 2. Razor Shine Overlay */}
      <div
        className="card-shine absolute inset-0 pointer-events-none z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 mix-blend-soft-light"
        aria-hidden="true"
      />
      
      <div className="relative z-10">{children}</div>
      
      {/* 3. Designer Inset Border */}
      <div className="absolute inset-[1px] rounded-[1.95rem] border border-white/40 pointer-events-none z-10" />
    </div>
  );
}
