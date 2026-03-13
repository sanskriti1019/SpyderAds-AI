-- Add intelligence and branding fields to brands table
ALTER TABLE brands ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS initials TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS accent_color TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS market_position TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS ad_spend_level TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS tonality TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS target_audience TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS mission_statement TEXT;

-- Seed initial data for primary and competitor brands
INSERT INTO brands (name, slug, initials, accent_color, tagline, is_primary, industry, country, website) VALUES
  ('BeBodywise', 'bebodywise', 'BW', '#6E2C2C', 'Personalized wellness for the modern woman', true, 'Health & Wellness', 'IN', 'https://bebodywise.com'),
  ('Man Matters', 'manmatters', 'MM', '#1A1A1A', 'The modern man''s wellness companion', true, 'Health & Wellness', 'IN', 'https://manmatters.com'),
  ('Little Joys', 'littlejoys', 'LJ', '#8B6F47', 'Nurturing the next generation', true, 'Health & Wellness', 'IN', 'https://littlejoys.in')
ON CONFLICT (name) DO UPDATE SET
  slug = EXCLUDED.slug,
  initials = EXCLUDED.initials,
  accent_color = EXCLUDED.accent_color,
  tagline = EXCLUDED.tagline,
  is_primary = EXCLUDED.is_primary,
  website = EXCLUDED.website;

-- Competitor brand insertion
INSERT INTO brands (name, slug, initials, accent_color, tagline, is_primary, industry, country, website) VALUES
  ('Traya', 'traya', 'TR', '#4A7C59', 'India''s #1 root-cause hair loss treatment', false, 'Hair Care', 'IN', 'https://traya.health'),
  ('Bold Care', 'bold-care', 'BC', '#2C4A6E', 'Performance and confidence for modern men', false, 'Men''s Health', 'IN', 'https://boldcare.in'),
  ('Minimalist', 'minimalist', 'MN', '#5C5C5C', 'Effective skincare backed by science, not hype', false, 'Skincare', 'IN', 'https://beminimalist.co'),
  ('Mamaearth', 'mamaearth', 'ME', '#7A9E4A', 'The good stuff. Free from the bad stuff.', false, 'Personal Care', 'IN', 'https://mamaearth.in'),
  ('The Derma Co', 'the-derma-co', 'DC', '#7B5EA7', 'Dermatologist-prescribed solutions for every skin concern', false, 'Skincare', 'IN', 'https://thederma.co'),
  ('Ustraa', 'ustraa', 'US', '#B04A2C', 'Grooming crafted for the real Indian man', false, 'Men Grooming', 'IN', 'https://ustraa.com'),
  ('Beardo', 'beardo', 'BD', '#2C3E50', 'For the man who takes his look seriously', false, 'Men Grooming', 'IN', 'https://beardo.in')
ON CONFLICT (name) DO UPDATE SET
  slug = EXCLUDED.slug,
  initials = EXCLUDED.initials,
  accent_color = EXCLUDED.accent_color,
  tagline = EXCLUDED.tagline,
  website = EXCLUDED.website;

-- Establish Competitor relationships
-- Man Matters competitors
INSERT INTO competitors (primary_brand_id, competitor_brand_id)
SELECT p.id, c.id FROM brands p, brands c
WHERE p.name = 'Man Matters' AND c.name IN ('Traya', 'Bold Care', 'Ustraa', 'Beardo')
ON CONFLICT DO NOTHING;

-- BeBodywise competitors
INSERT INTO competitors (primary_brand_id, competitor_brand_id)
SELECT p.id, c.id FROM brands p, brands c
WHERE p.name = 'BeBodywise' AND c.name IN ('Minimalist', 'Mamaearth', 'The Derma Co')
ON CONFLICT DO NOTHING;

-- Little Joys competitors
INSERT INTO competitors (primary_brand_id, competitor_brand_id)
SELECT p.id, c.id FROM brands p, brands c
WHERE p.name = 'Little Joys' AND c.name IN ('Mamaearth', 'Minimalist', 'Bold Care')
ON CONFLICT DO NOTHING;
