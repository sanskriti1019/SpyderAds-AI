import useSWR from "swr";
import {
  fetchAds,
  fetchTrends,
  fetchInsights,
  fetchWeeklyBrief,
  fetchBrands,
  fetchDashboardStats,
} from "./api";

const swrDefaults = { revalidateOnFocus: false, dedupingInterval: 60_000 };

export function useAds(params?: { brand?: string; format?: string; theme?: string }) {
  const key = params ? ["ads", params] : ["ads"];
  return useSWR(key, () => fetchAds(params), swrDefaults);
}

export function useTrends(params?: { brand_id?: string; period?: string }) {
  const key = params ? ["trends", params] : ["trends"];
  return useSWR(key, () => fetchTrends(params), { ...swrDefaults, dedupingInterval: 5 * 60_000 });
}

export function useInsights(params?: { brand_id?: string }) {
  const key = params ? ["insights", params] : ["insights"];
  return useSWR(key, () => fetchInsights(params), { ...swrDefaults, dedupingInterval: 5 * 60_000 });
}

export function useWeeklyBrief(params?: { primary_brand_id?: string; competitor_brand_id?: string }) {
  const key = params ? ["weekly-brief", params] : ["weekly-brief"];
  return useSWR(key, () => fetchWeeklyBrief(params), { ...swrDefaults, dedupingInterval: 60 * 60_000 });
}

export function useBrands() {
  return useSWR("brands", fetchBrands, { ...swrDefaults, dedupingInterval: 10 * 60_000 });
}

export function useDashboardStats() {
  return useSWR("dashboard-stats", fetchDashboardStats, { ...swrDefaults, dedupingInterval: 2 * 60_000 });
}
