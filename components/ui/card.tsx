import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // Core Architecture
        "rounded-[2rem] border border-border/60 bg-card text-card-foreground overflow-hidden relative",
        // Physics & Surface
        "designer-shadow transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)",
        // Hover State: Deep Shadow + Subtle Lift
        "hover:designer-shadow-deep hover:-translate-y-1.5 hover:border-maroon/20",
        // Visual Grouping
        "group",
        className
      )}
      {...props}
    >
      {/* 1. Designer Grain Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay card-grain z-0" />
      
      {/* 2. Premium Light Source (Top-Left Highlight) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.4)_0%,transparent_60%)] pointer-events-none z-0" />
      
      {/* 3. Hover Reflection Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0" />
      
      {/* 4. Content Layer */}
      <div className="relative z-10 h-full">{children}</div>
      
      {/* 5. Inner Inset Border (Designer Polish) */}
      <div className="absolute inset-px rounded-[1.9rem] border border-white/40 pointer-events-none z-0" />
    </div>
  );
}
