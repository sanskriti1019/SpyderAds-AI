"""
SpyderAds AI — Meta Ad Library Scraper
Scrapes ads for all competitor brands and upserts them into Supabase.

Usage:
    python scraper.py                   # scrape all brands
    python scraper.py --brand Mamaearth # scrape a single brand
"""

import argparse
import asyncio
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from playwright.async_api import async_playwright, TimeoutError as PWTimeout
from supabase import create_client

# ─── Config ───────────────────────────────────────────────────────────────────

load_dotenv(Path(__file__).parent.parent / ".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

META_AD_LIBRARY_URL = "https://www.facebook.com/ads/library/"

# Target brands: (display name, Meta search query)
BRANDS = [
    ("Bebodywise", "bebodywise"),
    ("Man Matters", "manmatters"),
    ("Little Joys", "littlejoysofficial"),
    ("Traya", "trayahealth"),
    ("Bold Care", "boldcareindia"),
    ("Minimalist", "minimalistofficial"),
    ("Mamaearth", "mamaearth"),
    ("The Derma Co", "thedermaco"),
    ("Ustraa", "ustraa"),
    ("Beardo", "beardo"),
]

AD_LIMIT_PER_BRAND = 50  # max ads to scrape per brand run


# ─── Helpers ──────────────────────────────────────────────────────────────────

def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def upsert_brand(name: str) -> int:
    """Get or create brand row, return its id."""
    res = supabase.table("brands").upsert(
        {"name": name, "is_primary": False},
        on_conflict="name",
    ).execute()
    row = supabase.table("brands").select("id").eq("name", name).single().execute()
    return row.data["id"]


def upsert_ad(brand_id: int, meta_ad_id: str, status: str, start_date, end_date) -> int:
    now = now_iso()
    supabase.table("ads").upsert(
        {
            "brand_id": brand_id,
            "meta_ad_id": meta_ad_id,
            "platform": "Meta",
            "status": status,
            "first_seen_at": now,
            "last_seen_at": now,
            "start_date": start_date,
            "end_date": end_date,
        },
        on_conflict="brand_id,meta_ad_id",
    ).execute()
    row = (
        supabase.table("ads")
        .select("id")
        .eq("brand_id", brand_id)
        .eq("meta_ad_id", meta_ad_id)
        .single()
        .execute()
    )
    return row.data["id"]


def upsert_creative(ad_id: int, creative: dict):
    supabase.table("ad_creatives").upsert(
        {
            "ad_id": ad_id,
            "format_normalized": creative.get("format", "unknown"),
            "primary_text": creative.get("body"),
            "headline": creative.get("title"),
            "description": creative.get("description"),
            "cta": creative.get("cta_text"),
            "landing_page_url": creative.get("link_url"),
            "image_url": creative.get("image_url"),
            "video_url": creative.get("video_url"),
            "thumbnail_url": creative.get("thumbnail_url"),
        },
        on_conflict="ad_id",
    ).execute()


# ─── Scraper ──────────────────────────────────────────────────────────────────

async def scrape_brand(brand_name: str, search_query: str):
    print(f"\n[SCRAPING] {brand_name} (query: {search_query})")
    brand_id = upsert_brand(brand_name)
    ads_scraped = 0

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        ctx = await browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/122.0.0.0 Safari/537.36"
            ),
            locale="en-US",
        )
        page = await ctx.new_page()

        url = (
            f"{META_AD_LIBRARY_URL}?active_status=all"
            f"&ad_type=all&country=IN"
            f"&q={search_query}&search_type=keyword_unordered"
        )
        try:
            await page.goto(url, wait_until="domcontentloaded", timeout=30000)
        except PWTimeout:
            print(f"  [WARN] Timeout loading page for {brand_name}")
            await browser.close()
            return

        # Wait for ad cards to render
        try:
            await page.wait_for_selector("[data-testid='ad-archive-renderer']", timeout=15000)
        except PWTimeout:
            print(f"  [WARN] No ad cards found for {brand_name}")
            await browser.close()
            return

        # Scroll to load more ads
        for _ in range(5):
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await asyncio.sleep(1.5)

        # Extract ad cards via JS evaluation
        raw_ads = await page.evaluate("""
        () => {
            const cards = Array.from(document.querySelectorAll('[data-testid="ad-archive-renderer"]'));
            return cards.map(card => {
                const getText = sel => card.querySelector(sel)?.innerText?.trim() ?? null;
                const getSrc = sel => card.querySelector(sel)?.src ?? null;
                const getHref = sel => card.querySelector(sel)?.href ?? null;

                // Ad ID from data attributes or URL patterns
                const adIdMatch = card.outerHTML.match(/\\/ads\\/archive\\/render\\/(\\d+)/);
                const adId = adIdMatch ? adIdMatch[1] : Math.random().toString(36).slice(2);

                // Format detection
                const hasVideo = !!card.querySelector('video');
                const hasCarousel = !!card.querySelector('[role="list"]');
                const hasImage = !!card.querySelector('img[src*="fbcdn"]');
                const format = hasVideo ? 'video' : hasCarousel ? 'carousel' : hasImage ? 'image' : 'unknown';

                return {
                    ad_id: adId,
                    body: getText('._4ik4._4ik5') ?? getText('[data-testid="ad-message"]'),
                    title: getText('._5ebm._5eba') ?? getText('[data-testid="ad-headline"]'),
                    description: getText('._5ebm._5eb8'),
                    cta_text: getText('[data-testid="cta-button"]'),
                    link_url: getHref('a[href*="l.facebook.com"]') ?? getHref('a'),
                    image_url: getSrc('img[src*="fbcdn"]'),
                    video_url: getSrc('video source') ?? getSrc('video'),
                    thumbnail_url: getSrc('img[src*="fbcdn"]'),
                    status: 'active',
                    format: format,
                };
            });
        }
        """)

        for ad in raw_ads[:AD_LIMIT_PER_BRAND]:
            try:
                meta_ad_id = str(ad.get("ad_id", ""))
                if not meta_ad_id:
                    continue

                status = ad.get("status", "unknown")
                ad_id = upsert_ad(brand_id, meta_ad_id, status, None, None)
                upsert_creative(ad_id, ad)
                ads_scraped += 1
            except Exception as e:
                print(f"  [WARN] Failed to save ad: {e}")

        await browser.close()

    print(f"  [DONE] Saved {ads_scraped} ads for {brand_name}")


async def main(target_brand: str | None):
    brands_to_scrape = [
        (name, query)
        for name, query in BRANDS
        if target_brand is None or name.lower() == target_brand.lower()
    ]

    if not brands_to_scrape:
        print(f"Brand '{target_brand}' not found in brand list.")
        sys.exit(1)

    for brand_name, search_query in brands_to_scrape:
        await scrape_brand(brand_name, search_query)

    print("\n[COMPLETE] Scraping done!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SpyderAds AI – Meta Ad Library Scraper")
    parser.add_argument("--brand", type=str, default=None, help="Scrape a single brand by name")
    args = parser.parse_args()
    asyncio.run(main(args.brand))
