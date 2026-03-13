"use client";

import { useActiveBrand, BRAND_CONFIG } from "@/lib/brand-context";
import { useAds, useInsights, useWeeklyBrief, useDashboardStats } from "@/lib/hooks";
import { getMockTrends, getMockInsights, getMockStats, getMockBrief, getMockGaps } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendChart } from "@/components/charts/trend-chart";
import { FormatDistributionChart } from "@/components/charts/format-distribution-chart";
import { ThemeDistributionChart } from "@/components/charts/theme-distribution-chart";
import { MarketShareChart } from "@/components/charts/market-share-chart";
import { InsightPanel } from "@/components/insights/insight-panel";
import { WeeklyBrief } from "@/components/insights/weekly-brief";
import { CompetitorStrategyInsights } from "@/components/insights/competitor-strategy-insights";
import { AnimatedStat } from "@/components/ui/animated-stat";

// Static format/theme per brand (used when Supabase has no data)
const BRAND_FORMAT_DATA: Record<string, { format: string; value: number }[]> = {
  "BeBodywise": [
    { format: "Video", value: 45 },
    { format: "Carousel", value: 30 },
    { format: "Image", value: 25 },
  ],
  "Man Matters": [
    { format: "Video", value: 55 },
    { format: "Carousel", value: 28 },
    { format: "Image", value: 17 },
  ],
  "Little Joys": [
    { format: "Video", value: 50 },
    { format: "Image", value: 35 },
    { format: "Carousel", value: 15 },
  ],
};
const BRAND_THEME_DATA: Record<string, { theme: string; value: number }[]> = {
  "BeBodywise": [
    { theme: "Educational", value: 38 },
    { theme: "Testimonial", value: 32 },
    { theme: "Before/After", value: 30 },
  ],
  "Man Matters": [
    { theme: "Clinical Authority", value: 42 },
    { theme: "Testimonial", value: 35 },
    { theme: "Offer-driven", value: 23 },
  ],
  "Little Joys": [
    { theme: "Emotional/Safety", value: 48 },
    { theme: "Natural Ingredients", value: 30 },
    { theme: "Social Proof", value: 22 },
  ],
};

// Section label component
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4 flex items-center gap-2">
      <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
      {children}
    </h3>
  );
}

