"""
SpyderAds AI — Trend Reporter
Aggregates scraped + analysed ads into weekly trend_reports rows.

Usage:
    python trend_reporter.py
"""

import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client

load_dotenv(Path(__file__).parent.parent / ".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def week_boundaries(weeks_back: int = 4):
    """Return last N week (monday, sunday) pairs."""
    today = datetime.now(timezone.utc).date()
    monday = today - timedelta(days=today.weekday())
    for i in range(weeks_back):
        start = monday - timedelta(weeks=i)
        end = start + timedelta(days=6)
        yield start, end


def build_format_trends():
    """Aggregate format distribution per brand per week."""
    brands = supabase.table("brands").select("id, name").execute().data or []

    for brand in brands:
        brand_id = brand["id"]
        for start, end in week_boundaries():
            # ads in this window
            ads = (
                supabase.table("ads")
                .select("id")
                .eq("brand_id", brand_id)
                .gte("first_seen_at", start.isoformat())
                .lte("first_seen_at", end.isoformat())
                .execute()
                .data or []
            )
            if not ads:
                continue

            ad_ids = [a["id"] for a in ads]

            # analysis labels
            analysis = (
                supabase.table("ad_analysis")
                .select("format_label, theme_label")
                .in_("ad_id", ad_ids)
                .eq("is_latest", True)
                .execute()
                .data or []
            )

            total = len(analysis) or 1

            from collections import Counter
            formats = Counter(a["format_label"] for a in analysis)
            themes = Counter(a["theme_label"] for a in analysis)

            rows = []
            for label, count in formats.items():
                rows.append({
                    "brand_id": brand_id,
                    "period_start": start.isoformat(),
                    "period_end": end.isoformat(),
                    "granularity": "week",
                    "metric_type": "format_share",
                    "label_type": "format",
                    "label_value": label or "unknown",
                    "value": round(count / total * 100, 2),
                })
            for label, count in themes.items():
                rows.append({
                    "brand_id": brand_id,
                    "period_start": start.isoformat(),
                    "period_end": end.isoformat(),
                    "granularity": "week",
                    "metric_type": "theme_share",
                    "label_type": "theme",
                    "label_value": label or "uncertain",
                    "value": round(count / total * 100, 2),
                })
            rows.append({
                "brand_id": brand_id,
                "period_start": start.isoformat(),
                "period_end": end.isoformat(),
                "granularity": "week",
                "metric_type": "ad_volume",
                "label_type": "count",
                "label_value": "total",
                "value": len(ads),
            })

            if rows:
                supabase.table("trend_reports").upsert(rows).execute()

        print(f"  ✅  Trends built for {brand['name']}")


if __name__ == "__main__":
    print("📈  Building trend reports …")
    build_format_trends()
    print("\n🎉  Trend reports complete!")
