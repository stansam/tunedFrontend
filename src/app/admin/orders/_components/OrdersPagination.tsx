"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OrdersPaginationProps } from "../_props/orders.props";

export function OrdersPagination({ total, page, perPage, onPageChange }: OrdersPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="size-8 rounded-lg bg-white/40 border-white/50 hover:bg-white/60 shrink-0"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none px-1">
        {pages.map((p) => (
          <Button
            key={p}
            variant={page === p ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(p)}
            className={`size-8 rounded-lg text-xs shrink-0 ${
              page === p
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-white/40 border-white/50 hover:bg-white/60 text-slate-700"
            }`}
          >
            {p}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="size-8 rounded-lg bg-white/40 border-white/50 hover:bg-white/60 shrink-0"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