export default function DashboardPage() {
  const { activeBrand } = useActiveBrand();
  const config = BRAND_CONFIG[activeBrand];

  // All hooks now receive activeBrand so they refetch on brand switch
  const { data: apiStats, isLoading: statsLoading } = useDashboardStats({ brand: activeBrand });
  const { data: apiInsights = [] } = useInsights({ brand: activeBrand });
  const { data: briefs = [] } = useWeeklyBrief({ brand: activeBrand });
  const { data: ads = [] } = useAds({ brand: undefined });

  // Resolve stats — prefer API, fall back to mock
  const mockStats = getMockStats(activeBrand);
  const stats = (apiStats && !("error" in apiStats)) ? apiStats : mockStats;

  // Resolve insights — prefer API when non-empty, fall back to mock
  const mockInsights = getMockInsights(activeBrand);
  const insights = (apiInsights.length > 0) ? apiInsights : mockInsights;
  const gapInsights = getMockGaps(activeBrand);

  // Resolve brief
  const apiFirstBrief = briefs[0] as {
    week_start?: string; week_end?: string;
    summary_md?: string; insights_json?: { trend?: string }[];
    primary_brand_name?: string;
  } | undefined;
  const mockBrief = getMockBrief(activeBrand);
  const brief = apiFirstBrief?.summary_md ? apiFirstBrief : mockBrief;

  // Trend data — from mock (rich 10-week data)
  const trendData = getMockTrends(activeBrand);

  // Format/theme — from ads if available, else static
  const adsForBrand = (ads as { format?: string; theme?: string }[]);
  const formatData: { format: string; value: number }[] = (() => {
    if (adsForBrand.length > 0) {
      const acc: Record<string, number> = {};
      adsForBrand.forEach((a) => { if (a.format) acc[a.format] = (acc[a.format] ?? 0) + 1; });
      return Object.entries(acc).map(([format, value]) => ({ format, value }));
    }
    return BRAND_FORMAT_DATA[activeBrand] ?? BRAND_FORMAT_DATA["BeBodywise"];
  })();
  const themeData: { theme: string; value: number }[] = (() => {
    if (adsForBrand.length > 0) {
      const acc: Record<string, number> = {};
      adsForBrand.forEach((a) => { if (a.theme) acc[a.theme] = (acc[a.theme] ?? 0) + 1; });
      return Object.entries(acc).map(([theme, value]) => ({ theme, value }));
    }
    return BRAND_THEME_DATA[activeBrand] ?? BRAND_THEME_DATA["BeBodywise"];
  })();

  const weekRange = (brief as { week_start?: string; week_end?: string }).week_start && (brief as { week_start?: string; week_end?: string }).week_end
    ? `${(brief as { week_start?: string }).week_start} – ${(brief as { week_end?: string }).week_end}`
    : mockBrief.week_start + " – " + mockBrief.week_end;

  return (
    <div className="space-y-10">

      {/* ── Brand Hero Banner ── */}
      <div className="relative flex items-end justify-between rounded-2xl border border-border bg-card p-8 overflow-hidden animate-fade-in-up">
        {/* Decorative maroon gradient blob */}
        <div className="absolute right-0 top-0 w-72 h-full bg-gradient-to-l from-maroon/5 to-transparent pointer-events-none rounded-r-2xl" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-maroon/5 blur-3xl pointer-events-none" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/70 mb-2">Active Intelligence</p>
          <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight leading-tight">
            {activeBrand}
            <span className="text-maroon"> Intelligence</span>
          </h2>
          <p className="text-sm text-soft-black/60 font-medium mt-1.5 tracking-wide">
            {config.tagline} · {config.industry}
          </p>
        </div>
        <div className="text-right shrink-0 hidden sm:block">
          <p className="text-[10px] text-soft-black/40 uppercase tracking-widest font-semibold mb-1">Tracking</p>
          <p className="text-sm font-bold text-maroon">{config.competitors.join(" · ")}</p>
        </div>
      </div>

      {/* ── 1. KPI Stats ── */}
      <section>
        <SectionLabel>Competitor Overview</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {statsLoading ? (
            <>
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
            </>
          ) : (
            <>
              {[
                { label: "Tracked Competitors", value: config.competitors.length, suffix: "" },
                { label: "Active Ads Tracked", value: stats?.activeAds ?? 0, suffix: "" },
                { label: "New Creatives (30d)", value: stats?.newCreatives30d ?? 0, suffix: "" },
                { label: "Category", isText: true, text: config.industry },
              ].map((item, i) => (
                <Card key={i} className="flex flex-col justify-between p-6">
                  <span className="text-[10px] font-bold text-soft-black/50 tracking-widest uppercase">{item.label}</span>
                  {item.isText ? (
                    <span className="mt-3 text-lg font-bold font-serif text-maroon leading-snug">{item.text}</span>
                  ) : (
                    <AnimatedStat
                      value={item.value as number}
                      className="mt-3 text-4xl font-bold font-serif text-soft-black"
                    />
                  )}
                </Card>
              ))}
            </>
          )}
        </div>
      </section>

      {/* ── 2. Market Share Radar ── */}
      <section>
        <SectionLabel>Market Share Comparison</SectionLabel>
        <MarketShareChart brandName={activeBrand} competitors={config.competitors} />
      </section>

      {/* ── 3. Ad Intelligence Charts ── */}
      <section>
        <SectionLabel>Ad Intelligence</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2">
          <FormatDistributionChart data={formatData} />
          <ThemeDistributionChart data={themeData} />
        </div>
      </section>

      {/* ── 4. Creative Trend Insights ── */}
      <section>
        <SectionLabel>Creative Trend Insights</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TrendChart
              title={`${activeBrand} — Creative Trends`}
              subtitle="Format volume across tracked competitor ads (10-week)"
              data={trendData}
              keys={["testimonial", "video", "carousel", "image"]}
            />
          </div>
          {/* Gap opportunities from mock */}
          <div className="flex flex-col gap-3">
            <Card className="p-5 h-full">
              <p className="text-[10px] font-bold uppercase tracking-widest text-soft-black/50 mb-3">
                Market Gaps
              </p>
              <div className="space-y-3">
                {gapInsights.slice(0, 3).map((g, i) => (
                  <div key={i} className="rounded-xl border border-border bg-beige/30 px-4 py-3 space-y-1.5 hover:-translate-y-0.5 transition-all">
                    <p className="text-[10px] font-bold text-maroon tracking-wider">{g.competitor}</p>
                    <p className="text-xs font-semibold text-soft-black leading-snug">{g.trend.replace("Gap: ", "").replace("Investment signal: ", "")}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── 5. Strategy + Brief ── */}
      <section>
        <SectionLabel>Competitor Strategy Insights</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CompetitorStrategyInsights brandName={activeBrand} competitors={config.competitors} />
          </div>
          <div className="flex flex-col gap-4">
            <InsightPanel
              title="Key Intelligence Signals"
              insights={(insights as { competitor: string; trend: string; strategic_implication: string }[]).slice(0, 3)}
            />
            <WeeklyBrief
              brand={activeBrand}
              weekRange={weekRange}
              summary={(brief as { summary_md?: string }).summary_md ?? mockBrief.summary_md}
              bullets={
                ((brief as { insights_json?: { trend?: string }[] }).insights_json?.map((i) => i.trend).filter(Boolean) as string[]) ??
                mockBrief.insights_json.map((i) => i.trend)
              }
            />
          </div>
        </div>
      </section>

      {/* ── 6. Ad Creative Gallery placeholder ── */}
      <section>
        <SectionLabel>Creative Intelligence Gallery</SectionLabel>
        <Card className="p-10 border-border bg-card text-center">
          <p className="text-4xl mb-3">🕸️</p>
          <p className="text-soft-black font-serif font-bold text-lg">Scraper running in background</p>
          <p className="text-soft-black/50 text-sm font-medium mt-2">
            Live creatives will appear here once the Meta Ad Library scraper populates the database.
          </p>
          <p className="text-soft-black/30 text-xs font-medium mt-1">
            Visit <span className="text-maroon font-semibold">/competitors/[brand]</span> to see ad examples per competitor.
          </p>
        </Card>
      </section>
    </div>
  );
}
