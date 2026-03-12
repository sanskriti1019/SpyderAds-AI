# Deployment Guide – Competitor Ad War Room

## Production deployment summary

| Component | Platform | Notes |
|-----------|----------|-------|
| Frontend + API | Vercel | Next.js serverless functions |
| Database | Supabase | Managed PostgreSQL |
| Scraper | Railway / Fly.io | Python + Playwright |
| AI Engine | Railway / Fly.io | Python + OpenAI/Claude |

---

## 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy:
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - `anon` public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `service_role` key (`SUPABASE_SERVICE_ROLE_KEY`)
3. In **SQL Editor**, run `database/schema.sql`
4. Add your brands:
   ```sql
   INSERT INTO brands (name, is_primary) VALUES ('Your Brand', true);
   INSERT INTO brands (name, is_primary) VALUES ('Competitor A', false);
   ```

---

## 2. Vercel deployment (Frontend + API)

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

When prompted, add env vars or use `vercel env add`.

### Option B: Vercel dashboard

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import your GitHub repo
3. Framework preset: **Next.js**
4. Root directory: `.` (or your app folder)
5. **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. **Deploy**

### Vercel config (`vercel.json`)

Already present in the repo:

- `maxDuration: 30` for API routes
- Cache headers on `/api/*` for better performance

---

## 3. Scraper deployment (Python)

Example for Railway:

1. Create `scraper/Dockerfile`:
   ```dockerfile
   FROM mcr.microsoft.com/playwright/python:v1.42.0-jammy
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   CMD ["python", "scheduler.py"]
   ```

2. Add `scraper/railway.json` or use `Procfile`:
   ```
   web: python scheduler.py
   ```

3. Add env vars: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (Supabase connection string)

4. Configure a cron job (Railway Cron, or external cron) to run weekly

---

## 4. AI Engine deployment (Python)

1. Deploy the AI engine to Railway / Fly.io
2. Add env vars: `DB_*`, `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
3. Trigger from scraper completion or via a scheduled job

---

## 5. Environment variables reference

| Variable | Required | Used by |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Frontend, API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Frontend (if using client-side Supabase) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | API routes |
| `NEXT_PUBLIC_APP_URL` | Optional | Server-side fetch (production URL) |
| `OPENAI_API_KEY` | AI Engine | OpenAI API |
| `ANTHROPIC_API_KEY` | AI Engine | Claude API |

---

## 6. Post-deployment checks

- [ ] Dashboard loads at your Vercel URL
- [ ] `/api/brands` returns brands
- [ ] `/api/ads` returns ads (or empty array)
- [ ] Filters work
- [ ] Charts render
- [ ] Scraper writes to Supabase
- [ ] AI engine populates `ad_analysis` and `weekly_briefs`
