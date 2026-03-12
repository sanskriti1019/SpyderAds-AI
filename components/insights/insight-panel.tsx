import { Card } from "@/components/ui/card";

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
  if (!insights?.length) return null;
  return (
    <Card className="flex flex-col gap-3 p-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="space-y-3">
        {insights.slice(0, 5).map((i, idx) => (
          <div
            key={idx}
            className="rounded-md bg-muted px-3 py-2 space-y-1"
          >
            <p className="text-xs font-medium text-muted-foreground">
              {i.competitor}
            </p>
            <p className="text-sm">{i.trend}</p>
            <p className="text-xs text-muted-foreground">
              {i.strategic_implication}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
