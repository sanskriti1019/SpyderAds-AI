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
    <aside className={cn("flex w-64 flex-col glass-panel border-r border-[#00000010] bg-white/70 backdrop-blur-3xl", className)}>
      <div className="flex h-16 items-center border-b border-[#00000010] px-6">
        <span className="text-sm font-bold tracking-[0.1em] text-gray-900 drop-shadow-sm">
          <span className="text-blue-600">Spyder</span>Ads AI
        </span>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-6 relative">
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-blue-500/20 block pointer-events-none" />
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
                  ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-1/2 bg-blue-600 rounded-r-md shadow-sm" />
              )}
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
