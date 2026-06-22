"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchResultsHeaderProps {
  query: string;
  totalResults: number;
  searchInputValue: string;
  onInputChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchResultsHeader({
  query,
  totalResults,
  searchInputValue,
  onInputChange,
  onSubmit,
}: SearchResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Search Results
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Found <span className="font-bold text-slate-700">{totalResults}</span> matches for &ldquo;
          <span className="font-bold text-emerald-600">{query}</span>&rdquo;
        </p>
      </div>

      <form onSubmit={onSubmit} className="relative w-full sm:max-w-xs">
        <input
          type="text"
          value={searchInputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Search again..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
        />
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      </form>
    </div>
  );
}
