"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList,
} from "recharts";
import { Card } from "@/components/ui/card";
import { BrandCompetitorRow, TOOLTIP_STYLE, CHART_COLORS } from "@/lib/comparison-data";

interface MarketShareBarChartProps {
  brands: BrandCompetitorRow[];
  primaryBrand: string;
}

// Custom bar label
const CustomBarLabel = (props: { x?: number; y?: number; width?: number; value?: number }) => {
  const { x = 0, y = 0, width = 0, value = 0 } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 6}
      fill="#1A1A1A"
      textAnchor="middle"
      fontSize={11}
      fontWeight={700}
    >
      {value}
    </text>
  );
};

export function MarketShareBarChart({ brands, primaryBrand }: MarketShareBarChartProps) {
  const metrics = [
    { key: "adVolume", label: "Ad Volume (est.)" },
    { key: "estimatedSpend", label: "Spend Index" },
    { key: "channelReach", label: "Channel Reach" },
  ];

  // One dataset per metric across brands
  const chartData = brands.map((b) => ({
    name: b.name,
    "Ad Volume": b.adVolume,
    "Spend Index": b.estimatedSpend,
    "Channel Reach": b.channelReach,
    isPrimary: b.isPrimary,
  }));

  const colors = brands.map((b, i) =>
    b.isPrimary ? CHART_COLORS[0] : CHART_COLORS[1 + (i % (CHART_COLORS.length - 1))]
  );

  return (
    <Card className="p-6 border-border bg-card">
      <div className="mb-6">
        <h3 className="text-xl font-serif font-bold text-soft-black tracking-tight">
          Market Share Comparison
        </h3>
        <p className="text-xs text-soft-black/60 font-medium mt-1">
          Ad volume, spend index, and channel reach vs. competitors
        </p>
      </div>

      {/* Three grouped bar metrics */}
      <div className="space-y-8">
        {["Ad Volume", "Spend Index", "Channel Reach"].map((metric) => (
          <div key={metric}>
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">{metric}</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 16, right: 16, left: -16, bottom: 0 }}
                  barSize={28}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C6" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#1A1A1A", fontSize: 11, fontWeight: 600 }}
                  />
                  <YAxis hide />
                  <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(110,44,44,0.04)" }} />
                  <Bar dataKey={metric} radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={entry.isPrimary ? "#6E2C2C" : colors[i] ?? "#D8D2C6"}
                        fillOpacity={entry.isPrimary ? 1 : 0.65}
                      />
                    ))}
                    <LabelList content={<CustomBarLabel />} position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
        {brands.map((b) => (
          <div key={b.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: b.isPrimary ? "#6E2C2C" : "#1A1A1A", opacity: b.isPrimary ? 1 : 0.5 }}
            />
            <span className={`text-xs font-semibold ${b.isPrimary ? "text-maroon" : "text-soft-black/60"}`}>
              {b.name} {b.isPrimary && "★"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
