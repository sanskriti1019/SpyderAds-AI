import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { getMockInsights } from "@/lib/mock-data";

const CACHE_KEY = "api:insights";
const CACHE_TTL = 5 * 60 * 1000;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = (searchParams.get("brand") ?? "BeBodywise") as "BeBodywise" | "Man Matters" | "Little Joys";

    const cacheKey = `${CACHE_KEY}:${brand}`;
    const cached = getCache<unknown>(cacheKey);
    if (cached) return NextResponse.json(cached);

    // Try Supabase first
    try {
      const { createServerSupabase } = await import("@/lib/supabase/server");
      const supabase = createServerSupabase();

      // Resolve brand ID
      const { data: bData } = await supabase
        .from("brands")
        .select("id")
        .ilike("name", brand)
        .single();

      if (bData) {
        // Fetch insights ONLY for this brand's briefs
        const { data: briefs } = await supabase
          .from("weekly_briefs")
          .select("insights_json")
          .eq("primary_brand_id", bData.id)
          .order("week_start", { ascending: false })
          .limit(4);

        const insights: unknown[] = [];
        for (const b of (briefs ?? []) as { insights_json?: unknown[] }[]) {
          const arr = b.insights_json;
          if (Array.isArray(arr)) insights.push(...arr);
        }

        if (insights.length > 0) {
          setCache(cacheKey, insights.slice(0, 20), CACHE_TTL);
          return NextResponse.json(insights.slice(0, 20));
        }
      }
    } catch (err) {
      console.error("Supabase Insights Fetch Error:", err);
    }

    // Return mock insights for this brand
    const mockInsights = getMockInsights(brand);
    setCache(cacheKey, mockInsights, CACHE_TTL);
    return NextResponse.json(mockInsights);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
