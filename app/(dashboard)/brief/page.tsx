"use client";
import { useWeeklyBrief } from "@/lib/hooks";
import { WeeklyBrief } from "@/components/insights/weekly-brief";

export default function BriefPage() {
  const { data: briefs = [] } = useWeeklyBrief();

  const brief = briefs[0] as
    | {
        week_start?: string;
        week_end?: string;
        summary_md?: string;
        insights_json?: { trend?: string }[];
        primary_brand_name?: string;
      }
    | undefined;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">AI Weekly Brief</h2>
      <p className="text-gray-500">Your automated executive summary of competitor actions.</p>
      <div className="max-w-3xl">
        <WeeklyBrief
          brand={brief?.primary_brand_name}
          weekRange={
            brief?.week_start && brief?.week_end
              ? `${brief.week_start} – ${brief.week_end}`
              : "—"
          }
          summary={brief?.summary_md ?? "No brief available yet."}
          bullets={
            (brief?.insights_json as { trend?: string }[])
              ?.map((i) => i.trend)
              ?.filter(Boolean) ?? []
          }
        />
      </div>
    </div>
  );
}
