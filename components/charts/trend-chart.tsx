"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface TrendChartProps {
  title: string;
  subtitle?: string;
  data: { date: string; [key: string]: string | number }[];
  keys: string[];
}

const COLORS = ["#6E2C2C", "#1A1A1A", "#8B6F47", "#4A7C59"];

// Custom dot with glow
const GlowDot = (props: { cx?: number; cy?: number; fill?: string; index?: number; dataLength?: number }) => {
  const { cx = 0, cy = 0, fill = "#6E2C2C" } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill={fill} opacity={0.08} />
      <circle cx={cx} cy={cy} r={5} fill={fill} opacity={0.2} />
      <circle cx={cx} cy={cy} r={3} fill={fill} />
    </g>
  );
};

// Custom tooltip with premium styling
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-lg p-4 min-w-[160px] animate-scale-in"
      style={{ boxShadow: "0 8px 32px rgba(110,44,44,0.1), 0 2px 8px rgba(0,0,0,0.06)" }}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-soft-black/50 mb-2">{label}</p>
      <div className="space-y-1.5">
        {payload.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-xs font-semibold text-soft-black/70 capitalize">{p.name}</span>
            </div>
            <span className="text-sm font-bold text-soft-black">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function TrendChart({ title, subtitle, data, keys }: TrendChartProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <Card className="flex flex-col p-6 border-border bg-card">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold font-serif text-soft-black tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-soft-black/60 font-medium mt-0.5">{subtitle}</p>}
        </div>
        {/* Interactive legend toggles */}
        <div className="flex flex-wrap gap-2">
          {keys.map((k, i) => (
            <button
              key={k}
              onClick={() => setActiveKey(activeKey === k ? null : k)}
              className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all duration-200 btn-press ${
                activeKey === null || activeKey === k
                  ? "border-border bg-beige/50 text-soft-black/70"
                  : "border-transparent bg-transparent text-soft-black/30"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length], opacity: activeKey === null || activeKey === k ? 1 : 0.3 }}
              />
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {keys.map((k, i) => (
                <linearGradient key={`grad-${k}`} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={COLORS[i % COLORS.length]} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.01} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C6" vertical={false} opacity={0.5} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#1A1A1A60", fontSize: 11, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#1A1A1A60", fontSize: 11, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(110,44,44,0.15)", strokeWidth: 1, strokeDasharray: "4 4" }} />
            {keys.map((k, i) => {
              const isVisible = activeKey === null || activeKey === k;
              return (
                <Area
                  key={k}
                  type="monotone"
                  dataKey={k}
                  stroke={COLORS[i % COLORS.length]}
                  fill={`url(#grad-${k})`}
                  strokeWidth={isVisible ? 2.5 : 0.5}
                  strokeOpacity={isVisible ? 1 : 0.2}
                  fillOpacity={isVisible ? 1 : 0.05}
                  dot={false}
                  activeDot={<GlowDot fill={COLORS[i % COLORS.length]} />}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
