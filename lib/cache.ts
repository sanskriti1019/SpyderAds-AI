const CACHE_TTL_MS = {
  ads: 60 * 1000,      // 1 min
  trends: 5 * 60 * 1000, // 5 min
  insights: 5 * 60 * 1000,
  weeklyBrief: 60 * 60 * 1000, // 1 hr
};

const inMemory = new Map<string, { value: unknown; expiry: number }>();

export function getCache<T>(key: string): T | null {
  const entry = inMemory.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    inMemory.delete(key);
    return null;
  }
  return entry.value as T;
}

export function setCache<T>(key: string, value: T, ttlMs?: number): void {
  const ttl = ttlMs ?? CACHE_TTL_MS.ads;
  inMemory.set(key, { value, expiry: Date.now() + ttl });
}
