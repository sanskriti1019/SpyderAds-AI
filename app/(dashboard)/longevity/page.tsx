"use client";

import { useActiveBrand } from "@/lib/brand-context";
import { useLongevity } from "@/lib/hooks";
import { getMockLongevity } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_STYLES: Record<string, string> = {
  Active: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Paused: "text-amber-700 bg-amber-50 border-amber-200",
  Ended: "text-soft-black/50 bg-beige border-border",
};

function LongevityBar({ days }: { days: number }) {
  const max = 80;
  const pct = Math.min((days / max) * 100, 100);
  const color = days > 50 ? "#6E2C2C" : days > 30 ? "#8B6F47" : "#D8D2C6";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-warm-grey/30 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold text-soft-black w-12 text-right">{days}d</span>
    </div>
  );
}

export default function LongevityPage() {
  const { activeBrand } = useActiveBrand();
  const { data: apiData, isLoading } = useLongevity({ brand: activeBrand });
  const rows = (apiData && apiData.length > 0) ? apiData : getMockLongevity(activeBrand);

  const avgDays = Math.round(rows.reduce((a: number, r: { daysRunning: number }) => a + r.daysRunning, 0) / rows.length);
  const longestAd = rows.reduce((a: { daysRunning: number }, r: { daysRunning: number }) => r.daysRunning > a.daysRunning ? r : a, rows[0]);
  const activeCount = rows.filter((r: { status: string }) => r.status === "Active").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
          <span className="text-maroon">{activeBrand}</span> — Longevity Analysis
        </h2>
        <p className="text-sm text-soft-black/60 font-medium mt-1">
          Discover which competitor creatives have been running the longest — a signal of proven performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-6 border-border bg-card">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Avg. Days Running</p>
          <p className="text-4xl font-serif font-bold text-soft-black mt-2">{avgDays}d</p>
          <p className="text-xs text-soft-black/40 font-semibold mt-1">Across tracked competitor ads</p>
        </Card>
        <Card className="p-6 border-border bg-card border-maroon/20">
          <p className="text-[10px] uppercase tracking-widest font-bold text-maroon/70">Longest Running Ad</p>
          <p className="text-2xl font-serif font-bold text-maroon mt-2">{longestAd?.daysRunning ?? 0}d</p>
          <p className="text-xs text-soft-black/60 font-semibold mt-1 leading-snug truncate">{longestAd?.brand ?? "—"}</p>
        </Card>
        <Card className="p-6 border-border bg-card">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Currently Active</p>
          <p className="text-4xl font-serif font-bold text-soft-black mt-2">{activeCount}</p>
          <p className="text-xs text-soft-black/40 font-semibold mt-1">of {rows.length} tracked ads</p>
        </Card>
      </div>

      {/* Explainer */}
      <Card className="p-5 border-border bg-beige/30">
        <p className="text-sm font-semibold text-soft-black/80 leading-relaxed">
          <span className="text-maroon font-bold">Why longevity matters:</span>{" "}
          An ad that has been running for 30+ days without being paused is a strong signal that it is converting profitably. Competitors don't waste budget on underperforming creatives. The ads below represent the best-performing sustained creatives for {activeBrand}'s competitors — use these as reference for what messaging and formats are working in market.
        </p>
      </Card>

      {/* Data Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-16" />)}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-beige/40">
                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Creative</th>
                <th className="text-left px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Brand</th>
                <th className="text-left px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Format</th>
                <th className="text-left px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Theme</th>
                <th className="text-left px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60 w-40">Longevity</th>
                <th className="text-left px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Est. Impressions</th>
                <th className="text-left px-4 py-4 text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...rows].sort((a: { daysRunning: number }, b: { daysRunning: number }) => b.daysRunning - a.daysRunning).map((row: {
                creativeTitle: string;
                brand: string;
                format: string;
                theme: string;
                daysRunning: number;
                estimatedImpressions: string;
                status: string;
                startDate: string;
              }, i: number) => (
                <tr
                  key={i}
                  className={`border-b border-border/60 transition-colors ${
                    i === 0 ? "bg-maroon/5" : i % 2 === 0 ? "bg-transparent" : "bg-beige/10"
                  } hover:bg-beige/20`}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-soft-black text-sm leading-snug">{row.creativeTitle}</p>
                    <p className="text-[10px] text-soft-black/40 font-medium mt-0.5">Started {row.startDate}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-xs text-maroon">{row.brand}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-semibold text-soft-black/70 bg-beige px-2 py-0.5 rounded-full border border-border">
                      {row.format}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-semibold text-soft-black/70">{row.theme}</span>
                  </td>
                  <td className="px-4 py-3.5 w-40">
                    <LongevityBar days={row.daysRunning} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-bold text-soft-black">{row.estimatedImpressions}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${STATUS_STYLES[row.status] ?? ""}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Strategic implication */}
      <Card className="p-6 border-border bg-card">
        <h3 className="text-sm font-bold uppercase tracking-widest text-soft-black/50 mb-3">Strategic Implication</h3>
        <p className="text-sm text-soft-black/80 font-medium leading-relaxed">
          The longest-running creatives in this category are using <strong className="text-soft-black">video formats with emotional hooks</strong> and <strong className="text-soft-black">clinical authority messaging</strong>. These ads are running because they convert — {activeBrand} should study these formats and develop competing creatives with its own unique differentiators.
        </p>
      </Card>
    </div>
  );
}
