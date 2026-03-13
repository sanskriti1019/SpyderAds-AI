"use client";

import { useActiveBrand, BRAND_CONFIG } from "@/lib/brand-context";
import { getComparisonData } from "@/lib/comparison-data";
import { MarketShareBarChart } from "@/components/charts/market-share-bar-chart";
import { BrandPositioningScatterChart } from "@/components/charts/brand-positioning-chart";
import { AdActivityComparisonChart } from "@/components/charts/ad-activity-comparison-chart";
import { MarketShareChart } from "@/components/charts/market-share-chart";

export default function ComparePage() {
  const { activeBrand } = useActiveBrand();
  const config = BRAND_CONFIG[activeBrand];
  const { brands } = getComparisonData(activeBrand);

  return (
    <div className="space-y-10">

      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
            <span className="text-maroon">{activeBrand}</span> vs Competitors
          </h2>
          <p className="text-sm text-soft-black/60 font-medium mt-1">
            Advanced intelligence comparison across {brands.length} brands in the {config.industry} space
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40">Comparing Against</p>
          <p className="text-sm font-bold text-maroon mt-1">{config.competitors.join(" · ")}</p>
        </div>
      </div>

      {/* Brand Index Legend */}
      <div className="flex flex-wrap gap-3">
        {brands.map((b, i) => {
          const colors = ["#6E2C2C", "#1A1A1A", "#8B6F47", "#4A6E6E", "#6E4A7C", "#4A7C59"];
          const color = b.isPrimary ? colors[0] : colors[1 + (i % (colors.length - 1))];
          return (
            <div
              key={b.name}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 ${
                b.isPrimary
                  ? "border-maroon/30 bg-maroon/5"
                  : "border-border bg-beige/30"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className={`text-xs font-bold ${b.isPrimary ? "text-maroon" : "text-soft-black/60"}`}>
                {b.name}{b.isPrimary ? " ★" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Row 1: Market Share Bar Chart (full width) */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4 flex items-center gap-2">
          <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
          Market Share Metrics
        </h3>
        <MarketShareBarChart brands={brands} primaryBrand={activeBrand} />
      </section>

      {/* Row 2: Radar + Scatter side by side */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4 flex items-center gap-2">
          <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
          Competitive Intelligence Radar & Brand Positioning
        </h3>
        <div className="grid gap-5 lg:grid-cols-2">
          <MarketShareChart brandName={activeBrand} competitors={config.competitors} />
          <BrandPositioningScatterChart brands={brands} primaryBrand={activeBrand} />
        </div>
      </section>

      {/* Row 3: Ad Activity Comparison (full width) */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4 flex items-center gap-2">
          <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
          Ad Activity & Format Intelligence
        </h3>
        <AdActivityComparisonChart brands={brands} primaryBrand={activeBrand} />
      </section>

      {/* Row 4: Strategic insight summary table */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4 flex items-center gap-2">
          <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
          Intelligence Summary Table
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-beige/40">
                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60 w-32">Brand</th>
                <th className="text-center px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Monthly Ads</th>
                <th className="text-center px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Spend Index</th>
                <th className="text-center px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Brand Strength</th>
                <th className="text-center px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Digital Agility</th>
                <th className="text-center px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Audience Depth</th>
                <th className="text-center px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Format Diversity</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b, i) => (
                <tr
                  key={b.name}
                  className={`border-b border-border/60 transition-colors ${
                    b.isPrimary
                      ? "bg-maroon/5 hover:bg-maroon/8"
                      : i % 2 === 0 ? "hover:bg-beige/20" : "bg-beige/10 hover:bg-beige/20"
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {b.isPrimary && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-maroon px-1.5 py-0.5 rounded-full">You</span>
                      )}
                      <span className={`font-bold text-sm ${b.isPrimary ? "text-maroon" : "text-soft-black"}`}>
                        {b.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`font-bold text-sm ${b.isPrimary ? "text-maroon" : "text-soft-black"}`}>
                      {b.adVolume}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-warm-grey/30 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${b.estimatedSpend}%`,
                            backgroundColor: b.isPrimary ? "#6E2C2C" : "#1A1A1A",
                            opacity: b.isPrimary ? 1 : 0.5,
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-soft-black/70">{b.estimatedSpend}</span>
                    </div>
                  </td>
                  {[b.brandStrength, b.digitalAgility, b.audienceDepth].map((val, vi) => (
                    <td key={vi} className="px-4 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-12 h-1.5 bg-warm-grey/30 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${val}%`,
                              backgroundColor: b.isPrimary ? "#6E2C2C" : "#8B6F47",
                              opacity: b.isPrimary ? 0.9 : 0.5,
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold text-soft-black">{val}</span>
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-3.5 text-center">
                    <span className="text-sm font-bold text-soft-black">{b.activeFormats}</span>
                    <span className="text-xs text-soft-black/40 ml-1">formats</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
