import { Card } from "@/components/ui/card";

interface WeeklyBriefProps {
  brand?: string;
  weekRange: string;
  summary: string;
  bullets?: string[];
}

export function WeeklyBrief({
  brand,
  weekRange,
  summary,
  bullets = [],
}: WeeklyBriefProps) {
  return (
    <Card className="flex flex-col gap-3 p-6 bg-gradient-to-br from-indigo-50 to-white">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">Weekly AI Brief</h2>
        <p className="text-xs text-indigo-500 font-medium mt-0.5">
          {brand ? `${brand} • ` : ""}{weekRange}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
      {bullets.length > 0 && (
        <ul className="list-disc space-y-2 pl-4 text-sm text-gray-700">
          {bullets.map((b, i) => (
            <li key={i} className="pl-1">{b}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}
