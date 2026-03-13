import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { getMockBrief } from "@/lib/mock-data";

const CACHE_KEY = "api:weekly-brief";
const CACHE_TTL = 60 * 60 * 1000;

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

      // Resolve the brand name to an ID using case-insensitive match (ilike)
      const { data: bData, error: bError } = await supabase
        .from("brands")
        .select("id")
        .ilike("name", brand)
        .single();

      if (bError || !bData) {
        console.warn(`Brand look-up failed for "${brand}":`, bError);
        throw new Error("Brand not found");
      }

      // Fetch the latest brief specifically for this brand
      const { data, error } = await supabase
        .from("weekly_briefs")
        .select("*, brands!primary_brand_id(name)")
        .eq("primary_brand_id", bData.id)
        .order("week_start", { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setCache(cacheKey, data, CACHE_TTL);
        return NextResponse.json(data);
      }
    } catch (err) {
      console.error("Supabase Weekly Brief Fetch Error:", err);
      // Fall through to mock data
    }

    // Return mock brief for this brand
    const mockBrief = getMockBrief(brand);
    setCache(cacheKey, [mockBrief], CACHE_TTL);
    return NextResponse.json([mockBrief]);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
