"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ["#6E2C2C", "#1A1A1A", "#D8D2C6", "#EDE3D5"];

interface FormatDistributionChartProps {
  data: { format: string; value: number }[];
}

export function FormatDistributionChart({ data }: FormatDistributionChartProps) {
  if (!data?.length) return null;
  return (
    <Card className="flex flex-col p-4 border-border bg-card">
      <h2 className="text-sm font-bold font-serif text-soft-black">Format Distribution</h2>
      <p className="text-xs text-soft-black/60 mt-0.5">
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
                backgroundColor: 'rgba(247, 243, 236, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #D8D2C6',
                borderRadius: '12px',
                color: '#1A1A1A',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#1A1A1A' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
