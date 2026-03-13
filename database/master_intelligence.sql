-- SpyderAds AI Master Intelligence Seed
-- Populates all intelligence tables with realistic data for the primary brands

-- 1. Weekly Briefs for all Primary Brands
INSERT INTO weekly_briefs (primary_brand_id, week_start, week_end, summary_md, insights_json)
SELECT 
  id, 
  '2026-03-07', 
  '2026-03-13',
  CASE name
    WHEN 'BeBodywise' THEN 'Competitor activity in the women''s wellness category has intensified this week. Minimalist launched a 10% Niacinamide + AHA bundle carousel specifically targeting oily-skin concerns — a clear move into BeBodywise''s core territory. The Derma Co scaled their "Skin Score" lead magnet with a new personalised routine landing page.'
    WHEN 'Man Matters' THEN 'The men''s health category saw increased competition this week. Traya significantly scaled their doctor video testimonial formats — now running 24 unique ad variants across Meta. Bold Care launched a Ranveer Singh endorsement campaign with a flash-sale mechanic.'
    WHEN 'Little Joys' THEN 'The kids'' and family wellness space saw significant moves. Mamaearth launched their Onco-safe baby range with a heavy celebrity-led push. Minimalist expanded into a children''s mineral SPF product with educational carousel content.'
  END,
  CASE name
    WHEN 'BeBodywise' THEN '[{"trend": "Minimalist launched Niacinamide + AHA bundle", "competitor": "Minimalist"}, {"trend": "Mamaearth scaling emotional brand films", "competitor": "Mamaearth"}]'::jsonb
    WHEN 'Man Matters' THEN '[{"trend": "Traya scaled to 24 doctor video variants", "competitor": "Traya"}, {"trend": "Bold Care celebrity endorsement push", "competitor": "Bold Care"}]'::jsonb
    WHEN 'Little Joys' THEN '[{"trend": "Mamaearth Onco-safe baby range launch", "competitor": "Mamaearth"}, {"trend": "Minimalist entering kids SPF market", "competitor": "Minimalist"}]'::jsonb
  END
FROM brands WHERE is_primary = true
ON CONFLICT (primary_brand_id, week_start) DO NOTHING;

-- 2. Trend Reports (Market Share & Volume for charts)
-- Generate 8 weeks of trend data for each brand
INSERT INTO trend_reports (brand_id, period_start, period_end, granularity, metric_type, label_type, label_value, value)
SELECT 
  b.id,
  d.date,
  d.date + interval '6 days',
  'week',
  'ad_volume',
  'format',
  f.format,
  (random() * 50 + 10)::int
FROM brands b
CROSS JOIN (
  SELECT generate_series('2026-01-01'::date, '2026-03-01'::date, '1 week'::interval)::date as date
) d
CROSS JOIN (
  SELECT unnest(ARRAY['video', 'image', 'carousel', 'testimonial']) as format
) f
ON CONFLICT DO NOTHING;

-- 3. Mock Ads for the Gallery
-- Insert sample ads for all tracked brands
INSERT INTO ads (brand_id, meta_ad_id, platform, status, first_seen_at, last_seen_at, start_date)
SELECT 
  id,
  'meta_' || id || '_' || floor(random() * 1000)::text,
  'Meta',
  'active',
  NOW() - interval '30 days',
  NOW(),
  CURRENT_DATE - 30
FROM brands
ON CONFLICT DO NOTHING;

-- Creative details for those ads
INSERT INTO ad_creatives (ad_id, format_normalized, primary_text, headline, cta, image_url)
SELECT 
  a.id,
  'video',
  'Discover the power of ' || b.name || '. Real results, real science.',
  'Try the best-selling range today',
  'SHOP_NOW',
  'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=400'
FROM ads a
JOIN brands b ON a.brand_id = b.id
WHERE NOT EXISTS (SELECT 1 FROM ad_creatives WHERE ad_id = a.id)
LIMIT 20;

-- Analysis for those ads
INSERT INTO ad_analysis (ad_id, format_label, theme_label, is_latest)
SELECT 
  id,
  'video',
  'problem-solution',
  true
FROM ads
WHERE NOT EXISTS (SELECT 1 FROM ad_analysis WHERE ad_id = ads.id)
LIMIT 20;
