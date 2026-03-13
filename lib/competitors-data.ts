// Static competitor brand intelligence data — full profile
export interface AdExample {
  headline: string;
  body: string;
  format: string;
  cta: string;
  theme: string;
}

export interface CompetitorBrand {
  slug: string;
  name: string;
  industry: string;
  tagline: string;
  initials: string;
  accentColor: string;
  primaryBrands: string[];
  website: string;
  productLinks: { label: string; url: string }[];
  targetAudience: string;
  marketPosition: string;
  estimatedMonthlyAds: number;
  strengths: string[];
  weaknesses: string[];
  recentMoves: string[];

  // Ad Strategy
  adStrategyOverview: string;
  adFocus: string;
  keyFormats: string[];
  topChannels: string[];
  adSpendLevel: "Low" | "Medium" | "High" | "Very High";
  adStrategyPoints: string[];

  // Creative Strategy
  creativeStrategyOverview: string;
  keyThemes: string[];
  creativeFormula: string;
  visualStyle: string;
  creativeStrategyPoints: string[];

  // Product Focus
  productFocusOverview: string;
  heroProducts: string[];
  productFocusPoints: string[];

  // Marketing Messaging
  messagingOverview: string;
  coreMessages: string[];
  ctaStyle: string;
  tonality: string;
  messagingPoints: string[];

  // Content Strategy
  contentStrategyOverview: string;
  contentPillars: string[];
  contentStrategyPoints: string[];

  // Top Running Ads (examples)
  topRunningAds: AdExample[];
}

