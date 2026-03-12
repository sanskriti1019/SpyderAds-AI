import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";

const CACHE_KEY = "api:insights";
const CACHE_TTL = 5 * 60 * 1000;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brand_id");

    const cacheKey = `${CACHE_KEY}:${brandId ?? "all"}`;
    const cached = getCache<unknown>(cacheKey);
    if (cached) return NextResponse.json(cached);

    let supabase;
    try {
      const { createServerSupabase } = await import("@/lib/supabase/server");
      supabase = createServerSupabase();
    } catch {
      return NextResponse.json([]);
    }

    const { data: briefs } = await supabase
      .from("weekly_briefs")
      .select("insights_json")
      .order("week_start", { ascending: false })
      .limit(4);

    const insights: { competitor: string; trend: string; evidence: Record<string, unknown>; strategic_implication: string }[] = [];
    for (const b of briefs ?? []) {
      const arr = (b as { insights_json?: { competitor?: string; trend?: string; evidence?: Record<string, unknown>; strategic_implication?: string }[] }).insights_json;
      if (Array.isArray(arr)) insights.push(...arr);
    }

    const deduped = insights.slice(0, 30);

    if (brandId) {
      const { data: brands } = await supabase.from("brands").select("name").eq("id", brandId).single();
      const name = (brands as { name?: string })?.name;
      const filtered = deduped.filter((i) => i.competitor === name);
      setCache(cacheKey, filtered, CACHE_TTL);
      return NextResponse.json(filtered);
    }

    setCache(cacheKey, deduped, CACHE_TTL);
    return NextResponse.json(deduped);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
