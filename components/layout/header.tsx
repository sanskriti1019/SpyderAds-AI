"use client";

import React from "react";
import { BrandSelector } from "@/components/layout/brand-selector";

export function Header() {
  return (
    <header className="flex h-20 items-center justify-between px-10 relative z-50 gap-6 glass-panel border-b border-border/40">
      {/* Dynamic Breadcrumb / Title Context */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex flex-col">
          <h2 className="text-sm font-black tracking-[0.2em] text-soft-black/40 uppercase font-serif">
            Station <span className="text-maroon/40">01</span>
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
             <span className="text-[11px] font-bold text-soft-black">MARKET_INTEL</span>
             <span className="text-soft-black/20 text-[10px]">/</span>
             <span className="text-[11px] font-bold text-maroon animate-pulse">STRATEGIC_OVERVIEW</span>
          </div>
        </div>
      </div>

      {/* Primary Control Hub — Center */}
      <div className="flex-1 max-w-xl">
        <BrandSelector />
      </div>

      {/* Action Layer */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border/50 bg-white shadow-soft">
          <div className="relative flex h-1.5 w-1.5">
            <div className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60" />
            <div className="relative rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-soft-black/60">
            Realtime Synthesis
          </span>
        </div>
        
        <button
          className="h-9 px-5 text-[10px] font-black uppercase tracking-[0.2em] bg-maroon text-white rounded-full shadow-lg shadow-maroon/20 hover:shadow-maroon/30 transition-all active:scale-95 btn-press"
        >
          Export Intel
        </button>
      </div>
    </header>
  );
}
