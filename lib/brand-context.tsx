"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type PrimaryBrand = "BeBodywise" | "Man Matters" | "Little Joys";

interface BrandContextType {
  activeBrand: PrimaryBrand;
  setActiveBrand: (brand: PrimaryBrand) => void;
}

const BrandContext = createContext<BrandContextType>({
  activeBrand: "BeBodywise",
  setActiveBrand: () => {},
});

export function BrandProvider({ children }: { children: ReactNode }) {
  const [activeBrand, setActiveBrand] = useState<PrimaryBrand>("BeBodywise");
  return (
    <BrandContext.Provider value={{ activeBrand, setActiveBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useActiveBrand() {
  return useContext(BrandContext);
}

// Configuration for each primary brand
export const BRAND_CONFIG: Record<PrimaryBrand, {
  label: string;
  tagline: string;
  color: string;
  competitors: string[];
  industry: string;
}> = {
  "BeBodywise": {
    label: "BeBodywise",
    tagline: "Women's Health & Wellness",
    color: "#6E2C2C",
    competitors: ["Minimalist", "Mamaearth", "The Derma Co"],
    industry: "Health & Wellness",
  },
  "Man Matters": {
    label: "Man Matters",
    tagline: "Men's Health & Performance",
    color: "#1A1A1A",
    competitors: ["Bold Care", "Ustraa", "Beardo", "Traya"],
    industry: "Men's Health",
  },
  "Little Joys": {
    label: "Little Joys",
    tagline: "Kids' Nutrition & Wellness",
    color: "#8B4040",
    competitors: ["Mamaearth", "Bold Care", "Minimalist"],
    industry: "Kids Wellness",
  },
};
