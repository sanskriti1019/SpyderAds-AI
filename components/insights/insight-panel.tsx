import { Card } from "@/components/ui/card";
import { SimpleMarkdown } from "@/components/ui/simple-markdown";

interface Insight {
  competitor: string;
  trend: string;
  evidence?: Record<string, unknown>;
  strategic_implication: string;
}

interface InsightPanelProps {
  title: string;
  insights: Insight[];
}

export function InsightPanel({ title, insights }: InsightPanelProps) {
  // Always render — show empty state if no data
  const items = insights?.slice(0, 4) ?? [];

  return (
    <Card className="flex flex-col gap-3 p-6 bg-card border-border">
      <h2 className="text-sm font-semibold text-soft-black uppercase tracking-widest pb-2 border-b border-border/50">
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-xs text-soft-black/40 font-medium py-4 text-center">
          Intelligence loading...
        </p>
      ) : (
        <div className="space-y-2.5">
          {items.map((i, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-beige/30 px-4 py-3 space-y-1.5 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <p className="text-[10px] font-bold text-maroon tracking-widest uppercase">
                {i.competitor}
              </p>
              <div className="text-sm text-soft-black font-semibold leading-snug">
                <SimpleMarkdown content={i.trend} />
              </div>
              <div className="text-xs text-soft-black/70 leading-relaxed font-medium">
                <SimpleMarkdown content={i.strategic_implication} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
