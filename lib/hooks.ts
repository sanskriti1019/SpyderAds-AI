import useSWR from "swr";
import {
  fetchAds,
  fetchTrends,
  fetchInsights,
  fetchWeeklyBrief,
  fetchBrands,
  fetchDashboardStats,
  fetchLongevity,
} from "./api";

const swrDefaults = { revalidateOnFocus: false, dedupingInterval: 60_000 };

export function useAds(params?: { brand?: string; format?: string; theme?: string }) {
  const key = ["ads", params?.brand ?? "", params?.format ?? "", params?.theme ?? ""];
  return useSWR(key, () => fetchAds(params), swrDefaults);
}

export function useTrends(params?: { brand?: string; period?: string }) {
  const key = ["trends", params?.brand ?? "", params?.period ?? ""];
  return useSWR(key, () => fetchTrends(params), { ...swrDefaults, dedupingInterval: 5 * 60_000 });
}

export function useInsights(params?: { brand?: string }) {
  const key = ["insights", params?.brand ?? ""];
  return useSWR(key, () => fetchInsights(params), { ...swrDefaults, dedupingInterval: 5 * 60_000 });
}

export function useWeeklyBrief(params?: { brand?: string }) {
  const key = ["weekly-brief", params?.brand ?? ""];
  return useSWR(key, () => fetchWeeklyBrief(params), { ...swrDefaults, dedupingInterval: 60 * 60_000 });
}

export function useBrands() {
  return useSWR("brands", fetchBrands, { ...swrDefaults, dedupingInterval: 10 * 60_000 });
}

export function useDashboardStats(params?: { brand?: string }) {
  const key = ["dashboard-stats", params?.brand ?? ""];
  return useSWR(key, () => fetchDashboardStats(params), { ...swrDefaults, dedupingInterval: 2 * 60_000 });
}

export function useLongevity(params?: { brand?: string }) {
  const key = ["longevity", params?.brand ?? ""];
  return useSWR(key, () => fetchLongevity(params), { ...swrDefaults, dedupingInterval: 5 * 60_000 });
}
