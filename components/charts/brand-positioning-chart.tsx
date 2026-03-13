"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Label,
} from "recharts";
import { Card } from "@/components/ui/card";
import { BrandCompetitorRow, TOOLTIP_STYLE, CHART_COLORS } from "@/lib/comparison-data";

interface PositioningScatterChartProps {
  brands: BrandCompetitorRow[];
  primaryBrand: string;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: BrandCompetitorRow }[] }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as BrandCompetitorRow;
  return (
    <div
      style={{
        ...TOOLTIP_STYLE,
        padding: "12px 16px",
        minWidth: "160px",
      }}
    >
      <p style={{ fontWeight: 800, fontSize: "13px", color: d.isPrimary ? "#6E2C2C" : "#1A1A1A" }}>
        {d.name} {d.isPrimary ? "★" : ""}
      </p>
      <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={{ fontSize: "11px" }}>Brand Strength: <strong>{d.brandStrength}</strong></p>
        <p style={{ fontSize: "11px" }}>Digital Agility: <strong>{d.digitalAgility}</strong></p>
        <p style={{ fontSize: "11px" }}>Audience Depth: <strong>{d.audienceDepth}</strong></p>
      </div>
    </div>
  );
};

// Custom dot renderer for scatter (renders a labeled dot)
const CustomDot = (props: {
  cx?: number;
  cy?: number;
  fill?: string;
  payload?: BrandCompetitorRow;
}) => {
  const { cx = 0, cy = 0, fill = "#ccc", payload } = props;
  const isPrimary = payload?.isPrimary;
  const r = isPrimary ? 18 : 12;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        fillOpacity={isPrimary ? 0.9 : 0.55}
        stroke={fill}
        strokeWidth={isPrimary ? 2.5 : 1}
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fill="white"
        fontSize={isPrimary ? 9 : 8}
        fontWeight={800}
      >
        {(payload?.name ?? "").split(" ").map((w) => w[0]).join("").slice(0, 3)}
      </text>
    </g>
  );
};

export function BrandPositioningScatterChart({ brands, primaryBrand }: PositioningScatterChartProps) {
  return (
    <Card className="p-6 border-border bg-card">
      <div className="mb-6">
        <h3 className="text-xl font-serif font-bold text-soft-black tracking-tight">
          Brand Positioning Map
        </h3>
        <p className="text-xs text-soft-black/60 font-medium mt-1">
          Digital Agility vs Brand Strength · bubble size = Audience Depth
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C6" />
            <XAxis
              type="number"
              dataKey="brandStrength"
              domain={[40, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#1A1A1A80", fontSize: 11, fontWeight: 500 }}
              name="Brand Strength"
            >
              <Label
                value="Brand Strength →"
                offset={-10}
                position="insideBottom"
                style={{ fill: "#1A1A1A40", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="digitalAgility"
              domain={[40, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#1A1A1A80", fontSize: 11, fontWeight: 500 }}
              name="Digital Agility"
            >
              <Label
                value="Digital Agility →"
                angle={-90}
                position="insideLeft"
                offset={20}
                style={{ fill: "#1A1A1A40", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}
              />
            </YAxis>
            <ZAxis type="number" dataKey="audienceDepth" range={[400, 1200]} name="Audience Depth" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(110,44,44,0.03)" }} />
            <Scatter data={brands} shape={<CustomDot />}>
              {brands.map((b, i) => (
                <Cell
                  key={b.name}
                  fill={b.isPrimary ? CHART_COLORS[0] : CHART_COLORS[1 + (i % (CHART_COLORS.length - 1))]}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
        {brands.map((b, i) => (
          <div key={b.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{
                backgroundColor: b.isPrimary
                  ? CHART_COLORS[0]
                  : CHART_COLORS[1 + (i % (CHART_COLORS.length - 1))],
                opacity: b.isPrimary ? 1 : 0.6,
              }}
            />
            <span className={`text-xs font-semibold ${b.isPrimary ? "text-maroon" : "text-soft-black/60"}`}>
              {b.name} {b.isPrimary && "★"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
