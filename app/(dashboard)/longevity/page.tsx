"use client";

import { useActiveBrand } from "@/lib/brand-context";
import { useLongevity } from "@/lib/hooks";
import { getMockLongevity } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MagneticCard } from "@/components/ui/magnetic-card";

const STATUS_STYLES: Record<string, string> = {
  Active: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Paused: "text-amber-700 bg-amber-50 border-amber-200",
  Ended: "text-soft-black/40 bg-beige border-border",
};

function LongevityBar({ days }: { days: number }) {
  const max = 100;
  const pct = Math.min((days / max) * 100, 100);
  const color = days > 60 ? "#6E2C2C" : days > 30 ? "#8B6F47" : "#D8D2C6";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-warm-grey/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[11px] font-bold text-soft-black w-10 text-right">{days}d</span>
    </div>
  );
}

export default function LongevityPage() {
  const { activeBrand } = useActiveBrand();
  const { data: apiData, isLoading } = useLongevity({ brand: activeBrand });
  const rows = (apiData && apiData.length > 0) ? apiData : getMockLongevity(activeBrand);

  const avgDays = Math.round(rows.reduce((a: number, r: any) => a + r.daysRunning, 0) / rows.length);
  const longestAd = rows.reduce((a: any, r: any) => r.daysRunning > a.daysRunning ? r : a, rows[0]);
  const activeCount = rows.filter((r: any) => r.status === "Active").length;

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Header — Premium Model */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/70 mb-1.5">Proven Performance</p>
          <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
            Longevity <span className="text-maroon">Analysis</span>
          </h2>
          <p className="text-sm text-soft-black/60 font-medium mt-1.5 max-w-xl">
            Identifying creatives with the highest retention/spend-cycle. Long-running ads are the strongest indicator of a competitor's winning acquisition strategy.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 px-4 py-2 bg-beige/40 rounded-xl border border-border/50">
          <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30 leading-none">Context</p>
          <p className="text-sm font-bold text-soft-black">{activeBrand} Perimeter</p>
        </div>
      </div>

      {/* KPI Cards — Magnetic Model */}
      <div className="grid gap-5 sm:grid-cols-3 stagger-children">
        <MagneticCard className="group">
           <div className="p-7">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40 group-hover:text-maroon/60 transition-colors">Average Retainment</p>
              <div className="flex items-baseline gap-1 mt-4">
                <p className="text-5xl font-serif font-bold text-soft-black">{avgDays}</p>
                <span className="text-lg font-bold text-soft-black/40">Days</span>
              </div>
           </div>
        </MagneticCard>

        <MagneticCard className="group">
           <div className="p-7">
              <p className="text-[10px] uppercase tracking-widest font-bold text-maroon/60">Sustainability Champion</p>
              <div className="flex items-baseline gap-1 mt-4">
                <p className="text-5xl font-serif font-bold text-maroon">{longestAd?.daysRunning ?? 0}</p>
                <span className="text-lg font-bold text-maroon/40">Days</span>
              </div>
              <p className="text-xs font-bold text-soft-black/60 mt-2 truncate max-w-full">
                By <span className="text-soft-black">{longestAd?.brand || "N/A"}</span>
              </p>
           </div>
        </MagneticCard>

        <MagneticCard className="group">
           <div className="p-7">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40 group-hover:text-maroon/60 transition-colors">Active Survival</p>
              <div className="flex items-baseline gap-1 mt-4">
                <p className="text-5xl font-serif font-bold text-soft-black">{activeCount}</p>
                <span className="text-lg font-bold text-soft-black/40">/ {rows.length}</span>
              </div>
              <p className="text-xs font-bold text-soft-black/60 mt-2">Currently being scaled</p>
           </div>
        </MagneticCard>
      </div>

      {/* High-Performance Table */}
      <div className="reveal">
        <div className="mb-5 flex items-center justify-between">
           <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/40 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-maroon/50 inline-block" />
            Winning Creatives Matrix
          </h3>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-soft-black/30">
             <span>Sort: Highest Survival</span>
             <span>Filter: Active only</span>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-beige/40">
                  <th className="text-left px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Tracked Creative Asset</th>
                  <th className="text-left px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Brand</th>
                  <th className="text-left px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Format / Theme</th>
                  <th className="text-left px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50 w-48">Survival Duration</th>
                  <th className="text-left px-4 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Visibility</th>
                  <th className="text-left px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Status</th>
                </tr>
              </thead>
              <tbody className="stagger-children">
                {[...rows].sort((a: any, b: any) => b.daysRunning - a.daysRunning).map((row: any, i: number) => (
                  <tr
                    key={i}
                    className={`border-b border-border/50 transition-colors group ${
                      i === 0 ? "bg-maroon/5 lg:hover:bg-maroon/10" : "hover:bg-beige/15"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-soft-black text-[13px] leading-snug group-hover:text-maroon transition-colors">{row.creativeTitle}</span>
                        <span className="text-[9px] font-black text-soft-black/30 uppercase tracking-widest mt-1">Live since {row.startDate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-bold text-xs text-soft-black border-b border-soft-black/10 transition-colors group-hover:text-maroon group-hover:border-maroon/30">{row.brand}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-beige text-soft-black/70 px-2.5 py-1 rounded-md border border-border">
                          {row.format}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-soft-black/40 px-1 py-1">
                          {row.theme}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 w-48">
                      <LongevityBar days={row.daysRunning} />
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[13px] font-bold font-serif text-soft-black">{row.estimatedImpressions}</span>
                      <p className="text-[9px] font-bold text-soft-black/30 uppercase leading-none mt-1">EST. REACH</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border shadow-sm ${STATUS_STYLES[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Strategic Recommendation */}
      <Card className="p-8 border-maroon/20 bg-card overflow-hidden relative group shadow-lg reveal">
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-maroon/[0.03] to-transparent pointer-events-none" />
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-maroon/70 mb-4 flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
           Strategic Intelligence Output
        </h3>
        <p className="text-[15px] text-soft-black/90 font-medium leading-relaxed italic font-serif">
           The longest-running creatives in the <span className="font-bold">{config.industry}</span> space prioritize <span className="text-maroon font-bold underline decoration-maroon/30 underline-offset-4">clinical authority</span> and <span className="text-maroon font-bold underline decoration-maroon/30 underline-offset-4">educational formats</span>. This data suggests that {activeBrand}'s customer segment is heavily influenced by trust-based, deep-copy creatives rather than flash-offers. Scaling high-production video benchmarks from {longestAd?.brand} is the recommended activation path.
        </p>
      </Card>
    </div>
  );
}
