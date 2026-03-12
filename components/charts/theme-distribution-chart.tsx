"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";

interface ThemeDistributionChartProps {
  data: { theme: string; value: number }[];
}

export function ThemeDistributionChart({ data }: ThemeDistributionChartProps) {
  if (!data?.length) return null;
  return (
    <Card className="flex flex-col p-4">
      <h2 className="text-sm font-semibold">Message Theme Analysis</h2>
      <p className="text-xs text-muted-foreground mt-0.5">
        Distribution of message themes across active creatives
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="theme" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
