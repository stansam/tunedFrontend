import { Button } from "@/components/ui/button";

import type {BlogsPaginationProps } from "../_props/blogs.props";

export function BlogsPagination({ page, total, onPageChange }: BlogsPaginationProps) {
  if (total <= 10) return null;
  return (
    <div className="flex justify-between items-center bg-white/40 border border-white/50 backdrop-blur-md rounded-2xl p-4">
      <span className="text-xs font-semibold text-slate-500">
        Showing {(page - 1) * 10 + 1}-{Math.min(page * 10, total)} of {total}
      </span>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-xl border-white/50 bg-white/40"
        >
          Prev
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={page * 10 >= total}
          onClick={() => onPageChange(page + 1)}
          className="rounded-xl border-white/50 bg-white/40 font-semibold"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
