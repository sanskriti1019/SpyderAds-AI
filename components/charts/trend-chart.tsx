"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
  const colors = ["#6366f1", "#06b6d4", "#a855f7"];
  return (
    <Card className="flex flex-col p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {keys.map((k, i) => (
                <linearGradient key={`color-${k}`} id={`color-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-white/10" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} dy={10} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {keys.map((k, i) => (
              <Line
                key={k}
                type="monotone"
                dataKey={k}
                stroke={colors[i % colors.length]}
                strokeWidth={3}
                dot={{ r: 4, fill: colors[i % colors.length], strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0, shadow: `0 0 10px ${colors[i % colors.length]}` }}
                className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
