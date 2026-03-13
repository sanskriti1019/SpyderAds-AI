/**
 * Mock data store – provides realistic structured data for all dashboard sections
 * when Supabase tables are empty. Falls through to real Supabase data when present.
 */

import { PrimaryBrand } from "@/lib/brand-context";

// ── Types ───────────────────────────────────────────────────────────────────
export interface MockBrief {
  id: number;
  week_start: string;
  week_end: string;
  primary_brand_name: string;
  summary_md: string;
  insights_json: { competitor: string; trend: string; strategic_implication: string }[];
}

export interface MockTrendPoint {
  date: string;
  testimonial: number;
  video: number;
  carousel: number;
  image: number;
}

export interface MockInsight {
  competitor: string;
  trend: string;
  evidence: Record<string, unknown>;
  strategic_implication: string;
}

export interface MockLongevityRow {
  creativeTitle: string;
  brand: string;
  format: string;
  theme: string;
  daysRunning: number;
  estimatedImpressions: string;
  status: "Active" | "Paused" | "Ended";
  startDate: string;
}

export interface MockStat {
  activeCompetitors: number;
  activeAds: number;
  newCreatives30d: number;
}

// ── Weekly Briefs (per brand) ────────────────────────────────────────────────
const BRIEFS: Record<PrimaryBrand, MockBrief> = {
  "BeBodywise": {
    id: 1,
    week_start: "2026-03-07",
    week_end: "2026-03-13",
    primary_brand_name: "BeBodywise",
    summary_md: `Competitor activity in the women's wellness category has intensified this week. Mamaearth ran a high-emotion brand film focused on postpartum skin recovery, generating strong engagement among 25–35 women. Minimalist launched a 10% Niacinamide + AHA bundle carousel specifically targeting oily-skin concerns — a clear move into BeBodywise's core territory. The Derma Co scaled their "Skin Score" lead magnet with a new personalised routine landing page. BeBodywise should prioritise counter-positioning on hormonal wellness differentiation and consider a problem-specific video series addressing root-cause skin issues that competitors are not addressing.`,
    insights_json: [
      {
        competitor: "Mamaearth",
        trend: "Scaling emotional brand films targeting postpartum recovery",
        strategic_implication: "BeBodywise can counter with clinical-hormone-backed postpartum skin content, a vertical Mamaearth doesn't own.",
      },
      {
        competitor: "Minimalist",
        trend: "Launched Niacinamide + AHA bundle carousel targeting oily skin",
        strategic_implication: "Direct overlap with BeBodywise's core SKU territory. Respond with comparison and superiority content.",
      },
      {
        competitor: "The Derma Co",
        trend: "Aggressive Skin Score lead magnet funnel expansion",
        strategic_implication: "BeBodywise should develop a 'Hormonal Skin Health Quiz' to compete for top-funnel diagnostic leads.",
      },
      {
        competitor: "Mamaearth",
        trend: "Celebrity-led SPF campaign investing heavily in summer prep",
        strategic_implication: "Gap opportunity: BeBodywise's SPF content is under-invested. Launch summer skin prep editorial series.",
      },
    ],
  },
  "Man Matters": {
    id: 2,
    week_start: "2026-03-07",
    week_end: "2026-03-13",
    primary_brand_name: "Man Matters",
    summary_md: `The men's health category saw increased competition this week across multiple verticals. Traya significantly scaled their doctor video testimonial formats — now running 24 unique ad variants across Meta, clearly targeting Man Matters' core hair loss audience. Bold Care launched a Ranveer Singh endorsement campaign with a flash-sale mechanic, capturing budget-conscious performance supplement buyers. Beardo released a premium beard oil lifestyle campaign targeting style-conscious urban men. Man Matters should double down on personalised protocol differentiation and expand the on-platform doctor consultation experience as a key conversion differentiator that competitors cannot easily replicate.`,
    insights_json: [
      {
        competitor: "Traya",
        trend: "Scaled to 24 unique doctor video ad variants targeting hair loss awareness",
        strategic_implication: "Man Matters must invest in counter-credibility content — consider a 'Doctor vs. Doctor' format to maintain clinical authority.",
      },
      {
        competitor: "Bold Care",
        trend: "Flash sale + celebrity (Ranveer) campaign for performance supplements",
        strategic_implication: "Price-conscious segment is being captured. Man Matters subscription framing needs a trial-entry offer.",
      },
      {
        competitor: "Beardo",
        trend: "New premium grooming lifestyle campaign (urban, aspirational)",
        strategic_implication: "Lifestyle positioning gap for Man Matters. Add aspirational lifestyle creative layer alongside clinical content.",
      },
      {
        competitor: "Ustraa",
        trend: "Holi festival campaign with humor-led beard care promotions",
        strategic_implication: "Man Matters has zero seasonal/cultural content. Festival moments are a reachable audience spike.",
      },
    ],
  },
  "Little Joys": {
    id: 3,
    week_start: "2026-03-07",
    week_end: "2026-03-13",
    primary_brand_name: "Little Joys",
    summary_md: `The kids' and family wellness space saw significant competitor moves this week. Mamaearth launched their Onco-safe baby range with a heavy celebrity-led brand awareness push. Minimalist expanded into a children's mineral SPF product with educational carousel content explaining child-safe ingredients. Bold Care tested a kids' vitamin gummies ad set targeting millennial parents on Instagram. Little Joys is significantly under-invested in paid media vs. all three competitors. Immediate priorities: launch a parent-emotion video creative (problem-solution format), invest in pediatrician-led educational content, and establish presence in kids' nutrition searches on Google.`,
    insights_json: [
      {
        competitor: "Mamaearth",
        trend: "Onco-safe baby range launch with Bollywood celeb endorsement push",
        strategic_implication: "Safety-led positioning is Mamaearth's new bet. Little Joys must establish its own clean-label proof points urgently.",
      },
      {
        competitor: "Minimalist",
        trend: "Entering kids' SPF with educational ingredient carousel",
        strategic_implication: "Category expansion threat. Little Joys should claim 'kids' nutrition specialist' before Minimalist enters nutrition.",
      },
      {
        competitor: "Bold Care",
        trend: "Testing kids' vitamin gummies Instagram ads targeting millennial parents",
        strategic_implication: "Direct competitive test into Little Joys' core. Counter with pediatrician-validated content and parent testimonials.",
      },
      {
        competitor: "Mamaearth",
        trend: "Mom community WhatsApp re-engagement campaign (50K+ members)",
        strategic_implication: "Community gap for Little Joys. Building a parent community is both a retention and acquisition lever to invest in.",
      },
    ],
  },
};

