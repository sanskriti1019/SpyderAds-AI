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
    <Card className="flex flex-col p-4 border-border bg-card">
      <h2 className="text-sm font-bold font-serif text-soft-black">Message Theme Analysis</h2>
      <p className="text-xs text-soft-black/60 mt-0.5">
        Distribution of message themes across active creatives
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C6" vertical={false} />
            <XAxis dataKey="theme" tickLine={false} axisLine={false} tick={{ fill: "#1A1A1A80", fontSize: 12, fontWeight: 500 }} dy={10} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#1A1A1A80", fontSize: 12, fontWeight: 500 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(247, 243, 236, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #D8D2C6',
                borderRadius: '12px',
                color: '#1A1A1A',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
              cursor={{ fill: 'rgba(110, 44, 44, 0.05)' }}
            />
            <Bar dataKey="value" fill="#6E2C2C" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
