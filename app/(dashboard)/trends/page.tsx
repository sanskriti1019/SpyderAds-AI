"use client";

import { useActiveBrand } from "@/lib/brand-context";
import { useTrends } from "@/lib/hooks";
import { getMockTrends } from "@/lib/mock-data";
import { TrendChart } from "@/components/charts/trend-chart";
import { FormatDistributionChart } from "@/components/charts/format-distribution-chart";
import { ThemeDistributionChart } from "@/components/charts/theme-distribution-chart";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MagneticCard } from "@/components/ui/magnetic-card";

const FORMAT_DATA: Record<string, { format: string; value: number }[]> = {
  "BeBodywise":   [{ format: "Video", value: 45 }, { format: "Image", value: 30 }, { format: "Carousel", value: 25 }],
  "Man Matters":  [{ format: "Video", value: 55 }, { format: "Carousel", value: 30 }, { format: "Image", value: 15 }],
  "Little Joys":  [{ format: "Video", value: 50 }, { format: "Image", value: 35 }, { format: "Carousel", value: 15 }],
};
const THEME_DATA: Record<string, { theme: string; value: number }[]> = {
  "BeBodywise":   [{ theme: "Educational", value: 38 }, { theme: "Testimonial", value: 32 }, { theme: "Before/After", value: 30 }],
  "Man Matters":  [{ theme: "Clinical Authority", value: 42 }, { theme: "Testimonial", value: 35 }, { theme: "Offer-driven", value: 23 }],
  "Little Joys":  [{ theme: "Emotional/Safety", value: 48 }, { theme: "Natural Ingredients", value: 30 }, { theme: "Social Proof", value: 22 }],
};

const INSIGHT_CARDS: Record<string, { label: string; value: string; delta: string; positive: boolean }[]> = {
  "BeBodywise": [
    { label: "Video ad share growth", value: "+18%", delta: "vs last month", positive: true },
    { label: "Testimonial format trend", value: "+12%", delta: "MoM uplift", positive: true },
    { label: "Educational carousel CTR", value: "4.2%", delta: "industry avg 1.8%", positive: true },
    { label: "Mamaearth ad volume spike", value: "+34%", delta: "last 30 days", positive: false },
  ],
  "Man Matters": [
    { label: "Doctor video format growth", value: "+28%", delta: "vs last month", positive: true },
    { label: "Traya new ad variants", value: "24", delta: "this week alone", positive: false },
    { label: "Lead gen CTR (hair test)", value: "5.1%", delta: "category benchmark 2.3%", positive: true },
    { label: "Bold Care spend surge", value: "+45%", delta: "Ranveer campaign", positive: false },
  ],
  "Little Joys": [
    { label: "Kids wellness ad spend", value: "+22%", delta: "category growth MoM", positive: true },
    { label: "Mamaearth dominance", value: "68%", delta: "of category ad volume", positive: false },
    { label: "Short video adoption", value: "+40%", delta: "across all competitors", positive: true },
    { label: "Little Joys ad gap", value: "-55%", delta: "vs Mamaearth volumes", positive: false },
  ],
};

export default function TrendsPage() {
  const { activeBrand } = useActiveBrand();
  const { data: apiTrends, isLoading } = useTrends({ brand: activeBrand });
  const trendData = (apiTrends && apiTrends.length > 0) ? apiTrends : getMockTrends(activeBrand);
  const formatData = FORMAT_DATA[activeBrand] ?? FORMAT_DATA["BeBodywise"];
  const themeData = THEME_DATA[activeBrand] ?? THEME_DATA["BeBodywise"];
  const insights = INSIGHT_CARDS[activeBrand] ?? INSIGHT_CARDS["BeBodywise"];

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Header — Premium Model */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/70 mb-1.5">Market Velocity</p>
          <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
            Trend <span className="text-maroon">Pulse</span>
          </h2>
          <p className="text-sm text-soft-black/60 font-medium mt-1.5 max-w-xl">
             Real-time monitoring of creative shifts, format adoption, and theme evolution across the competitive network.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border/80 rounded-xl px-4 py-2 shadow-sm">
           <span className="text-[10px] font-bold text-soft-black/40 uppercase tracking-widest">Active Scan</span>
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* KPI Summary — Magnetic Model */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        {insights.map((card, i) => (
          <MagneticCard key={i} className="group">
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40 group-hover:text-maroon/60 transition-colors">{card.label}</p>
              <div className="flex items-baseline gap-2 mt-4">
                <p className={`text-3xl font-serif font-bold ${card.positive ? "text-soft-black" : "text-maroon animate-glow-pulse"}`}>
                  {card.value}
                </p>
                <span className="text-[10px] text-soft-black/40 font-bold uppercase tracking-widest leading-none">{card.delta}</span>
              </div>
            </div>
          </MagneticCard>
        ))}
      </div>

      {/* Main trend chart — Premium Card */}
      <section className="reveal">
        <div className="mb-5 flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/40 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-maroon/50 inline-block" />
            Competitive Momentum — 10 Week Rolling
          </h3>
        </div>
        {isLoading ? (
          <Skeleton className="h-[400px] rounded-3xl" />
        ) : (
          <div className="shadow-2xl rounded-3xl overflow-hidden border border-border bg-card">
            <TrendChart
              title={`${activeBrand} Momentum Pulse`}
              subtitle="Aggregated volume trajectories for dominant ad formats"
              data={trendData}
              keys={["testimonial", "video", "carousel", "image"]}
            />
          </div>
        )}
      </section>

      {/* Format & Theme distribution */}
      <section className="reveal">
        <div className="mb-5 flex items-center justify-between">
           <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/40 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-maroon/50 inline-block" />
            Structural Mix Analysis
          </h3>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-1 shadow-lg border-border/80">
            <FormatDistributionChart data={formatData} />
          </Card>
          <Card className="p-1 shadow-lg border-border/80">
            <ThemeDistributionChart data={themeData} />
          </Card>
        </div>
      </section>

      {/* Trend interpretation footer */}
      <section className="reveal">
        <Card className="p-8 border-border bg-card shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-maroon/[0.03] to-transparent pointer-events-none" />
          <div className="grid gap-10 md:grid-cols-2 relative z-10">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-black text-maroon flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-maroon" />
                 Rising Trajectories
              </p>
              <div className="space-y-4">
                {[
                  "Short-form vertical video is demonstrating a 42% higher retention rate than horizontal variants.",
                  "Educational ingredient carousels are scaling as primary top-of-funnel acquisition assets.",
                  "Doctor-led clinical authority messaging is currently the lowest-CAC content vertical."
                ].map((t, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-maroon/10 bg-maroon/5 group/t hover:bg-maroon/10 transition-colors">
                    <span className="text-maroon font-bold">↑</span> 
                    <p className="text-sm font-semibold text-soft-black/80 leading-relaxed italic font-serif">"{t}"</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
               <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-soft-black/20" />
                 Market Saturation Signals
              </p>
              <div className="space-y-4">
                {[
                  "Generic brand lifestyle imagery is experiencing 'Banner Blindness' with CTR dropping 22% MoM.",
                  "Long-form storytelling without immediate problem-hooks shows 65% drop-off at 5-second mark.",
                  "Price-only promotional offers without value-stacking are showing diminishing returns."
                ].map((t, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/60 bg-beige/10">
                    <span className="text-soft-black/30 font-bold">↓</span> 
                    <p className="text-sm font-semibold text-soft-black/60 leading-relaxed italic font-serif">"{t}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
