"use client";

import { useActiveBrand } from "@/lib/brand-context";
import { useInsights } from "@/lib/hooks";
import { getMockInsights, getMockGaps } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PRIORITY_LABELS = ["Critical", "High", "Medium", "Medium", "Explore"] as const;
const PRIORITY_STYLES: Record<string, string> = {
  "Critical": "text-white bg-maroon border-maroon",
  "High": "text-maroon bg-maroon/10 border-maroon/20",
  "Medium": "text-soft-black bg-beige border-border",
  "Explore": "text-soft-black/60 bg-beige/50 border-border/50",
};

export default function GapsPage() {
  const { activeBrand } = useActiveBrand();
  const { data: apiInsights, isLoading } = useInsights({ brand: activeBrand });
  const rawInsights = (apiInsights && apiInsights.length > 0)
    ? apiInsights
    : getMockInsights(activeBrand);

  const gapInsights = rawInsights.filter(
    (i: { trend: string }) =>
      i.trend?.toLowerCase().includes("gap") ||
      i.trend?.toLowerCase().includes("investment signal")
  );

  const allInsights = getMockGaps(activeBrand).length > 0 ? getMockGaps(activeBrand) : gapInsights;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
          <span className="text-maroon">{activeBrand}</span> — Market Gap Analysis
        </h2>
        <p className="text-sm text-soft-black/60 font-medium mt-1">
          Untapped content territories and advertising white spaces your competitors haven't claimed
        </p>
      </div>

      {/* Summary Banner */}
      <Card className="p-5 border-maroon/20 bg-maroon/5">
        <p className="text-sm font-semibold text-soft-black/80 leading-relaxed">
          <span className="text-maroon font-bold">How to read this:</span>{" "}
          Each insight below represents a specific content territory, audience segment, or ad format gap identified by analysing what competitors are <em>not</em> doing. These are your highest-leverage opportunities to differentiate {activeBrand} and capture market share that competitors have left uncontested.
        </p>
      </Card>

      {/* Gap Cards */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-28" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {allInsights.map((gap: { competitor: string; trend: string; strategic_implication: string }, i: number) => {
            const priority = PRIORITY_LABELS[i] ?? "Explore";
            return (
              <Card
                key={i}
                className="p-6 border-border bg-card hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-serif font-black text-soft-black/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-maroon/70">{gap.competitor}</p>
                      <p className="text-base font-bold text-soft-black font-serif leading-snug mt-0.5">{gap.trend}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${PRIORITY_STYLES[priority]}`}>
                    {priority}
                  </span>
                </div>
                <div className="ml-10 pt-3 border-t border-border/50">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/40 mb-1.5">Strategic Implication</p>
                  <p className="text-sm text-soft-black/80 font-medium leading-relaxed">
                    {gap.strategic_implication}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Action Framework */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/50 mb-4">
          Gap Activation Framework
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Quick Wins (0–2 weeks)", items: ["Launch 1 educational carousel addressing the top gap", "Add a diagnostic/quiz CTA to existing ad sets", "Repurpose competitor-style format with unique differentiator"] },
            { label: "Medium-Term (1–2 months)", items: ["Develop a content vertical for the highest-priority gap", "Build a lead magnet targeting the underserved audience segment", "Partner with a credibility authority (doctor, expert) for content"] },
            { label: "Long-Term (3+ months)", items: ["Own the gap territory with sustained content investment", "Build community around the underserved pain point", "Launch product or service specifically addressing the gap"] },
          ].map((col, i) => (
            <Card key={i} className="p-5 border-border bg-card">
              <p className="text-[10px] uppercase tracking-widest font-bold text-soft-black/50 mb-3">{col.label}</p>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs font-semibold text-soft-black/80 leading-relaxed">
                    <span className="text-maroon shrink-0 mt-0.5">→</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
