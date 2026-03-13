// Static competitor brand intelligence data
export interface CompetitorBrand {
  slug: string;
  name: string;
  industry: string;
  tagline: string;
  initials: string;
  accentColor: string;         // CSS hex for logo background
  primaryBrands: string[];     // Which Mosaic brands this competes with
  adFocus: string;             // Primary ad strategy
  keyFormats: string[];
  keyThemes: string[];
  estimatedMonthlyAds: number;
  strengths: string[];
  weaknesses: string[];
  recentMoves: string[];
  marketPosition: string;
  targetAudience: string;
}

export const COMPETITORS: CompetitorBrand[] = [
  {
    slug: "traya",
    name: "Traya",
    industry: "Hair Care",
    tagline: "Root-cause hair loss treatment",
    initials: "TR",
    accentColor: "#4A7C59",
    primaryBrands: ["Man Matters"],
    adFocus: "Doctor-endorsed subscription funnels",
    keyFormats: ["Video", "Carousel"],
    keyThemes: ["problem-solution", "testimonial", "educational"],
    estimatedMonthlyAds: 80,
    strengths: ["Clinical credibility", "Subscription model", "High LTV"],
    weaknesses: ["High acquisition cost", "Narrow niche", "Long consideration window"],
    recentMoves: [
      "Scaled doctor video testimonials on Meta",
      "Launched free hair test lead gen funnel",
      "Partnership with dermatologists for content series",
    ],
    marketPosition: "Premium, science-first",
    targetAudience: "Men 28-45 experiencing hair loss",
  },
  {
    slug: "bold-care",
    name: "Bold Care",
    industry: "Men's Health",
    tagline: "Confidence through men's wellness",
    initials: "BC",
    accentColor: "#2C4A6E",
    primaryBrands: ["Man Matters", "Little Joys"],
    adFocus: "Aspirational lifestyle + performance hooks",
    keyFormats: ["Video", "Image"],
    keyThemes: ["emotional-branding", "before-after", "offer-driven"],
    estimatedMonthlyAds: 120,
    strengths: ["Strong brand identity", "Broad category coverage", "Young urban positioning"],
    weaknesses: ["Low clinical credibility", "High competition", "Commoditized messaging"],
    recentMoves: [
      "Celebrity ambassador campaign launch",
      "Flash sale countdown ad series",
      "Influencer micro-network expansion",
    ],
    marketPosition: "Aspirational, modern men",
    targetAudience: "Urban men 22-35",
  },
  {
    slug: "minimalist",
    name: "Minimalist",
    industry: "Skincare",
    tagline: "Straightforward, effective skincare",
    initials: "MN",
    accentColor: "#5C5C5C",
    primaryBrands: ["BeBodywise", "Little Joys"],
    adFocus: "Ingredient science and transparency",
    keyFormats: ["Carousel", "Image"],
    keyThemes: ["educational", "problem-solution"],
    estimatedMonthlyAds: 95,
    strengths: ["Ingredient credibility", "D2C direct trust", "Strong repeat purchase"],
    weaknesses: ["Cold brand tone", "Limited emotional appeal", "Narrow packaging story"],
    recentMoves: [
      "Launched 'Science Explained' carousel series",
      "Dermatologist partnership for credibility content",
      "Bundled skincare routine offer ads",
    ],
    marketPosition: "Clinical minimalism",
    targetAudience: "Skincare enthusiasts 20-35",
  },
  {
    slug: "mamaearth",
    name: "Mamaearth",
    industry: "Personal Care",
    tagline: "Natural, toxin-free personal care",
    initials: "ME",
    accentColor: "#7A9E4A",
    primaryBrands: ["BeBodywise", "Little Joys"],
    adFocus: "Natural ingredients + parent emotion appeals",
    keyFormats: ["Video", "Image", "Carousel"],
    keyThemes: ["emotional-branding", "testimonial", "problem-solution"],
    estimatedMonthlyAds: 200,
    strengths: ["Brand recognition", "Wide product range", "Emotional storytelling"],
    weaknesses: ["Greenwashing backlash risk", "Diluted differentiation", "High media spend"],
    recentMoves: [
      "Parent-child bonding brand film series",
      "Onco-safe product line launch",
      "Celebrity testimonial endorsement surge",
    ],
    marketPosition: "Mass market, natural lifestyle",
    targetAudience: "Parents and health-conscious families",
  },
  {
    slug: "the-derma-co",
    name: "The Derma Co",
    industry: "Skincare",
    tagline: "Dermatologist-backed skin solutions",
    initials: "DC",
    accentColor: "#7B5EA7",
    primaryBrands: ["BeBodywise"],
    adFocus: "Dermatologist authority + before/after transformations",
    keyFormats: ["Video", "Image"],
    keyThemes: ["before-after", "testimonial", "problem-solution"],
    estimatedMonthlyAds: 110,
    strengths: ["Clinical authority", "Strong before/after visuals", "Trust-led positioning"],
    weaknesses: ["Premium price resistance", "Complex onboarding", "Niche audience ceiling"],
    recentMoves: [
      "Launched 'Skin Score' diagnostic tool funnel",
      "Expanded before/after video testimonial series",
      "Free consultation CTA in ad creatives",
    ],
    marketPosition: "Clinical premium skincare",
    targetAudience: "Skin-concern-aware women 22-38",
  },
  {
    slug: "ustraa",
    name: "Ustraa",
    industry: "Men Grooming",
    tagline: "Grooming for the real man",
    initials: "US",
    accentColor: "#B04A2C",
    primaryBrands: ["Man Matters"],
    adFocus: "Humor-led lifestyle and masculinity branding",
    keyFormats: ["Video", "Image"],
    keyThemes: ["emotional-branding", "offer-driven"],
    estimatedMonthlyAds: 60,
    strengths: ["Distinctive brand voice", "Strong recall", "Loyal community"],
    weaknesses: ["Limited premium positioning", "Niche grooming focus", "Smaller digital presence"],
    recentMoves: [
      "Comedy-driven short-form video ads",
      "Festival sale campaigns",
      "Product bundle promotions",
    ],
    marketPosition: "Fun, irreverent grooming",
    targetAudience: "Men 24-40 who value authenticity",
  },
  {
    slug: "beardo",
    name: "Beardo",
    industry: "Men Grooming",
    tagline: "For the stylish, modern man",
    initials: "BD",
    accentColor: "#2C3E50",
    primaryBrands: ["Man Matters"],
    adFocus: "Aspirational lifestyle imagery and identity branding",
    keyFormats: ["Image", "Video"],
    keyThemes: ["emotional-branding", "testimonial"],
    estimatedMonthlyAds: 70,
    strengths: ["Visual brand identity", "Strong urban appeal", "Premium perception"],
    weaknesses: ["Limited health positioning", "Higher CAC", "Saturated grooming market"],
    recentMoves: [
      "Lifestyle photo campaign with urban male influencers",
      "Premium beard kit gifting ads",
      "Celebrity brand ambassador content",
    ],
    marketPosition: "Aspirational men's grooming",
    targetAudience: "Style-conscious urban men 22-38",
  },
];

export function getCompetitorBySlug(slug: string): CompetitorBrand | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
