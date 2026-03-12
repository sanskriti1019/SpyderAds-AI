import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";

const CACHE_KEY = "api:weekly-brief";
const CACHE_TTL = 60 * 60 * 1000;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const primaryBrandId = searchParams.get("primary_brand_id");
    const competitorBrandId = searchParams.get("competitor_brand_id");

    const cacheKey = `${CACHE_KEY}:${primaryBrandId ?? "all"}:${competitorBrandId ?? "all"}`;
    const cached = getCache<unknown>(cacheKey);
    if (cached) return NextResponse.json(cached);

    let supabase;
    try {
      const { createServerSupabase } = await import("@/lib/supabase/server");
      supabase = createServerSupabase();
    } catch {
      return NextResponse.json([]);
    }

    let query = supabase
      .from("weekly_briefs")
      .select("*, brands!primary_brand_id(name)")
      .order("week_start", { ascending: false })
      .limit(5);

    if (primaryBrandId) query = query.eq("primary_brand_id", primaryBrandId);
    if (competitorBrandId) query = query.eq("competitor_brand_id", competitorBrandId);

    const { data, error } = await query;

    if (error) throw error;

    const briefs = (data ?? []).map((b) => ({
      ...b,
      primary_brand_name: (b as { brands?: { name: string } })?.brands?.name,
    }));

    setCache(cacheKey, briefs, CACHE_TTL);
    return NextResponse.json(briefs);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
