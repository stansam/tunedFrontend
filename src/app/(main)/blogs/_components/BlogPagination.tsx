import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPaginationProps } from "../_props/blog.props";

export function BlogPagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (page > 3) pages.push("...");
      
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      
      for (let i = start; i <= end; i++) {
         if (!pages.includes(i)) pages.push(i);
      }
      
      if (page < totalPages - 2) pages.push("...");
      
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages.map((p, i) => (
      <Button
        key={i}
        variant={p === page ? "default" : "ghost"}
        onClick={() => typeof p === "number" && onPageChange(p)}
        disabled={typeof p === "string"}
        className={cn(
          "h-9 w-9 p-0 text-sm font-semibold rounded-lg",
          p === page ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-none" : "text-slate-600"
        )}
      >
        {p}
      </Button>
    ));
  };

  return (
    <nav 
      aria-label="Blogs pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className="border-slate-200 bg-white text-slate-700 disabled:opacity-50 h-9 w-9 p-0 rounded-lg"
      >
        <ChevronLeft size={18} />
      </Button>

      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="border-slate-200 bg-white text-slate-700 disabled:opacity-50 h-9 w-9 p-0 rounded-lg"
      >
        <ChevronRight size={18} />
      </Button>
    </nav>
  );
}
