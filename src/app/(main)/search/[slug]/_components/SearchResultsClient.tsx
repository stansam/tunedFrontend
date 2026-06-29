"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { useSearchQueryState, useSearchResults } from "../_hooks";
import { ResultsTabs } from "./ResultsTabs";
import { ResultCard } from "./ResultCard";
import { SearchPagination } from "./SearchPagination";
import { getSearchResults } from "../_services";
import { useQueryClient } from "@tanstack/react-query";
import { SearchResponse } from "@/lib/types/search.type";
import { useRouter } from "next/navigation";
import { getPopularSearches, getTrendingSearches } from "@/lib/services/search_analytics.service";
import { SearchResultsHeader } from "./SearchResultsHeader";
import { SearchEmptyState } from "./SearchEmptyState";
import { ConsolidatedResults } from "./ConsolidatedResults";
import { Route } from "next";

interface SearchResultsClientProps {
  slug: string;
  initialData?: SearchResponse;
}

export function SearchResultsClient({ slug, initialData }: SearchResultsClientProps) {
  const { query, type, page, perPage, updateState } = useSearchQueryState(slug);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchInputValue, setSearchInputValue] = useState(query);
  const [popular, setPopular] = useState<string[]>([]);
  const [trending, setTrending] = useState<string[]>([]);

  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setSearchInputValue(query);
    setPrevQuery(query);
  }

  useEffect(() => {
    getPopularSearches(5).then((res) => res.ok && res.data && setPopular(res.data.map((x) => x.query)));
    getTrendingSearches(5).then((res) => res.ok && res.data && setTrending(res.data));
  }, []);

  const { data, isLoading, isError, error } = useSearchResults(query, type, page, perPage);

  const handleHoverPage = (targetPage: number) => {
    queryClient.prefetchQuery({
      queryKey: ["globalSearch", query, type, targetPage, perPage],
      queryFn: () => getSearchResults(query, type, targetPage, perPage).then((res) => {
        if (!res.ok) throw new Error(res.error.message);
        return res.data;
      }),
      staleTime: 5 * 60 * 1000,
    });
  };

  const results = data?.results || initialData?.results || { services: [], samples: [], blogs: [], faqs: [], tags: [] };
  const counts = data?.counts || initialData?.counts || { services: 0, samples: 0, blogs: 0, faqs: 0, tags: 0, total: 0 };
  const currentItems = type !== "all" ? results[`${type}s` as keyof typeof results] || [] : [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SearchResultsHeader
        query={query}
        totalResults={counts.total}
        searchInputValue={searchInputValue}
        onInputChange={setSearchInputValue}
        onSubmit={(e) => {
          e.preventDefault();
          if (searchInputValue.trim()) router.push(`/search/${encodeURIComponent(searchInputValue.trim())}` as Route );
        }}
      />

      <ResultsTabs activeTab={type} counts={counts} onChange={(newTab) => updateState({ type: newTab })} />

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => <div key={i} className="h-28 bg-white border border-slate-100 rounded-2xl" />)}
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-white border border-slate-200 rounded-3xl space-y-3">
          <Info className="mx-auto text-rose-500" size={32} />
          <h3 className="font-bold text-slate-800">Search execution failed</h3>
          <p className="text-sm text-slate-500">{error?.message || "Error loading results."}</p>
        </div>
      ) : counts.total === 0 ? (
        <SearchEmptyState query={query} popular={popular} trending={trending} />
      ) : type === "all" ? (
        <ConsolidatedResults results={results} counts={counts} onViewAll={(t) => updateState({ type: t })} />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-3">
            {currentItems.map((item, idx) => <ResultCard key={item.id} item={item} index={idx} />)}
          </div>
          <SearchPagination
            currentPage={page}
            hasMore={currentItems.length >= perPage}
            onPageChange={(p) => updateState({ page: p })}
            onHoverPage={handleHoverPage}
          />
        </div>
      )}
    </div>
  );
}
