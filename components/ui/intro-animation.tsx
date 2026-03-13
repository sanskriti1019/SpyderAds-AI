"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [fadeout, setFadeout] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);

  useEffect(() => {
    // Text entrance timings
    const t1 = setTimeout(() => setTextVisible(true), 900);
    const t2 = setTimeout(() => setTaglineVisible(true), 1300);
    // Start fade-out
    const t3 = setTimeout(() => setFadeout(true), 2700);
    // Unmount fully
    const t4 = setTimeout(() => setShow(false), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream",
        "transition-all duration-600 ease-out",
        fadeout ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100 scale-100"
      )}
      style={{ transitionDuration: "600ms" }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Ambient glow behind logo */}
        <div className="absolute w-64 h-64 rounded-full bg-maroon/8 blur-3xl animate-pulse" />

        {/* Spider Web SVG Logo */}
        <div className="relative w-36 h-36 mb-8 z-10">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-maroon"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Web structure — animates drawing in */}
            <g className="animate-web-form origin-center">
              {/* 8 radial spokes */}
              <line x1="50" y1="50" x2="50" y2="4" />
              <line x1="50" y1="50" x2="96" y2="50" />
              <line x1="50" y1="50" x2="50" y2="96" />
              <line x1="50" y1="50" x2="4" y2="50" />
              <line x1="50" y1="50" x2="83" y2="17" />
              <line x1="50" y1="50" x2="83" y2="83" />
              <line x1="50" y1="50" x2="17" y2="83" />
              <line x1="50" y1="50" x2="17" y2="17" />
              {/* 3 concentric rings */}
              <polygon points="50,18 68,24 76,42 75,62 65,76 46,80 28,71 20,52 22,32 36,20" opacity="0.9" />
              <polygon points="50,30 62,34 68,46 66,58 57,65 44,66 33,59 29,48 32,37 41,31" opacity="0.8" />
              <polygon points="50,39 57,42 60,50 57,58 50,61 43,58 40,50 43,42" opacity="0.85" />
            </g>

            {/* Spider — drops in from above with spring overshoot */}
            <g className="animate-spider-appear" fill="currentColor">
              {/* Thread */}
              <line x1="50" y1="4" x2="50" y2="44" strokeWidth="0.8" opacity="0.5" />
              {/* Abdomen */}
              <ellipse cx="50" cy="51" rx="5" ry="6" />
              {/* Head */}
              <circle cx="50" cy="43.5" r="3" />
              {/* Eyes */}
              <circle cx="48.5" cy="42.5" r="0.7" fill="white" />
              <circle cx="51.5" cy="42.5" r="0.7" fill="white" />
              {/* Left legs */}
              <path d="M46 47 Q40 44 36 46" strokeWidth="1" fill="none" stroke="currentColor" />
              <path d="M46 50 Q39 49 35 52" strokeWidth="1" fill="none" stroke="currentColor" />
              <path d="M46 53 Q40 55 37 60" strokeWidth="1" fill="none" stroke="currentColor" />
              <path d="M47 44 Q42 39 39 35" strokeWidth="1" fill="none" stroke="currentColor" />
              {/* Right legs */}
              <path d="M54 47 Q60 44 64 46" strokeWidth="1" fill="none" stroke="currentColor" />
              <path d="M54 50 Q61 49 65 52" strokeWidth="1" fill="none" stroke="currentColor" />
              <path d="M54 53 Q60 55 63 60" strokeWidth="1" fill="none" stroke="currentColor" />
              <path d="M53 44 Q58 39 61 35" strokeWidth="1" fill="none" stroke="currentColor" />
            </g>
          </svg>
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-serif font-bold text-soft-black tracking-tight z-10 relative"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          SpyderAds <span className="text-maroon">AI</span>
        </h1>

        {/* Divider */}
        <div
          className="w-16 h-[1px] bg-maroon/30 my-4 z-10"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
          }}
        />

        {/* Tagline */}
        <p
          className="font-sans text-sm font-semibold text-soft-black/60 uppercase tracking-widest text-center max-w-xs z-10 relative"
          style={{
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          See What Your Competitors<br />Don't Want You to See
        </p>
      </div>
    </div>
  );
}
