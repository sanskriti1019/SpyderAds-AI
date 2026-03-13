"""
SpyderAds AI — AI Analyser
Reads ads without analysis from Supabase, calls OpenAI to classify them,
and writes results back to `ad_analysis`.

Usage:
    python analyser.py
    python analyser.py --brand Mamaearth
"""

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI
from supabase import create_client

load_dotenv(Path(__file__).parent.parent / ".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
OPENAI_KEY = os.environ.get("OPENAI_API_KEY", "")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
client = OpenAI(api_key=OPENAI_KEY) if OPENAI_KEY else None

VALID_FORMATS = ["image", "video", "carousel", "story", "unknown"]
VALID_THEMES = [
    "problem-solution", "testimonial", "before-after",
    "educational", "offer-driven", "emotional-branding", "uncertain"
]

SYSTEM_PROMPT = """You are an expert D2C marketing analyst. Given ad copy and metadata, classify the ad into:
- format_label: one of [image, video, carousel, story, unknown]
- theme_label: one of [problem-solution, testimonial, before-after, educational, offer-driven, emotional-branding, uncertain]
- sentiment: one of [positive, neutral, negative]
- angle: a short 5-10 word description of the creative angle

Respond ONLY with valid JSON, no explanation, no markdown."""


def classify_ad_rule_based(body: str, format_raw: str) -> dict:
    """Fallback classifier when OpenAI not set."""
    body_lower = (body or "").lower()
    if any(w in body_lower for w in ["before", "after", "transform"]):
        theme = "before-after"
    elif any(w in body_lower for w in ["problem", "solution", "pain", "fix", "struggle"]):
        theme = "problem-solution"
    elif any(w in body_lower for w in ["review", "customer", "testimony", "i used", "changed my"]):
        theme = "testimonial"
    elif any(w in body_lower for w in ["offer", "discount", "% off", "sale", "deal", "buy"]):
        theme = "offer-driven"
    elif any(w in body_lower for w in ["tips", "how to", "learn", "guide", "know"]):
        theme = "educational"
    elif any(w in body_lower for w in ["proud", "love", "feel", "bright", "beautiful", "confident"]):
        theme = "emotional-branding"
    else:
        theme = "uncertain"

    fmt = format_raw if format_raw in VALID_FORMATS else "unknown"
    return {
        "format_label": fmt,
        "theme_label": theme,
        "sentiment": "positive",
        "angle": "Direct response ad",
    }


def classify_ad_gpt(body: str, title: str, format_raw: str) -> dict:
    prompt = f"""
Ad body: {body or '(no copy)'}
Ad title: {title or '(no title)'}
Detected format: {format_raw or 'unknown'}
"""
    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            temperature=0.2,
            max_tokens=200,
            response_format={"type": "json_object"},
        )
        data = json.loads(resp.choices[0].message.content)
        # Sanitise
        data["format_label"] = data.get("format_label") if data.get("format_label") in VALID_FORMATS else "unknown"
        data["theme_label"] = data.get("theme_label") if data.get("theme_label") in VALID_THEMES else "uncertain"
        return data
    except Exception as e:
        print(f"      GPT error: {e}")
        return classify_ad_rule_based(body, format_raw)


def analyse_all(target_brand: str | None):
    # Fetch ads that don't have a latest analysis yet
    query = (
        supabase.table("ads")
        .select("id, brand_id, ad_creatives(primary_text, headline, format_normalized), brands(name)")
        .limit(200)
    )
    if target_brand:
        res = supabase.table("brands").select("id").eq("name", target_brand).single().execute()
        if res.data:
            query = query.eq("brand_id", res.data["id"])

    ads = query.execute().data or []

    # Get already-analysed ad IDs
    analysed_ids = {
        r["ad_id"]
        for r in (supabase.table("ad_analysis").select("ad_id").eq("is_latest", True).execute().data or [])
    }

    to_analyse = [a for a in ads if a["id"] not in analysed_ids]
    print(f"📊  {len(to_analyse)} ads need analysis (out of {len(ads)} total)")

    for ad in to_analyse:
        creative = (ad.get("ad_creatives") or [{}])[0]
        body = creative.get("primary_text") or ""
        title = creative.get("headline") or ""
        fmt = creative.get("format_normalized") or "unknown"

        if client and OPENAI_KEY:
            result = classify_ad_gpt(body, title, fmt)
        else:
            result = classify_ad_rule_based(body, fmt)

        supabase.table("ad_analysis").insert(
            {
                "ad_id": ad["id"],
                "format_label": result["format_label"],
                "theme_label": result["theme_label"],
                "sentiment": result.get("sentiment", "positive"),
                "angle": result.get("angle", ""),
                "is_latest": True,
                "analyzed_at": datetime.now(timezone.utc).isoformat(),
            }
        ).execute()
        brand_name = (ad.get("brands") or {}).get("name", "?")
        print(f"  ✅  {brand_name} | {result['theme_label']} | {result['format_label']}")

    print("\n🎉  Analysis complete!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SpyderAds AI – Ad Analyser")
    parser.add_argument("--brand", type=str, default=None)
    args = parser.parse_args()
    analyse_all(args.brand)
