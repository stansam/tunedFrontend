"use client";

import type { AdminOrderDetailTabsProps } from "../_props";

export function AdminOrderDetailTabs({ activeTab, onTabChange }: AdminOrderDetailTabsProps) {
  const tabs = [
    { id: "details", label: "Details" },
    { id: "activity", label: "Activity" },
    { id: "delivery", label: "Delivery" },
    { id: "actions", label: "Actions" },
  ] as const;

  return (
    <div className="border-b border-slate-200 overflow-x-auto scrollbar-none flex">
      <div className="flex space-x-8 min-w-full sm:min-w-0 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-4 text-sm font-medium relative whitespace-nowrap transition-colors cursor-pointer ${
                isActive ? "text-emerald-700 font-semibold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
