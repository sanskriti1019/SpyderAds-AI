"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/",            label: "Overview",     icon: "◈", desc: "Dashboard" },
  { href: "/competitors", label: "Competitors",  icon: "⊕", desc: "Brand cards" },
  { href: "/compare",     label: "Compare",      icon: "⇌", desc: "Charts" },
  { href: "/trends",      label: "Trends",       icon: "↗", desc: "Format shifts" },
  { href: "/longevity",   label: "Longevity",    icon: "◎", desc: "Long-runners" },
  { href: "/gaps",        label: "Gaps",         icon: "△", desc: "Opportunities" },
  { href: "/brief",       label: "Weekly Brief", icon: "✦", desc: "AI summary" },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-64 flex-col glass-panel border-r border-border/60",
        "animate-slide-left",
        className
      )}
    >
      {/* Designer Logo Section */}
      <div className="flex h-20 items-center border-b border-border/50 px-6 gap-3.5">
        <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-xl bg-maroon shadow-lg shadow-maroon/20 rotate-3 transition-transform hover:rotate-6" />
          <span className="text-white text-lg font-serif font-black relative z-10">S</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-black tracking-[0.2em] text-soft-black uppercase font-serif leading-none">
            Spyder<span className="text-maroon">Ads</span>
          </span>
          <span className="text-[9px] font-bold tracking-[0.3em] text-soft-black/30 uppercase mt-1">Intelligence</span>
        </div>
      </div>

      {/* Navigation Layer */}
      <nav className="flex-1 space-y-1 px-4 py-8">
        {nav.map((item, i) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3.5 rounded-2xl px-4 py-3 text-[13px] font-bold tracking-tight",
                "transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group",
                active
                  ? [
                      "bg-white designer-shadow text-maroon border border-maroon/10",
                      "designer-inner-shadow"
                    ]
                  : "text-soft-black/50 hover:text-maroon border border-transparent hover:bg-white/40 hover:border-border/60 hover:designer-shadow transition-transform hover:-translate-y-0.5"
              )}
            >
              {/* Active Indicator Pulse */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-maroon rounded-full ml-1 animate-pulse" />
              )}

              {/* Icon Matrix */}
              <span
                className={cn(
                  "w-5 h-5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
                  active ? "text-maroon" : "text-soft-black/30 group-hover:text-maroon/60"
                )}
              >
                {item.icon}
              </span>

              {/* Label Cluster */}
              <div className="min-w-0 pr-2">
                <div className="leading-none">{item.label}</div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Persistence Layer */}
      <div className="border-t border-border/60 px-6 py-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <div className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60" />
            <div className="relative rounded-full h-2 w-2 bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-soft-black/40">
            Node Alive
          </p>
        </div>
        
        {/* User context placeholder - Designer touch */}
        <div className="flex items-center gap-3 pt-2">
           <div className="w-8 h-8 rounded-full bg-beige border border-border flex items-center justify-center text-[10px] font-black text-soft-black/30 bg-gradient-to-br from-beige to-white">
             HP
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-soft-black leading-none">Admin Station</span>
              <span className="text-[9px] font-medium text-soft-black/30 mt-1">v2.4.0-pro</span>
           </div>
        </div>
      </div>
    </aside>
  );
}
