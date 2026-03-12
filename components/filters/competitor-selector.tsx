"use client";

import { cn } from "@/lib/utils";

interface CompetitorSelectorProps {
  competitors: { id: number; name: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function CompetitorSelector({ competitors, value, onChange }: CompetitorSelectorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs">
      <span className="text-muted-foreground">Competitor</span>
      <select
        className={cn(
          "bg-transparent text-sm font-medium outline-none",
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
