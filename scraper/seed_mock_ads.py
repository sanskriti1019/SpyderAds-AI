"""
SpyderAds AI — Seed Realistic Ads
Since Meta Ad Library blocks headless/anonymous browsers frequently,
this script seeds the Supabase database with realistic mock ads so the
rest of the pipeline (Analyser, Trend Reporter, Dashboards) can immediately function.
"""

import os
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client

load_dotenv(Path(__file__).parent.parent / ".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

BRANDS = [
    "Bebodywise", "Man Matters", "Little Joys", "Traya", "Bold Care",
    "Minimalist", "Mamaearth", "The Derma Co", "Ustraa", "Beardo"
]

FORMATS = ["image", "video", "carousel"]
THEMES = ["problem-solution", "testimonial", "offer-driven", "educational", "before-after"]

AD_TEMPLATES = [
    {
        "primary_text": "Tired of hair fall? Our new advanced serum strengthens roots in 4 weeks. 💆‍♀️",
        "headline": "Stop Hair Fall Today",
        "cta": "Shop Now"
    },
    {
        "primary_text": "Buy 1 Get 1 Free on all Vitamin C serums! Glowing skin starts here. ✨",
        "headline": "BOGO Sale Live",
        "cta": "Get Offer"
    },
    {
        "primary_text": "\"This changed my life! I finally feel confident.\" - Sarah M.",
        "headline": "Real Results, Real Customers",
        "cta": "Learn More"
    },
    {
        "primary_text": "Did you know 80% of men face hair thinning by 30? Here is the clinical solution.",
        "headline": "The Science of Hair Growth",
        "cta": "See The Science"
    },
    {
        "primary_text": "See the dramatic difference. Week 1 vs Week 12. 💯",
        "headline": "Visible Transformation",
        "cta": "Start Journey"
    }
]

def now_iso(days_offset=0):
    return (datetime.now(timezone.utc) + timedelta(days=days_offset)).isoformat()

def upsert_brand(name: str):
    supabase.table("brands").upsert(
        {"name": name, "is_primary": name == "Mamaearth"},
        on_conflict="name",
    ).execute()
    return supabase.table("brands").select("id").eq("name", name).single().execute().data["id"]

def run_seed():
    print("[SEEDING] Starting realistic mock data injection...")
    
    for brand in BRANDS:
        brand_id = upsert_brand(brand)
        print(f"  [+] Seeding ads for {brand} (ID: {brand_id})")
        
        # Generate 15-25 ads per brand over the last 30 days
        num_ads = random.randint(15, 25)
        for _ in range(num_ads):
            meta_ad_id = f"sys_{random.randint(10000000000, 99999999999)}"
            seen_offset = random.randint(-25, 0)
            seen_at = now_iso(seen_offset)
            
            # 1. Insert Ad
            supabase.table("ads").upsert(
                {
                    "brand_id": brand_id,
                    "meta_ad_id": meta_ad_id,
                    "platform": "Meta",
                    "status": "active" if seen_offset > -10 else "inactive",
                    "first_seen_at": now_iso(seen_offset - random.randint(1, 15)),
                    "last_seen_at": seen_at,
                },
                on_conflict="brand_id,meta_ad_id",
            ).execute()
            
            ad_row = supabase.table("ads").select("id").eq("meta_ad_id", meta_ad_id).single().execute()
            ad_id = ad_row.data["id"]
            
            # 2. Insert Creative
            tpl = random.choice(AD_TEMPLATES)
            fmt = random.choice(FORMATS)
            supabase.table("ad_creatives").insert(
                {
                    "ad_id": ad_id,
                    "format_normalized": fmt,
                    "primary_text": tpl["primary_text"],
                    "headline": tpl["headline"],
                    "description": "Premium D2C product offering.",
                    "cta": tpl["cta"],
                    "landing_page_url": f"https://example.com/shop/{brand.replace(' ', '').lower()}",
                    "image_url": "https://placehold.co/600x400/png" if fmt != "video" else None,
                    "video_url": "https://example.com/sample.mp4" if fmt == "video" else None,
                }
            ).execute()
            
            # We don't insert Analysis here so analyser.py can actually do its job
            
    print("[COMPLETE] Seeded DB. Now running pipeline!\n")

if __name__ == "__main__":
    run_seed()
