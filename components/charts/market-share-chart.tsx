"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";

interface MarketShareChartProps {
  brandName: string;
  competitors: string[];
}

// Synthetic competitive metrics for market share visualization
function generateData(brand: string, competitors: string[]) {
  const seed = brand.charCodeAt(0);
  const rand = (offset: number, min = 20, max = 90) => {
    return Math.round(min + ((seed + offset) % (max - min)));
  };

  const metrics = ["Ad Volume", "Creativity", "Reach", "Engagement", "Spend Est."];
  return metrics.map((metric, i) => ({
    metric,
    [brand]: rand(i * 3, 40, 85),
    [competitors[0] ?? "Comp A"]: rand(i * 7, 30, 80),
    [competitors[1] ?? "Comp B"]: rand(i * 11, 25, 75),
  }));
}

const COLORS = ["#6E2C2C", "#1A1A1A", "#D8D2C6"];

export function MarketShareChart({ brandName, competitors }: MarketShareChartProps) {
  const data = generateData(brandName, competitors);
  const keys = [brandName, competitors[0], competitors[1]].filter(Boolean) as string[];

  return (
    <Card className="flex flex-col p-6 border-border bg-card">
      <div className="mb-4">
        <h2 className="text-xl font-bold font-serif text-soft-black tracking-tight">
          Market Share Comparison
        </h2>
        <p className="text-xs text-soft-black/60 font-medium mt-1">
          Relative intelligence strength vs. top competitors
        </p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#D8D2C6" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "#1A1A1A", fontSize: 11, fontWeight: 600 }}
            />
            {keys.map((key, i) => (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={COLORS[i % COLORS.length]}
                fill={COLORS[i % COLORS.length]}
                fillOpacity={i === 0 ? 0.25 : 0.08}
                strokeWidth={i === 0 ? 2.5 : 1.5}
              />
            ))}
            <Legend
              wrapperStyle={{ fontSize: "11px", fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(247, 243, 236, 0.96)",
                border: "1px solid #D8D2C6",
                borderRadius: "12px",
                color: "#1A1A1A",
                fontSize: "12px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
