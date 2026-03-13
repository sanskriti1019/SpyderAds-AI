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
    <Card className="flex flex-col gap-3 p-6 bg-card border-border">
      <div className="pb-3 border-b border-border/50">
        <h2 className="text-xl font-serif font-bold tracking-tight text-soft-black">Weekly AI Brief</h2>
        <p className="text-[10px] text-maroon/80 font-bold uppercase tracking-widest mt-1">
          {brand ? `${brand} • ` : ""}{weekRange}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-soft-black/80 font-medium">{summary}</p>
      {bullets.length > 0 && (
        <ul className="list-disc space-y-2 pl-4 text-sm text-soft-black/80 font-medium">
          {bullets.map((b, i) => (
            <li key={i} className="pl-1 marker:text-maroon/60">{b}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}
