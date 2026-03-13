"use client";

import { useActiveBrand } from "@/lib/brand-context";
import { useWeeklyBrief, useInsights } from "@/lib/hooks";
import { getMockBrief } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { SimpleMarkdown } from "@/components/ui/simple-markdown";
import { Skeleton } from "@/components/ui/skeleton";

export default function BriefPage() {
  const { activeBrand } = useActiveBrand();
  const { data: briefs = [], isLoading: briefLoading } = useWeeklyBrief({ brand: activeBrand });
  const { data: insights = [] } = useInsights({ brand: activeBrand });

  const brief = (briefs[0] as {
    week_start?: string;
    week_end?: string;
    summary_md?: string;
    insights_json?: { competitor: string; trend: string; strategic_implication: string }[];
    primary_brand_name?: string;
  }) ?? getMockBrief(activeBrand);

  const mockBrief = getMockBrief(activeBrand);
  const finalInsights = (brief?.insights_json ?? mockBrief.insights_json) as {
    competitor: string;
    trend: string;
    strategic_implication: string;
  }[];

  const weekRange = brief?.week_start && brief?.week_end
    ? `${brief.week_start} – ${brief.week_end}`
    : mockBrief.week_start + " – " + mockBrief.week_end;

  const summary = brief?.summary_md ?? mockBrief.summary_md;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
            <span className="text-maroon">{activeBrand}</span> — AI Weekly Brief
          </h2>
          <p className="text-sm text-soft-black/60 font-medium mt-1">
            Automated executive intelligence summary of competitor activity
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40">Week</p>
          <p className="text-sm font-bold text-maroon mt-0.5">{weekRange}</p>
        </div>
      </div>

      {briefLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-32" />
        </div>
      ) : (
        <>
          {/* Executive Summary */}
          <Card className="p-10 border-border bg-card designer-shadow-deep relative overflow-hidden group">
            {/* Ambient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-maroon/[0.02] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="h-12 w-12 bg-maroon rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-maroon/20 animate-glow">✦</div>
              <div>
                <h3 className="text-2xl font-serif font-black text-soft-black tracking-tight">Executive Summary</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-maroon/70">
                    AI-Generated Intelligence Room • {weekRange}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 max-w-4xl">
              <SimpleMarkdown content={summary} />
            </div>

            {/* Inset Border */}
            <div className="absolute inset-[2px] rounded-[1.9rem] border border-white/40 pointer-events-none z-0" />
          </Card>

          {/* Key Intelligence Bullets */}
          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4">
              This Week's Key Intelligence
            </h3>
            <div className="space-y-3">
              {finalInsights.map((item, i) => (
                <Card
                  key={i}
                  className="p-5 border-border bg-card hover:-translate-y-0.5 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-serif font-black text-soft-black/15 shrink-0 leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-maroon">{item.competitor}</p>
                        <span className="w-1 h-1 bg-soft-black/20 rounded-full" />
                        <p className="text-xs font-semibold text-soft-black/60">{item.trend.split(":")[0]}</p>
                      </div>
                      <p className="text-sm font-bold text-soft-black leading-snug">{item.trend}</p>
                      <div className="mt-2 pt-2 border-t border-border/50">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40 mb-1">Action Signal</p>
                        <p className="text-xs font-medium text-soft-black/70 leading-relaxed">{item.strategic_implication}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* This Week's Recommended Actions */}
          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4">
              Recommended Actions This Week
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { priority: "Urgent", action: "Review and counter the top competitor creative format identified in the brief above" },
                { priority: "This Week", action: "Launch one new creative addressing the gap identified in the Intelligence section" },
                { priority: "Plan", action: "Build a 4-week content calendar targeting the untapped audience segments identified this period" },
              ].map((item, i) => (
                <Card key={i} className={`p-5 border-border ${i === 0 ? "bg-maroon/5 border-maroon/20" : "bg-card"}`}>
                  <p className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${i === 0 ? "text-maroon" : "text-soft-black/50"}`}>
                    {item.priority}
                  </p>
                  <p className="text-sm font-semibold text-soft-black leading-snug">{item.action}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Historical insights from API if available */}
          {insights.length > 0 && (
            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4">
                Recent Insight History
              </h3>
              <div className="space-y-2">
                {(insights as { competitor: string; trend: string; strategic_implication: string }[]).slice(0, 3).map((i, idx) => (
                  <Card key={idx} className="p-4 border-border bg-beige/20">
                    <p className="text-xs font-bold text-maroon">{i.competitor}</p>
                    <p className="text-sm font-semibold text-soft-black mt-0.5">{i.trend}</p>
                    <p className="text-xs text-soft-black/60 font-medium mt-1">{i.strategic_implication}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
