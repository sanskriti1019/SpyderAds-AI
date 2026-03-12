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
    <Card className="flex flex-col gap-3 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-medium text-muted-foreground truncate">
            {brand_name ?? "—"}
          </span>
          <p className="line-clamp-3 text-sm text-foreground">
            {copy ?? "No copy"}
          </p>
        </div>
        {creative_url && (
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creative_url}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {format && (
            <span className="rounded-full bg-muted px-2 py-0.5">{format}</span>
          )}
          {theme && (
            <span className="rounded-full bg-muted px-2 py-0.5">{theme}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {cta && <span>{cta}</span>}
          {start_date && <span>Since {start_date}</span>}
        </div>
      </div>
    </Card>
  );
}
