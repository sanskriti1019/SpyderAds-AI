-- SpyderAds AI — Seed Script
-- Run AFTER schema.sql in Supabase SQL Editor.
-- Inserts all 10 competitor brands.

INSERT INTO brands (name, meta_ad_library_id, is_primary, industry, country) VALUES
  ('Bebodywise',   'bebodywise',          false, 'Health & Wellness', 'IN'),
  ('Man Matters',  'manmatters',          false, 'Health & Wellness', 'IN'),
  ('Little Joys',  'littlejoysofficial',  false, 'Health & Wellness', 'IN'),
  ('Traya',        'trayahealth',         false, 'Hair Care',         'IN'),
  ('Bold Care',    'boldcareindia',       false, 'Health & Wellness', 'IN'),
  ('Minimalist',   'minimalistofficial',  false, 'Skincare',          'IN'),
  ('Mamaearth',    'mamaearth',           false, 'Personal Care',     'IN'),
  ('The Derma Co', 'thedermaco',          false, 'Skincare',          'IN'),
  ('Ustraa',       'ustraa',              false, 'Men Grooming',      'IN'),
  ('Beardo',       'beardo',              false, 'Men Grooming',      'IN')
ON CONFLICT (name) DO NOTHING;
