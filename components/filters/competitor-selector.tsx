"use client";

import { cn } from "@/lib/utils";

interface CompetitorSelectorProps {
  competitors: { id: number; name: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function CompetitorSelector({ competitors, value, onChange }: CompetitorSelectorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white/50 px-4 py-2 text-sm shadow-sm transition-colors hover:bg-gray-50">
      <span className="text-gray-400">Competitor</span>
      <select
        className={cn(
          "bg-transparent text-gray-900 font-medium outline-none cursor-pointer",
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
