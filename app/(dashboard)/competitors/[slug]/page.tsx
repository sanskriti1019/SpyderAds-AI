"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetitorBySlug } from "@/lib/competitors-data";
import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/charts/trend-chart";
import { FormatDistributionChart } from "@/components/charts/format-distribution-chart";
import { ThemeDistributionChart } from "@/components/charts/theme-distribution-chart";
import { MagneticCard } from "@/components/ui/magnetic-card";

// ── Tiny sub-components ──────────────────────────────────────────────────────

const SPEND_COLORS: Record<string, string> = {
  "Low":       "text-soft-black/60 bg-warm-grey/40 border-warm-grey",
  "Medium":    "text-soft-black bg-beige border-border",
  "High":      "text-maroon bg-maroon/10 border-maroon/20 shadow-sm shadow-maroon/5",
  "Very High": "text-white bg-maroon border-maroon shadow-md shadow-maroon/20",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/40 flex items-center gap-2 whitespace-nowrap">
        <span className="w-5 h-[1.5px] bg-maroon/50 inline-block" />
        {children}
      </h3>
      <div className="h-[1px] w-full bg-border/40" />
    </div>
  );
}

function InfoTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest bg-beige/60 text-soft-black/60 px-3 py-1.5 rounded-lg border border-border/80 shadow-sm">
      {children}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CompetitorDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const brand = getCompetitorBySlug(slug);
  if (!brand) return notFound();

  // Derived chart data
  const formatChartData = brand.keyFormats.map((format, i) => ({
    format,
    value: Math.max(10, brand.estimatedMonthlyAds - i * 18),
  }));
  const themeChartData = brand.keyThemes.map((theme, i) => ({
    theme: theme.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value: Math.max(10, brand.estimatedMonthlyAds - i * 12),
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
    <div className="space-y-12 animate-fade-in-up">

      {/* Back CTA — Premium Link */}
      <Link
        href="/competitors"
        className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-soft-black/40 hover:text-maroon transition-all group"
      >
        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-maroon/30 group-hover:bg-maroon/5 group-hover:-translate-x-1 transition-all">
          ←
        </div>
        Back to Intelligence List
      </Link>

      {/* ─── HERO — ADVANCED MODEL ─── */}
      <section className="relative group">
        <MagneticCard className="p-0 border-none overflow-hidden bg-transparent">
          <div className="relative rounded-3xl border border-border/80 shadow-2xl bg-card p-10 overflow-hidden">
            <div
              className="absolute right-0 top-0 w-3/4 h-full opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110"
              style={{ background: `radial-gradient(circle at top right, ${brand.accentColor} 0%, transparent 80%)` }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start gap-10">
               {/* Logo Avatar */}
              <div
                className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl text-white text-4xl font-serif font-black shadow-xl animate-scale-in"
                style={{ backgroundColor: brand.accentColor }}
              >
                {brand.initials}
              </div>

              <div className="flex-1 space-y-5">
                <div className="flex flex-wrap items-center gap-4">
                  <h2 className="text-4xl font-serif font-black text-soft-black tracking-tight leading-none">{brand.name}</h2>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg border shadow-sm ${SPEND_COLORS[brand.adSpendLevel]}`}>
                    {brand.adSpendLevel} Spend
                  </span>
                </div>
                
                <p className="text-xl font-serif italic text-soft-black/60 font-medium leading-relaxed max-w-2xl">
                  "{brand.tagline}"
                </p>
                
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-soft-black text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-lg hover:bg-maroon hover:-translate-y-1 transition-all duration-300"
                  >
                    Visit Repository ↗
                  </a>
                  <div className="flex flex-wrap gap-2">
                    {brand.productLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-border/60 text-[10px] font-bold text-soft-black/40 hover:text-maroon hover:border-maroon/20 hover:bg-maroon/5 transition-all"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* High-level stats rail */}
              <div className="flex flex-col gap-6 shrink-0 lg:border-l lg:border-border/40 lg:pl-10 min-w-[180px]">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30">Active Intelligence</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <p className="text-5xl font-serif font-black text-soft-black tracking-tighter">{brand.estimatedMonthlyAds}</p>
                    <span className="text-[10px] font-bold text-soft-black/30 uppercase">Ads / Mo</span>
                  </div>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30">Primary Channels</p>
                   <div className="flex flex-wrap gap-1.5">
                     {brand.topChannels.map(ch => <span key={ch} className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-beige text-soft-black/50 border border-border/50">{ch}</span>)}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </MagneticCard>
      </section>

      {/* ─── OVERVIEW MATRIX ─── */}
      <section className="reveal">
        <SectionLabel>Brand Profiling Intelligence</SectionLabel>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          <MagneticCard>
            <div className="p-7 space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30">Target Vector</p>
              <p className="text-base font-bold text-soft-black leading-snug italic font-serif">"{brand.targetAudience}"</p>
            </div>
          </MagneticCard>
          <MagneticCard>
            <div className="p-7 space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30">Cluster Position</p>
              <p className="text-base font-bold text-soft-black leading-snug">{brand.marketPosition}</p>
            </div>
          </MagneticCard>
          <MagneticCard>
            <div className="p-7 space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30">Brand Tonality</p>
              <p className="text-base font-serif font-black text-maroon italic">{brand.tonality}</p>
            </div>
          </MagneticCard>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card className="p-8 border-border relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-maroon/[0.03] rounded-bl-full" />
            <p className="text-[10px] uppercase tracking-widest font-black text-maroon/70 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-maroon" /> Strategic Advantages
            </p>
            <ul className="space-y-4">
              {brand.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-maroon font-serif font-bold text-lg leading-none mt-1">✦</span> 
                  <p className="text-sm font-semibold text-soft-black/80 leading-relaxed">{s}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-8 border-border relative overflow-hidden group hover:shadow-xl transition-all">
            <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warm-grey" /> Vulnerability Gap
            </p>
            <ul className="space-y-4">
              {brand.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-warm-grey font-serif font-bold text-lg leading-none mt-1">△</span> 
                  <p className="text-sm font-semibold text-soft-black/60 leading-relaxed italic">{w}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* ─── AD & CREATIVE INTELLIGENCE ─── */}
      <section className="reveal">
        <SectionLabel>Creative Vector Analysis</SectionLabel>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
             <Card className="p-8 h-full space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-maroon/50 to-transparent" />
               <div className="space-y-4">
                  <p className="text-base text-soft-black/90 font-medium leading-relaxed italic font-serif">"{brand.creativeStrategyOverview}"</p>
                  <div className="p-5 rounded-2xl bg-beige/30 border border-border/60">
                     <p className="text-[10px] uppercase tracking-widest font-black text-maroon mb-2">Winning Formula</p>
                     <p className="text-lg font-serif font-bold text-soft-black leading-tight">{brand.creativeFormula}</p>
                  </div>
               </div>
               <div className="grid gap-6 sm:grid-cols-2">
                 <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30">Strategic Pillars</p>
                    <ul className="space-y-3">
                      {brand.creativeStrategyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <span className="w-5 h-5 rounded-full bg-maroon/10 flex items-center justify-center text-[10px] font-black text-maroon">{i+1}</span>
                           <p className="text-xs font-bold text-soft-black/80 leading-snug">{pt}</p>
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30">Theme Distribution</p>
                    <div className="flex flex-wrap gap-2">
                      {brand.keyThemes.map(t => (
                        <span key={t} className="px-3 py-1.5 rounded-lg bg-card border border-border text-[9px] font-black uppercase tracking-widest text-soft-black/50">
                           {t.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                 </div>
               </div>
             </Card>
          </div>
          <div className="space-y-6">
            <SectionLabel>Theme Mix</SectionLabel>
            <div className="shadow-xl rounded-2xl overflow-hidden">
               <ThemeDistributionChart data={themeChartData} />
            </div>
            <Card className="p-6 bg-maroon/5 border-maroon/10">
               <p className="text-[10px] uppercase tracking-widest font-bold text-maroon mb-2">Visual Logic</p>
               <p className="text-sm font-semibold text-soft-black leading-relaxed">{brand.visualStyle}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── TOP RUNNING ADS — GALLERY MODEL ─── */}
      <section className="reveal">
        <SectionLabel>High-Performance Creative Sample</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {brand.topRunningAds.map((ad, i) => (
            <MagneticCard key={i} className="group">
              <div className="p-7 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-8 h-8 rounded-lg bg-beige border border-border flex items-center justify-center text-[10px] font-black text-soft-black/40">
                    AD#{i+1}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-soft-black text-white px-2 py-1 rounded-md">{ad.format}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-maroon/10 text-maroon border border-maroon/20 px-2 py-1 rounded-md">{ad.theme}</span>
                  </div>
                </div>
                <h4 className="text-xl font-serif font-bold text-soft-black leading-tight group-hover:text-maroon transition-colors mb-3">"{ad.headline}"</h4>
                <p className="text-sm font-medium text-soft-black/60 leading-relaxed mb-6 flex-1 italic">"{ad.body}"</p>
                <div className="pt-5 border-t border-border/40 flex items-center justify-between">
                   <p className="text-[10px] font-black uppercase tracking-widest text-soft-black/30">Action Logic</p>
                   <p className="text-sm font-black text-maroon tracking-tighter uppercase">{ad.cta}</p>
                </div>
              </div>
            </MagneticCard>
          ))}
        </div>
      </section>

      {/* ─── VOLUME DYNAMICS ─── */}
      <section className="reveal">
        <SectionLabel>Ad Volume Intelligence</SectionLabel>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 shadow-2xl rounded-3xl overflow-hidden border border-border">
            <TrendChart
              title={`Output Velocity — ${brand.name}`}
              subtitle="Weekly creative production volume (8-week trend)"
              data={trendData}
              keys={["ads"]}
            />
          </div>
          <div className="shadow-2xl rounded-3xl overflow-hidden border border-border">
             <FormatDistributionChart data={formatChartData} />
          </div>
        </div>
      </section>

      {/* ─── RECENT STRATEGIC SHIFTS ─── */}
      <section className="reveal">
        <SectionLabel>Recent Strategic Shifts</SectionLabel>
        <div className="grid gap-4 md:grid-cols-3 stagger-children">
          {brand.recentMoves.map((move, i) => (
            <Card key={i} className="p-6 flex items-start gap-4 hover:border-maroon/30 transition-all group">
              <span className="text-3xl font-serif font-black text-soft-black/10 group-hover:text-maroon/20 transition-colors leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-bold text-soft-black/80 leading-snug pt-1">{move}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
