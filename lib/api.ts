const BASE = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function fetchAds(params?: { brand?: string; format?: string; theme?: string; limit?: number }) {
  const q = new URLSearchParams();
  if (params?.brand) q.set("brand", params.brand);
  if (params?.format) q.set("format", params.format);
  if (params?.theme) q.set("theme", params.theme);
  if (params?.limit) q.set("limit", String(params.limit));
  const res = await fetch(`${BASE}/api/ads?${q}`);
  if (!res.ok) throw new Error("Failed to fetch ads");
  return res.json();
}

export async function fetchTrends(params?: { brand?: string; period?: string }) {
  const q = new URLSearchParams();
  if (params?.brand) q.set("brand", params.brand);
  if (params?.period) q.set("period", params.period);
  const res = await fetch(`${BASE}/api/trends?${q}`);
  if (!res.ok) throw new Error("Failed to fetch trends");
  return res.json();
}

export async function fetchInsights(params?: { brand?: string }) {
  const q = params?.brand ? `?brand=${encodeURIComponent(params.brand)}` : "";
  const res = await fetch(`${BASE}/api/insights${q}`);
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
}

export async function fetchWeeklyBrief(params?: { brand?: string }) {
  const q = params?.brand ? `?brand=${encodeURIComponent(params.brand)}` : "";
  const res = await fetch(`${BASE}/api/weekly-brief${q}`);
  if (!res.ok) throw new Error("Failed to fetch weekly brief");
  return res.json();
}

export async function fetchBrands() {
  const res = await fetch(`${BASE}/api/brands`);
  if (!res.ok) throw new Error("Failed to fetch brands");
  return res.json();
}

export async function fetchDashboardStats(params?: { brand?: string }) {
  const q = params?.brand ? `?brand=${encodeURIComponent(params.brand)}` : "";
  const res = await fetch(`${BASE}/api/dashboard-stats${q}`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchLongevity(params?: { brand?: string }) {
  const q = params?.brand ? `?brand=${encodeURIComponent(params.brand)}` : "";
  const res = await fetch(`${BASE}/api/longevity${q}`);
  if (!res.ok) throw new Error("Failed to fetch longevity data");
  return res.json();
}
