import { Card } from "@/components/ui/card";

interface AdCardProps {
  brand_name?: string;
  copy?: string;
  format?: string;
  theme?: string;
  creative_url?: string;
  cta?: string;
  start_date?: string | null;
}

export function AdCard({
  brand_name,
  copy,
  format,
  theme,
  creative_url,
  cta,
  start_date,
}: AdCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-5 transition-all hover:-translate-y-1 hover:shadow-lg border-gray-100 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 min-w-0">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide truncate">
            {brand_name ?? "—"}
          </span>
          <p className="line-clamp-3 text-sm text-gray-700 leading-relaxed font-medium">
            {copy ?? "No copy"}
          </p>
        </div>
        {creative_url && (
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creative_url}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 text-xs text-gray-500 font-medium flex-wrap pt-2 border-t border-gray-50 mt-auto">
        <div className="flex items-center gap-2 flex-wrap">
          {format && (
            <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5">{format}</span>
          )}
          {theme && (
            <span className="rounded-full bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-0.5">{theme}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {cta && <span className="text-indigo-600 font-semibold">{cta}</span>}
          {start_date && <span>Since {start_date}</span>}
        </div>
      </div>
    </Card>
  );
}
