import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { getMockLongevity } from "@/lib/mock-data";

const CACHE_KEY = "api:longevity";
const CACHE_TTL = 5 * 60 * 1000;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = (searchParams.get("brand") ?? "BeBodywise") as "BeBodywise" | "Man Matters" | "Little Joys";

    const cacheKey = `${CACHE_KEY}:${brand}`;
    const cached = getCache<unknown>(cacheKey);
    if (cached) return NextResponse.json(cached);

    // 1. Try Supabase
    try {
      const { createServerSupabase } = await import("@/lib/supabase/server");
      const supabase = createServerSupabase();

      const { data: bData } = await supabase
        .from("brands")
        .select("id")
        .ilike("name", brand)
        .single();

      if (bData) {
        // Fetch ads for this brand ordered by duration
        const { data: adsData } = await supabase
          .from("ads")
          .select(`
            *,
            brands(name),
            ad_creatives(creative_type, format_normalized, headline),
            ad_analysis(theme_label)
          `)
          .eq("brand_id", bData.id)
          .order("first_seen_at", { ascending: true })
          .limit(20);

        if (adsData && adsData.length > 0) {
          const formatted = adsData.map((ad: any) => {
            const firstSeen = new Date(ad.first_seen_at);
            const lastSeen = new Date(ad.last_seen_at);
            const days = Math.floor((lastSeen.getTime() - firstSeen.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            
            return {
              creativeTitle: ad.ad_creatives?.[0]?.headline || "Ad Creative",
              brand: ad.brands?.name || brand,
              format: ad.ad_creatives?.[0]?.format_normalized || "Unknown",
              theme: ad.ad_analysis?.[0]?.theme_label || "Unknown",
              daysRunning: days,
              estimatedImpressions: (days * 15000).toLocaleString(), // Mocked reach based on days
              status: ad.status === "active" ? "Active" : "Paused",
              startDate: ad.first_seen_at.split('T')[0]
            };
          });
          setCache(cacheKey, formatted, CACHE_TTL);
          return NextResponse.json(formatted);
        }
      }
    } catch (err) {
      console.error("Supabase Longevity Fetch Error:", err);
    }

    // 2. Fallback to Mock
    const data = getMockLongevity(brand);
    setCache(cacheKey, data, CACHE_TTL);
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
