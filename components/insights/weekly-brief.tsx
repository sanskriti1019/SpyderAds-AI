import { Card } from "@/components/ui/card";
import { SimpleMarkdown } from "@/components/ui/simple-markdown";

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
    <Card className="flex flex-col gap-5 p-7 bg-card border-border/80 shadow-lg relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-maroon/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />
      
      <div className="space-y-1.5 pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold tracking-tight text-soft-black">Weekly AI Brief</h2>
          <span className="text-[9px] font-bold uppercase tracking-widest bg-maroon text-white px-2 py-0.5 rounded-full">Report</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
           <p className="text-[10px] text-maroon/80 font-bold uppercase tracking-widest">
             {brand ? `${brand} • ` : ""}{weekRange}
           </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="serif text-soft-black/90 leading-relaxed">
          <SimpleMarkdown content={summary ?? ""} />
        </div>
        
        {bullets.length > 0 && (
          <div className="space-y-4 pt-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-soft-black/30 mb-4">Key Strategic Signals</h4>
            <div className="space-y-3">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-border/40 bg-maroon/[0.02] hover:bg-maroon/[0.04] transition-all group/bullet">
                  <div className="h-8 w-8 rounded-full bg-card border border-border/60 flex items-center justify-center text-maroon font-serif font-bold text-sm shadow-sm transition-transform group-hover/bullet:scale-110 group-hover/bullet:rotate-3">
                    {i + 1}
                  </div>
                  <div className="flex-1 text-sm font-semibold text-soft-black/80 leading-relaxed">
                    <SimpleMarkdown content={b} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 mt-auto">
        <button className="w-full py-2.5 text-[10px] font-bold uppercase tracking-widest text-soft-black/40 border border-border/60 rounded-xl hover:bg-soft-black hover:text-white hover:border-soft-black transition-all">
          Generate Full PDF Report
        </button>
      </div>
    </Card>
  );
}
