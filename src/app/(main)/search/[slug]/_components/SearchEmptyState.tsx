"use client";

import { Search, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Route } from "next";

interface SearchEmptyStateProps {
  query: string;
  popular: string[];
  trending: string[];
}

export function SearchEmptyState({ query, popular, trending }: SearchEmptyStateProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-8 shadow-sm">
      <div className="space-y-3">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Search size={28} />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800">No results found</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          We couldn&apos;t find any matches for &ldquo;<span className="font-semibold text-slate-700">{query}</span>&rdquo;.
          Check your spelling, or try searching for one of our recommended topics below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left pt-2 border-t border-slate-100">
        {popular.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-500" />
              Popular Searches
            </h4>
            <ul className="space-y-2">
              {popular.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/search/${encodeURIComponent(item)}` as Route }
                    className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-1 group"
                  >
                    {item}
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {trending.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp size={14} className="text-emerald-500" />
              Trending Topics
            </h4>
            <ul className="space-y-2">
              {trending.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/search/${encodeURIComponent(item)}` as Route }
                    className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-1 group"
                  >
                    {item}
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
