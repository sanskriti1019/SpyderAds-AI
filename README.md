# SpyderAds AI

AI-powered competitive intelligence dashboard for D2C marketing teams. Analyzes Meta Ad Library creatives and generates insights on competitor strategy, trends, and gaps.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Scraper   │────▶│  Supabase   │◀────│  AI Engine  │     │  Dashboard  │
│  (Python)   │     │ (Postgres)  │     │  (Python)   │     │  (Next.js)  │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
       │                    │                    │                  │
       │                    │                    │                  │
       └────────────────────┴────────────────────┴──────────────────┘
                                    │
                           Vercel API Routes
                         /api/ads, /api/trends,
                         /api/insights, /api/weekly-brief
```

## Workflow

1. **Scraper** collects ads from Meta Ad Library → writes to `ads`, `ad_creatives`
2. **Database** (Supabase) stores ads, creatives, brands
3. **AI Engine** analyzes ads (classify, trends, longevity, gaps) → writes to `ad_analysis`, `trend_reports`, `weekly_briefs`
4. **API routes** read from Supabase with in-memory caching
5. **Dashboard** fetches from APIs via SWR (client-side caching)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, Tailwind, Shadcn-style UI, Recharts |
| API | Next.js Route Handlers (serverless) |
| Database | Supabase (PostgreSQL) |
| Caching | In-memory (API) + SWR (client) |
| Scraper | Python, Playwright |
| AI Engine | Python, OpenAI/Claude, Pandas, scikit-learn |

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd marketing-app  # or project folder
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key (for API routes)

### 3. Set up database

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. In Supabase SQL Editor, run `database/schema.sql`
3. Add at least one brand: `INSERT INTO brands (name, is_primary) VALUES ('Your Brand', true);`

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ads` | GET | List ads (filters: brand, format, theme, limit) |
| `/api/trends` | GET | Trend reports (filters: brand_id, period) |
| `/api/insights` | GET | AI insights (filters: brand_id) |
| `/api/weekly-brief` | GET | Weekly briefs (filters: primary_brand_id, competitor_brand_id) |
| `/api/brands` | GET | List brands |
| `/api/dashboard-stats` | GET | KPI counts |

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

### Scraper & AI Engine

Deploy the Python services separately (Railway, Fly.io, or AWS Lambda):

- **Scraper**: Run weekly via cron, writes to Supabase
- **AI Engine**: Run after each scrape or on schedule, writes to `ad_analysis`, `trend_reports`, `weekly_briefs`

## Caching

- **API routes**: In-memory cache per request (TTL: 1–5 min)
- **Client**: SWR with 1–10 min deduplication
- **Headers**: `Cache-Control: s-maxage=60, stale-while-revalidate=300` on `/api/*`

## License

MIT
