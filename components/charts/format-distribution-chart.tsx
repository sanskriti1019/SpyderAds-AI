"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ["#2563eb", "#0ea5e9", "#10b981", "#8b5cf6"];

interface FormatDistributionChartProps {
  data: { format: string; value: number }[];
}

export function FormatDistributionChart({ data }: FormatDistributionChartProps) {
  if (!data?.length) return null;
  return (
    <Card className="flex flex-col p-4">
      <h2 className="text-sm font-semibold text-gray-900">Format Distribution</h2>
      <p className="text-xs text-gray-500 mt-0.5">
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
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                color: '#111827',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#4b5563' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
