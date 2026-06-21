"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { FilterAreaProps } from "../_props/samples.props";

export function FilterArea({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  services,
}: FilterAreaProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 px-4 lg:px-6 py-2 w-full">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder="Search samples..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 rounded-xl border border-white/50 bg-white/40 backdrop-blur-md text-xs text-slate-700 shadow-xs focus-visible:bg-white/60 transition-all placeholder:text-slate-400"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select value={categoryId} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md text-xs text-slate-600 shadow-xs focus:ring-1 focus:ring-emerald-500 transition-all font-medium">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border border-slate-100 bg-white shadow-md text-xs">
            <SelectItem value="all" className="cursor-pointer">All Categories</SelectItem>
            {services.map((svc) => (
              <SelectItem key={svc.id} value={svc.id} className="cursor-pointer">
                {svc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
