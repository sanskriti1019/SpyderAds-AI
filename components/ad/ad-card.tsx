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
    <Card className="flex flex-col gap-4 p-5 transition-all outline outline-1 outline-transparent hover:outline-maroon hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 min-w-0">
          <span className="text-xs font-semibold text-maroon uppercase tracking-wide truncate">
            {brand_name ?? "—"}
          </span>
          <p className="line-clamp-3 text-sm text-soft-black/90 leading-relaxed font-medium">
            {copy ?? "No copy"}
          </p>
        </div>
        {creative_url && (
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border shadow-sm bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creative_url}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 text-xs text-soft-black/70 font-medium flex-wrap pt-3 border-t border-border mt-auto">
        <div className="flex items-center gap-2 flex-wrap">
          {format && (
            <span className="rounded-full bg-beige text-maroon border border-border px-2.5 py-0.5">{format}</span>
          )}
          {theme && (
            <span className="rounded-full bg-beige/50 text-soft-black border border-border px-2.5 py-0.5">{theme}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {cta && <span className="text-maroon font-semibold">{cta}</span>}
          {start_date && <span>Since {start_date}</span>}
        </div>
      </div>
    </Card>
  );
}
