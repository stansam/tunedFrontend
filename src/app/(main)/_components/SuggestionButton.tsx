"use client";

import { ArrowRight } from "lucide-react";
import type { FlatItem } from "../_types/search.types";

interface SuggestionButtonProps {
  item: FlatItem;
  isSelected: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
}

export function SuggestionButton({
  item,
  isSelected,
  onSelect,
  onMouseEnter,
}: SuggestionButtonProps) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold text-slate-700 transition-all ${
        isSelected
          ? "bg-slate-100 text-emerald-700 shadow-sm"
          : "hover:bg-slate-50/50"
      }`}
      role="option"
      aria-selected={isSelected}
    >
      <span className="truncate">{item.label}</span>
      <ArrowRight
        size={12}
        className={`opacity-0 transition-opacity ${isSelected ? "opacity-100" : ""}`}
      />
    </button>
  );
}
