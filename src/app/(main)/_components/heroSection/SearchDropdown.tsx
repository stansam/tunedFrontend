"use client";

import React, { useEffect, useState } from "react";
import { useSearchSuggestions } from "@/lib/hooks/useSearchSuggestions";
import { useSearchDropdownItems } from "../../_hooks/useSearchDropdownItems";
import { DefaultSuggestionsList } from "./DefaultSuggestionsList";
import { SearchSuggestionsList } from "./SearchSuggestionsList";
import { SuggestionsSkeleton, NoSuggestionsFound } from "./DropdownStates";
import type { SearchDropdownProps } from "../../_props/search.props";

export function SearchDropdown({
  query,
  isOpen,
  onSelect,
  activeIndex,
  setActiveIndex,
  setFlatItems,
}: SearchDropdownProps) {
  const [recent, setRecent] = useState<string[]>([]);
  const { popular, trending, suggestions, isLoadingSuggestions } = useSearchSuggestions(query);

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const stored = localStorage.getItem("recent_searches");
      try {
        const parsed = stored ? JSON.parse(stored) : [];
        setTimeout(() => setRecent(parsed), 0);
      } catch {
        setTimeout(() => setRecent([]), 0);
      }
    }
  }, [isOpen]);

  const flatItems = useSearchDropdownItems({
    isOpen,
    query,
    recent,
    popular,
    trending,
    suggestions,
  });

  useEffect(() => {
    setFlatItems(flatItems);
  }, [flatItems, setFlatItems]);

  if (!isOpen) return null;

  const isSearching = query.trim().length >= 2;
  const clearRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem("recent_searches");
    setRecent([]);
  };

  return (
    <div
      className="absolute top-[105%] left-0 right-0 z-50 mt-1 max-h-[380px] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-md"
      role="listbox"
      id="search-results-listbox"
      aria-label="Search suggestions"
    >
      {isLoadingSuggestions && isSearching ? (
        <SuggestionsSkeleton />
      ) : isSearching && flatItems.length === 0 ? (
        <NoSuggestionsFound />
      ) : isSearching ? (
        <SearchSuggestionsList
          flatItems={flatItems}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onSelect={(item) => onSelect(item.value, item.path)}
        />
      ) : (
        <DefaultSuggestionsList
          flatItems={flatItems}
          recent={recent}
          popularCount={popular.length}
          trendingCount={trending.length}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onSelect={(item) => onSelect(item.value, item.path)}
          onClearRecent={clearRecent}
        />
      )}
    </div>
  );
}