// ── Trend Data (per brand) ───────────────────────────────────────────────────
const TRENDS: Record<PrimaryBrand, MockTrendPoint[]> = {
  "BeBodywise": [
    { date: "Jan W1", testimonial: 18, video: 22, carousel: 12, image: 8 },
    { date: "Jan W2", testimonial: 22, video: 28, carousel: 15, image: 10 },
    { date: "Jan W3", testimonial: 26, video: 32, carousel: 18, image: 12 },
    { date: "Jan W4", testimonial: 30, video: 38, carousel: 20, image: 14 },
    { date: "Feb W1", testimonial: 28, video: 42, carousel: 22, image: 16 },
    { date: "Feb W2", testimonial: 32, video: 48, carousel: 25, image: 18 },
    { date: "Feb W3", testimonial: 38, video: 55, carousel: 28, image: 20 },
    { date: "Feb W4", testimonial: 42, video: 60, carousel: 30, image: 22 },
    { date: "Mar W1", testimonial: 45, video: 65, carousel: 32, image: 24 },
    { date: "Mar W2", testimonial: 48, video: 70, carousel: 35, image: 26 },
  ],
  "Man Matters": [
    { date: "Jan W1", testimonial: 25, video: 35, carousel: 10, image: 6 },
    { date: "Jan W2", testimonial: 28, video: 40, carousel: 12, image: 8 },
    { date: "Jan W3", testimonial: 32, video: 45, carousel: 14, image: 10 },
    { date: "Jan W4", testimonial: 36, video: 52, carousel: 16, image: 12 },
    { date: "Feb W1", testimonial: 34, video: 58, carousel: 18, image: 14 },
    { date: "Feb W2", testimonial: 38, video: 64, carousel: 20, image: 15 },
    { date: "Feb W3", testimonial: 42, video: 70, carousel: 22, image: 16 },
    { date: "Feb W4", testimonial: 46, video: 76, carousel: 24, image: 18 },
    { date: "Mar W1", testimonial: 50, video: 82, carousel: 26, image: 20 },
    { date: "Mar W2", testimonial: 54, video: 88, carousel: 28, image: 22 },
  ],
  "Little Joys": [
    { date: "Jan W1", testimonial: 10, video: 15, carousel: 8, image: 5 },
    { date: "Jan W2", testimonial: 12, video: 18, carousel: 10, image: 6 },
    { date: "Jan W3", testimonial: 14, video: 22, carousel: 12, image: 8 },
    { date: "Jan W4", testimonial: 16, video: 25, carousel: 14, image: 9 },
    { date: "Feb W1", testimonial: 15, video: 28, carousel: 15, image: 10 },
    { date: "Feb W2", testimonial: 18, video: 32, carousel: 16, image: 11 },
    { date: "Feb W3", testimonial: 20, video: 36, carousel: 18, image: 12 },
    { date: "Feb W4", testimonial: 22, video: 40, carousel: 20, image: 14 },
    { date: "Mar W1", testimonial: 24, video: 44, carousel: 22, image: 15 },
    { date: "Mar W2", testimonial: 26, video: 48, carousel: 24, image: 16 },
  ],
};

