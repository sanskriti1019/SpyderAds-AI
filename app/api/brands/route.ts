import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { getCache, setCache } from "@/lib/cache";

const CACHE_KEY = "api:brands";
const CACHE_TTL = 10 * 60 * 1000;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cached = getCache<unknown>(CACHE_KEY);
    if (cached) return NextResponse.json(cached);

    const supabase = createServerSupabase();
    const { data, error } = await supabase.from("brands").select("id, name, is_primary").order("name");

    if (error) throw error;

    setCache(CACHE_KEY, data ?? [], CACHE_TTL);
    return NextResponse.json(data ?? []);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
