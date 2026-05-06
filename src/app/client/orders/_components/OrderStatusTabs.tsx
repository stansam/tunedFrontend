"use client";

import { cn } from "@/lib/utils";
import type { StatusTab } from "../_types";
import type { OrderStatusTabsProps } from "../_props";

const TABS: { label: string; value: StatusTab }[] = [
  { label: "Active", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Overdue", value: "overdue" },
];

export function OrderStatusTabs({
  activeTab,
  onTabChange,
  isPending,
}: OrderStatusTabsProps) {
  return (
    <div
      className="flex items-center gap-0 overflow-x-auto border-b border-slate-200 scrollbar-none"
      role="tablist"
      aria-label="Filter orders by status"
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
              "relative whitespace-nowrap px-4 py-2.5 text-sm font-medium",
              "transition-colors focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-emerald-500 focus-visible:ring-offset-1",
              isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800",
              isPending && "pointer-events-none opacity-60",
            )}
          >
            {tab.label}
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-emerald-600"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
