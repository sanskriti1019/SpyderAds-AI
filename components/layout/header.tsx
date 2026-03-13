import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card/70 backdrop-blur-3xl px-6 relative z-10 glass-panel">
      <div className="flex items-baseline gap-3 relative">
        <h1 className="text-xl font-serif font-bold tracking-tight text-soft-black drop-shadow-sm">
          SpyderAds AI
        </h1>
        <span className="text-xs font-semibold uppercase tracking-widest text-maroon/80">
          Analytics
        </span>
      </div>
      <div className="flex items-center gap-4 relative">
        <span className="text-xs font-medium text-soft-black/60 flex items-center gap-2 uppercase tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Sync
        </span>
        <Button variant="outline" className="h-8 text-xs font-semibold tracking-wide border-border hover:bg-beige hover:text-maroon transition-all text-soft-black bg-card shadow-sm">
          Export Report
        </Button>
      </div>
    </header>
  );
}
