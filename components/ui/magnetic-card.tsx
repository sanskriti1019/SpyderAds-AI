"use client";

import { useEffect, useRef } from "react";

/**
 * Adds a subtle 3D magnetic tilt effect to any wrapped element.
 * On mousemove, the card tilts toward the cursor for a premium depth feel.
 */
export function MagneticCard({
  children,
  className = "",
  intensity = 8,
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
      const rx = dy * intensity;
      const ry = -dx * intensity;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
      // Inner highlight follows cursor
      const shine = el.querySelector<HTMLDivElement>(".card-shine");
      if (shine) {
        shine.style.opacity = "1";
        shine.style.background = `radial-gradient(circle at ${((dx + 1) / 2) * 100}% ${((dy + 1) / 2) * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
      }
    };

    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
      const shine = el.querySelector<HTMLDivElement>(".card-shine");
      if (shine) shine.style.opacity = "0";
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
      className={`relative card-magnetic overflow-hidden ${className}`}
      style={{ willChange: "transform", transition: "transform 0.18s cubic-bezier(0.23,1,0.32,1)" }}
    >
      {/* Shine overlay */}
      <div
        className="card-shine absolute inset-0 pointer-events-none z-10 rounded-[inherit] opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
