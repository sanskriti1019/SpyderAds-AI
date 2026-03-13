import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { getMockStats } from "@/lib/mock-data";

const CACHE_KEY = "api:dashboard:stats";
const CACHE_TTL = 2 * 60 * 1000;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
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

      const [brandsRes, adsRes, newRes] = await Promise.all([
        supabase.from("brands").select("id", { count: "exact", head: true }),
        supabase.from("ads").select("id", { count: "exact", head: true }).gte("last_seen_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from("ads").select("id", { count: "exact", head: true }).gte("first_seen_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      ]);

      // If we have real data, return it
      if ((brandsRes.count ?? 0) > 0 || (adsRes.count ?? 0) > 0) {
        const stats = {
          activeCompetitors: brandsRes.count ?? 0,
          activeAds: adsRes.count ?? 0,
          newCreatives30d: newRes.count ?? 0,
        };
        setCache(cacheKey, stats, CACHE_TTL);
        return NextResponse.json(stats);
      }
    } catch {
      // Fall through to mock data
    }

    // Return brand-specific mock data
    const mockStats = getMockStats(brand);
    setCache(cacheKey, mockStats, CACHE_TTL);
    return NextResponse.json(mockStats);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