// ── Insights / Gaps (per brand) ──────────────────────────────────────────────
const INSIGHTS: Record<PrimaryBrand, MockInsight[]> = {
  "BeBodywise": [
    {
      competitor: "Mamaearth",
      trend: "Gap: No brand is owning hormone-driven skin health content",
      evidence: { adCount: 0, keywordGap: "hormonal acne, PCOD skin" },
      strategic_implication: "BeBodywise can exclusively own hormonal skin health as a content territory — no competitor addresses this specifically.",
    },
    {
      competitor: "Minimalist",
      trend: "Gap: Ingredient-education for body care is underserved",
      evidence: { adCount: 2, category: "body care education" },
      strategic_implication: "Minimalist educates on face actives but not body. BeBodywise can lead ingredient transparency for body wellness.",
    },
    {
      competitor: "The Derma Co",
      trend: "Investment signal: Free consultation funnels are capturing top-of-funnel leads",
      evidence: { adCount: 38, cta: "Free Consultation" },
      strategic_implication: "BeBodywise should launch a 'Skin + Wellness Assessment' tool to generate leads at similar cost efficiency.",
    },
    {
      competitor: "Mamaearth",
      trend: "Gap: Postpartum wellness content is absent across all competitors",
      evidence: { searchVolume: "high", competitorAds: 0 },
      strategic_implication: "Launch postpartum skin and wellness content vertical — no competitor occupies this territory.",
    },
    {
      competitor: "Minimalist",
      trend: "Investment signal: Educational carousel format driving highest engagement rate",
      evidence: { engagementRate: "4.2%", format: "Carousel" },
      strategic_implication: "BeBodywise should shift 30% of creative budget toward educational carousel formats to compete on engagement.",
    },
  ],
  "Man Matters": [
    {
      competitor: "Traya",
      trend: "Gap: No brand addressing mental wellness + performance link for men",
      evidence: { adCount: 0, territory: "mental/physical performance" },
      strategic_implication: "Man Matters can uniquely position around holistic men's performance (mental + physical) — a white space.",
    },
    {
      competitor: "Bold Care",
      trend: "Investment signal: Celebrity + offer combination is driving high CTR",
      evidence: { adCount: 45, ctr: "3.8%", format: "Video + Offer" },
      strategic_implication: "Man Matters lacks a celebrity voice. Micro-celebrity doctor partnership could bridge credibility + aspiration.",
    },
    {
      competitor: "Traya",
      trend: "Gap: Hair loss treatment for men under 28 is unaddressed",
      evidence: { ageGap: "18-27", competitorFocus: "28+" },
      strategic_implication: "Man Matters should launch a 'young hair loss' content and product vertical targeting men 18–27.",
    },
    {
      competitor: "Beardo",
      trend: "Gap: Men's skincare as identity expression is underserved by health brands",
      evidence: { category: "men's skincare + identity" },
      strategic_implication: "Man Matters should expand skincare narrative beyond clinical to identity — 'skin that performs like you do'.",
    },
    {
      competitor: "Ustraa",
      trend: "Gap: Festival/seasonal campaigns for men's health are absent",
      evidence: { competitorFestivalAds: 12, manMattersAds: 0 },
      strategic_implication: "Man Matters has zero festival-moment content. Father's Day, New Year, and Diwali are quick-win campaigns.",
    },
  ],
  "Little Joys": [
    {
      competitor: "Mamaearth",
      trend: "Gap: Evidence-based kids' nutrition content is entirely absent",
      evidence: { pediatricianEndorsedAds: 0, category: "kids nutrition science" },
      strategic_implication: "Little Joys can own 'pediatrician-validated nutrition' as a content territory — no brand does this.",
    },
    {
      competitor: "Bold Care",
      trend: "Investment signal: Kids' supplement gummies format is being tested",
      evidence: { testAds: 8, platform: "Instagram" },
      strategic_implication: "Bold Care is entering Little Joys' territory. Fortify brand moat with clinical endorsements and parent reviews immediately.",
    },
    {
      competitor: "Mamaearth",
      trend: "Gap: No brand addresses picky-eater nutrition solutions",
      evidence: { searchVolume: "high", competitorAds: 0 },
      strategic_implication: "Launch 'Nutrition for Picky Eaters' content and product vertical — extremely high parent search volume, zero competitor presence.",
    },
    {
      competitor: "Minimalist",
      trend: "Gap: Natural, clean-label kids' supplements underrepresented in ads",
      evidence: { category: "clean label kids", competitorAds: 1 },
      strategic_implication: "Little Joys' clean-label positioning is a key differentiator to amplify heavily in creative messaging.",
    },
    {
      competitor: "Mamaearth",
      trend: "Investment signal: Parent community content is driving very high organic reach",
      evidence: { communitySize: "50K+", reach: "high" },
      strategic_implication: "Little Joys should invest in building a parent WhatsApp/Instagram community as both retention and acquisition engine.",
    },
  ],
};

