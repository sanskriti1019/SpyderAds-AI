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
    <Card className="flex flex-col gap-3 p-6">
      <h2 className="text-sm font-semibold text-gray-900">Gap Opportunities</h2>
      <p className="text-xs text-gray-500">
        Where competitors over-index vs your brand
      </p>
      <div className="space-y-3">
        {insights.slice(0, 5).map((i, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 space-y-2 transition-shadow hover:shadow-sm"
          >
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              {i.competitor}
            </p>
            <p className="text-sm text-gray-900 font-medium">{i.trend}</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {i.strategic_implication}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
