"use client";

import Link from "next/link";
import { COMPETITORS } from "@/lib/competitors-data";
import { useActiveBrand } from "@/lib/brand-context";

export default function CompetitorsPage() {
  const { activeBrand } = useActiveBrand();

  // Sort: show competitors of active brand first
  const sorted = [...COMPETITORS].sort((a, b) => {
    const aMatches = a.primaryBrands.includes(activeBrand);
    const bMatches = b.primaryBrands.includes(activeBrand);
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
          Competitor Intelligence
        </h2>
        <p className="text-sm text-soft-black/60 font-medium mt-1">
          Showing all tracked brands · Competitors of{" "}
          <span className="text-maroon font-semibold">{activeBrand}</span> are highlighted
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-soft-black/50">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-maroon inline-block" />
          Active Competitor
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-warm-grey inline-block" />
          Other Tracked Brand
        </span>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((brand) => {
          const isActive = brand.primaryBrands.includes(activeBrand);
          return (
            <Link
              key={brand.slug}
              href={`/competitors/${brand.slug}`}
              className="group block"
            >
              <div
                className={`relative rounded-2xl border bg-card p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer
                  ${isActive
                    ? "border-maroon/30 shadow-md hover:shadow-lg hover:-translate-y-1"
                    : "border-border hover:border-warm-grey hover:shadow-md hover:-translate-y-1"
                  }`}
              >
                {/* Active badge */}
                {isActive && (
                  <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest font-bold bg-maroon/10 text-maroon border border-maroon/20 px-2 py-0.5 rounded-full">
                    Competitor
                  </span>
                )}

                {/* Logo Avatar */}
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-white text-xl font-bold font-serif shadow-sm"
                  style={{ backgroundColor: brand.accentColor }}
                >
                  {brand.initials}
                </div>

                {/* Name & Industry */}
                <div>
                  <h3 className="text-lg font-bold font-serif text-soft-black group-hover:text-maroon transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs font-semibold text-soft-black/50 uppercase tracking-wider mt-0.5">
                    {brand.industry}
                  </p>
                </div>

                {/* tagline */}
                <p className="text-xs text-soft-black/70 font-medium leading-relaxed line-clamp-2">
                  {brand.tagline}
                </p>

                {/* Format Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {brand.keyFormats.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-semibold uppercase tracking-wider bg-beige text-soft-black/70 px-2 py-0.5 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* View arrow */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-soft-black/40">
                    View Analysis
                  </span>
                  <span className="text-maroon text-sm group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
