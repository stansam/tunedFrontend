"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchPaginationProps } from "../_props";

export function SearchPagination({
  currentPage,
  hasMore,
  onPageChange,
  onHoverPage,
}: SearchPaginationProps) {
  if (currentPage === 1 && !hasMore) return null;

  return (
    <div className="flex items-center justify-between border-t border-slate-200/60 px-4 py-4 sm:px-6 mt-8">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "relative inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-all",
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-50 active:scale-95"
          )}
        >
          Previous
        </button>
        <button
          onClick={() => hasMore && onPageChange(currentPage + 1)}
          onMouseEnter={() => hasMore && onHoverPage?.(currentPage + 1)}
          disabled={!hasMore}
          className={cn(
            "relative ml-3 inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-all",
            !hasMore
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-50 active:scale-95"
          )}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            Showing results for page <span className="font-extrabold text-slate-800">{currentPage}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
            <button
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "relative inline-flex items-center rounded-l-xl border border-slate-300 bg-white p-2.5 text-slate-500 transition-all",
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-slate-50 hover:text-slate-800 active:scale-95"
              )}
              aria-label="Previous Page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>

            <span className="relative inline-flex items-center border border-slate-300 bg-emerald-50/50 px-4 py-2 text-sm font-extrabold text-emerald-700">
              {currentPage}
            </span>

            <button
              onClick={() => hasMore && onPageChange(currentPage + 1)}
              onMouseEnter={() => hasMore && onHoverPage?.(currentPage + 1)}
              disabled={!hasMore}
              className={cn(
                "relative inline-flex items-center rounded-r-xl border border-slate-300 bg-white p-2.5 text-slate-500 transition-all",
                !hasMore
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-slate-50 hover:text-slate-800 active:scale-95"
              )}
              aria-label="Next Page"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
