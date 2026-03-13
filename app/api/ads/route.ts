import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";

const CACHE_KEY = "api:ads";
const CACHE_TTL = 60 * 1000;

export const dynamic = "force-dynamic";

async function getSupabase() {
  try {
    const { createServerSupabase } = await import("@/lib/supabase/server");
    return createServerSupabase();
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");
    const format = searchParams.get("format");
    const theme = searchParams.get("theme");
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 200);

    const cacheKey = `${CACHE_KEY}:${brand ?? "all"}:${format ?? "all"}:${theme ?? "all"}:${limit}`;
    const cached = getCache<unknown>(cacheKey);
    if (cached) return NextResponse.json(cached);

    const supabase = await getSupabase();
    if (!supabase) return NextResponse.json([]);

    let query = supabase
      .from("ads")
      .select(`
        id,
        brand_id,
        meta_ad_id,
        platform,
        status,
        first_seen_at,
        last_seen_at,
        start_date,
        end_date,
        brands(name)
      `, { count: "exact" })
      .order("last_seen_at", { ascending: false })
      .limit(limit);

    if (brand) {
      const { data: brandRows } = await supabase
        .from("brands")
        .select("id")
        .ilike("name", `%${brand}%`);
      const ids = (brandRows ?? []).map((b: { id: number }) => b.id);
      if (ids.length) query = query.in("brand_id", ids);
      else {
        setCache(cacheKey, [], CACHE_TTL);
        return NextResponse.json([]);
      }
    }

    const { data: adsData, error } = await query;

    if (error) throw error;

    let rows = adsData ?? [];
    const brandMap = new Map((rows as { brands?: { name: string } }[]).map((a) => [a.brand_id, (a as { brands?: { name: string } })?.brands?.name]));

    const enriched = (rows as Record<string, unknown>[]).map((a) => {
      const { brands, ...rest } = a as { brands?: { name: string }; [k: string]: unknown };
      return {
        ...rest,
        brand_name: (brands as { name?: string })?.name,
        brand_id: rest.brand_id,
      };
    });

    const creativesQuery = supabase
      .from("ad_creatives")
      .select("ad_id, primary_text, format_normalized, cta, image_url, video_url, landing_page_url");
    const { data: creatives } = await creativesQuery;

    const creativesByAd = new Map<number, { copy?: string; format?: string; cta?: string; creative_url?: string; landing_page?: string }[]>();
    for (const c of creatives ?? []) {
      const adId = (c as { ad_id: number }).ad_id;
      const arr = creativesByAd.get(adId) ?? [];
      arr.push({
        copy: (c as { primary_text?: string }).primary_text,
        format: (c as { format_normalized?: string }).format_normalized,
        cta: (c as { cta?: string }).cta,
        creative_url: (c as { image_url?: string }).image_url ?? (c as { video_url?: string }).video_url,
        landing_page: (c as { landing_page_url?: string }).landing_page_url,
      });
      creativesByAd.set(adId, arr);
    }

    const analysisQuery = supabase.from("ad_analysis").select("ad_id, theme_label, format_label").eq("is_latest", true);
    const { data: analysis } = await analysisQuery;
    const analysisByAd = new Map(
      (analysis ?? []).map((a) => [(a as { ad_id: number }).ad_id, a as { theme_label?: string; format_label?: string }])
    );

    let result = enriched.map((a) => {
      const id = a.id as number;
      const creatives0 = creativesByAd.get(id)?.[0];
      const a0 = analysisByAd.get(id);
      return {
        ...a,
        copy: creatives0?.copy,
        creative_url: creatives0?.creative_url,
        format: creatives0?.format ?? a0?.format_label,
        theme: a0?.theme_label,
        cta: creatives0?.cta,
        landing_page: creatives0?.landing_page,
      };
    });

    if (format) result = result.filter((r) => (r.format ?? "").toLowerCase().includes(format.toLowerCase()));
    if (theme) result = result.filter((r) => (r.theme ?? "").toLowerCase().includes(theme.toLowerCase()));

    setCache(cacheKey, result, CACHE_TTL);
    return NextResponse.json(result);
  } catch (e) {
    console.error("API Error details:", e);
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
