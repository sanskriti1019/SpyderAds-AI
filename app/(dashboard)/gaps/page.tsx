"use client";
import { useInsights } from "@/lib/hooks";
import { GapOpportunities } from "@/components/insights/gap-opportunities";

export default function GapsPage() {
  const { data: insights = [] } = useInsights();
  
  const gapInsights = (
    insights as { competitor?: string; trend?: string; strategic_implication?: string }[]
  ).filter(
    (i) =>
      i.trend?.toLowerCase().includes("gap") ||
      i.trend?.toLowerCase().includes("invest")
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Market Gaps</h2>
      <p className="text-gray-500">Uncover untargeted audience segments and content vacuum.</p>
      <div className="max-w-3xl">
        <GapOpportunities insights={gapInsights} />
      </div>
    </div>
  );
}
