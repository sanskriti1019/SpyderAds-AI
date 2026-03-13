"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [fadeout, setFadeout] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const t1 = setTimeout(() => setTextVisible(true), 800);
    const t2 = setTimeout(() => setFadeout(true), 2800);
    const t3 = setTimeout(() => setShow(false), 3400);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#F8F8F7]",
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        fadeout ? "opacity-0 scale-[1.05] blur-xl" : "opacity-100 scale-100 blur-0"
      )}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20 card-grain" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-maroon/[0.03] rounded-full blur-[120px] animate-pulse" />

      <div className="relative flex flex-col items-center justify-center">
        {/* Animated Spider Mark */}
        <div className="relative w-32 h-32 mb-12 animate-float-rotate">
           <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-maroon drop-shadow-2xl"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <g className="animate-web-form">
              <circle cx="50" cy="50" r="45" strokeDasharray="4 8" opacity="0.2" />
              <line x1="50" y1="50" x2="50" y2="5" />
              <line x1="50" y1="50" x2="95" y2="50" />
              <line x1="50" y1="50" x2="50" y2="95" />
              <line x1="50" y1="50" x2="5" y2="50" />
              <polygon points="50,20 65,35 80,50 65,65 50,80 35,65 20,50 35,35" strokeWidth="0.8" opacity="0.3" />
            </g>
            <circle cx="50" cy="50" r="4" fill="currentColor" className="animate-pulse" />
          </svg>
        </div>

        {/* Brand Reveal */}
        <div className="text-center space-y-4">
          <h1
            className="text-4xl font-serif font-black text-soft-black tracking-tighter"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Spyder<span className="text-maroon">Ads</span> Intelligence
          </h1>
          
          <div 
            className="flex flex-col items-center gap-6"
            style={{
              opacity: textVisible ? 1 : 0,
              transition: "opacity 1s ease 0.4s",
            }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-soft-black/30">
              Initializing Secure Repository Access
            </p>
            
            {/* Minimal Progress Bar */}
            <div className="w-48 h-[1px] bg-border/40 relative overflow-hidden rounded-full">
               <div 
                 className="absolute inset-y-0 left-0 bg-maroon transition-all duration-300 ease-out shadow-[0_0_8px_rgba(110,44,44,0.5)]"
                 style={{ width: `${progress}%` }}
               />
            </div>
          </div>
        </div>
      </div>

      {/* Version Stamp */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.5em] text-soft-black/20">
         Protocol v2.4.0 High-Priority
      </div>
    </div>
  );
}
