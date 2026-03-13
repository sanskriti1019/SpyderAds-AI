import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // Base structure
        "rounded-2xl border border-border bg-card text-card-foreground overflow-hidden relative",
        // Premium shadow + transition on everything
        "shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out",
        // Hover lift + deeper shadow + border glow
        "hover:shadow-[0_8px_32px_rgba(110,44,44,0.09),0_2px_8px_rgba(0,0,0,0.06)] hover:-translate-y-[3px] hover:border-maroon/25",
        // Group for internal hover effects
        "group card-grain",
        className
      )}
      {...props}
    >
      {/* Gradient shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-beige/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]" />
      {/* Subtle top highlight line */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-60 pointer-events-none" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
