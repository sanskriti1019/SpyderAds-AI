"use client";

import { useActiveBrand } from "@/lib/brand-context";
import { useInsights } from "@/lib/hooks";
import { getMockInsights, getMockGaps } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MagneticCard } from "@/components/ui/magnetic-card";

const PRIORITY_LABELS = ["Critical", "High", "Significant", "Moderate", "Opportunity"] as const;
const PRIORITY_STYLES: Record<string, string> = {
  "Critical": "text-white bg-maroon border-maroon shadow-md shadow-maroon/20",
  "High": "text-maroon bg-maroon/10 border-maroon/20",
  "Significant": "text-soft-black bg-beige border-border shadow-sm",
  "Moderate": "text-soft-black/60 bg-beige/50 border-border/50",
  "Opportunity": "text-soft-black/40 bg-card border-border/30",
};

export default function GapsPage() {
  const { activeBrand } = useActiveBrand();
  const { data: apiInsights, isLoading } = useInsights({ brand: activeBrand });
  const rawInsights = (apiInsights && apiInsights.length > 0)
    ? apiInsights
    : getMockInsights(activeBrand);

  const gapInsights = rawInsights.filter(
    (i: any) =>
      i.trend?.toLowerCase().includes("gap") ||
      i.trend?.toLowerCase().includes("investment signal")
  );

  const allInsights = getMockGaps(activeBrand).length > 0 ? getMockGaps(activeBrand) : gapInsights;

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Header — Premium Model */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/70 mb-1.5">Strategic White Space</p>
          <h2 className="text-3xl font-serif font-bold text-soft-black tracking-tight">
            Market <span className="text-maroon">Gap</span> Intelligence
          </h2>
          <p className="text-sm text-soft-black/60 font-medium mt-1.5 max-w-xl">
             Identifying uncontested content territories and customer pain-points that competitors are failing to address. These represent the highest alpha opportunities for {activeBrand}.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-2.5 h-2.5 rounded-full bg-maroon animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-maroon">Scan Complete</span>
        </div>
      </div>

      {/* Summary Banner — Premium Style */}
      <Card className="p-8 border-maroon/20 bg-card shadow-xl relative overflow-hidden group reveal">
        <div className="absolute inset-0 bg-maroon/[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-maroon/[0.05] to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <h3 className="text-xl font-serif font-bold text-soft-black leading-tight">
             How to exploit the <span className="text-maroon">White Space</span>
          </h3>
          <p className="text-base text-soft-black/80 font-medium leading-relaxed max-w-2xl">
            Our AI has identified {allInsights.length} critical gaps in the current competitive cluster. Each "Gap" represents a segment where competitors have low ad-spend and low relevance. Differentiating {activeBrand} in these sectors will yield the lowest Customer Acquisition Cost (CAC).
          </p>
        </div>
      </Card>

      {/* Individual Gap Cards — Enhanced Layout */}
      <div className="space-y-6 stagger-children reveal">
        {isLoading ? (
          [1, 2, 3].map((i) => <Skeleton key={i} className="h-40 rounded-3xl" />)
        ) : (
          allInsights.map((gap: any, i: number) => {
            const priority = PRIORITY_LABELS[i] ?? "Opportunity";
            return (
              <MagneticCard
                key={i}
                className="group border-border shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/40">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-beige flex items-center justify-center font-serif text-2xl font-black text-maroon shadow-sm group-hover:scale-110 transition-transform duration-500">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[10px] uppercase tracking-widest font-black text-maroon/50">{gap.competitor} Perimeter Gap</p>
                        <h4 className="text-2xl font-serif font-bold text-soft-black tracking-tight leading-tight group-hover:text-maroon transition-colors">{gap.trend}</h4>
                      </div>
                    </div>
                    <span className={`self-start text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${PRIORITY_STYLES[priority]}`}>
                      {priority}
                    </span>
                  </div>
                  
                  <div className="mt-6 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-3">
                      <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/20">Strategic Implication</p>
                      <p className="text-base text-soft-black/70 font-medium leading-relaxed italic font-serif">
                        "{gap.strategic_implication}"
                      </p>
                    </div>
                    <div className="md:w-64 space-y-3">
                      <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/20">Recommended Activation</p>
                      <button className="w-full py-3 bg-soft-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg hover:bg-maroon hover:-translate-y-1 transition-all duration-300">
                        Brief Creative Team
                      </button>
                    </div>
                  </div>
                </div>
              </MagneticCard>
            );
          })
        )}
      </div>

      {/* Activation Framework — Master Style */}
      <section className="reveal">
        <div className="mb-6 flex items-center justify-between">
           <h3 className="text-[11px] font-bold uppercase tracking-widest text-soft-black/40 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-maroon/50 inline-block" />
            Gap Activation Framework
          </h3>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Phase 1: Alpha Testing", items: ["Launch 2 educational carousels", "A/B test the gap-specific hook", "Analyze CTR against benchmarks"] },
            { label: "Phase 2: Consolidation", items: ["Scale winning gap hooks with Video", "Deploy high-authority lead magnets", "Establish community presence"] },
            { label: "Phase 3: Dominance", items: ["Own search keywords for territory", "Secure authority endorsements", "Long-form content dominance"] },
          ].map((col, i) => (
            <Card key={i} className="p-7 border-border group hover:border-maroon/30 transition-all duration-500 shadow-lg">
              <p className="text-[10px] uppercase tracking-widest font-black text-soft-black/30 mb-5 group-hover:text-maroon/50 transition-colors">{col.label}</p>
              <ul className="space-y-4">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4">
                    <span className="w-5 h-5 rounded-full bg-beige border border-border flex items-center justify-center text-[10px] font-bold text-soft-black/40 group-hover:text-maroon group-hover:border-maroon/20">
                      {j + 1}
                    </span>
                    <span className="text-xs font-bold text-soft-black/80 leading-relaxed group-hover:text-soft-black transition-colors">{item}</span>
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
