"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Overview", icon: "◈" },
  { href: "/competitors", label: "Competitors", icon: "⊕" },
  { href: "/compare", label: "Compare", icon: "⇌" },
  { href: "/trends", label: "Trends", icon: "↗" },
  { href: "/longevity", label: "Longevity", icon: "◎" },
  { href: "/gaps", label: "Gaps", icon: "△" },
  { href: "/brief", label: "Weekly Brief", icon: "✦" },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex w-64 flex-col glass-panel border-r border-border bg-card/70 backdrop-blur-3xl", className)}>
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="text-sm font-bold tracking-[0.1em] text-soft-black font-serif drop-shadow-sm">
          <span className="text-maroon">Spyder</span>Ads AI
        </span>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-6 relative">
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-maroon/20 block pointer-events-none" />
        {nav.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                active
                  ? "bg-beige text-maroon shadow-sm border border-border"
                  : "text-soft-black/80 hover:bg-beige/50 hover:text-maroon border border-transparent"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-1/2 bg-maroon rounded-r-md shadow-sm" />
              )}
              <span className="relative z-10 text-sm opacity-70">{item.icon}</span>
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-maroon/0 to-maroon/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