export const COMPETITORS: CompetitorBrand[] = [
  {
    slug: "traya",
    name: "Traya",
    industry: "Hair Care",
    tagline: "India's #1 root-cause hair loss treatment",
    initials: "TR",
    accentColor: "#4A7C59",
    primaryBrands: ["Man Matters"],
    website: "https://traya.health",
    productLinks: [
      { label: "Hair Test", url: "https://traya.health/pages/free-hair-test" },
      { label: "Hair Growth Kit", url: "https://traya.health/collections/hair-growth-kit" },
      { label: "Subscription Plans", url: "https://traya.health/pages/plans" },
    ],
    targetAudience: "Men 28–45 experiencing active hair loss, typically urban, educated, income-aware",
    marketPosition: "Premium, science-first hair loss treatment positioned as a clinical alternative to traditional home remedies",
    estimatedMonthlyAds: 80,
    strengths: ["Clinical credibility with dermatologist endorsements", "Subscription model drives high LTV", "Free hair diagnosis tool as lead magnet"],
    weaknesses: ["Very high acquisition cost per subscriber", "Narrow target niche limits scale", "Long result timelines cause churn risk"],
    recentMoves: [
      "Scaled long-form doctor video testimonials across Meta and YouTube",
      "Launched free hair test lead gen funnel with re-targeting sequence",
      "Dermatologist partnership for credibility-led content series",
    ],

    adStrategyOverview: "Traya runs a tightly integrated full-funnel Meta strategy. The top of funnel uses problem-awareness video ads, the middle uses social proof and clinical testimonials, and the bottom uses urgency-driven subscription offer ads. Their free 'Hair Test' is the cornerstone CTA across all funnel stages.",
    adFocus: "Doctor-endorsed subscription funnels with a free diagnostic lead magnet",
    keyFormats: ["Long-form Video", "Carousel", "UGC Testimonial"],
    topChannels: ["Meta (Facebook + Instagram)", "YouTube"],
    adSpendLevel: "High",
    adStrategyPoints: [
      "Full-funnel Meta strategy with distinct creative for each funnel stage",
      "Free 'Hair Test' CTA appears in ~80% of all creatives as the primary hook",
      "Heavy retargeting: abandoned test completers receive urgency-sequence ads",
      "Doctor-to-camera formats dominate top-of-funnel placements",
      "Seasonal spend spikes during Diwali, New Year, and summer months",
    ],

    creativeStrategyOverview: "Traya's creatives rely on authority, empathy, and proof. Every ad opens with the pain point — relatable hair loss anxiety — then transitions to clinical authority (doctors, lab data), and ends with transformation proof (before/after, subscriber testimonials). The visual style is clinical-clean with deep green brand colors.",
    keyThemes: ["Problem-solution", "Clinical authority", "Testimonial", "Educational"],
    creativeFormula: "Pain (hair loss anxiety) → Authority (doctor voice) → Proof (before/after) → CTA (Free Hair Test)",
    visualStyle: "Clinical clean: white backgrounds, brand green accents, doctor-in-frame shots, before/after split screens",
    creativeStrategyPoints: [
      "Long-form (60–90s) video ads have significantly higher conversion than short static ads",
      "UGC-style testimonials from real subscribers run as social proof mid and bottom funnel",
      "Carousel format used for educational 'how Traya works' explainers",
      "Before/after imagery consistently drives the highest CTR across formats",
    ],

    productFocusOverview: "Traya's lead product is its personalised hair treatment kit, customised post the free hair test. They cross-sell internal supplements, scalp oils, and DHT blockers as part of a holistic protocol. Subscription retention is heavily tied to the protocols, not one-off products.",
    heroProducts: ["Personalised Hair Kit", "Scalp Controller Oil", "DHT Blocker", "Hair Vitamins"],
    productFocusPoints: [
      "Personalised protocol is the core differentiator — ads consistently emphasise custom treatment",
      "Cross-sell supplements are introduced after subscription initiation, not upfront",
      "Gifting angle (kit as a gift for partner) is being tested this quarter",
      "Bundle pricing communicated prominently: 'Save ₹X vs buying separately'",
    ],

    messagingOverview: "Traya's messaging centres around scientific legitimacy and personalisation. They reject the 'generic shampoo' narrative and position themselves as the smart man's alternative. Key emotional territory: fear of balding, desire to reclaim confidence, trust in science over folklore.",
    coreMessages: [
      "Find the root cause of your hair loss — not just symptoms",
      "Trusted by 2L+ men in India",
      "Dermatologist-approved protocols, personalised for you",
    ],
    ctaStyle: "Diagnostic/interactive: 'Take the Free Hair Test', 'Find the Root Cause', 'Start Your Hair Check'",
    tonality: "Empathetic, authoritative, clinical yet accessible",
    messagingPoints: [
      "Messaging avoids aggressive fear-mongering, instead focusing on empowerment",
      "Doctor quotes and clinical statistics used extensively as trust anchors",
      "Number-led social proof ('2 lakh+ men', '91% saw reduction') is consistent",
      "Subscription framing: 'Results in 5 months' sets expectations and reduces churn risk",
    ],

    contentStrategyOverview: "Traya's content strategy is educational-first. They own the 'hair science' content territory on Instagram and YouTube with dermatologist explainers, hair care myth-busting series, and real subscriber journey documentaries.",
    contentPillars: ["Hair Science Explainers", "Myth Busting", "Subscriber Journeys", "Doctor Q&A"],
    contentStrategyPoints: [
      "Long-form YouTube content targets hair loss awareness and SEO simultaneously",
      "Instagram Reels focus on bite-size hair tips to drive organic reach",
      "WhatsApp-based re-engagement content for post-purchase retention",
      "Email drip sequences educate subscribers on protocol adherence",
    ],

    topRunningAds: [
      {
        headline: "Why Is Your Hair Falling Out?",
        body: "9 out of 10 men don't know the root cause. Take the free 2-minute hair test and get a plan made by real doctors.",
        format: "Video (60s)",
        cta: "Take the Free Hair Test",
        theme: "Problem-solution",
      },
      {
        headline: "Rohan Got His Hair Back in 5 Months",
        body: "Rohan was losing 200+ strands a day. After Traya's personalised protocol, he saw visible results in just 5 months.",
        format: "UGC Video Testimonial",
        cta: "See His Journey",
        theme: "Testimonial",
      },
      {
        headline: "Why Generic Shampoos Don't Work",
        body: "Hair loss isn't caused by your shampoo — it's caused by internal factors. Here's what dermatologists say.",
        format: "Carousel",
        cta: "Learn the Science",
        theme: "Educational",
      },
    ],
  },
  {
    slug: "bold-care",
    name: "Bold Care",
    industry: "Men's Health",
    tagline: "Performance and confidence for modern men",
    initials: "BC",
    accentColor: "#2C4A6E",
    primaryBrands: ["Man Matters", "Little Joys"],
    website: "https://boldcare.in",
    productLinks: [
      { label: "Men's Wellness", url: "https://boldcare.in/collections/wellness" },
      { label: "Performance Range", url: "https://boldcare.in/collections/performance" },
      { label: "Gummies", url: "https://boldcare.in/collections/gummies" },
    ],
    targetAudience: "Urban men 22–35, performance and appearance conscious, open to modern wellness",
    marketPosition: "Aspirational modern men's wellness brand with a bold visual identity and lifestyle-first positioning",
    estimatedMonthlyAds: 120,
    strengths: ["Strong visual brand identity", "Broad men's health portfolio", "Young urban positioning"],
    weaknesses: ["Low clinical credibility vs competitors", "Commoditised messaging in crowded market", "High CAC for core wellness products"],
    recentMoves: [
      "Launched celebrity brand ambassador campaign with Ranveer Singh",
      "Expanded flash-sale countdown ad series for performance supplements",
      "Built influencer micro-network across fitness and lifestyle creators",
    ],

    adStrategyOverview: "Bold Care runs a high-volume, broad funnel strategy. They use a mix of celebrity endorsement ads at the top funnel, performance and offer ads mid-funnel, and review-led trust ads at the bottom. Their ad refresh rate is very high, with new creative variants launched weekly.",
    adFocus: "Celebrity endorsement at top funnel + offer-led performance ads at bottom funnel",
    keyFormats: ["Video", "Image", "Story Ad"],
    topChannels: ["Meta", "YouTube", "Google Display"],
    adSpendLevel: "Very High",
    adStrategyPoints: [
      "Very high creative refresh rate — new variants weekly to combat ad fatigue",
      "Celebrity (Ranveer Singh) creatives run primarily at awareness stage",
      "Offer-led ads ('Buy 2 Get 1 Free', 'Flat 30% Off') dominate conversion stage",
      "Product-specific ad sets for each hero SKU run simultaneously",
      "Story ads used for short urgency-driven offers and influencer cuts",
    ],

    creativeStrategyOverview: "Bold Care's creative aesthetic is high-contrast, bold, and aspirational. They use cinematic celebrity video content for brand-building, and fast-cut UGC-style clips for performance. The visual identity is dark, masculine, and premium — deep navy and gold tones.",
    keyThemes: ["Emotional branding", "Performance/lifestyle", "Offer-driven", "Celebrity-endorsed"],
    creativeFormula: "Aspirational image → Social proof or offer hook → Clear product benefit → Urgent CTA",
    visualStyle: "High-contrast dark backgrounds, bold typography, masculine navy and gold palette, cinematic celebrity shots",
    creativeStrategyPoints: [
      "Celebrity-led creatives get 3-5x higher reach but lower direct conversion",
      "Fast-cut user review videos perform best for direct conversion ad sets",
      "Packaging-forward shots used for product-range carousel ads",
      "Short 15s video hooks with offer text overlays drive the highest CTR at bottom funnel",
    ],

    productFocusOverview: "Bold Care spans men's sexual wellness, performance supplements, hair care, and daily vitamins. Their cross-sell strategy promotes bundles and subscription packs post-acquisition. Performance supplements and gummies are the highest-velocity skus in their ad portfolio.",
    heroProducts: ["Performance Gummies", "Daily Vitality Capsules", "Beard and Hair Kit", "Intimate Wellness Range"],
    productFocusPoints: [
      "Gummies are the entry-point product — lowest price point and highest trial conversion",
      "Bundle 'Men's Complete Kit' promoted heavily in retargeting sequences",
      "Hair care products are the secondary category, leaning on men's grooming appeal",
      "Subscription promoted only as an upsell after first order, not in primary creatives",
    ],

    messagingOverview: "Bold Care's messaging is energetic, confident, and benefit-led. They avoid clinical language and instead speak with aspirational, peer-level confidence. The core message is performance and confidence unlocked — not treated, but activated.",
    coreMessages: [
      "Be Bold. Be Bold Care.",
      "Performance that matches your ambition",
      "Modern men, modern wellness",
    ],
    ctaStyle: "Action-oriented and high-energy: 'Shop Now', 'Get Your Kit', 'Claim Your Offer'",
    tonality: "Energetic, bold, aspirational, masculine, peer-to-peer",
    messagingPoints: [
      "Avoids clinical or pharmacy-like language — keeps tone conversational and confident",
      "Celebrity voice lends aspirational authority without clinical claims",
      "Urgency tactics (limited time offers, countdown timers) are heavily used",
      "Review and rating callouts ('Rated 4.8/5 by 50K+ men') used for trust signals",
    ],

    contentStrategyOverview: "Bold Care's content strategy mirrors their ad strategy: bold visuals, lifestyle-led, and heavily creator-driven. They partner with fitness influencers and lifestyle creators across Instagram and YouTube for both organic and paid content.",
    contentPillars: ["Lifestyle & Aspiration", "Product Education", "Influencer Collabs", "Sale and Offer Campaigns"],
    contentStrategyPoints: [
      "Influencer-led organic content seeded across 200+ fitness and lifestyle creators",
      "Instagram Reels and YouTube Shorts prioritised for organic reach strategy",
      "Celebrity content recycled from paid campaigns into organic social posts",
      "Festival and sale-event content calendars planned 6+ weeks in advance",
    ],

    topRunningAds: [
      {
        headline: "Ranveer Approved. Doctor Backed.",
        body: "Bold Care's Performance Kit is used by men who refuse to compromise. Now with Ranveer Singh's stamp of approval.",
        format: "Video (30s)",
        cta: "Shop Now",
        theme: "Celebrity endorsement",
      },
      {
        headline: "Buy 2 Get 1 Free — Today Only",
        body: "Stack your boldness. Buy any 2 Bold Care products and get a third completely free. Limited time deal.",
        format: "Image / Story",
        cta: "Grab the Deal",
        theme: "Offer-driven",
      },
      {
        headline: "50,000+ Men Trust Bold Care",
        body: "Read what real men are saying about Bold Care's performance supplements. Rated 4.8/5 stars.",
        format: "Carousel (Reviews)",
        cta: "See Reviews",
        theme: "Social proof",
      },
    ],
  },
  {
    slug: "minimalist",
    name: "Minimalist",
    industry: "Skincare",
    tagline: "Effective skincare backed by science, not hype",
    initials: "MN",
    accentColor: "#5C5C5C",
    primaryBrands: ["BeBodywise", "Little Joys"],
    website: "https://beminimalist.co",
    productLinks: [
      { label: "Serums", url: "https://beminimalist.co/collections/serums" },
      { label: "Sunscreens", url: "https://beminimalist.co/collections/sunscreen" },
      { label: "Body Care", url: "https://beminimalist.co/collections/body-care" },
    ],
    targetAudience: "Skincare-aware consumers 20–35, ingredient-literate, value-seeking, predominantly women",
    marketPosition: "D2C clinical skincare at accessible price points — ingredient transparency and dermatologist credibility without the luxury price tag",
    estimatedMonthlyAds: 95,
    strengths: ["Ingredient credibility and transparency", "Strong repeat purchase rate", "D2C brand trust"],
    weaknesses: ["Cold, functional brand tone limits emotional connection", "Limited lifestyle storytelling", "Pricing pressure from mass brands"],
    recentMoves: [
      "Launched 'Science of Skin' educational carousel series across Meta",
      "Dermatologist partnership for clinic-style credibility content",
      "Bundled 'Skincare Routine' kits with dedicated ad campaigns",
    ],

    adStrategyOverview: "Minimalist runs precision-targeted educational ad campaigns. Their unique strategy is to own the ingredient-explanation space — carousels that teach consumers about actives (Niacinamide, Retinol, AHA/BHA) drive both brand trust and category education. Low-waste, high-efficiency ad spend.",
    adFocus: "Ingredient science education + problem-specific product targeting",
    keyFormats: ["Carousel (Educational)", "Image", "Video (Short)"],
    topChannels: ["Meta (Instagram)", "Google Search"],
    adSpendLevel: "Medium",
    adStrategyPoints: [
      "Educational carousels explaining ingredients are their highest-engagement format",
      "Skincare 'routine builder' ads guide consumers toward multi-product purchase sets",
      "Google Search captures high-intent searches for specific actives (e.g. 'Niacinamide serum')",
      "Retargeting sequences built around skin concern (acne, pigmentation, ageing) not demographics",
      "Very low discount-led advertising — brand deliberately avoids race-to-the-bottom pricing",
    ],

    creativeStrategyOverview: "Minimalist's creative aesthetic is intentionally sparse: white backgrounds, clean typography, ingredient molecule graphics, and clinical photography. No lifestyle imagery, no celebrity faces — only product, ingredient, and skin-result visuals.",
    keyThemes: ["Educational", "Problem-solution", "Ingredient transparency"],
    creativeFormula: "Skin Problem → Ingredient Solution → 'How it works' → Clear Product CTA",
    visualStyle: "Ultra-minimal: white/off-white backgrounds, clinical product photography, molecule-style ingredient graphics, black and grey typography",
    creativeStrategyPoints: [
      "No celebrity or influencer faces in primary paid creatives — product is the hero",
      "Ingredient name is always the dominant graphic element in image ads",
      "Before/after skin result images used selectively in retargeting only",
      "Video ads max 15–20 seconds: product + ingredient benefit + skin result",
    ],

    productFocusOverview: "Minimalist is built around functional actives — every product in their range is formulated with high-efficacy, well-researched ingredients. They go deep on a narrow range (serums, SPF, cleansers) rather than broad across multiple categories.",
    heroProducts: ["10% Niacinamide Serum", "Salicylic Acid 2%", "Retinol 0.3% Serum", "SPF 50 Sunscreen"],
    productFocusPoints: [
      "Niacinamide and Salicylic Acid serums are the highest volume acquisition products",
      "Sunscreen has seen explosive growth — heavy Q2/Q3 seasonal ad investment",
      "Products are almost always advertised individually with ingredient-specific messaging",
      "Bundle ads ('3-step routine') are a growing format for increasing AOV",
    ],

    messagingOverview: "Minimalist's messaging is deliberately no-nonsense: no magical claims, no celebrity magic, just science. Their copy is concise, factual, and ingredient-specific. They speak to informed consumers who distrust marketing language.",
    coreMessages: [
      "Effective skincare without the noise",
      "Know what's in your skincare",
      "Dermatologist-tested. Ingredient-transparent. Affordable.",
    ],
    ctaStyle: "Simple and direct: 'Shop Now', 'Find Your Serum', 'Build Your Routine'",
    tonality: "Calm, clinical, factual, trust-led — anti-hype",
    messagingPoints: [
      "No superlative claims — 'Revolutionary' or 'Magic' language is deliberately avoided",
      "Percentage and ingredient concentration always mentioned (e.g. '10% Niacinamide')",
      "Price transparency: affordable pricing mentioned as a benefit, not a discount",
      "Scientific terminology used accessibly — explained in plain language alongside",
    ],

    contentStrategyOverview: "Minimalist dominates the skincare education content space. Their blog, YouTube, and Instagram content teaches consumers ingredient literacy, building loyal communities of informed skin care users who trust the brand as an authority.",
    contentPillars: ["Ingredient Science", "Skincare Routine Building", "Myth Busting", "Skin Concern Solutions"],
    contentStrategyPoints: [
      "YouTube deep-dives into ingredients drive significant organic discovery",
      "Instagram 'Did you know?' series drives high saves and shares (social algorithm signal)",
      "Community Q&A formats surface real customer questions and educate at scale",
      "Email newsletters educate subscribers on new formulations and ingredient updates",
    ],

    topRunningAds: [
      {
        headline: "10% Niacinamide. Minimalist. ₹599.",
        body: "Clinically formulated. Dermatologist tested. No unnecessary additives. Just pure Niacinamide at the right concentration.",
        format: "Image",
        cta: "Shop Now",
        theme: "Ingredient-led",
      },
      {
        headline: "Is Your Sunscreen Doing Enough?",
        body: "Most sunscreens don't offer true broad-spectrum protection. Minimalist SPF 50 PA++++ does. Here's why.",
        format: "Carousel",
        cta: "Find Your SPF",
        theme: "Educational",
      },
      {
        headline: "Build Your 3-Step Routine",
        body: "Cleanse. Treat. Protect. Minimalist has the actives you need, in a routine that actually works.",
        format: "Video (15s)",
        cta: "Build My Routine",
        theme: "Routine-building",
      },
    ],
  },
  {
    slug: "mamaearth",
    name: "Mamaearth",
    industry: "Personal Care",
    tagline: "The good stuff. Free from the bad stuff.",
    initials: "ME",
    accentColor: "#7A9E4A",
    primaryBrands: ["BeBodywise", "Little Joys"],
    website: "https://mamaearth.in",
    productLinks: [
      { label: "Skincare", url: "https://mamaearth.in/collections/skin-care" },
      { label: "Baby Care", url: "https://mamaearth.in/collections/baby-care" },
      { label: "Hair Care", url: "https://mamaearth.in/collections/hair-care" },
    ],
    targetAudience: "Parents (primarily mothers) 25–40, health-conscious families, value-aware urban consumers",
    marketPosition: "India's leading natural, toxin-free personal and baby care brand — mainstream mass-market positioning with a 'better for you' narrative",
    estimatedMonthlyAds: 200,
    strengths: ["Extremely high brand recognition", "Wide product range across categories", "Strong emotional storytelling"],
    weaknesses: ["Risk of greenwashing scrutiny", "Diluted differentiation across too many SKUs", "Very high media spend to maintain share"],
    recentMoves: [
      "Launched parent-child bonding brand film series ('Good for Baby, Good for You')",
      "Introduced Onco-safe product sub-range for cancer-care consumers",
      "Celebrity testimonial surge with multiple Bollywood partnerships",
    ],

    adStrategyOverview: "Mamaearth runs the highest volume ad operation among Indian D2C personal care brands. They leverage a multi-funnel, multi-celebrity, multi-format approach simultaneously — running hundreds of ad variants across Meta, YouTube, and display. Heavy seasonal investment during gifting seasons.",
    adFocus: "Mass awareness via celebrity endorsements + parent-emotion storytelling for conversion",
    keyFormats: ["Video (Brand Film)", "Image", "Carousel", "Short-form Video"],
    topChannels: ["Meta", "YouTube", "Google Display", "CTV"],
    adSpendLevel: "Very High",
    adStrategyPoints: [
      "Run 300+ active ad variants simultaneously across Meta platforms",
      "Celebrity roster includes 5+ Bollywood names active in rotation",
      "Seasonal campaigns (Diwali, Mother's Day, Baby Care Month) spike spend significantly",
      "YouTube brand films target new parent life moments for high-emotion reach",
      "Google Shopping ads heavily optimised for 'toxin-free' and 'natural' search queries",
    ],

    creativeStrategyOverview: "Mamaearth's creatives are warm, emotional, and nature-led. Brand films feature mother-child bonding moments, natural landscapes, and ingredient origin stories. Celeb-led creatives contrast with authentic UGC-testimonial formats for different funnel stages.",
    keyThemes: ["Emotional branding", "Natural ingredients", "Testimonial", "Baby-safe positioning"],
    creativeFormula: "Emotional moment (parent-child) → Natural ingredient visual → Product as protection → Warm CTA",
    visualStyle: "Warm earthy greens, natural textures, soft lighting, mother-child photography, ingredient close-ups",
    creativeStrategyPoints: [
      "Brand films (2–3 min) run on YouTube for awareness with emotional storytelling",
      "Short 15s cuts of brand films repurposed for Meta conversion campaigns",
      "Celebrity product endorsements run as image ads for Google Shopping",
      "UGC-style testimonials from 'real moms' used heavily in retargeting sequences",
    ],

    productFocusOverview: "Mamaearth spans 200+ SKUs across baby care, skincare, hair care, colour cosmetics, and wellness. Their ad portfolio focuses heavily on the core baby and skincare range, with seasonal pushes for gifting sets. New category launches (Onco-safe) receive dedicated campaign bursts.",
    heroProducts: ["Onion Hair Oil", "Vitamin C Face Wash", "SPF 50 Sunscreen", "Ubtan Face Pack", "Baby Range"],
    productFocusPoints: [
      "Onion Hair Oil is their highest GMV product and receives disproportionate ad spend",
      "Vitamin C face wash range runs perpetual awareness campaigns year-round",
      "Baby care range marketed heavily to new parents through targeted digital placements",
      "New launches receive 4-week campaign bursts with celebrity-led awareness ads",
    ],

    messagingOverview: "Mamaearth's messaging is built on emotional safety and natural goodness. Their core narrative: 'good for your family, free from the bad stuff.' They blend aspiration (beautiful skin) with safety (toxin-free ingredients) and social responsibility (plant a tree).",
    coreMessages: [
      "Natural goodness. No toxins. Made safe for your family.",
      "Trusted by 2 crore+ moms in India",
      "Plant a tree with every order",
    ],
    ctaStyle: "Warm and inclusive: 'Shop the Range', 'Make the Switch', 'Try for Your Baby', 'Gift the Goodness'",
    tonality: "Warm, nurturing, trustworthy, aspirationally natural, community-led",
    messagingPoints: [
      "Heavy use of 'free from' formulation callouts (Sulphate-free, Paraben-free, Toxin-free)",
      "Social cause messaging (tree planting, 'goodness delivered') used for brand affinity",
      "Celebrity voices used for aspiration; real mom voices used for trust and conversion",
      "Family and community language (not clinical) — 'your family will love it'",
    ],

    contentStrategyOverview: "Mamaearth runs India's largest D2C content operation — across YouTube, Instagram, WhatsApp communities, and blog. They own the 'natural parenting' content space and build community through mom influencer networks and parenting advice content.",
    contentPillars: ["Natural Parenting", "Ingredient Education", "Celebrity Content", "Mom Community Stories"],
    contentStrategyPoints: [
      "50,000+ mom community network activated for seeded UGC content",
      "Weekly 'Natural Skin Tips' Instagram content maintains daily engagement",
      "YouTube 'Ingredient Stories' series builds credibility with educated buyers",
      "WhatsApp groups used for loyalty programme and community re-engagement",
    ],

    topRunningAds: [
      {
        headline: "Made for Your Baby. Safe for Your Family.",
        body: "Mamaearth's baby range is made with natural ingredients, free from 12 harmful chemicals. Because they deserve only the best.",
        format: "Video (45s Brand Film)",
        cta: "Shop Baby Range",
        theme: "Emotional / Safety",
      },
      {
        headline: "Trusted by 2 Crore+ Moms",
        body: "From baby wash to vitamin C face wash — Mamaearth has the natural goodness your family deserves.",
        format: "Carousel (Multi-product)",
        cta: "Shop Now",
        theme: "Social proof",
      },
      {
        headline: "Shilpa Shetty's Skincare Secret",
        body: "Shilpa Shetty reveals the one product she cannot live without. Hint: it's Mamaearth Vitamin C.",
        format: "Video (Celebrity, 30s)",
        cta: "Get Shilpa's Pick",
        theme: "Celebrity endorsement",
      },
    ],
  },
  {
    slug: "the-derma-co",
    name: "The Derma Co",
    industry: "Skincare",
    tagline: "Dermatologist-prescribed solutions for every skin concern",
    initials: "DC",
    accentColor: "#7B5EA7",
    primaryBrands: ["BeBodywise"],
    website: "https://thederma.co",
    productLinks: [
      { label: "Serums", url: "https://thederma.co/collections/face-serums" },
      { label: "Skin Diagnosis", url: "https://thederma.co/pages/skin-diagnosis" },
      { label: "Sunscreens", url: "https://thederma.co/collections/sunscreens" },
    ],
    targetAudience: "Skin-concern-aware women 22–38, willing to invest in premium clinical-quality skincare, digital-first",
    marketPosition: "Premium clinical D2C skincare brand positioned between drugstore actives and prescription dermatology — expertise without the consultation fee",
    estimatedMonthlyAds: 110,
    strengths: ["Strong dermatologist authority positioning", "Before/after visual proof drives trust", "Free consultation CTA as funnel entry"],
    weaknesses: ["Premium pricing limits mass scale", "Complex onboarding for new skincare consumers", "Post-purchase support complexity"],
    recentMoves: [
      "Launched 'Skin Score' personalised diagnostic tool as lead magnet",
      "Scaled before/after video testimonial series across Meta",
      "Introduced 'Free Consultation' CTA across all funnel stages",
    ],

    adStrategyOverview: "The Derma Co runs a dual-funnel strategy: a clinical awareness funnel built on dermatologist authority and before/after transformation proof, and a bottom-funnel conversion strategy powered by free consultation CTAs and targeted concern-based retargeting.",
    adFocus: "Dermatologist authority + visual transformation proof + free consultation as conversion CTA",
    keyFormats: ["Video (Before/After)", "Image", "Carousel"],
    topChannels: ["Meta (Facebook + Instagram)", "Google Search"],
    adSpendLevel: "High",
    adStrategyPoints: [
      "Concern-based ad targeting: separate campaigns for acne, pigmentation, ageing, and dryness",
      "'Free Consultation' CTA appears in 70%+ of bottom-funnel ad creatives",
      "Google Search captures high-intent 'dermatologist for acne' type queries",
      "'Skin Score' lead magnet used in top-funnel awareness to qualify leads",
      "Retargeting sequences built for quiz completers, cart abandoners, and website visitors separately",
    ],

    creativeStrategyOverview: "The Derma Co's creative aesthetic is clinical but aspirational. White and purple brand palette, dermatologist-in-frame authority shots, dramatic before/after skin transformation imagery, and clean product photography. Emotion is present but rooted in clinical confidence.",
    keyThemes: ["Before/After transformation", "Clinical authority", "Problem-solution", "Testimonial"],
    creativeFormula: "Skin problem (close-up, relatable) → Dermatologist diagnosis → Product solution → Before/after proof → CTA",
    visualStyle: "Clinical purple and white palette, dermatologist-in-frame authority shots, high-contrast before/after skin photography, clean product-on-white imagery",
    creativeStrategyPoints: [
      "Before/after formats are consistently the highest CTR creative type",
      "Dermatologist-to-camera videos outperform UGC for awareness stage",
      "Packaging + ingredient callout combination used in image ads for conviction stage",
      "Short 15s rapid before/after transitions used in Story and Reel placements",
    ],

    productFocusOverview: "The Derma Co focuses on high-efficacy serums, SPF, and treatment-specific skincare. Their portfolio is wider than Minimalist but narrower than Mamaearth — deliberately positioning as specialised, not general care.",
    heroProducts: ["1% Retinol Serum", "10% Niacinamide Serum", "AHA-BHA Peel", "SPF 60 Sunscreen"],
    productFocusPoints: [
      "Retinol 1% serum is the flagship product, heavily advertised with before/after transformation proof",
      "AHA-BHA Peel positioned as the 'professional strength at-home' treatment",
      "Sunscreen range has surged post-summer — SPF 60 now a major acquisition product",
      "Bundled 'Derma Protocol' kits sold post-consultation with custom recommendation content",
    ],

    messagingOverview: "The Derma Co's messaging combines clinical authority with emotional transformation desire — the promise of 'real results, backed by dermatologists'. Their voice is expert but empathetic, not cold or unapproachable.",
    coreMessages: [
      "Real results. Dermatologist approved.",
      "Your skin concern has a clinical solution.",
      "Get a personalised skin plan from real dermatologists.",
    ],
    ctaStyle: "Authority and action combined: 'Get Your Skin Score', 'Book a Free Consultation', 'Find Your Serum'",
    tonality: "Expert, empathetic, transformation-driven, clinical yet aspirational",
    messagingPoints: [
      "Clinical proof with human warmth — dermatologist feels like a trusted friend, not a distant expert",
      "Before/after language used consistently: 'See the difference', 'Here's what changed'",
      "Social proof numbers: '#1 Dermatologist Recommended D2C Brand' is a consistent headline",
      "Free consultation CTA reduces the fear of commitment, lowering purchase barrier",
    ],

    contentStrategyOverview: "The Derma Co runs a content operation centred on dermatologist authority and skin transformation stories. YouTube features long-form dermatologist consultations and product deep-dives, while Instagram focuses on skin tips and community-building.",
    contentPillars: ["Dermatologist Expert Content", "Skin Transformation Stories", "Product Education", "Community Q&A"],
    contentStrategyPoints: [
      "Weekly 'Ask the Dermat' Instagram Live series drives real-time community engagement",
      "YouTube 'Skin Explained' series builds SEO authority for skin concern keywords",
      "Email diagnosis results trigger personalised product recommendation sequences",
      "Affiliate influencer network of 100+ skincare content creators activated monthly",
    ],

    topRunningAds: [
      {
        headline: "Real Results. Backed by Dermatologists.",
        body: "Meera had persistent pigmentation for 3 years. After 3 months on the Derma Co Retinol Protocol — here's what changed.",
        format: "Video (Before/After, 45s)",
        cta: "Find Your Solution",
        theme: "Transformation testimonial",
      },
      {
        headline: "What's Your Skin Score?",
        body: "Take our 2-minute skin diagnosis and get a personalised protocol recommended by dermatologists. Free.",
        format: "Image",
        cta: "Get Your Skin Score",
        theme: "Lead magnet / Diagnostic",
      },
      {
        headline: "India's #1 Dermatologist-Recommended D2C Brand",
        body: "Don't guess your skincare. Get personalised recommendations from real dermatologists — free of charge.",
        format: "Carousel",
        cta: "Start Free Consultation",
        theme: "Authority / Social proof",
      },
    ],
  },
  {
    slug: "ustraa",
    name: "Ustraa",
    industry: "Men Grooming",
    tagline: "Grooming crafted for the real Indian man",
    initials: "US",
    accentColor: "#B04A2C",
    primaryBrands: ["Man Matters"],
    website: "https://ustraa.com",
    productLinks: [
      { label: "Beard Care", url: "https://ustraa.com/collections/beard-care" },
      { label: "Hair Care", url: "https://ustraa.com/collections/hair-care" },
      { label: "Skin Care", url: "https://ustraa.com/collections/face-care" },
    ],
    targetAudience: "Indian men 24–40, authenticity-seeking, value comfort and relatability over aspiration, tier 1 and 2 cities",
    marketPosition: "India's original men's grooming brand — authentic, irreverent, culturally rooted and deeply relatable to the Indian male identity",
    estimatedMonthlyAds: 60,
    strengths: ["Highly distinctive and recognizable brand voice", "Strong brand recall through humor", "Loyal and vocal community"],
    weaknesses: ["Limited premium product offering", "Smaller digital ad budget vs competitors", "Narrow grooming focus constrains expansion"],
    recentMoves: [
      "Comedy-driven short-form video ad series performing strongly",
      "Festival sale campaigns with culturally resonant messaging",
      "Product bundle promotion for gifting occasions",
    ],

    adStrategyOverview: "Ustraa runs a lean, humor-led ad strategy. Lower media spend but sharp creative targeting — they rely on culturally resonant, funny content to punch above their budget weight. Efficiency over volume, with high creative distinctiveness.",
    adFocus: "Comedy-led brand building with culture-resonant messaging and festival-moment targeting",
    keyFormats: ["Short-form Video", "Image", "Story"],
    topChannels: ["Meta (Instagram)", "YouTube Shorts"],
    adSpendLevel: "Medium",
    adStrategyPoints: [
      "Humor and wit is the core creative differentiator — ad scripts are written by comedy content writers",
      "Low media spend compensated by high organic shareability of creative content",
      "Festival campaigns (Diwali, Holi, Father's Day) are the highest-spend periods",
      "Instagram Explore placements leveraged for high organic discovery",
      "Email and WhatsApp used heavily for existing customer retention promotions",
    ],

    creativeStrategyOverview: "Ustraa's creative style is irreverent, culturally savvy, and visually warm. Indian masculinity is portrayed humorously and authentically — not aspirationally. Characters in their ads look and talk like 'the guy next door', deliberately subverting the premium aspirational aesthetic of competitors.",
    keyThemes: ["Humor / Comedy", "Cultural resonance", "Identity / Authenticity", "Offer-driven"],
    creativeFormula: "Relatable Indian male situation → Funny twist → Product as natural solution → Warm, conversational CTA",
    visualStyle: "Warm earthy tones, Indian cultural cues, authentic man-on-street aesthetics, product-feature close-ups with humor text overlays",
    creativeStrategyPoints: [
      "Comedy scripts are tested with male communities before production to validate cultural resonance",
      "Character-led ads (recurring 'Ustraa man' character) build brand memory over time",
      "Product feature callouts always framed with a joke or cultural reference",
      "Avoid aspirational or foreign-looking models — deliberate casting of relatable Indian men",
    ],

    productFocusOverview: "Ustraa's product universe is centred on beard and hair care for Indian men, with expanding skin care. Their signature products are beard oils and hair growth oils — Indian-flavoured formulations (Argan, Bhringraj, Charcoal) resonating with the Indian male grooming context.",
    heroProducts: ["Beard Growth Oil", "Hair Fall Control Kit", "Charcoal Face Wash", "Cologne Spray"],
    productFocusPoints: [
      "Beard Growth Oil is the iconic hero product and the top advertised SKU",
      "Hair Fall range benefits from clear problem-to-solution narrative for Indian men",
      "Cologne and fragrance products are growing as lifestyle-adjacent category in ads",
      "Gifting kits heavily promoted during festivals — 'Gift him Ustraa' is a recurring campaign",
    ],

    messagingOverview: "Ustraa's messaging is deeply culturally Indian, conversational, and funny. They speak to men like a best friend would — without jargon, without aspirational pressure, and with plenty of self-aware humour. This is deliberately positioned against the 'foreign brand energy' of premium competitors.",
    coreMessages: [
      "Made for the real Indian man",
      "Grooming that gets you. Not the other way around.",
      "The original Indian grooming brand",
    ],
    ctaStyle: "Friendly and casual: 'Get Your Ustraa', 'Shop the Kit', 'Gift the Real Man Stuff'",
    tonality: "Funny, warm, culturally Indian, authentic, irreverent, peer-to-peer",
    messagingPoints: [
      "Hindi-English code-switching in copy resonates strongly with tier 1 and 2 Indian male audience",
      "Anti-aspirational positioning: 'for real men, not models' is a recurring subtext",
      "Ingredient callouts framed humorously ('Bhringraj wala oil, jo sach mein kaam karta hai')",
      "Festival gifting messages warm and culturally specific to Indian occasions",
    ],

    contentStrategyOverview: "Ustraa builds cultural brand love through relatable, funny content — their social channels feel like a comedy page that also sells grooming products. The brand voice is entirely consistent from paid ads to organic social.",
    contentPillars: ["Indian Male Humor", "Grooming Tips", "Festival Content", "Community Polls and Banter"],
    contentStrategyPoints: [
      "Instagram content strategy mirrors paid creative — humor-first with product as natural inclusion",
      "High-performing organic content is boosted as paid for amplification with minimal production delta",
      "User polls and meme formats generate high organic engagement and shares",
      "Brand continues to own 'gifting for men' content space during festival periods",
    ],

    topRunningAds: [
      {
        headline: "Beard Oil Banaya Sabse Pehle.",
        body: "We made beard oil for Indian men before it was cool. Now we make it better. Ustraa Beard Growth Oil.",
        format: "Short Video (Comedy, 20s)",
        cta: "Get Your Ustraa",
        theme: "Brand heritage / Humor",
      },
      {
        headline: "Festival Gift Ideas for the Man in Your Life",
        body: "Stop gifting him socks. Gift him Ustraa grooming kits. He'll actually use these.",
        format: "Image (Gift-focused)",
        cta: "Shop Gift Kits",
        theme: "Festival / Gifting",
      },
      {
        headline: "Real Beard. Real Oil. Real Results.",
        body: "No fake promises. Just Bhringraj, Argan, and a beard that actually grows. 4.5 stars from 20,000+ customers.",
        format: "Carousel (Ingredients + Reviews)",
        cta: "Try Beard Growth Oil",
        theme: "Social proof / Ingredient",
      },
    ],
  },
  {
    slug: "beardo",
    name: "Beardo",
    industry: "Men Grooming",
    tagline: "For the man who takes his look seriously",
    initials: "BD",
    accentColor: "#2C3E50",
    primaryBrands: ["Man Matters"],
    website: "https://beardo.in",
    productLinks: [
      { label: "Beard Oils", url: "https://beardo.in/collections/beard-oils" },
      { label: "Hair Care", url: "https://beardo.in/collections/hair-care" },
      { label: "Skin Care", url: "https://beardo.in/collections/skincare" },
    ],
    targetAudience: "Style-conscious urban men 22–38, metro cities, self-care investment-aware, Instagram active",
    marketPosition: "Aspirational premium men's grooming — the brand for the style-led, image-conscious Indian urban male who takes his appearance seriously",
    estimatedMonthlyAds: 70,
    strengths: ["Premium visual brand identity", "Strong aspirational appeal for urban males", "Celebrity association drives desirability"],
    weaknesses: ["Higher CAC due to premium positioning", "Crowded premium grooming market", "Limited clinical or wellness positioning"],
    recentMoves: [
      "Urban lifestyle photo campaign with premium male influencers",
      "Premium Beard Kit gifting campaign for festivals and occasions",
      "Celebrity brand ambassador content driving aspirational reach",
    ],

    adStrategyOverview: "Beardo runs a two-track paid strategy: aspirational lifestyle video and photography content builds brand desire at awareness stage, while product-feature and offer-led image ads drive direct response. Premium visual quality is non-negotiable across all formats.",
    adFocus: "Aspirational lifestyle brand-building + premium product feature direct response",
    keyFormats: ["Image (Lifestyle)", "Video (Lifestyle/Product)", "Story"],
    topChannels: ["Meta (Instagram)", "YouTube"],
    adSpendLevel: "Medium",
    adStrategyPoints: [
      "Lifestyle photography-first: every ad creative undergoes professional production",
      "Celebrity content anchors brand positioning at top funnel",
      "Instagram grid aesthetic consistency is deliberately maintained in paid creative cuts",
      "Product feature ad sets run alongside lifestyle content for conversion",
      "Gifting kits heavily pushed in Q4 with 'sophisticated gift for him' messaging",
    ],

    creativeStrategyOverview: "Beardo's creative aesthetic is unmistakably premium: dark, moody, cinematic. Deep navy and charcoal palette, perfectly groomed model photography, editorial-quality production. Every visual element signals aspiration without being unattainable.",
    keyThemes: ["Lifestyle aspiration", "Identity / Masculinity", "Celebrity endorsement", "Premium positioning"],
    creativeFormula: "Aspirational man visual → Product as essential grooming tool → Sophistication through grooming → Brand CTA",
    visualStyle: "Dark cinematic tones (charcoal, navy, copper), editorial male model photography, black backgrounds, premium product close-ups, luxury-feel typography",
    creativeStrategyPoints: [
      "No comedy or humor in creative — aspirational premium tone is sacred",
      "Model casting: premium urban male look, well-groomed, fashion-forward",
      "Product hero shots are cinematic quality — reflects premium brand tier",
      "Text overlays are minimal — let visuals do the heavy lifting",
    ],

    productFocusOverview: "Beardo spans beard care, hair care, and face care for men. Their hero products are fragrance and beard oil — the 'style signature' products for the image-conscious man. Gifting kits are a major revenue driver in festival seasons.",
    heroProducts: ["Beard Oil (varied fragrances)", "Hair Wax", "Intimate Wash", "Beard Kit Combos"],
    productFocusPoints: [
      "Fragrance-variant beard oils are the hero category, with scent as key differentiator",
      "Hair wax and styling range growing significance as style-identity products",
      "Gifting kits (premium packaging) are a major seasonal revenue driver",
      "Skincare range targeted at 'man who's just started taking skincare seriously'",
    ],

    messagingOverview: "Beardo's messaging is confident, aspirational, and style-focused. They speak to the man who takes pride in his appearance, framing grooming not as maintenance but as identity expression. Every message reinforces the premium, image-led lifestyle.",
    coreMessages: [
      "Groomed. Confident. Beardo.",
      "For the man who refuses to compromise on style",
      "Your beard. Your identity. Beardo.",
    ],
    ctaStyle: "Premium and confident: 'Shop Beardo', 'Get the Look', 'Discover Your Kit'",
    tonality: "Confident, premium, aspirational, image-conscious, masculine without aggression",
    messagingPoints: [
      "Brand name used as an identity claim — 'Be a Beardo' positioning",
      "Fragrance and scent referenced extensively — smell as aspirational differentiator",
      "Price is not discounted in core messaging — premium price is part of the signal",
      "Gifting messaging: 'Give him the kit that tells him he's worth it'",
    ],

    contentStrategyOverview: "Beardo's content strategy is aesthetic-first, mirroring their ad creative approach. Content feels like an editorial grooming magazine — high quality, style-led, and culturally premium.",
    contentPillars: ["Grooming Tips for Men", "Style Identity & Aspiration", "Festival Gifting", "Celebrity and Influencer Content"],
    contentStrategyPoints: [
      "Instagram content reads as a premium men's magazine grid — consistent dark aesthetic",
      "YouTube 'Beard Tutorials' series drives grooming discovery for organic acquisition",
      "Instagram Collab posts with fashion influencers extend brand into lifestyle space",
      "Festival gifting content repurposed between paid and organic with editorial photography",
    ],

    topRunningAds: [
      {
        headline: "Your Beard is Part of Your Identity.",
        body: "Beardo's premium beard oils keep it smelling incredible, looking sharp, and growing strong. Craft your signature.",
        format: "Image (Lifestyle)",
        cta: "Shop Beard Oils",
        theme: "Identity / Aspiration",
      },
      {
        headline: "The Perfect Gift for Him.",
        body: "Give him the grooming kit he deserves. Beardo Premium Beard Kit — for the man who refuses to compromise.",
        format: "Image (Gift)",
        cta: "Get the Kit",
        theme: "Festival / Gifting",
      },
      {
        headline: "Smells Like an Upgrade.",
        body: "Beardo Beard Oil isn't just beard care. It's the first impression you make. Choose your signature scent.",
        format: "Short Video (15s)",
        cta: "Find Your Scent",
        theme: "Product benefit / Aspiration",
      },
    ],
  },
];

export function getCompetitorBySlug(slug: string): CompetitorBrand | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
