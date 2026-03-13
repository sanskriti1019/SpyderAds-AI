"use client";

import { useActiveBrand, BRAND_CONFIG } from "@/lib/brand-context";
import { getComparisonData } from "@/lib/comparison-data";
import { MarketShareBarChart } from "@/components/charts/market-share-bar-chart";
import { BrandPositioningScatterChart } from "@/components/charts/brand-positioning-chart";
import { AdActivityComparisonChart } from "@/components/charts/ad-activity-comparison-chart";
import { MarketShareChart } from "@/components/charts/market-share-chart";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { COMPETITORS } from "@/lib/competitors-data";

export default function ComparePage() {
  const { activeBrand } = useActiveBrand();
  const config = BRAND_CONFIG[activeBrand];
  const { brands } = getComparisonData(activeBrand);

  return (
    <div className="space-y-10 animate-fade-in-up">

      {/* Page Header — Premium Model */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/70 mb-1.5">Intelligence War Room</p>
          <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
            <span className="text-maroon">Comparison</span> Intelligence
          </h2>
          <p className="text-sm text-soft-black/60 font-medium mt-1.5 max-w-xl">
            Real-time competitive profiling across {brands.length} major brands in the <span className="text-soft-black font-semibold">{config.industry}</span> space.
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-1.5">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40">Primary Benchmark</p>
          <div className="flex items-center gap-3 bg-card border border-maroon/20 rounded-xl px-5 py-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-maroon flex items-center justify-center text-white font-serif font-bold text-xs shadow-sm">
              {activeBrand.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-soft-black leading-none">{activeBrand}</p>
              <p className="text-[9px] font-bold text-maroon uppercase tracking-wider mt-1">Primary Brand</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Index Legend — Premium Chips */}
      <div className="flex flex-wrap items-center gap-3 py-2 border-y border-border/40">
        <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/30 mr-2">Index</p>
        {brands.map((b, i) => {
          const colors = ["#6E2C2C", "#1A1A1A", "#8B6F47", "#4A6E6E", "#6E4A7C", "#4A7C59"];
          const color = b.isPrimary ? colors[0] : colors[1 + (i % (colors.length - 1))];
          return (
            <div
              key={b.name}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 transition-all hover:shadow-sm cursor-default ${
                b.isPrimary
                  ? "border-maroon/30 bg-maroon/5"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className={`text-[11px] font-bold tracking-tight ${b.isPrimary ? "text-maroon" : "text-soft-black/60"}`}>
                {b.name}{b.isPrimary ? " ★" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Row 1: Market Share Bar Chart (full width) */}
      <section className="reveal">
        <div className="mb-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
            Market Share Analysis
          </h3>
          <p className="text-[11px] text-soft-black/40 font-medium ml-6 mt-0.5">Estimated relative share of voice based on ad volume & frequency</p>
        </div>
        <Card className="overflow-hidden border-border/80 shadow-md">
           <MarketShareBarChart brands={brands} primaryBrand={activeBrand} />
        </Card>
      </section>

      {/* Row 2: Radar + Scatter side by side */}
      <section className="reveal">
        <div className="mb-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
            Competitive Intelligence Radar & Brand Positioning
          </h3>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-1 shadow-md border-border/80">
            <MarketShareChart brandName={activeBrand} competitors={config.competitors} />
          </Card>
          <Card className="p-1 shadow-md border-border/80">
            <BrandPositioningScatterChart brands={brands} primaryBrand={activeBrand} />
          </Card>
        </div>
      </section>

      {/* Row 3: Ad Activity Comparison (full width) */}
      <section className="reveal">
        <div className="mb-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
            Engagement & Volume Benchmarking
          </h3>
        </div>
        <Card className="p-1 shadow-md border-border/80">
          <AdActivityComparisonChart brands={brands} primaryBrand={activeBrand} />
        </Card>
      </section>

      {/* Row 4: Strategic insight summary table — UPGRADED */}
      <section className="reveal">
        <div className="mb-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
            Performance Metric Matrix
          </h3>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-beige/40">
                <th className="text-left px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50 w-40">Brand Entity</th>
                <th className="text-center px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Ad Volume</th>
                <th className="text-center px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Spend Index</th>
                <th className="text-center px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Strength</th>
                <th className="text-center px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Agility</th>
                <th className="text-center px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Audience</th>
                <th className="text-center px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Diversity</th>
              </tr>
            </thead>
            <tbody className="stagger-children">
              {brands.map((b, i) => (
                <tr
                  key={b.name}
                  className={`border-b border-border/50 transition-colors group ${
                    b.isPrimary
                      ? "bg-maroon/5 lg:hover:bg-maroon/10"
                      : "hover:bg-beige/20"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                        style={{ backgroundColor: b.isPrimary ? "#6E2C2C" : "#1A1A1A", opacity: b.isPrimary ? 1 : 0.6 }}
                      >
                        {b.name.charAt(0)}
                      </div>
                      <div>
                        {b.isPrimary ? (
                           <span className="font-bold text-sm tracking-tight text-maroon">
                             {b.name}
                           </span>
                        ) : (
                          <Link 
                            href={`/competitors/${COMPETITORS.find(c => c.name === b.name)?.slug || b.name.toLowerCase().replace(/ /g, '-')}`}
                            className="font-bold text-sm tracking-tight text-soft-black hover:text-maroon hover:underline decoration-maroon/30 transition-all"
                          >
                            {b.name}
                          </Link>
                        )}
                        {b.isPrimary && (
                          <p className="text-[9px] font-bold text-maroon/50 uppercase tracking-widest leading-none mt-1">Benchmark</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`font-mono font-bold text-base ${b.isPrimary ? "text-maroon" : "text-soft-black"}`}>
                      {b.adVolume}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-20 h-1.5 bg-warm-grey/20 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${b.estimatedSpend}%`,
                            backgroundColor: b.isPrimary ? "#6E2C2C" : "#1A1A1A",
                            opacity: b.isPrimary ? 1 : 0.4,
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-soft-black/70 w-8">{b.estimatedSpend}%</span>
                    </div>
                  </td>
                  {[b.brandStrength, b.digitalAgility, b.audienceDepth].map((val, vi) => (
                    <td key={vi} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-xs font-bold text-soft-black">{val}</span>
                        <div className="w-10 h-1 bg-warm-grey/20 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${val}%`,
                              backgroundColor: b.isPrimary ? "#6E2C2C" : "#8B6F47",
                              opacity: b.isPrimary ? 0.9 : 0.4,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-beige border border-border text-[10px] font-bold text-soft-black/70 group-hover:bg-soft-black group-hover:text-white group-hover:border-soft-black transition-colors">
                      {b.activeFormats} Formats
                    </span>
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
