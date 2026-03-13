"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import { BrandCompetitorRow, TOOLTIP_STYLE, CHART_COLORS } from "@/lib/comparison-data";

interface AdActivityChartProps {
  brands: BrandCompetitorRow[];
  primaryBrand: string;
}

export function AdActivityComparisonChart({ brands, primaryBrand }: AdActivityChartProps) {
  // Build weekly spark data — one row per week, one key per brand
  const weeks = ["W1", "W2", "W3", "W4"];
  const weeklyData = weeks.map((week, wi) => {
    const row: Record<string, string | number> = { week };
    brands.forEach((b) => {
      row[b.name] = b.weeklyAds[wi] ?? 0;
    });
    return row;
  });

  // Format mix comparison — one row per brand
  const formatData = brands.map((b) => ({
    name: b.name,
    Video: b.formatMix.find((f) => f.format === "Video")?.pct ?? 0,
    Image: b.formatMix.find((f) => f.format === "Image")?.pct ?? 0,
    Carousel: b.formatMix.find((f) => f.format === "Carousel")?.pct ?? 0,
    Story: b.formatMix.find((f) => f.format === "Story")?.pct ?? 0,
    UGC: b.formatMix.find((f) => f.format === "UGC")?.pct ?? 0,
    isPrimary: b.isPrimary,
  }));

  const colors = brands.map((b, i) =>
    b.isPrimary ? CHART_COLORS[0] : CHART_COLORS[1 + (i % (CHART_COLORS.length - 1))]
  );

  // Summary cards
  const summaryMetrics = brands.map((b) => ({
    name: b.name,
    isPrimary: b.isPrimary,
    total: b.weeklyAds.reduce((a, c) => a + c, 0),
    peak: Math.max(...b.weeklyAds),
    topFormat: [...b.formatMix].sort((a, z) => z.pct - a.pct)[0]?.format ?? "—",
  }));

  return (
    <Card className="p-6 border-border bg-card space-y-8">
      <div>
        <h3 className="text-xl font-serif font-bold text-soft-black tracking-tight">
          Ad Activity Comparison
        </h3>
        <p className="text-xs text-soft-black/60 font-medium mt-1">
          Weekly ad output trends and format mix breakdown vs competitors
        </p>
      </div>

      {/* Summary KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryMetrics.map((m) => (
          <div
            key={m.name}
            className={`rounded-xl border p-4 ${
              m.isPrimary
                ? "border-maroon/30 bg-maroon/5"
                : "border-border bg-beige/20"
            }`}
          >
            <p className={`text-[10px] uppercase tracking-widest font-bold truncate ${m.isPrimary ? "text-maroon/80" : "text-soft-black/50"}`}>
              {m.name} {m.isPrimary && "★"}
            </p>
            <p className="text-2xl font-serif font-bold text-soft-black mt-1">{m.total}</p>
            <p className="text-[10px] text-soft-black/50 font-semibold mt-0.5">4-week total</p>
            <p className="text-[10px] text-soft-black/50 font-semibold">Peak: {m.peak}/wk · Top: {m.topFormat}</p>
          </div>
        ))}
      </div>

      {/* Weekly trend lines */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-4">
          Weekly Ad Volume — Rolling 4 Weeks
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={weeklyData} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C6" vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#1A1A1A80", fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#1A1A1A80", fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(110,44,44,0.04)" }} />
              <Legend
                wrapperStyle={{ paddingTop: "16px", fontSize: "11px", fontWeight: 600 }}
              />
              {brands.map((b, i) =>
                b.isPrimary ? (
                  <Bar
                    key={b.name}
                    dataKey={b.name}
                    fill={CHART_COLORS[0]}
                    radius={[4, 4, 0, 0]}
                    barSize={14}
                    fillOpacity={0.85}
                  />
                ) : (
                  <Line
                    key={b.name}
                    type="monotone"
                    dataKey={b.name}
                    stroke={colors[i]}
                    strokeWidth={2}
                    dot={{ r: 4, fill: colors[i], strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    strokeDasharray={i % 2 === 0 ? undefined : "5 3"}
                  />
                )
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Format mix stacked */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-4">
          Ad Format Mix by Brand (%)
        </p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={formatData}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              barSize={16}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C6" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#1A1A1A80", fontSize: 10, fontWeight: 500 }}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#1A1A1A", fontSize: 11, fontWeight: 600 }}
                width={90}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(110,44,44,0.04)" }} />
              <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "11px", fontWeight: 600 }} />
              {["Video", "Image", "Carousel", "Story", "UGC"].map((fmt, i) => (
                <Bar
                  key={fmt}
                  dataKey={fmt}
                  stackId="fmt"
                  fill={["#6E2C2C", "#1A1A1A", "#8B6F47", "#D8D2C6", "#4A7C59"][i]}
                  fillOpacity={0.8}
                  radius={i === 4 ? [0, 4, 4, 0] : undefined}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
