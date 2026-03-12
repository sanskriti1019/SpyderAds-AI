import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { getCache, setCache } from "@/lib/cache";

const CACHE_KEY = "api:dashboard:stats";
const CACHE_TTL = 5 * 60 * 1000;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cached = getCache<unknown>(CACHE_KEY);
    if (cached) return NextResponse.json(cached);

    const supabase = createServerSupabase();

    const [brandsRes, adsRes] = await Promise.all([
      supabase.from("brands").select("id", { count: "exact", head: true }),
      supabase.from("ads").select("id", { count: "exact", head: true }).gte("last_seen_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

    const activeCompetitors = brandsRes.count ?? 0;
    const activeAds = adsRes.count ?? 0;

    const { count: newCreatives } = await supabase
      .from("ads")
      .select("id", { count: "exact", head: true })
      .gte("first_seen_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    const stats = {
      activeCompetitors,
      activeAds,
      newCreatives30d: newCreatives ?? 0,
    };

    setCache(CACHE_KEY, stats, CACHE_TTL);
    return NextResponse.json(stats);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
