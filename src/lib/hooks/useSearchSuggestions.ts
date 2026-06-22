"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { fetchSearchSuggestions } from "../services/search.service";
import { getPopularSearches, getTrendingSearches } from "../services/search_analytics.service";

export function useSearchSuggestions(query: string) {
  const debouncedQuery = useDebounce(query, 300);

  const popularQuery = useQuery({
    queryKey: ["searchAnalytics", "popular"],
    queryFn: async () => {
      const res = await getPopularSearches(5);
      return res.ok ? res.data : [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const trendingQuery = useQuery({
    queryKey: ["searchAnalytics", "trending"],
    queryFn: async () => {
      const res = await getTrendingSearches(5);
      return res.ok ? res.data : [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const suggestionsQuery = useQuery({
    queryKey: ["searchSuggestions", debouncedQuery],
    queryFn: async () => {
      const res = await fetchSearchSuggestions(debouncedQuery);
      return res.ok ? res.data : { services: [], samples: [], blogs: [], tags: [] };
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 60 * 1000,
  });

  return {
    popular: popularQuery.data || [],
    trending: trendingQuery.data || [],
    suggestions: suggestionsQuery.data || { services: [], samples: [], blogs: [], tags: [] },
    isLoadingSuggestions: suggestionsQuery.isLoading && debouncedQuery.length >= 2,
    isErrorSuggestions: suggestionsQuery.isError,
  };
}
