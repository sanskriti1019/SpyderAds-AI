"use client";

import React, { useEffect, useState } from "react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center animate-fade-out" style={{ animationDelay: '2.5s' }}>
      <div className="relative">
        {/* Animated Logo Container */}
        <div className="w-24 h-24 relative animate-float">
           <div className="absolute inset-0 border-[3px] border-maroon/20 rounded-2xl rotate-45 animate-pulse" />
           <div className="absolute inset-2 border-[2px] border-maroon/40 rounded-xl -rotate-12 animate-spin-slow" />
           <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-bold text-maroon">
              S
           </div>
        </div>
        
        {/* Scanning Line Effect */}
        <div className="absolute -inset-10 overflow-hidden pointer-events-none">
           <div className="w-full h-[1px] bg-maroon/20 absolute top-0 animate-scan" />
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h1 className="text-sm font-serif font-bold uppercase tracking-[0.3em] text-soft-black/80 animate-blur-in">
          SpyderAds <span className="text-maroon">AI</span>
        </h1>
        <div className="mt-4 w-40 h-[1.5px] bg-warm-grey/20 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-maroon w-1/3 animate-loading-bar" />
        </div>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-soft-black/30">
          Decrypting Competitive Intelligence
        </p>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0% }
          100% { top: 100% }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) }
          50% { transform: translateY(-10px) rotate(2deg) }
        }
        @keyframes blur-in {
          from { filter: blur(10px); opacity: 0 }
          to { filter: blur(0px); opacity: 1 }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(300%) }
        }
        .animate-scan { animation: scan 2s linear infinite }
        .animate-float { animation: float 4s ease-in-out infinite }
        .animate-spin-slow { animation: spin 8s linear infinite }
        .animate-blur-in { animation: blur-in 1.5s ease-out forwards }
        .animate-loading-bar { animation: loading-bar 1.5s ease-in-out infinite }
        .animate-fade-out { animation: fadeOut 0.5s ease-in forwards }
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden }
        }
      `}</style>
    </div>
  );
}
