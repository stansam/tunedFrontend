"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTotalPages, buildPaginationWindow } from "../_utils";
import type { OrdersPaginationProps } from "../_props";

export function OrdersPagination({
  page,
  total,
  perPage,
  onPageChange,
  isPending,
}: OrdersPaginationProps) {
  const totalPages = getTotalPages(total, perPage);
  if (totalPages <= 1) return null;

  const pages = buildPaginationWindow(page, totalPages, 5);

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
      <p className="text-xs text-slate-500">
        {total} order{total !== 1 ? "s" : ""} &middot; Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-1" role="navigation" aria-label="Pagination">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || isPending}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-8 w-8 text-xs",
              p === page && "border-emerald-600 bg-emerald-600 hover:bg-emerald-700",
            )}
            onClick={() => onPageChange(p)}
            disabled={isPending}
            aria-label={`Go to page ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || isPending}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
