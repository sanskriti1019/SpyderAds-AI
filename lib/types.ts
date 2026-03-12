export interface Ad {
  id: number;
  brand_id: number;
  meta_ad_id: string;
  brand_name?: string;
  platform: string;
  status: string;
  first_seen_at: string;
  last_seen_at: string;
  start_date: string | null;
  end_date: string | null;
  copy?: string;
  creative_url?: string;
  format?: string;
  theme?: string;
  cta?: string;
  landing_page?: string;
}

export interface Trend {
  brand_id: number;
  brand_name: string;
  period_start: string;
  period_end: string;
  metric_type: string;
  label_type: string;
  label_value: string;
  value: number;
  baseline_value?: number;
  delta?: number;
}

export interface Insight {
  competitor: string;
  trend: string;
  evidence: Record<string, unknown>;
  strategic_implication: string;
}

export interface WeeklyBrief {
  id: number;
  primary_brand_id: number;
  competitor_brand_id: number | null;
  week_start: string;
  week_end: string;
  summary_md: string;
  insights_json: Insight[] | null;
  created_at: string;
}

export interface Filters {
  brand?: string;
  format?: string;
  theme?: string;
  startDate?: string;
  endDate?: string;
}
