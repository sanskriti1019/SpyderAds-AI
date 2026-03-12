import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[color:var(--glass-border)] bg-[var(--glass)]/40 backdrop-blur-2xl text-card-foreground shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-indigo-500/30 hover:-translate-y-1 overflow-hidden relative group",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {props.children}
    </div>
  );
}
