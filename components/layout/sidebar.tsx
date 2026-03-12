"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/trends", label: "Trends" },
  { href: "/longevity", label: "Longevity" },
  { href: "/gaps", label: "Gaps" },
  { href: "/brief", label: "Weekly Brief" },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex w-64 flex-col glass-panel border-r border-white/5 bg-background/30 backdrop-blur-3xl", className)}>
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
          War Room
        </span>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-6 relative">
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-indigo-500/50 block pointer-events-none" />
        {nav.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                active
                  ? "bg-indigo-500/10 text-indigo-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-indigo-500/20"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-1/2 bg-indigo-500 rounded-r-md shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              )}
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-indigo-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
