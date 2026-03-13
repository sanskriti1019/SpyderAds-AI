import { Card } from "@/components/ui/card";

export default function LongevityPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Longevity Analysis</h2>
      <p className="text-gray-500">Discover which ad creatives stand the test of time.</p>
      <Card className="p-6">
        <div className="h-64 flex items-center justify-center text-gray-400">
          Longevity metrics gathering...
        </div>
      </Card>
    </div>
  );
}
