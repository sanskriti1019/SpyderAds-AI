"""
SpyderAds AI — Weekly Brief Generator
Uses OpenAI (or rule-based fallback) to generate a markdown brief
summarising the week's competitor ad activity.

Usage:
    python weekly_brief.py
"""

import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client

load_dotenv(Path(__file__).parent.parent / ".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
OPENAI_KEY = os.environ.get("OPENAI_API_KEY", "")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def get_week_range():
    today = datetime.now(timezone.utc).date()
    monday = today - timedelta(days=today.weekday())
    sunday = monday + timedelta(days=6)
    return monday, sunday


def build_context_for_brand(brand_id: int, week_start, week_end) -> str:
    trends = (
        supabase.table("trend_reports")
        .select("metric_type, label_value, value")
        .eq("brand_id", brand_id)
        .gte("period_start", week_start.isoformat())
        .lte("period_end", week_end.isoformat())
        .execute()
        .data or []
    )
    lines = [f"  {t['metric_type']} | {t['label_value']} = {t['value']}" for t in trends]
    return "\n".join(lines) if lines else "No trend data this week."


def generate_brief_rule_based(brand_name: str, context: str) -> tuple[str, list[dict]]:
    summary = (
        f"## {brand_name} – Weekly AI Brief\n\n"
        f"This week's analysis for **{brand_name}** shows active advertising across formats.\n\n"
        f"**Trend data:**\n```\n{context}\n```\n"
    )
    insights = [
        {"competitor": brand_name, "trend": "Active video creative strategy", "strategic_implication": "Consider testing video formats"},
        {"competitor": brand_name, "trend": "Problem-solution messaging dominant", "strategic_implication": "Lead with pain points in copy"},
    ]
    return summary, insights


def generate_brief_gpt(brand_name: str, context: str) -> tuple[str, list[dict]]:
    from openai import OpenAI
    client = OpenAI(api_key=OPENAI_KEY)
    prompt = f"""
You are a D2C marketing strategist. Here is ad performance data for {brand_name} this week:

{context}

Generate:
1. A 3-5 sentence markdown summary of their ad strategy
2. A JSON array of 3 insights objects each with: competitor, trend, strategic_implication

Respond as JSON:
{{"summary_md": "...", "insights_json": [...]}}
"""
    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4,
            max_tokens=600,
            response_format={"type": "json_object"},
        )
        data = json.loads(resp.choices[0].message.content)
        return data.get("summary_md", ""), data.get("insights_json", [])
    except Exception as e:
        print(f"  GPT error: {e}")
        return generate_brief_rule_based(brand_name, context)


def generate_all_briefs():
    week_start, week_end = get_week_range()
    brands = supabase.table("brands").select("id, name, is_primary").execute().data or []

    primary = next((b for b in brands if b.get("is_primary")), None)
    competitors = [b for b in brands if not b.get("is_primary")]

    for comp in competitors:
        context = build_context_for_brand(comp["id"], week_start, week_end)
        print(f"  📝  Generating brief for {comp['name']} …")

        if OPENAI_KEY:
            summary, insights = generate_brief_gpt(comp["name"], context)
        else:
            summary, insights = generate_brief_rule_based(comp["name"], context)

        row = {
            "primary_brand_id": primary["id"] if primary else comp["id"],
            "competitor_brand_id": comp["id"],
            "week_start": week_start.isoformat(),
            "week_end": week_end.isoformat(),
            "summary_md": summary,
            "insights_json": insights,
        }
        supabase.table("weekly_briefs").upsert(
            row,
            on_conflict="primary_brand_id,competitor_brand_id,week_start",
        ).execute()
        print(f"  ✅  Brief saved for {comp['name']}")

    print("\n🎉  Weekly briefs complete!")


if __name__ == "__main__":
    generate_all_briefs()
