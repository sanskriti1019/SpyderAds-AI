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
      <h2 className="text-sm font-semibold text-gray-900">Message Theme Analysis</h2>
      <p className="text-xs text-gray-500 mt-0.5">
        Distribution of message themes across active creatives
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" vertical={false} />
            <XAxis dataKey="theme" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                color: '#111827',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
              cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
            />
            <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
