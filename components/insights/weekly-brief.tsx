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
    <Card className="flex flex-col gap-3 p-4">
      <div>
        <h2 className="text-sm font-semibold">Weekly AI Brief</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {brand ? `${brand} • ` : ""}{weekRange}
        </p>
      </div>
      <p className="text-sm leading-relaxed">{summary}</p>
      {bullets.length > 0 && (
        <ul className="list-disc space-y-1 pl-4 text-sm">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}
