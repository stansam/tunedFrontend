"use client";

import React from "react";
import { History, Flame } from "lucide-react";
import type { FlatItem } from "../../_types/search.types";
import { SuggestionButton } from "../SuggestionButton";

interface DefaultSuggestionsListProps {
  flatItems: FlatItem[];
  recent: string[];
  popularCount: number;
  trendingCount: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onSelect: (item: FlatItem) => void;
  onClearRecent: (e: React.MouseEvent) => void;
}

export function DefaultSuggestionsList({
  flatItems,
  recent,
  popularCount,
  trendingCount,
  activeIndex,
  setActiveIndex,
  onSelect,
  onClearRecent,
}: DefaultSuggestionsListProps) {
  const recentItems = flatItems.filter((i) => i.type === "recent");
  const popularItems = flatItems.filter((i) => i.type === "popular");
  const trendingItems = flatItems.filter((i) => i.type === "trending");

  return (
    <div className="space-y-4">
      {recent.length > 0 && (
        <div>
          <div className="flex items-center justify-between px-2 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            <span className="flex items-center gap-1.5">
              <History size={12} /> Recent Searches
            </span>
            <button
              type="button"
              onClick={onClearRecent}
              className="text-slate-400 hover:text-emerald-600 transition-colors text-[10px] lowercase cursor-pointer"
            >
              Clear all
            </button>
          </div>
          <div className="mt-1 space-y-0.5">
            {recentItems.map((item) => {
              const globalIdx = flatItems.indexOf(item);
              return (
                <SuggestionButton
                  key={item.id}
                  item={item}
                  isSelected={activeIndex === globalIdx}
                  onSelect={() => onSelect(item)}
                  onMouseEnter={() => setActiveIndex(globalIdx)}
                />
              );
            })}
          </div>
        </div>
      )}

      {popularCount > 0 && (
        <div>
          <div className="px-2 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Flame size={12} className="text-amber-500" /> Popular Searches
          </div>
          <div className="mt-1 space-y-0.5">
            {popularItems.map((item) => {
              const globalIdx = flatItems.indexOf(item);
              return (
                <SuggestionButton
                  key={item.id}
                  item={item}
                  isSelected={activeIndex === globalIdx}
                  onSelect={() => onSelect(item)}
                  onMouseEnter={() => setActiveIndex(globalIdx)}
                />
              );
            })}
          </div>
        </div>
      )}

      {trendingCount > 0 && (
        <div>
          <div className="px-2 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Flame size={12} className="text-emerald-500" /> Trending
          </div>
          <div className="mt-1 space-y-0.5">
            {trendingItems.map((item) => {
              const globalIdx = flatItems.indexOf(item);
              return (
                <SuggestionButton
                  key={item.id}
                  item={item}
                  isSelected={activeIndex === globalIdx}
                  onSelect={() => onSelect(item)}
                  onMouseEnter={() => setActiveIndex(globalIdx)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
