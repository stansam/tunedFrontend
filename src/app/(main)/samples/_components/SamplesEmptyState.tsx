import { FileSearch, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SamplesEmptyStateProps } from "../_props/samples.props";

export function SamplesEmptyState({ search, onClearFilters }: SamplesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className={cn(
        "mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50",
        "ring-8 ring-white"
      )}>
        <FileSearch size={40} className="text-slate-300" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        No matches found
      </h3>
      
      <p className="max-w-md text-slate-500 mb-8">
        We couldn&apos;t find any samples matching {search ? `"${search}"` : "your current filters"}. 
        Try adjusting your search terms or clearing your filters.
      </p>

      <Button
        onClick={onClearFilters}
        className="bg-emerald-500 hover:bg-emerald-600 font-semibold px-6 rounded-full shadow-none"
      >
        <RotateCcw size={16} className="mr-2" />
        Clear all filters
      </Button>
    </div>
  );
}
