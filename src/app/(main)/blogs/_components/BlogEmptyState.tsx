import { FileQuestion, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogEmptyStateProps } from "../_props/blog.props";

export function BlogEmptyState({ search, onClearFilters }: BlogEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className={cn(
        "mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white",
        "ring-8 ring-white/50 shadow-sm"
      )}>
        <FileQuestion size={40} className="text-slate-300" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        No articles found
      </h3>
      
      <p className="max-w-md text-slate-500 mb-8">
        We couldn&apos;t find any articles matching {search ? `"${search}"` : "your current filters"}. 
        Try adjusting your search terms or exploring different categories.
      </p>

      <Button
        onClick={onClearFilters}
        className="bg-emerald-500 hover:bg-emerald-600 font-semibold px-6 rounded-full shadow-none"
      >
        <RotateCcw size={16} className="mr-2" />
        Show all articles
      </Button>
    </div>
  );
}
