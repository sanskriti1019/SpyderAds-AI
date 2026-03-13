import { AdCard } from "@/components/ad/ad-card";

interface Creative {
  brand_name?: string;
  copy?: string;
  format?: string;
  theme?: string;
  creative_url?: string;
  cta?: string;
  start_date?: string | null;
}

interface CreativeGalleryProps {
  creatives: Creative[];
}

export function CreativeGallery({ creatives }: CreativeGalleryProps) {
  if (!creatives?.length) return null;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-soft-black font-serif">Creative Gallery</h2>
        <span className="text-sm font-medium text-soft-black/60 bg-card px-3 py-1 rounded-full shadow-sm border border-border">
          {creatives.length} creatives tracked
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {creatives.slice(0, 12).map((c, idx) => (
          <AdCard key={idx} {...c} />
        ))}
      </div>
    </div>
  );
}
