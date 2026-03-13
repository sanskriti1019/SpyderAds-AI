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

    const data = getMockLongevity(brand);
    setCache(cacheKey, data, CACHE_TTL);
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
