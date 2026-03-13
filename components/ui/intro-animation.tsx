"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    // start fade out after 2.5s, unmount after 3s
    const timer1 = setTimeout(() => {
      setFadeout(true);
    }, 2500);

    const timer2 = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream transition-opacity duration-500",
        fadeout ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated Custom Spider Web Logo */}
        <div className="relative w-32 h-32 mb-6">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-maroon"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* The Web - drawn from center using dasharray animation */}
            <g className="animate-web-form origin-center">
              {/* Radial lines */}
              <line x1="50" y1="50" x2="50" y2="5" />
              <line x1="50" y1="50" x2="95" y2="50" />
              <line x1="50" y1="50" x2="50" y2="95" />
              <line x1="50" y1="50" x2="5" y2="50" />
              <line x1="50" y1="50" x2="82" y2="18" />
              <line x1="50" y1="50" x2="82" y2="82" />
              <line x1="50" y1="50" x2="18" y2="82" />
              <line x1="50" y1="50" x2="18" y2="18" />
              
              {/* Concentric polygons */}
              <polygon points="50,20 72,28 80,50 72,72 50,80 28,72 20,50 28,28" />
              <polygon points="50,35 61,40 65,50 61,60 50,65 39,60 35,50 39,40" />
            </g>

            {/* The Spider - drops in */}
            <g className="animate-spider-appear origin-center fill-maroon" stroke="currentColor">
              {/* Spider Body */}
              <circle cx="50" cy="50" r="4" />
              {/* Spider Head */}
              <circle cx="50" cy="44" r="2" />
              {/* Legs */}
              <path d="M47 48 L42 45 L38 50" />
              <path d="M47 50 L40 52 L36 58" />
              <path d="M47 52 L42 58 L39 65" />
              <path d="M48 44 L44 40 L40 35" />
              <path d="M53 48 L58 45 L62 50" />
              <path d="M53 50 L60 52 L64 58" />
              <path d="M53 52 L58 58 L61 65" />
              <path d="M52 44 L56 40 L60 35" />
            </g>
          </svg>
        </div>

        {/* Text section */}
        <h1 className="text-4xl font-serif font-bold text-soft-black tracking-tight animate-fade-in-up duration-1000 delay-300 opacity-0 fill-mode-forwards relative z-10">
          SpyderAds AI
        </h1>
        <p className="mt-4 font-sans text-sm font-bold text-maroon uppercase tracking-widest animate-fade-in-up duration-1000 delay-500 opacity-0 fill-mode-forwards text-center max-w-[320px] relative z-10">
          "See What Your Competitors Don't Want You to See"
        </p>
      </div>
    </div>
  );
}
