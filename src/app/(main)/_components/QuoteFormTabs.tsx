"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { QuoteFormTabsProps } from "@/lib/props";
import type { CategoryTab } from "@/types";

const TABS: { label: string; value: CategoryTab }[] = [
  { label: "Writing", value: "writing" },
  { label: "Technical", value: "technical" },
  { label: "Proofreading", value: "proofreading" },
];

export function QuoteFormTabs({ activeTab, onTabChange }: QuoteFormTabsProps) {
  return (
    <div
      className="flex rounded-full bg-emerald-700 p-1 gap-1"
      role="tablist"
      aria-label="Service category"
    >
      {TABS.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={activeTab === tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap",
            activeTab === tab.value
              ? "bg-slate-800 text-white shadow-sm"
              : "text-emerald-100 hover:text-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
