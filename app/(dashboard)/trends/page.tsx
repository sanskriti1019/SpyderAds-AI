import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/charts/trend-chart";

const trendData = [
  { date: "W1", testimonial: 20, video: 30 },
  { date: "W2", testimonial: 35, video: 40 },
  { date: "W3", testimonial: 50, video: 55 },
  { date: "W4", testimonial: 70, video: 60 },
];

export default function TrendsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Trends Analysis</h2>
      <p className="text-gray-500">Deep dive into creative trends across the market.</p>
      <Card className="p-6">
        <TrendChart
          title="Creative Trend Analysis"
          subtitle="Share of testimonial vs video creatives over time"
          data={trendData}
          keys={["testimonial", "video"]}
        />
      </Card>
    </div>
  );
}
