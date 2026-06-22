import { executeGlobalSearch } from "@/lib/services/search.service";
import type { SearchResponse } from "@/lib/types/search.type";
import type { ApiResult } from "@/lib/types";

export async function getSearchResults(
  query: string,
  type: string = 'all',
  page: number = 1,
  perPage: number = 20
): Promise<ApiResult<SearchResponse>> {
  return executeGlobalSearch(query, type, page, perPage);
}
