-- Competitor Ad War Room - Supabase/PostgreSQL Schema
-- Run this in Supabase SQL Editor to set up the database

-- Enums
CREATE TYPE ad_status_enum AS ENUM ('active', 'inactive', 'unknown');
CREATE TYPE ad_format_enum AS ENUM ('image', 'video', 'carousel', 'story', 'unknown');
CREATE TYPE message_theme_enum AS ENUM (
  'problem-solution', 'testimonial', 'before-after',
  'educational', 'offer-driven', 'emotional-branding', 'uncertain'
);
CREATE TYPE period_granularity_enum AS ENUM ('day', 'week', 'month');
CREATE TYPE trend_metric_enum AS ENUM ('format_share', 'theme_share', 'ad_volume');

-- Brands
CREATE TABLE brands (
  id              BIGSERIAL PRIMARY KEY,
  name            TEXT NOT NULL UNIQUE,
  meta_ad_library_id TEXT,
  is_primary      BOOLEAN NOT NULL DEFAULT FALSE,
  industry        TEXT,
  country         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Competitors mapping
CREATE TABLE competitors (
  id               BIGSERIAL PRIMARY KEY,
  primary_brand_id BIGINT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  competitor_brand_id BIGINT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (primary_brand_id, competitor_brand_id)
);

-- Ads
CREATE TABLE ads (
  id           BIGSERIAL PRIMARY KEY,
  brand_id     BIGINT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  meta_ad_id   TEXT NOT NULL,
  platform     TEXT NOT NULL DEFAULT 'Meta',
  status       ad_status_enum NOT NULL DEFAULT 'unknown',
  first_seen_at TIMESTAMPTZ NOT NULL,
  last_seen_at  TIMESTAMPTZ NOT NULL,
  start_date   DATE,
  end_date     DATE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (brand_id, meta_ad_id)
);

-- Ad creatives
CREATE TABLE ad_creatives (
  id                BIGSERIAL PRIMARY KEY,
  ad_id             BIGINT NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
  creative_type     TEXT,
  format_raw        TEXT,
  format_normalized ad_format_enum NOT NULL DEFAULT 'unknown',
  primary_text      TEXT,
  headline          TEXT,
  description       TEXT,
  cta               TEXT,
  landing_page_url  TEXT,
  image_url         TEXT,
  video_url         TEXT,
  thumbnail_url     TEXT,
  creative_hash     TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ad analysis (AI output)
CREATE TABLE ad_analysis (
  id              BIGSERIAL PRIMARY KEY,
  ad_id           BIGINT NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
  creative_id     BIGINT REFERENCES ad_creatives(id) ON DELETE CASCADE,
  format_label    ad_format_enum,
  theme_label     message_theme_enum,
  sentiment       TEXT,
  angle           TEXT,
  tags            JSONB,
  analysis_version TEXT NOT NULL DEFAULT 'v1',
  analyzed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_latest       BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE UNIQUE INDEX ad_analysis_latest_idx ON ad_analysis (ad_id) WHERE is_latest = TRUE;

-- Trend reports
CREATE TABLE trend_reports (
  id                BIGSERIAL PRIMARY KEY,
  brand_id          BIGINT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  competitor_brand_id BIGINT REFERENCES brands(id) ON DELETE CASCADE,
  primary_brand_id  BIGINT REFERENCES brands(id) ON DELETE CASCADE,
  period_start      DATE NOT NULL,
  period_end        DATE NOT NULL,
  granularity       period_granularity_enum NOT NULL,
  metric_type       trend_metric_enum NOT NULL,
  label_type        TEXT NOT NULL,
  label_value       TEXT NOT NULL,
  value             NUMERIC NOT NULL,
  baseline_value    NUMERIC,
  delta             NUMERIC,
  extra             JSONB,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Weekly briefs
CREATE TABLE weekly_briefs (
  id                  BIGSERIAL PRIMARY KEY,
  primary_brand_id    BIGINT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  competitor_brand_id BIGINT REFERENCES brands(id) ON DELETE CASCADE,
  week_start          DATE NOT NULL,
  week_end            DATE NOT NULL,
  summary_md          TEXT NOT NULL,
  insights_json       JSONB,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (primary_brand_id, competitor_brand_id, week_start)
);

-- Indexes for analytical queries
CREATE INDEX idx_ads_brand_first_seen ON ads (brand_id, first_seen_at);
CREATE INDEX idx_ads_brand_last_seen ON ads (brand_id, last_seen_at);
CREATE INDEX idx_ads_brand_status_last ON ads (brand_id, status, last_seen_at);
CREATE INDEX idx_ad_creatives_ad_id ON ad_creatives (ad_id);
CREATE INDEX idx_ad_analysis_ad_id ON ad_analysis (ad_id);
CREATE INDEX idx_trend_reports_brand_period ON trend_reports (brand_id, period_start, metric_type, label_type, label_value);
CREATE INDEX idx_weekly_briefs_primary_week ON weekly_briefs (primary_brand_id, week_start);
CREATE INDEX idx_competitors_primary ON competitors (primary_brand_id);

-- RLS (optional - enable for multi-tenant)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_creatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE trend_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_briefs ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (Supabase default)
CREATE POLICY "Service role full access brands" ON brands FOR ALL USING (true);
CREATE POLICY "Service role full access ads" ON ads FOR ALL USING (true);
CREATE POLICY "Service role full access ad_creatives" ON ad_creatives FOR ALL USING (true);
CREATE POLICY "Service role full access ad_analysis" ON ad_analysis FOR ALL USING (true);
CREATE POLICY "Service role full access trend_reports" ON trend_reports FOR ALL USING (true);
CREATE POLICY "Service role full access weekly_briefs" ON weekly_briefs FOR ALL USING (true);
