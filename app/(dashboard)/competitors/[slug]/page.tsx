"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetitorBySlug } from "@/lib/competitors-data";
import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/charts/trend-chart";
import { FormatDistributionChart } from "@/components/charts/format-distribution-chart";
import { ThemeDistributionChart } from "@/components/charts/theme-distribution-chart";

// ── Tiny sub-components ──────────────────────────────────────────────────────

const SPEND_COLORS: Record<string, string> = {
  "Low":       "text-soft-black/60 bg-warm-grey/40 border-warm-grey",
  "Medium":    "text-soft-black bg-beige border-border",
  "High":      "text-maroon bg-maroon/10 border-maroon/20",
  "Very High": "text-white bg-maroon border-maroon",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4 flex items-center gap-2">
      <span className="w-4 h-[1px] bg-maroon/40 inline-block" />
      {children}
    </h3>
  );
}

function InfoTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest bg-beige text-soft-black/70 px-2.5 py-1 rounded-full border border-border">
      {children}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
// Next.js 13/14 pattern: params is a plain object in client components
export default function CompetitorDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const brand = getCompetitorBySlug(slug);
  if (!brand) return notFound();

  // Derived chart data — purely from static competitor data
  const formatChartData = brand.keyFormats.map((format, i) => ({
    format,
    value: Math.max(5, brand.estimatedMonthlyAds - i * 18),
  }));
  const themeChartData = brand.keyThemes.map((theme, i) => ({
    theme: theme.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value: Math.max(5, brand.estimatedMonthlyAds - i * 12),
  }));
  const trendData = [
    { date: "W1",  ads: Math.floor(brand.estimatedMonthlyAds * 0.18) },
    { date: "W2",  ads: Math.floor(brand.estimatedMonthlyAds * 0.28) },
    { date: "W3",  ads: Math.floor(brand.estimatedMonthlyAds * 0.42) },
    { date: "W4",  ads: Math.floor(brand.estimatedMonthlyAds * 0.58) },
    { date: "W5",  ads: Math.floor(brand.estimatedMonthlyAds * 0.72) },
    { date: "W6",  ads: Math.floor(brand.estimatedMonthlyAds * 0.88) },
    { date: "W7",  ads: Math.floor(brand.estimatedMonthlyAds * 1.00) },
    { date: "W8",  ads: Math.floor(brand.estimatedMonthlyAds * 0.92) },
  ];

  return (
    <div className="space-y-10 animate-fade-in-up">

      {/* Back CTA */}
      <Link
        href="/competitors"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-soft-black/50 hover:text-maroon transition-colors group"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span> All Competitors
      </Link>

      {/* ─── HERO ─── */}
      <div className="rounded-2xl border border-border bg-card p-8 flex flex-col lg:flex-row items-start gap-8 relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute right-0 top-0 w-80 h-full opacity-5 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${brand.accentColor} 0%, transparent 60%)` }}
        />

        {/* Logo Avatar */}
        <div
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-white text-3xl font-bold font-serif shadow-lg animate-scale-in"
          style={{ backgroundColor: brand.accentColor }}
        >
          {brand.initials}
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">{brand.name}</h2>
            <InfoTag>{brand.industry}</InfoTag>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${SPEND_COLORS[brand.adSpendLevel] ?? ""}`}>
              {brand.adSpendLevel} Spend
            </span>
          </div>
          <p className="text-base text-soft-black/70 font-medium">{brand.tagline}</p>
          <p className="text-sm text-soft-black/80 leading-relaxed">{brand.marketPosition}</p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-maroon hover:text-maroon/70 transition-colors border-b border-maroon/40 pb-0.5 link-underline"
            >
              ↗ Visit Website
            </a>
            {brand.productLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-semibold text-soft-black/60 hover:text-maroon transition-colors underline underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right stats */}
        <div className="flex flex-col gap-5 shrink-0 text-right lg:border-l lg:border-border lg:pl-8 min-w-[160px]">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40">Est. Monthly Ads</p>
            <p className="text-4xl font-serif font-bold text-soft-black mt-1">{brand.estimatedMonthlyAds}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40">Competes With</p>
            <p className="text-sm font-bold text-maroon mt-1 leading-snug">{brand.primaryBrands.join(", ")}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40">Top Channels</p>
            <div className="flex flex-wrap gap-1 mt-1 justify-end">
              {brand.topChannels.map((ch) => <InfoTag key={ch}>{ch}</InfoTag>)}
            </div>
          </div>
        </div>
      </div>

      {/* ─── BRAND OVERVIEW ─── */}
      <section>
        <SectionLabel>Brand Overview</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          <Card className="p-5 space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Target Audience</p>
            <p className="text-sm font-semibold text-soft-black leading-snug">{brand.targetAudience}</p>
          </Card>
          <Card className="p-5 space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Market Position</p>
            <p className="text-sm font-semibold text-soft-black leading-snug">{brand.marketPosition}</p>
          </Card>
          <Card className="p-5 space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Brand Tone</p>
            <p className="text-sm font-semibold text-soft-black leading-snug">{brand.tonality}</p>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <Card className="p-6">
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">Strengths</p>
            <ul className="space-y-2">
              {brand.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium">
                  <span className="text-maroon shrink-0 mt-0.5">✦</span> {s}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">Weaknesses</p>
            <ul className="space-y-2">
              {brand.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium">
                  <span className="text-warm-grey shrink-0 mt-0.5">△</span> {w}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* ─── AD STRATEGY ─── */}
      <section>
        <SectionLabel>Ad Strategy</SectionLabel>
        <Card className="p-6 space-y-6">
          <p className="text-sm text-soft-black/80 font-medium leading-relaxed">{brand.adStrategyOverview}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-2">Ad Formats Used</p>
              <div className="flex flex-wrap gap-1.5">
                {brand.keyFormats.map((f) => <InfoTag key={f}>{f}</InfoTag>)}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-2">Primary Focus</p>
              <p className="text-sm font-semibold text-soft-black">{brand.adFocus}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">Key Strategic Points</p>
            <ul className="space-y-2">
              {brand.adStrategyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium leading-relaxed">
                  <span className="text-maroon font-bold shrink-0 mt-0.5 tabular-nums">0{i + 1}</span> {pt}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      {/* ─── CREATIVE STRATEGY ─── */}
      <section>
        <SectionLabel>Creative Strategy</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6 h-full space-y-5">
              <p className="text-sm text-soft-black/80 font-medium leading-relaxed">{brand.creativeStrategyOverview}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-1.5">Creative Formula</p>
                  <p className="text-xs font-semibold text-maroon leading-relaxed">{brand.creativeFormula}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-1.5">Visual Style</p>
                  <p className="text-xs font-semibold text-soft-black/80 leading-relaxed">{brand.visualStyle}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">Key Insights</p>
                <ul className="space-y-2">
                  {brand.creativeStrategyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium">
                      <span className="text-maroon shrink-0 mt-0.5">→</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-5 space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Message Themes</p>
              <div className="flex flex-wrap gap-1.5">
                {brand.keyThemes.map((t) => (
                  <span key={t} className="text-[10px] font-bold uppercase tracking-wider bg-maroon/10 text-maroon px-2.5 py-1 rounded-full border border-maroon/20">
                    {t.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </Card>
            <ThemeDistributionChart data={themeChartData} />
          </div>
        </div>
      </section>

      {/* ─── PRODUCT FOCUS ─── */}
      <section>
        <SectionLabel>Product Focus</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-6 space-y-4">
            <p className="text-sm text-soft-black/80 font-medium leading-relaxed">{brand.productFocusOverview}</p>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-2">Hero Products</p>
              <div className="flex flex-wrap gap-1.5">
                {brand.heroProducts.map((p) => <InfoTag key={p}>{p}</InfoTag>)}
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">Product Intelligence Points</p>
            <ul className="space-y-2">
              {brand.productFocusPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium leading-relaxed">
                  <span className="text-maroon shrink-0 mt-0.5">→</span> {pt}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* ─── MARKETING MESSAGING ─── */}
      <section>
        <SectionLabel>Marketing Messaging</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6 space-y-5">
              <p className="text-sm text-soft-black/80 font-medium leading-relaxed">{brand.messagingOverview}</p>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">Core Messages</p>
                <div className="space-y-2">
                  {brand.coreMessages.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-beige/20 px-4 py-3">
                      <span className="text-maroon font-bold text-xs shrink-0 mt-0.5">"</span>
                      <p className="text-sm font-semibold text-soft-black italic">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">Messaging Intelligence</p>
                <ul className="space-y-2">
                  {brand.messagingPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium leading-relaxed">
                      <span className="text-maroon shrink-0 mt-0.5">→</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-5 space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">CTA Style</p>
              <p className="text-sm font-semibold text-soft-black leading-snug">{brand.ctaStyle}</p>
            </Card>
            <Card className="p-5 space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Brand Tone</p>
              <p className="text-sm font-semibold text-maroon leading-snug">{brand.tonality}</p>
            </Card>
            <Card className="p-5 space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50">Content Strategy</p>
              <p className="text-sm font-semibold text-soft-black leading-snug line-clamp-4">{brand.contentStrategyOverview}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── CONTENT STRATEGY ─── */}
      <section>
        <SectionLabel>Content Strategy</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6 space-y-4">
            <p className="text-sm text-soft-black/80 font-medium leading-relaxed">{brand.contentStrategyOverview}</p>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-2">Content Pillars</p>
              <div className="flex flex-wrap gap-1.5">
                {brand.contentPillars.map((p) => <InfoTag key={p}>{p}</InfoTag>)}
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">Key Insights</p>
            <ul className="space-y-2">
              {brand.contentStrategyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-soft-black/80 font-medium leading-relaxed">
                  <span className="text-maroon shrink-0 mt-0.5">→</span> {pt}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* ─── TOP RUNNING ADS ─── */}
      <section>
        <SectionLabel>Top Running Ads</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {brand.topRunningAds.map((ad, i) => (
            <Card key={i} className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-widest text-soft-black/40">Ad #{i + 1}</span>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  <InfoTag>{ad.format}</InfoTag>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon bg-maroon/10 border border-maroon/20 px-2 py-0.5 rounded-full">
                    {ad.theme}
                  </span>
                </div>
              </div>
              <p className="text-sm font-bold text-soft-black font-serif leading-snug">"{ad.headline}"</p>
              <p className="text-xs text-soft-black/70 font-medium leading-relaxed flex-1">{ad.body}</p>
              <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40">CTA</p>
                <p className="text-xs font-bold text-maroon">{ad.cta}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── AD FORMAT & VOLUME CHARTS ─── */}
      <section>
        <SectionLabel>Ad Format & Volume Intelligence</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TrendChart
              title={`${brand.name} — Creative Volume Trend`}
              subtitle="Estimated weekly ad creative output (8-week view)"
              data={trendData}
              keys={["ads"]}
            />
          </div>
          <FormatDistributionChart data={formatChartData} />
        </div>
      </section>

      {/* ─── RECENT MOVES ─── */}
      <section>
        <SectionLabel>Recent Strategic Moves</SectionLabel>
        <div className="grid gap-3 md:grid-cols-3">
          {brand.recentMoves.map((move, i) => (
            <Card key={i} className="p-5 flex items-start gap-3">
              <span className="text-maroon font-bold font-serif text-lg shrink-0 leading-none mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-semibold text-soft-black leading-snug">{move}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
