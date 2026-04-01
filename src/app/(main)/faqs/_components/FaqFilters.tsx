"use client";

import { cn } from "@/lib/utils";
import { ALL_CATEGORY } from "../_types/faq.types";
import type { FaqFiltersProps } from "../_props/faq.props";

export function FaqFilters({
  categories,
  activeCategory,
  categoryCounts,
  onSelect,
}: FaqFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className={cn(
        "flex gap-2 overflow-x-auto pb-1",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      )}
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        const isAll    = category === ALL_CATEGORY;
        const count    = categoryCounts[category] ?? 0;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full",
              "px-4 py-1.5 text-sm font-medium",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              isActive
                ? "bg-emerald-500 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
            )}
          >
            {category}
            {!isAll && (
              <span
                className={cn(
                  "inline-flex h-5 min-w-[20px] items-center justify-center rounded-full",
                  "px-1 text-xs font-semibold",
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-slate-100 text-slate-500"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
