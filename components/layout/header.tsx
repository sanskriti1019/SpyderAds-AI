import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-background/30 backdrop-blur-3xl px-6 relative z-10 glass-panel">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
      <div className="flex items-baseline gap-3 relative">
        <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Competitor Ad War Room
        </h1>
        <span className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Analytics
        </span>
      </div>
      <div className="flex items-center gap-4 relative">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Sync
        </span>
        <Button variant="outline" className="h-8 text-xs border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-300 transition-all shadow-[0_0_15px_rgba(99,102,241,0.15)] bg-transparent">
          Export Report
        </Button>
      </div>
    </header>
  );
}
