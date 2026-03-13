"use client";

import { CompetitorSelector } from "./competitor-selector";

const formats = ["All formats", "Image", "Video", "Carousel"];
const themes = [
  "All themes",
  "problem-solution",
  "testimonial",
  "before-after",
  "educational",
  "offer-driven",
  "emotional-branding",
];
const ranges = ["Last 7 days", "Last 30 days", "Last 90 days", "Year to date"];

export interface FilterState {
  competitor: string;
  format: string;
  theme: string;
  range: string;
}

interface FilterBarProps {
  competitors: { id: number; name: string }[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterBar({ competitors, filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-xl shadow-sm px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <CompetitorSelector
          competitors={competitors}
          value={filters.competitor}
          onChange={(competitor) => onChange({ ...filters, competitor })}
        />
        <div className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white/50 px-4 py-2 text-sm shadow-sm transition-colors hover:bg-gray-50">
          <span className="text-gray-400">Format</span>
          <select
            className="bg-transparent text-gray-900 font-medium outline-none cursor-pointer"
            value={filters.format || "All formats"}
            onChange={(e) => onChange({ ...filters, format: e.target.value })}
          >
            {formats.map((f) => (
              <option key={f} value={f === "All formats" ? "" : f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white/50 px-4 py-2 text-sm shadow-sm transition-colors hover:bg-gray-50">
          <span className="text-gray-400">Theme</span>
          <select
            className="bg-transparent text-gray-900 font-medium outline-none cursor-pointer"
            value={filters.theme || "All themes"}
            onChange={(e) => onChange({ ...filters, theme: e.target.value })}
          >
            {themes.map((t) => (
              <option key={t} value={t === "All themes" ? "" : t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white/50 px-4 py-2 text-sm shadow-sm transition-colors hover:bg-gray-50">
        <span className="text-gray-400">Date range</span>
        <select
          className="bg-transparent text-gray-900 font-medium outline-none cursor-pointer"
          value={filters.range}
          onChange={(e) => onChange({ ...filters, range: e.target.value })}
        >
          {ranges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
