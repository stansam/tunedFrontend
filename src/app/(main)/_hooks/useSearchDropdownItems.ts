import { useMemo } from "react";
import type { FlatItem, PopularSearchItem } from "../_types/search.types";
import type { SuggestionItem, SearchSuggestionsResponse } from "@/lib/types/search.type";

interface UseSearchDropdownItemsProps {
  isOpen: boolean;
  query: string;
  recent: string[];
  popular: PopularSearchItem[];
  trending: string[];
  suggestions: SearchSuggestionsResponse | null;
}

export function useSearchDropdownItems({
  isOpen,
  query,
  recent,
  popular,
  trending,
  suggestions,
}: UseSearchDropdownItemsProps): FlatItem[] {
  return useMemo<FlatItem[]>(() => {
    if (!isOpen) return [];

    const items: FlatItem[] = [];
    const isSearching = query.trim().length >= 2;

    if (!isSearching) {
      recent.slice(0, 3).forEach((q, idx) =>
        items.push({ id: `recent-${idx}`, label: q, type: "recent", value: q, path: `/search/${encodeURIComponent(q)}` })
      );
      popular.slice(0, 3).forEach((p, idx) =>
        items.push({ id: `popular-${idx}`, label: p.query, type: "popular", value: p.query, path: `/search/${encodeURIComponent(p.query)}` })
      );
      trending.slice(0, 3).forEach((t, idx) =>
        items.push({ id: `trending-${idx}`, label: t, type: "trending", value: t, path: `/search/${encodeURIComponent(t)}` })
      );
    } else if (suggestions) {
      suggestions.tags.forEach((i: SuggestionItem) =>
        items.push({ id: `tag-${i.id}`, label: i.name || "", type: "tag", value: i.name || "", path: `/search/${encodeURIComponent(i.name || "")}?type=tag` })
      );
      suggestions.services.forEach((i: SuggestionItem) =>
        items.push({ id: `service-${i.id}`, label: i.name || "", type: "service", value: i.name || "", path: `/services/${i.slug}` })
      );
      suggestions.samples.forEach((i: SuggestionItem) =>
        items.push({ id: `sample-${i.id}`, label: i.title || "", type: "sample", value: i.title || "", path: `/samples/${i.slug}` })
      );
      suggestions.blogs.forEach((i: SuggestionItem) =>
        items.push({ id: `blog-${i.id}`, label: i.title || "", type: "blog", value: i.title || "", path: `/blogs/${i.slug}` })
      );
    }

    return items;
  }, [isOpen, query, recent, popular, trending, suggestions]);
}
