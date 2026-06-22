import { apiGet } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type { SearchSuggestionsResponse, SearchResponse } from "@/lib/types/search.type";

export async function fetchSearchSuggestions(query: string): Promise<ApiResult<SearchSuggestionsResponse>> {
  return apiGet<SearchSuggestionsResponse>(`/search/suggestions?q=${encodeURIComponent(query)}`);
}

export async function executeGlobalSearch(query: string, type: string = 'all', page: number = 1, perPage: number = 20): Promise<ApiResult<SearchResponse>> {
  return apiGet<SearchResponse>(`/search?q=${encodeURIComponent(query)}&type=${type}&page=${page}&per_page=${perPage}`);
}
