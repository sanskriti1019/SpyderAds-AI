"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetitorBySlug } from "@/lib/competitors-data";
import { useAds } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/charts/trend-chart";
import { FormatDistributionChart } from "@/components/charts/format-distribution-chart";
import { ThemeDistributionChart } from "@/components/charts/theme-distribution-chart";
import { CreativeGallery } from "@/components/creatives/creative-gallery";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CompetitorDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const brand = getCompetitorBySlug(slug);

  if (!brand) notFound();

  const { data: ads = [], isLoading: adsLoading } = useAds({ brand: brand.name });

  const formatData = (ads as { format?: string }[]).reduce((acc, a) => {
    const f = a.format ?? "unknown";
    acc[f] = (acc[f] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const formatChartData = Object.entries(formatData).map(([format, value]) => ({ format, value }));

  const themeData = (ads as { theme?: string }[]).reduce((acc, a) => {
    const t = a.theme ?? "uncertain";
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const themeChartData = Object.entries(themeData).map(([theme, value]) => ({ theme, value }));

  const trendData = [
    { date: "W1", ads: Math.floor(brand.estimatedMonthlyAds * 0.2) },
    { date: "W2", ads: Math.floor(brand.estimatedMonthlyAds * 0.35) },
    { date: "W3", ads: Math.floor(brand.estimatedMonthlyAds * 0.55) },
    { date: "W4", ads: Math.floor(brand.estimatedMonthlyAds * 0.75) },
  ];

  return (
    <div className="space-y-8">

      {/* Back Link */}
      <Link
        href="/competitors"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-soft-black/50 hover:text-maroon transition-colors"
      >
        ← All Competitors
      </Link>

      {/* Brand Hero */}
      <div className="flex items-start gap-6">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-3xl text-white text-3xl font-bold font-serif shadow-lg shrink-0"
          style={{ backgroundColor: brand.accentColor }}
        >
          {brand.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
              {brand.name}
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-beige text-soft-black/70 px-3 py-1 rounded-full border border-border">
              {brand.industry}
            </span>
          </div>
          <p className="text-sm text-soft-black/60 font-medium mt-1">{brand.tagline}</p>
          <p className="text-xs text-soft-black/50 mt-2 uppercase tracking-wider font-semibold">
            Competing with: <span className="text-maroon">{brand.primaryBrands.join(", ")}</span>
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40">Est. Monthly Ads</p>
          <p className="text-3xl font-serif font-bold text-soft-black">{brand.estimatedMonthlyAds}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-border bg-card">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Market Position</p>
          <p className="text-sm font-bold text-soft-black mt-2 leading-snug">{brand.marketPosition}</p>
        </Card>
        <Card className="p-5 border-border bg-card">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Ad Focus</p>
          <p className="text-sm font-bold text-soft-black mt-2 leading-snug">{brand.adFocus}</p>
        </Card>
        <Card className="p-5 border-border bg-card">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Top Format</p>
          <p className="text-sm font-bold text-soft-black mt-2">{brand.keyFormats[0]}</p>
        </Card>
        <Card className="p-5 border-border bg-card">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Target Audience</p>
          <p className="text-sm font-bold text-soft-black mt-2 leading-snug">{brand.targetAudience}</p>
        </Card>
      </div>

      {/* SWOT: Strengths & Weaknesses */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 border-border bg-card">
          <h3 className="text-sm font-bold uppercase tracking-widest text-soft-black/50 mb-4">Strengths</h3>
          <ul className="space-y-2">
            {brand.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium">
                <span className="text-maroon mt-0.5 shrink-0">✦</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6 border-border bg-card">
          <h3 className="text-sm font-bold uppercase tracking-widest text-soft-black/50 mb-4">Weaknesses</h3>
          <ul className="space-y-2">
            {brand.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium">
                <span className="text-warm-grey mt-0.5 shrink-0">△</span>
                {w}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recent Strategic Moves */}
      <Card className="p-6 border-border bg-card">
        <h3 className="text-xl font-serif font-bold text-soft-black mb-1">Recent Strategic Moves</h3>
        <p className="text-xs text-soft-black/50 font-medium mb-4 uppercase tracking-wider">Latest ad intelligence signals</p>
        <div className="space-y-3">
          {brand.recentMoves.map((move, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-beige/30 border border-border px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-sm">
              <span className="text-maroon font-bold text-sm shrink-0">0{i + 1}</span>
              <p className="text-sm text-soft-black/80 font-medium">{move}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Ad Trend Chart */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-3">
          Creative Activity Trend
        </h3>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TrendChart
              title={`${brand.name} — Ad Volume Trend`}
              subtitle="Estimated weekly creative output"
              data={trendData}
              keys={["ads"]}
            />
          </div>
          <FormatDistributionChart data={formatChartData.length ? formatChartData : brand.keyFormats.map((f) => ({ format: f, value: 1 }))} />
        </div>
      </section>

      {/* Theme Distribution */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-3">
          Message Theme Analysis
        </h3>
        <ThemeDistributionChart data={themeChartData.length ? themeChartData : brand.keyThemes.map((t) => ({ theme: t, value: 1 }))} />
      </section>

      {/* Live Creative Gallery */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-3">
          Live Creative Gallery
        </h3>
        {adsLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        ) : ads.length > 0 ? (
          <CreativeGallery creatives={ads} />
        ) : (
          <Card className="p-8 border-border bg-card text-center">
            <p className="text-soft-black/40 text-sm font-medium">
              No live creatives found in the database for {brand.name} yet.
            </p>
            <p className="text-soft-black/30 text-xs mt-1">
              The scraper will populate this section once it runs.
            </p>
          </Card>
        )}
      </section>
    </div>
  );
}
