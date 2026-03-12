"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ["#111827", "#6366f1", "#0ea5e9", "#22c55e"];

interface FormatDistributionChartProps {
  data: { format: string; value: number }[];
}

export function FormatDistributionChart({ data }: FormatDistributionChartProps) {
  if (!data?.length) return null;
  return (
    <Card className="flex flex-col p-4">
      <h2 className="text-sm font-semibold">Format Distribution</h2>
      <p className="text-xs text-muted-foreground mt-0.5">
        Share of creatives by format
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="format"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
