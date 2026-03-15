"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PageCountControlProps } from "@/lib/props";

export function PageCountControl({
  value,
  wordsPerPage,
  onChange,
  min = 1,
  max = 1000,
}: PageCountControlProps) {
  const totalWords = value * wordsPerPage;

  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex w-full items-center justify-between rounded-full bg-slate-100 px-2 py-1.5">
      {/* Decrement */}
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease page count"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-600",
          "shadow-sm transition-colors hover:bg-slate-50 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400",
          value <= min && "opacity-40 cursor-not-allowed"
        )}
      >
        <Minus size={13} strokeWidth={2.5} />
      </button>

      {/* Display */}
      <span
        className="flex-1 text-center text-sm font-medium text-slate-700 tabular-nums"
        aria-live="polite"
        aria-label={`${value} page${value !== 1 ? "s" : ""}, ${totalWords.toLocaleString()} words`}
      >
        {value} {value === 1 ? "page" : "pages"} / {totalWords.toLocaleString()} words
      </span>

      {/* Increment */}
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase page count"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-600",
          "shadow-sm transition-colors hover:bg-slate-50 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400",
          value >= max && "opacity-40 cursor-not-allowed"
        )}
      >
        <Plus size={13} strokeWidth={2.5} />
      </button>
    </div>
  );
}
