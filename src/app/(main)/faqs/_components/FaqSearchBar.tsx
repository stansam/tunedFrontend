"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqSearchBarProps } from "../_props/faq.props";

export function FaqSearchBar({ value, onChange }: FaqSearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={17}
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search questions…"
        maxLength={120}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label="Search frequently asked questions"
        className={cn(
          "w-full rounded-full border border-slate-200 bg-white",
          "py-3 pl-11 text-sm text-slate-800",
          "placeholder:text-slate-400",
          "shadow-sm outline-none transition-all duration-150",
          "focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15",
          value.length > 0 ? "pr-10" : "pr-5"
        )}
      />

      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1",
            "text-slate-400 transition-colors",
            "hover:bg-slate-100 hover:text-slate-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          )}
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
