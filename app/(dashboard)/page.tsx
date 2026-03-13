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
import { MagneticCard } from "@/components/ui/magnetic-card";

// Section label component — Upgraded style
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5 px-1">
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/40 flex items-center gap-2">
        <span className="w-5 h-[1.5px] bg-maroon/50 inline-block" />
        {children}
      </h3>
      <div className="h-[1px] flex-1 bg-border/40 ml-6" />
    </div>
  );
}

export default function DashboardPage() {
  const { activeBrand } = useActiveBrand();
  const config = BRAND_CONFIG[activeBrand];

  // Data fetching
  const { data: apiStats, isLoading: statsLoading } = useDashboardStats({ brand: activeBrand });
  const { data: apiInsights = [] } = useInsights({ brand: activeBrand });
  const { data: briefs = [] } = useWeeklyBrief({ brand: activeBrand });
  const { data: ads = [] } = useAds();

  // Resolution logic
  const stats = (apiStats && !("error" in apiStats)) ? apiStats : getMockStats(activeBrand);
  const insights = (apiInsights.length > 0) ? apiInsights : getMockInsights(activeBrand);
  const mockBrief = getMockBrief(activeBrand);
  const brief = (briefs[0]?.summary_md) ? briefs[0] : mockBrief;
  const trendData = getMockTrends(activeBrand);

  const weekRange = (brief as any).week_start 
    ? `${(brief as any).week_start} – ${(brief as any).week_end}` 
    : mockBrief.week_start + " – " + mockBrief.week_end;

  return (
    <div className="space-y-12 animate-fade-in-up">

      {/* ── 1. ADVEANCED HERO ── */}
      <section className="relative group">
        <MagneticCard className="p-0 border-none overflow-hidden bg-transparent">
          <div className="relative rounded-3xl border border-border shadow-2xl bg-card p-10 overflow-hidden">
             {/* Dynamic background accents */}
             <div 
               className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-105"
               style={{ background: `radial-gradient(circle at top right, ${config.accentColor || '#6E2C2C'} 0%, transparent 70%)` }}
             />
             <div className="absolute top-8 left-8 w-24 h-24 bg-maroon/5 rounded-full blur-3xl" />

             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
               <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-maroon/5 border border-maroon/20">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon"></span>
                   </span>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-maroon">Analysis Active</span>
                 </div>
                 
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-soft-black tracking-tight leading-[1.1]">
                   {activeBrand} <br />
                   <span className="text-maroon italic">Intelligence Room</span>
                 </h2>
                 
                 <div className="flex items-center gap-4 text-sm text-soft-black/60 font-medium">
                   <p className="border-r border-border/60 pr-4">{config.tagline}</p>
                   <p className="uppercase tracking-widest text-[10px] font-black text-soft-black/40">{config.industry}</p>
                 </div>
               </div>

               <div className="flex flex-col items-end gap-3 shrink-0">
                 <p className="text-[10px] text-soft-black/40 uppercase tracking-widest font-black">Competitor Perimeter</p>
                 <div className="flex flex-wrap gap-2 justify-end max-w-sm">
                   {config.competitors.map(c => (
                     <span key={c} className="px-3 py-1.5 rounded-lg bg-card border border-border/80 shadow-sm text-xs font-bold text-soft-black transition-all hover:border-maroon/30 hover:-translate-y-0.5">
                       {c}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
          </div>
        </MagneticCard>
      </section>

      {/* ── 2. KPI STATS with Magnetic Cards ── */}
      <section className="reveal">
        <SectionLabel>Competitor Overview</SectionLabel>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {statsLoading ? (
            [1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)
          ) : (
            <>
              {[
                { label: "Direct Competitors", value: config.competitors.length },
                { label: "Active Ad Stream", value: stats?.activeAds ?? 0 },
                { label: "New Creative Volume", value: stats?.newCreatives30d ?? 0 },
                { label: "Market Volatility", value: 12, suffix: "%" },
              ].map((item, i) => (
                <MagneticCard key={i} className="group">
                  <div className="p-6 h-full flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-soft-black/40 tracking-widest uppercase transition-colors group-hover:text-maroon/60">{item.label}</span>
                    <div className="flex items-baseline gap-1 mt-4">
                      <AnimatedStat
                        value={item.value as number}
                        className="text-4xl font-bold font-serif text-soft-black tracking-tight"
                      />
                      {item.suffix && <span className="text-lg font-bold text-soft-black/40">{item.suffix}</span>}
                    </div>
                  </div>
                </MagneticCard>
              ))}
            </>
          )}
        </div>
      </section>

      {/* ── 3. RADAR & TRENDS ── */}
      <div className="grid gap-6 lg:grid-cols-3 reveal">
        <div className="lg:col-span-2 space-y-6">
          <SectionLabel>Market Positioning Radar</SectionLabel>
          <Card className="p-1 border-border shadow-xl">
             <MarketShareChart brandName={activeBrand} competitors={config.competitors} />
          </Card>
        </div>
        <div className="space-y-6">
          <SectionLabel>Weekly AI Brief</SectionLabel>
          <WeeklyBrief
            brand={activeBrand}
            weekRange={weekRange}
            summary={(brief as any).summary_md ?? mockBrief.summary_md}
            bullets={(brief as any).insights_json?.map((i: any) => i.trend) ?? mockBrief.insights_json.map(i => i.trend)}
          />
        </div>
      </div>

      {/* ── 4. AD INTELLIGENCE ── */}
      <section className="reveal">
        <SectionLabel>Ad & Creative Intelligence</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-1 border-border shadow-xl overflow-hidden">
             <FormatDistributionChart data={getMockTrends(activeBrand).slice(-1).map(p => ([
               { format: "Video", value: p.video },
               { format: "Carousel", value: p.carousel },
               { format: "Image", value: p.image },
               { format: "Testimonial", value: p.testimonial },
             ])).flat()} />
          </Card>
          <Card className="shadow-xl">
            <TrendChart
              title={`Content Evolution — ${activeBrand}`}
              subtitle="Volume shifts across core ad formats"
              data={trendData}
              keys={["video", "carousel", "image"]}
            />
          </Card>
        </div>
      </section>

      {/* ── 5. STRATEGY MATRIX ── */}
      <div className="grid gap-6 lg:grid-cols-3 reveal">
        <div className="lg:col-span-2 space-y-6">
          <SectionLabel>Competitive Strategy Matrix</SectionLabel>
          <CompetitorStrategyInsights brandName={activeBrand} competitors={config.competitors} />
        </div>
        <div className="space-y-6">
          <SectionLabel>Key Intelligence Signals</SectionLabel>
          <InsightPanel
            title="Active Intelligence"
            insights={insights.slice(0, 4)}
          />
        </div>
      </div>

    </div>
  );
}
