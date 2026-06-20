"use client";

import { cn } from "@/lib/utils";
import type { OrderDetailTabsProps } from "../_props";
import type { OrderTab } from "../_types";

const TABS: { label: string; value: OrderTab }[] = [
  { label: "Details", value: "details" },
  { label: "Activity", value: "activity" },
  { label: "Delivery", value: "delivery" },
];

export function OrderDetailTabs({
  activeTab,
  onTabChange,
  isPending,
}: OrderDetailTabsProps) {
  return (
    <div
      className="flex items-center overflow-x-auto border-b border-slate-200 scrollbar-none"
      role="tablist"
      aria-label="Order detail sections"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            disabled={isPending}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "relative whitespace-nowrap px-5 py-3 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
              isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800",
              isPending && "pointer-events-none opacity-60",
            )}
          >
            {tab.label}
            {isActive && (
              <span
                aria-hidden
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-emerald-600"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
