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
        "flex w-64 flex-col glass-panel border-r border-border bg-card/70 backdrop-blur-3xl",
        "animate-slide-left",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6 gap-3">
        {/* Logo mark */}
        <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-lg bg-maroon/10 border border-maroon/20 animate-glow" />
          <span className="text-maroon text-sm font-black relative z-10">S</span>
        </div>
        <span className="text-sm font-bold tracking-[0.08em] text-soft-black font-serif drop-shadow-sm">
          <span className="text-maroon">Spyder</span>Ads AI
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {/* Thin vertical accent line */}
        <div className="absolute left-3.5 top-20 bottom-10 w-[1px] bg-gradient-to-b from-maroon/20 via-maroon/10 to-transparent pointer-events-none" />

        {nav.map((item, i) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${i * 0.05}s` }}
              className={cn(
                "stagger-children relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium",
                "transition-all duration-300 ease-out group overflow-hidden",
                "border",
                active
                  ? [
                      "bg-maroon/8 text-maroon border-maroon/20",
                      "shadow-[0_2px_12px_rgba(110,44,44,0.1)]",
                    ]
                  : "text-soft-black/70 hover:text-maroon border-transparent hover:bg-beige/60 hover:border-border"
              )}
            >
              {/* Active pill indicator */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[55%] bg-maroon rounded-r-full shadow-[0_0_6px_rgba(110,44,44,0.5)] animate-fade-in" />
              )}

              {/* Icon */}
              <span
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded-lg text-xs transition-all duration-300 shrink-0",
                  active
                    ? "bg-maroon/15 text-maroon"
                    : "text-soft-black/50 group-hover:bg-maroon/10 group-hover:text-maroon"
                )}
              >
                {item.icon}
              </span>

              {/* Label + desc */}
              <div className="min-w-0">
                <div className="font-semibold leading-none">{item.label}</div>
                <div className={cn(
                  "text-[10px] font-medium leading-none mt-0.5 transition-colors",
                  active ? "text-maroon/60" : "text-soft-black/40 group-hover:text-maroon/50"
                )}>
                  {item.desc}
                </div>
              </div>

              {/* Hover sweep gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-maroon/0 via-maroon/4 to-maroon/0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
            </Link>
          );
        })}
      </nav>

      {/* Bottom footer */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-soft-black/40">
            Intelligence Active
          </p>
        </div>
        <p className="text-[10px] text-soft-black/30 font-medium mt-1 ml-4">
          Last synced: just now
        </p>
      </div>
    </aside>
  );
}
