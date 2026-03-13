"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { SimpleMarkdown } from "@/components/ui/simple-markdown";

interface StrategyInsightsProps {
  brandName: string;
  competitors: string[];
}

// Realistic competitive strategy insight templates per brand
const STRATEGY_TEMPLATES: Record<string, {
  hook: string;
  insight: string;
  action: string;
  strength: "High" | "Medium" | "Watch";
}[]> = {
  "BeBodywise": [
    {
      hook: "Mamaearth: Heavy Testimonial Push",
      insight: "Mamaearth is running 40%+ more testimonial-format ads vs last quarter, targeting women 25–34.",
      action: "Counter with clinical-proof formats and ingredient transparency ads.",
      strength: "High",
    },
    {
      hook: "Minimalist: Educational Content Surge",
      insight: "Minimalist is doubling down on educational carousel ads explaining ingredient science.",
      action: "Launch a competing 'Body Ingredient Explained' content series.",
      strength: "High",
    },
    {
      hook: "The Derma Co: Problem-Solution Hooks",
      insight: "Strong before/after creative formats dominating their creatives this month.",
      action: "Invest in transformation story-driven video ads for BeBodywise hero SKUs.",
      strength: "Medium",
    },
  ],
  "Man Matters": [
    {
      hook: "Bold Care: Doctor-Backed Credibility",
      insight: "Bold Care is aggressively using verified medical experts in ads, driving trust metrics.",
      action: "Amplify Man Matters doctor consultations feature prominently in creatives.",
      strength: "High",
    },
    {
      hook: "Traya: Subscription Funnel Ads",
      insight: "Traya running subscription-first lead ads, capturing MoF customers at a lower CPL.",
      action: "Design dedicated retargeting funnel for Man Matters subscriptions.",
      strength: "High",
    },
    {
      hook: "Beardo: Lifestyle & Aspiration Tone",
      insight: "Beardo creatives shifted heavily toward aspirational lifestyle imagery this month.",
      action: "Test Man Matters lifestyle creative variants targeting urban men 28–40.",
      strength: "Medium",
    },
  ],
  "Little Joys": [
    {
      hook: "Mamaearth: Parent Emotion Appeals",
      insight: "Mamaearth running high-emotion parent-child bonding narrative ads at peak ROI.",
      action: "Develop Little Joys 'nurturing parent' creative series emphasizing natural ingredients.",
      strength: "High",
    },
    {
      hook: "Bold Care: Doctor Reco Formats",
      insight: "Bold Care leveraging pediatrician endorsements as a creative format for new categories.",
      action: "Partner with pediatrician influencers for Little Joys product validation ads.",
      strength: "Medium",
    },
    {
      hook: "Minimalist: Ingredient Transparency",
      insight: "No-nasties ingredient callouts driving strong CTRs for Minimalist's family range.",
      action: "Launch 'Pure Promise' campaign highlighting Little Joys clean-label ingredients.",
      strength: "Watch",
    },
  ],
};

const strengthColors: Record<string, string> = {
  High: "text-maroon bg-maroon/10 border-maroon/20",
  Medium: "text-soft-black bg-warm-grey/40 border-warm-grey",
  Watch: "text-soft-black/70 bg-beige border-beige",
};

export function CompetitorStrategyInsights({ brandName, competitors }: StrategyInsightsProps) {
  const insights = STRATEGY_TEMPLATES[brandName] ?? [];

  return (
    <Card className="flex flex-col p-6 border-border bg-card gap-4">
      <div>
        <h2 className="text-xl font-bold font-serif text-soft-black tracking-tight">
          Competitor Strategy Insights
        </h2>
        <p className="text-xs text-soft-black/60 font-medium mt-1">
          Tactical intelligence from competitor ad activity for {brandName}
        </p>
      </div>
      <div className="space-y-3">
        {insights.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-beige/20 px-4 py-4 space-y-2 transition-all hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold text-maroon tracking-wider">
                {item.hook}
              </p>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${strengthColors[item.strength]}`}
              >
                {item.strength}
              </span>
            </div>
            <div className="text-sm text-soft-black/80 font-medium leading-relaxed">
              <SimpleMarkdown content={item.insight} />
            </div>
            <div className="flex items-start gap-2 pt-1 border-t border-soft-black/5 mt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-maroon/70 mt-1 shrink-0">
                Action →
              </span>
              <div className="text-xs text-soft-black/70 leading-relaxed font-medium">
                <SimpleMarkdown content={item.action} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
