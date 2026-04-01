"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { ALL_CATEGORY } from "../_types/faq.types";
import { useFaqs } from "../_hooks/useFaqs";
import { FaqSearchBar } from "./FaqSearchBar";
import { FaqFilters } from "./FaqFilters";
import { FaqList } from "./FaqList";
import { FaqSidebar } from "./FaqSidebar";
import type { FaqClientProps } from "../_props/faq.props";

export function FaqClient({ faqs }: FaqClientProps) {
  const {
    categories,
    filteredFaqs,
    search,
    setSearch,
    activeCategory,
    setCategory,
    openItemId,
    toggleItem,
    categoryCounts,
  } = useFaqs(faqs);

  const handleClearSearch = useCallback(() => {
    setSearch("");
  }, [setSearch]);

  const handleBrowseAll = useCallback(() => {
    setSearch("");
    setCategory(ALL_CATEGORY);
  }, [setSearch, setCategory]);

  return (
    <section
      aria-label="Frequently asked questions"
      className="bg-[#f8f7f4] pb-16 pt-8 md:pb-24 md:pt-10"
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6",
          "lg:max-w-7xl lg:px-8"
        )}
      >
        <div className="mb-8 space-y-3">
          <FaqSearchBar value={search} onChange={setSearch} />
          <FaqFilters
            categories={categories}
            activeCategory={activeCategory}
            categoryCounts={categoryCounts}
            onSelect={setCategory}
          />
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_224px] lg:items-start">

          <FaqList
            faqs={filteredFaqs}
            openItemId={openItemId}
            onToggle={toggleItem}
            activeCategory={activeCategory}
            search={search}
            onClearSearch={handleClearSearch}
            onBrowseAll={handleBrowseAll}
          />

          <div className="hidden lg:block">
            <FaqSidebar
              categories={categories}
              activeCategory={activeCategory}
              categoryCounts={categoryCounts}
              onSelect={setCategory}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
