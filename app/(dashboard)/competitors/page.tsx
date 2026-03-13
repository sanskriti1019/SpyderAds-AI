"use client";

import Link from "next/link";
import { COMPETITORS } from "@/lib/competitors-data";
import { useActiveBrand, BRAND_CONFIG } from "@/lib/brand-context";

export default function CompetitorsPage() {
  const { activeBrand } = useActiveBrand();
  const config = BRAND_CONFIG[activeBrand];

  // Sort: active brand's competitors first, then alphabetically
  const sorted = [...COMPETITORS].sort((a, b) => {
    const aActive = a.primaryBrands.includes(activeBrand);
    const bActive = b.primaryBrands.includes(activeBrand);
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Hero */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/70 mb-1.5">Intelligence Network</p>
          <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
            Competitor Intelligence
          </h2>
          <p className="text-sm text-soft-black/60 font-medium mt-1.5">
            {sorted.filter((c) => c.primaryBrands.includes(activeBrand)).length} direct competitors of{" "}
            <span className="text-maroon font-semibold">{activeBrand}</span> · {sorted.length} brands tracked total
          </p>
        </div>
        {/* Active brand reminder */}
        <div className="hidden sm:flex flex-col items-end gap-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-soft-black/40">Analysing for</p>
          <div className="flex items-center gap-2 bg-card border border-maroon/20 rounded-xl px-4 py-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
            <span className="text-sm font-bold text-maroon">{activeBrand}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-soft-black/50">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-maroon inline-block" />
          Direct Competitor
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-warm-grey inline-block" />
          Other Tracked Brand
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
        {sorted.map((brand) => {
          const isActive = brand.primaryBrands.includes(activeBrand);

          return (
            <Link key={brand.slug} href={`/competitors/${brand.slug}`} className="group block">
              <div
                className={[
                  "relative rounded-2xl border bg-card flex flex-col gap-4 p-6",
                  "transition-all duration-300 ease-out cursor-pointer overflow-hidden",
                  isActive
                    ? "border-maroon/30 shadow-[0_4px_20px_rgba(110,44,44,0.08)] hover:shadow-[0_8px_32px_rgba(110,44,44,0.14)] hover:-translate-y-1.5"
                    : "border-border hover:border-warm-grey hover:shadow-md hover:-translate-y-1",
                ].join(" ")}
              >
                {/* Accent corner gradient */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 pointer-events-none"
                  style={{ backgroundColor: brand.accentColor }}
                />

                {/* Top row: badge */}
                <div className="flex items-start justify-between gap-1">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white text-lg font-bold font-serif shadow-md transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: brand.accentColor }}
                  >
                    {brand.initials}
                  </div>
                  {isActive ? (
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-maroon/10 text-maroon border border-maroon/20 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                      Competitor
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-warm-grey/30 text-soft-black/50 border border-warm-grey/50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                      Tracked
                    </span>
                  )}
                </div>

                {/* Name & Industry */}
                <div>
                  <h3 className="text-lg font-bold font-serif text-soft-black group-hover:text-maroon transition-colors leading-snug">
                    {brand.name}
                  </h3>
                  <p className="text-[10px] font-bold text-soft-black/40 uppercase tracking-wider mt-0.5">{brand.industry}</p>
                </div>

                {/* Tagline */}
                <p className="text-xs text-soft-black/70 font-medium leading-relaxed line-clamp-2 flex-1">
                  {brand.tagline}
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wide">
                  <div>
                    <span className="text-soft-black/40">Monthly Ads</span>
                    <br />
                    <span className="text-base font-bold font-serif text-soft-black">{brand.estimatedMonthlyAds}</span>
                  </div>
                  <div>
                    <span className="text-soft-black/40">Spend</span>
                    <br />
                    <span
                      className={
                        brand.adSpendLevel === "Very High" || brand.adSpendLevel === "High"
                          ? "text-maroon font-bold"
                          : "text-soft-black/70 font-bold"
                      }
                    >
                      {brand.adSpendLevel}
                    </span>
                  </div>
                </div>

                {/* Format Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {brand.keyFormats.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-[9px] font-bold uppercase tracking-wider bg-beige text-soft-black/60 px-2 py-0.5 rounded-full border border-border/50"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-soft-black/40 group-hover:text-maroon/60 transition-colors">
                    View Analysis
                  </span>
                  <span className="text-maroon group-hover:translate-x-1.5 transition-transform duration-300">
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
