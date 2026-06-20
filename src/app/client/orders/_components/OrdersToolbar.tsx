"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "../_utils";
import type { OrdersToolbarProps } from "../_props";
import type { SortField, SortOrder } from "../_types";

export function OrdersToolbar({
  searchValue,
  onSearchChange,
  sortValue,
  sortOrder,
  onSortChange,
  isPending,
}: OrdersToolbarProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);
  const [prevSearchValue, setPrevSearchValue] = useState(searchValue);
  const isMountedRef = useRef(false);

  // Sync external → local during render
  if (searchValue !== prevSearchValue) {
    setPrevSearchValue(searchValue);
    setLocalSearch(searchValue);
  }

  // Debounce local → parent (skip on initial mount)
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    const timer = setTimeout(() => onSearchChange(localSearch), 350);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const handleSortChange = (val: string) => {
    const [field, ord] = val.split(":");
    onSortChange(field as SortField, (ord as SortOrder) || "desc");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Sort control */}
      <div className="flex items-center gap-2">
        <span className="shrink-0 text-sm text-slate-500">Sort by:</span>
        <Select
          value={`${sortValue}:${sortOrder}`}
          onValueChange={handleSortChange}
          disabled={isPending}
        >
          <SelectTrigger className="h-8 w-36 text-sm font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.flatMap((opt) => [
              <SelectItem key={`${opt.value}:desc`} value={`${opt.value}:desc`}>
                {opt.label} ↓
              </SelectItem>,
              <SelectItem key={`${opt.value}:asc`} value={`${opt.value}:asc`}>
                {opt.label} ↑
              </SelectItem>,
            ])}
          </SelectContent>
        </Select>
      </div>

      {/* Search control */}
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search order..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="h-9 pl-9 text-sm"
          aria-label="Search orders by title or instructions"
          disabled={isPending}
        />
      </div>
    </div>
  );
}
