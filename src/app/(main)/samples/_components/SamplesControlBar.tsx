"use client";

import { Search, ArrowUpDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ALL_SERVICE } from "../_types/samples.types";
import type { SamplesControlBarProps } from "../_props/samples.props";

export function SamplesControlBar({
  filters,
  services,
  totalResults,
  onSearchChange,
  onServiceSelect,
  onSortChange,
  onOrderToggle,
  onClearFilters,
}: SamplesControlBarProps) {
  return (
    <div className="mb-8 flex flex-col gap-6">
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        <div className="relative w-full max-w-md">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
          />
          <Input
            value={filters.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            placeholder="Search samples by topic, content or title..."
            className={cn(
              "pl-10 h-11 bg-white border-slate-200 rounded-lg",
              "focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500 hidden sm:inline">
            Sort by:
          </span>
          <Select 
            value={filters.sort} 
            onValueChange={(val: string) => onSortChange(val as any)}
          >
            <SelectTrigger className="h-11 w-40 bg-white border-slate-200 rounded-lg shadow-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at">Recent</SelectItem>
              <SelectItem value="word_count">Word Count</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onOrderToggle}
            className="h-11 px-3 border-slate-200 bg-white rounded-lg shadow-sm text-slate-600 hover:text-emerald-600"
            aria-label={`Toggle sort order (current: ${filters.order})`}
          >
            <ArrowUpDown 
              size={18} 
              className={cn(
                "transition-transform",
                filters.order === "asc" ? "" : "rotate-180"
              )} 
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            {filters.serviceId === ALL_SERVICE ? "All Categories" : "Filtered Category"}
          </h2>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            {totalResults} {totalResults === 1 ? "Result" : "Results"}
          </span>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 scrollbar-hide no-scrollbar">
            <Button
              size="sm"
              variant={filters.serviceId === ALL_SERVICE ? "default" : "outline"}
              onClick={() => onServiceSelect(ALL_SERVICE)}
              className={cn(
                "h-9 rounded-full px-5 text-sm font-semibold transition-all shrink-0",
                filters.serviceId === ALL_SERVICE 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500 ring-offset-1"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-none"
              )}
            >
              All Samples
            </Button>

            {services.map((service) => (
              <Button
                key={service.id}
                size="sm"
                variant={filters.serviceId === service.id ? "default" : "outline"}
                onClick={() => onServiceSelect(service.id)}
                className={cn(
                  "h-9 rounded-full px-5 text-sm font-semibold transition-all shrink-0",
                  filters.serviceId === service.id
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500 ring-offset-1"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-none"
                )}
              >
                {filters.serviceId === service.id && <Check size={14} className="mr-1.5" />}
                {service.name}
              </Button>
            ))}
          </div>
          
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-linear-to-l from-[#f8f7f4] to-transparent pointer-events-none md:hidden" />
        </div>
      </div>
    </div>
  );
}