// ── Longevity Data (per brand) ───────────────────────────────────────────────
const LONGEVITY: Record<PrimaryBrand, MockLongevityRow[]> = {
  "BeBodywise": [
    { creativeTitle: "\"Hormonal Skin Explained\" — Educational Carousel", brand: "Minimalist", format: "Carousel", theme: "Educational", daysRunning: 68, estimatedImpressions: "2.4M", status: "Active", startDate: "2026-01-05" },
    { creativeTitle: "\"Real Skin. Real Results.\" — Before/After Video", brand: "The Derma Co", format: "Video", theme: "Transformation", daysRunning: 54, estimatedImpressions: "1.8M", status: "Active", startDate: "2026-01-19" },
    { creativeTitle: "\"Shilpa Uses Vitamin C\" — Celebrity Image", brand: "Mamaearth", format: "Image", theme: "Celebrity Endorsement", daysRunning: 45, estimatedImpressions: "3.1M", status: "Active", startDate: "2026-01-28" },
    { creativeTitle: "\"Free Skin Score Test\" — Lead Gen Ad", brand: "The Derma Co", format: "Image", theme: "Lead Magnet", daysRunning: 38, estimatedImpressions: "980K", status: "Active", startDate: "2026-02-04" },
    { creativeTitle: "\"No Nasties Skin Routine\" — Carousel", brand: "Mamaearth", format: "Carousel", theme: "Natural/Clean", daysRunning: 32, estimatedImpressions: "750K", status: "Active", startDate: "2026-02-10" },
    { creativeTitle: "\"10% Niacinamide. Just ₹599.\" — Image", brand: "Minimalist", format: "Image", theme: "Ingredient-led", daysRunning: 29, estimatedImpressions: "1.2M", status: "Paused", startDate: "2026-02-13" },
    { creativeTitle: "\"AHA Peel Professional Grade\" — Video", brand: "The Derma Co", format: "Video", theme: "Product Demo", daysRunning: 22, estimatedImpressions: "560K", status: "Active", startDate: "2026-02-20" },
    { creativeTitle: "\"Your Skin. Your Routine.\" — Video", brand: "Mamaearth", format: "Video", theme: "Personalisation", daysRunning: 18, estimatedImpressions: "890K", status: "Active", startDate: "2026-02-24" },
  ],
  "Man Matters": [
    { creativeTitle: "\"Doctor Explains Hair Loss\" — Video", brand: "Traya", format: "Video", theme: "Clinical Authority", daysRunning: 72, estimatedImpressions: "3.2M", status: "Active", startDate: "2026-01-01" },
    { creativeTitle: "\"Take the Free Hair Test\" — Image", brand: "Traya", format: "Image", theme: "Lead Magnet", daysRunning: 60, estimatedImpressions: "1.9M", status: "Active", startDate: "2026-01-13" },
    { creativeTitle: "\"Ranveer x Bold Care\" — Celebrity Video", brand: "Bold Care", format: "Video", theme: "Celebrity Endorsement", daysRunning: 48, estimatedImpressions: "5.1M", status: "Active", startDate: "2026-01-25" },
    { creativeTitle: "\"Rohan Got His Hair Back\" — UGC Video", brand: "Traya", format: "UGC Video", theme: "Testimonial", daysRunning: 41, estimatedImpressions: "1.4M", status: "Active", startDate: "2026-02-01" },
    { creativeTitle: "\"Buy 2 Get 1 Free\" — Flash Sale", brand: "Bold Care", format: "Image", theme: "Offer-driven", daysRunning: 35, estimatedImpressions: "2.2M", status: "Active", startDate: "2026-02-07" },
    { creativeTitle: "\"Your Beard. Your Identity.\" — Lifestyle", brand: "Beardo", format: "Image", theme: "Aspiration", daysRunning: 28, estimatedImpressions: "820K", status: "Paused", startDate: "2026-02-14" },
    { creativeTitle: "\"Real Beard Oil, Real Results\" — Carousel", brand: "Ustraa", format: "Carousel", theme: "Social Proof", daysRunning: 21, estimatedImpressions: "540K", status: "Active", startDate: "2026-02-21" },
    { creativeTitle: "\"50K Men Trust Bold Care\" — Review Carousel", brand: "Bold Care", format: "Carousel", theme: "Social Proof", daysRunning: 14, estimatedImpressions: "680K", status: "Active", startDate: "2026-02-28" },
  ],
  "Little Joys": [
    { creativeTitle: "\"Made Safe for Your Baby\" — Brand Film", brand: "Mamaearth", format: "Video", theme: "Safety/Emotional", daysRunning: 65, estimatedImpressions: "4.2M", status: "Active", startDate: "2026-01-08" },
    { creativeTitle: "\"Onco-Safe Baby Range\" — Launch Image", brand: "Mamaearth", format: "Image", theme: "Product Launch", daysRunning: 50, estimatedImpressions: "1.6M", status: "Active", startDate: "2026-01-23" },
    { creativeTitle: "\"2 Crore Moms Trust Mamaearth\" — Carousel", brand: "Mamaearth", format: "Carousel", theme: "Social Proof", daysRunning: 42, estimatedImpressions: "2.1M", status: "Active", startDate: "2026-01-31" },
    { creativeTitle: "\"Kids' SPF — Safe Ingredients\" — Carousel", brand: "Minimalist", format: "Carousel", theme: "Educational", daysRunning: 35, estimatedImpressions: "720K", status: "Active", startDate: "2026-02-07" },
    { creativeTitle: "\"Bold Care Kids Gummies Test\" — Image", brand: "Bold Care", format: "Image", theme: "Product Trial", daysRunning: 22, estimatedImpressions: "480K", status: "Active", startDate: "2026-02-20" },
    { creativeTitle: "\"Shilpa's Baby Secret\" — Celebrity Video", brand: "Mamaearth", format: "Video", theme: "Celebrity Endorsement", daysRunning: 18, estimatedImpressions: "3.4M", status: "Active", startDate: "2026-02-24" },
    { creativeTitle: "\"Plant a Tree, Care for Them\" — Brand Video", brand: "Mamaearth", format: "Video", theme: "CSR/Social Cause", daysRunning: 12, estimatedImpressions: "940K", status: "Active", startDate: "2026-03-01" },
  ],
};

