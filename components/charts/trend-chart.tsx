"use client";

import {
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";

interface TrendChartProps {
  title: string;
  subtitle?: string;
  data: { date: string; [key: string]: string | number }[];
  keys: string[];
}

export function TrendChart({ title, subtitle, data, keys }: TrendChartProps) {
  const colors = ["#2563eb", "#8b5cf6", "#0ea5e9"];
  return (
    <Card className="flex flex-col p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {keys.map((k, i) => (
                <linearGradient key={`color-${k}`} id={`color-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
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
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {keys.map((k, i) => (
              <Area
                key={k}
                type="monotone"
                dataKey={k}
                stroke={colors[i % colors.length]}
                fill={`url(#color-${k})`}
                strokeWidth={3}
                activeDot={{ r: 6, strokeWidth: 0, fill: colors[i % colors.length] }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
