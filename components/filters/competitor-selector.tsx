"use client";

import { cn } from "@/lib/utils";

interface CompetitorSelectorProps {
  competitors: { id: number; name: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function CompetitorSelector({ competitors, value, onChange }: CompetitorSelectorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-beige/20 px-4 py-2 text-sm shadow-sm transition-all hover:bg-beige/50">
      <span className="text-soft-black/60 font-medium tracking-wide">Competitor</span>
      <select
        className={cn(
          "bg-transparent text-soft-black font-semibold outline-none cursor-pointer",
          "focus-visible:ring-0 focus-visible:outline-none"
        )}
        value={value ?? (competitors[0]?.name ?? "")}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">All brands</option>
        {competitors.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
