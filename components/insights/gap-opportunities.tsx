import { Card } from "@/components/ui/card";

interface GapInsight {
  competitor: string;
  trend: string;
  strategic_implication: string;
}

interface GapOpportunitiesProps {
  insights: GapInsight[];
}

export function GapOpportunities({ insights }: GapOpportunitiesProps) {
  if (!insights?.length) return null;
  return (
    <Card className="flex flex-col gap-3 p-6 bg-card border-border">
      <h2 className="text-sm font-semibold text-soft-black uppercase tracking-widest">Gap Opportunities</h2>
      <p className="text-xs text-soft-black/60 font-medium pb-2 border-b border-border/50">
        Where competitors over-index vs your brand
      </p>
      <div className="space-y-3">
        {insights.slice(0, 5).map((i, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border bg-beige/30 px-4 py-3 space-y-2 transition-all hover:-translate-y-0.5 hover:shadow-sm"
          >
            <p className="text-xs font-bold text-maroon tracking-wider">
              {i.competitor}
            </p>
            <p className="text-sm text-soft-black font-semibold">{i.trend}</p>
            <p className="text-xs text-soft-black/80 leading-relaxed font-medium">
              {i.strategic_implication}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
