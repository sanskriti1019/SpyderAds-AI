"use client";

import { useActiveBrand, BRAND_CONFIG, PrimaryBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

const brands: PrimaryBrand[] = ["BeBodywise", "Man Matters", "Little Joys"];

export function BrandSelector() {
  const { activeBrand, setActiveBrand } = useActiveBrand();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-border bg-beige/30 p-1 backdrop-blur-sm">
      {brands.map((brand) => {
        const isActive = activeBrand === brand;
        return (
          <button
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={cn(
              "relative px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300",
              isActive
                ? "bg-card text-maroon shadow-sm border border-border/50"
                : "text-soft-black/60 hover:text-soft-black hover:bg-beige/50"
            )}
          >
            {isActive && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon" />
              </span>
            )}
            {brand}
          </button>
        );
      })}
    </div>
  );
}
