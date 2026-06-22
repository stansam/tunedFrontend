import { apiPost, apiGet } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type {
  TrackSearchEventRequest,
  TrackSearchEventResponse,
  TrackSearchClickRequest,
  TrackSearchClickResponse,
  PopularSearchItem
} from "@/app/(main)/_types/search.types";

export async function trackSearchEvent(data: TrackSearchEventRequest): Promise<ApiResult<TrackSearchEventResponse>> {
  return apiPost<TrackSearchEventResponse>("/search/track/event", data);
}

export async function trackSearchClick(data: TrackSearchClickRequest): Promise<ApiResult<TrackSearchClickResponse>> {
  return apiPost<TrackSearchClickResponse>("/search/track/click", data);
}

export async function getPopularSearches(limit: number = 5): Promise<ApiResult<PopularSearchItem[]>> {
  return apiGet<PopularSearchItem[]>(`/search/analytics/popular?limit=${limit}`);
}

export async function getTrendingSearches(limit: number = 5): Promise<ApiResult<string[]>> {
  return apiGet<string[]>(`/search/analytics/trending?limit=${limit}`);
}
