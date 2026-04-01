"use client";

import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqEmptyStateProps } from "../_props/faq.props";

export function FaqEmptyState({
  search,
  onClearSearch,
  onBrowseAll,
}: FaqEmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div
        className={cn(
          "mb-5 flex h-16 w-16 items-center justify-center rounded-2xl",
          "bg-slate-100 text-slate-400"
        )}
      >
        <SearchX size={28} aria-hidden="true" />
      </div>

      <h3 className="text-base font-semibold text-slate-700">
        No results found
      </h3>

      {search.trim().length > 0 && (
        <p className="mt-1.5 text-sm text-slate-500">
          Nothing matched{" "}
          <span className="font-medium text-slate-700">
            &ldquo;{search}&rdquo;
          </span>
        </p>
      )}

      <p className="mt-1 text-sm text-slate-400">
        Try a different keyword or browse by category.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {search.trim().length > 0 && (
          <button
            type="button"
            onClick={onClearSearch}
            className={cn(
              "rounded-full border border-slate-200 bg-white",
              "px-5 py-2 text-sm font-medium text-slate-600",
              "transition-colors hover:bg-slate-50",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            )}
          >
            Clear search
          </button>
        )}
        <button
          type="button"
          onClick={onBrowseAll}
          className={cn(
            "rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white",
            "transition-colors hover:bg-emerald-600",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          )}
        >
          Browse all questions
        </button>
      </div>
    </div>
  );
}
