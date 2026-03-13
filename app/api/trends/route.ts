import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";

const CACHE_KEY = "api:trends";
const CACHE_TTL = 5 * 60 * 1000;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandParam = searchParams.get("brand");
    const brandId = searchParams.get("brand_id");
    const period = searchParams.get("period") ?? "week";

    const cacheKey = `${CACHE_KEY}:${brandParam ?? brandId ?? "all"}:${period}`;
    const cached = getCache<unknown>(cacheKey);
    if (cached) return NextResponse.json(cached);

    const { createServerSupabase } = await import("@/lib/supabase/server");
    const supabase = createServerSupabase();

    let query = supabase
      .from("trend_reports")
      .select("*, brands!brand_id(name)")
      .order("period_start", { ascending: true }); // Charts need ascending order

    // Handle brand filtering
    if (brandId) {
      query = query.eq("brand_id", brandId);
    } else if (brandParam) {
      // Resolve name to ID
      const { data: bData } = await supabase
        .from("brands")
        .select("id")
        .ilike("name", brandParam)
        .single();
        
      if (bData) {
        query = query.eq("brand_id", bData.id);
      }
    }

    if (period === "month") query = query.eq("granularity", "month");
    else query = query.eq("granularity", "week");

    const { data, error } = await query;
    if (error) throw error;

    const trends = (data ?? []).map((t) => ({
      ...t,
      brand_name: (t as { brands?: { name: string } })?.brands?.name,
    }));

    setCache(cacheKey, trends, CACHE_TTL);
    return NextResponse.json(trends);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
