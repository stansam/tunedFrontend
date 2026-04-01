"use client";

import { useState, useMemo, useCallback } from "react";
import { ALL_CATEGORY, deriveFaqCategories } from "../_types/faq.types";
import type { FaqItem, FaqCategories } from "../_types/faq.types";

export interface UseFaqsReturn {
  readonly categories:     FaqCategories;
  readonly filteredFaqs:   readonly FaqItem[];
  readonly search:         string;
  readonly setSearch:      (value: string) => void;
  readonly activeCategory: string;
  readonly setCategory:    (category: string) => void;
  readonly openItemId:     string | null;
  readonly toggleItem:     (id: string) => void;
  readonly categoryCounts: Readonly<Record<string, number>>;
  readonly resultCount:    number;
}

export function useFaqs(faqs: readonly FaqItem[]): UseFaqsReturn {
  const categories = useMemo(() => deriveFaqCategories(faqs), [faqs]);

  const [search,         setSearchRaw]  = useState("");
  const [activeCategory, setCategory]   = useState<string>(ALL_CATEGORY);
  const [openItemId,     setOpenItemId] = useState<string | null>(null);

  const setSearch = useCallback((value: string) => {
    setSearchRaw(value);
    setOpenItemId(null); // collapse on new search
  }, []);

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        (activeCategory === ALL_CATEGORY || f.category === activeCategory) &&
        (!q ||
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q))
    );
  }, [faqs, search, activeCategory]);

  const toggleItem = useCallback((id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  }, []);

  const categoryCounts = useMemo<Readonly<Record<string, number>>>(() => {
    const counts: Record<string, number> = { [ALL_CATEGORY]: faqs.length };
    for (const faq of faqs) {
      counts[faq.category] = (counts[faq.category] ?? 0) + 1;
    }
    return counts;
  }, [faqs]);

  return {
    categories,
    filteredFaqs,
    search,
    setSearch,
    activeCategory,
    setCategory,
    openItemId,
    toggleItem,
    categoryCounts,
    resultCount: filteredFaqs.length,
  };
}
