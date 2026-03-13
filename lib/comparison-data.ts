import { PrimaryBrand } from "@/lib/brand-context";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface BrandCompetitorRow {
  name: string;          // brand name (the primary brand or a competitor)
  isPrimary?: boolean;

  // Market Share Bar Chart
  adVolume: number;      // estimated monthly ads
  estimatedSpend: number; // relative spend index 0–100
  activeFormats: number;  // distinct ad formats used
  themeVariety: number;   // unique messaging themes
  channelReach: number;   // channels covered (index 0–100)

  // Ad Activity Comparison
  weeklyAds: number[];    // 4 week rolling ad counts [W1,W2,W3,W4]
  formatMix: { format: string; pct: number }[];

  // Positioning Scatter
  brandStrength: number;   // 0–100 (brand equity)
  digitalAgility: number;  // 0–100 (ad refresh speed / digital presence)
  audienceDepth: number;   // 0–100 (how locked-in their audience is)
}

export interface ComparisonDataset {
  brands: BrandCompetitorRow[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_DATA: Record<PrimaryBrand, ComparisonDataset> = {
  "BeBodywise": {
    brands: [
      {
        name: "BeBodywise",
        isPrimary: true,
        adVolume: 65,
        estimatedSpend: 55,
        activeFormats: 4,
        themeVariety: 5,
        channelReach: 70,
        weeklyAds: [12, 16, 19, 18],
        formatMix: [
          { format: "Video", pct: 45 },
          { format: "Image", pct: 30 },
          { format: "Carousel", pct: 25 },
        ],
        brandStrength: 60,
        digitalAgility: 72,
        audienceDepth: 65,
      },
      {
        name: "Minimalist",
        adVolume: 95,
        estimatedSpend: 60,
        activeFormats: 3,
        themeVariety: 3,
        channelReach: 65,
        weeklyAds: [18, 22, 26, 29],
        formatMix: [
          { format: "Carousel", pct: 55 },
          { format: "Image", pct: 35 },
          { format: "Video", pct: 10 },
        ],
        brandStrength: 72,
        digitalAgility: 68,
        audienceDepth: 78,
      },
      {
        name: "Mamaearth",
        adVolume: 200,
        estimatedSpend: 95,
        activeFormats: 5,
        themeVariety: 6,
        channelReach: 95,
        weeklyAds: [42, 52, 56, 50],
        formatMix: [
          { format: "Video", pct: 50 },
          { format: "Image", pct: 30 },
          { format: "Carousel", pct: 20 },
        ],
        brandStrength: 90,
        digitalAgility: 85,
        audienceDepth: 80,
      },
      {
        name: "The Derma Co",
        adVolume: 110,
        estimatedSpend: 72,
        activeFormats: 4,
        themeVariety: 4,
        channelReach: 72,
        weeklyAds: [22, 28, 32, 28],
        formatMix: [
          { format: "Video", pct: 55 },
          { format: "Image", pct: 35 },
          { format: "Carousel", pct: 10 },
        ],
        brandStrength: 75,
        digitalAgility: 70,
        audienceDepth: 72,
      },
    ],
  },

  "Man Matters": {
    brands: [
      {
        name: "Man Matters",
        isPrimary: true,
        adVolume: 90,
        estimatedSpend: 65,
        activeFormats: 4,
        themeVariety: 5,
        channelReach: 75,
        weeklyAds: [18, 22, 26, 24],
        formatMix: [
          { format: "Video", pct: 50 },
          { format: "Carousel", pct: 30 },
          { format: "Image", pct: 20 },
        ],
        brandStrength: 68,
        digitalAgility: 78,
        audienceDepth: 72,
      },
      {
        name: "Traya",
        adVolume: 80,
        estimatedSpend: 70,
        activeFormats: 3,
        themeVariety: 4,
        channelReach: 68,
        weeklyAds: [16, 20, 22, 22],
        formatMix: [
          { format: "Video", pct: 65 },
          { format: "Carousel", pct: 25 },
          { format: "UGC", pct: 10 },
        ],
        brandStrength: 74,
        digitalAgility: 65,
        audienceDepth: 80,
      },
      {
        name: "Bold Care",
        adVolume: 120,
        estimatedSpend: 85,
        activeFormats: 4,
        themeVariety: 5,
        channelReach: 82,
        weeklyAds: [24, 30, 36, 30],
        formatMix: [
          { format: "Video", pct: 55 },
          { format: "Image", pct: 30 },
          { format: "Story", pct: 15 },
        ],
        brandStrength: 80,
        digitalAgility: 88,
        audienceDepth: 65,
      },
      {
        name: "Beardo",
        adVolume: 70,
        estimatedSpend: 55,
        activeFormats: 3,
        themeVariety: 3,
        channelReach: 60,
        weeklyAds: [14, 17, 21, 18],
        formatMix: [
          { format: "Image", pct: 55 },
          { format: "Video", pct: 35 },
          { format: "Story", pct: 10 },
        ],
        brandStrength: 70,
        digitalAgility: 58,
        audienceDepth: 68,
      },
      {
        name: "Ustraa",
        adVolume: 60,
        estimatedSpend: 45,
        activeFormats: 3,
        themeVariety: 3,
        channelReach: 55,
        weeklyAds: [12, 14, 16, 18],
        formatMix: [
          { format: "Video", pct: 60 },
          { format: "Image", pct: 25 },
          { format: "Story", pct: 15 },
        ],
        brandStrength: 66,
        digitalAgility: 55,
        audienceDepth: 70,
      },
    ],
  },

  "Little Joys": {
    brands: [
      {
        name: "Little Joys",
        isPrimary: true,
        adVolume: 55,
        estimatedSpend: 45,
        activeFormats: 3,
        themeVariety: 4,
        channelReach: 60,
        weeklyAds: [10, 13, 15, 17],
        formatMix: [
          { format: "Video", pct: 50 },
          { format: "Image", pct: 35 },
          { format: "Carousel", pct: 15 },
        ],
        brandStrength: 52,
        digitalAgility: 60,
        audienceDepth: 62,
      },
      {
        name: "Mamaearth",
        adVolume: 200,
        estimatedSpend: 95,
        activeFormats: 5,
        themeVariety: 6,
        channelReach: 95,
        weeklyAds: [42, 52, 56, 50],
        formatMix: [
          { format: "Video", pct: 50 },
          { format: "Image", pct: 30 },
          { format: "Carousel", pct: 20 },
        ],
        brandStrength: 90,
        digitalAgility: 85,
        audienceDepth: 80,
      },
      {
        name: "Bold Care",
        adVolume: 120,
        estimatedSpend: 85,
        activeFormats: 4,
        themeVariety: 5,
        channelReach: 82,
        weeklyAds: [24, 30, 36, 30],
        formatMix: [
          { format: "Video", pct: 55 },
          { format: "Image", pct: 30 },
          { format: "Story", pct: 15 },
        ],
        brandStrength: 80,
        digitalAgility: 88,
        audienceDepth: 65,
      },
      {
        name: "Minimalist",
        adVolume: 95,
        estimatedSpend: 60,
        activeFormats: 3,
        themeVariety: 3,
        channelReach: 65,
        weeklyAds: [18, 22, 26, 29],
        formatMix: [
          { format: "Carousel", pct: 55 },
          { format: "Image", pct: 35 },
          { format: "Video", pct: 10 },
        ],
        brandStrength: 72,
        digitalAgility: 68,
        audienceDepth: 78,
      },
    ],
  },
};

export function getComparisonData(brand: PrimaryBrand): ComparisonDataset {
  return ALL_DATA[brand];
}

// Tooltip style shared across charts
export const TOOLTIP_STYLE = {
  backgroundColor: "rgba(247, 243, 236, 0.97)",
  border: "1px solid #D8D2C6",
  borderRadius: "12px",
  color: "#1A1A1A",
  fontSize: "12px",
  fontWeight: 600,
  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
};

// Color palette: primary brand is always maroon, competitors use a gradient of dark tones
export const CHART_COLORS = ["#6E2C2C", "#1A1A1A", "#8B6F47", "#4A6E6E", "#6E4A7C", "#4A7C59"];
export const PRIMARY_COLOR = "#6E2C2C";
export const SECONDARY_COLORS = ["#1A1A1A", "#8B6F47", "#4A6E6E", "#6E4A7C", "#4A7C59"];