// ── Stats (per brand) ────────────────────────────────────────────────────────
const STATS: Record<PrimaryBrand, MockStat> = {
  "BeBodywise": { activeCompetitors: 3, activeAds: 287, newCreatives30d: 64 },
  "Man Matters": { activeCompetitors: 5, activeAds: 412, newCreatives30d: 98 },
  "Little Joys": { activeCompetitors: 3, activeAds: 198, newCreatives30d: 42 },
};

// ── Accessors ────────────────────────────────────────────────────────────────
export function getMockBrief(brand: PrimaryBrand): MockBrief {
  return BRIEFS[brand];
}

export function getMockTrends(brand: PrimaryBrand): MockTrendPoint[] {
  return TRENDS[brand];
}

export function getMockInsights(brand: PrimaryBrand): MockInsight[] {
  return INSIGHTS[brand];
}

export function getMockLongevity(brand: PrimaryBrand): MockLongevityRow[] {
  return LONGEVITY[brand];
}

export function getMockStats(brand: PrimaryBrand): MockStat {
  return STATS[brand];
}

export function getMockGaps(brand: PrimaryBrand): MockInsight[] {
  return INSIGHTS[brand].filter(
    (i) =>
      i.trend.toLowerCase().includes("gap") ||
      i.trend.toLowerCase().includes("investment signal")
  );
}
