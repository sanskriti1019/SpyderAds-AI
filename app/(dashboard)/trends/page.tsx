"use client";

import { useActiveBrand } from "@/lib/brand-context";
import { useTrends } from "@/lib/hooks";
import { getMockTrends } from "@/lib/mock-data";
import { TrendChart } from "@/components/charts/trend-chart";
import { FormatDistributionChart } from "@/components/charts/format-distribution-chart";
import { ThemeDistributionChart } from "@/components/charts/theme-distribution-chart";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
          <span className="text-maroon">{activeBrand}</span> — Trend Analysis
        </h2>
        <p className="text-sm text-soft-black/60 font-medium mt-1">
          Deep dive into creative format and theme trends across the competitive landscape
        </p>
      </div>

      {/* KPI Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((card, i) => (
          <Card key={i} className="p-5 border-border bg-card">
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">{card.label}</p>
            <p className={`text-2xl font-serif font-bold mt-2 ${card.positive ? "text-soft-black" : "text-maroon"}`}>
              {card.value}
            </p>
            <p className="text-[10px] text-soft-black/40 font-semibold mt-1">{card.delta}</p>
          </Card>
        ))}
      </div>

      {/* Main trend chart */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4">
          Creative Format Trends — 10 Week Rolling
        </h3>
        {isLoading ? (
          <Skeleton className="h-80" />
        ) : (
          <TrendChart
            title={`${activeBrand} Competitor Creative Trends`}
            subtitle="Testimonial, video, carousel and image ad volumes across tracked competitors"
            data={trendData}
            keys={["testimonial", "video", "carousel", "image"]}
          />
        )}
      </section>

      {/* Format & Theme distribution */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4">
          Current Format & Theme Distribution
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormatDistributionChart data={formatData} />
          <ThemeDistributionChart data={themeData} />
        </div>
      </section>

      {/* Trend interpretation */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4">
          Trend Intelligence Insights
        </h3>
        <Card className="p-6 border-border bg-card space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-maroon">Rising Trends</p>
              {[
                "Short-form video (under 30s) is the fastest growing format across all competitors",
                "Educational content — ingredient explainers and how-it-works carousels — showing 3x engagement",
                "Doctor-to-camera and clinical authority formats scaling rapidly in wellness D2C",
              ].map((t, i) => (
                <div key={i} className="flex gap-2 text-sm text-soft-black/80 font-medium">
                  <span className="text-maroon shrink-0">↑</span> {t}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/60">Declining Trends</p>
              {[
                "Generic lifestyle images without problem-solution context losing engagement",
                "Long-form video (2min+) being deprioritised in favour of snackable 15–30s formats",
                "Discount-only offers without product storytelling showing diminishing CTR returns",
              ].map((t, i) => (
                <div key={i} className="flex gap-2 text-sm text-soft-black/80 font-medium">
                  <span className="text-soft-black/40 shrink-0">↓</span> {t}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
