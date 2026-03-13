import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(Path(__file__).parent.parent / ".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    print("Testing ads query like NextJS...")
    res = supabase.from_("ads").select("id, brand_id, meta_ad_id, platform, status, first_seen_at, last_seen_at, start_date, end_date, brands(name)", count="exact").limit(5).execute()
    print("Ads Success:", len(res.data))
except Exception as e:
    print("Ads Error:", e)

try:
    print("Testing insights like NextJS...")
    res = supabase.from_("weekly_briefs").select("id, primary_brand_id, week_start, summary_md, insights_json, brands!weekly_briefs_primary_brand_id_fkey(name)").limit(5).execute()
    print("Insights Success:", len(res.data))
except Exception as e:
    print("Insights Error:", e)

try:
    print("Testing trends like NextJS...")
    res = supabase.from_("trend_reports").select("id, brand_id, period_start, period_end, granularity, metric_type, label_type, label_value, value, baseline_value, delta, brands!trend_reports_brand_id_fkey(name)").limit(5).execute()
    print("Trends Success:", len(res.data))
except Exception as e:
    print("Trends Error:", e)
