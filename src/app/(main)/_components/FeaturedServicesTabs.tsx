import { cn } from "@/lib/utils";
import { TABS } from "../_types/featured.types";
import type { FeaturedServicesTabsProps } from "../_props/featured.props";

export function FeaturedServicesTabs({ activeTab, onTabChange }: FeaturedServicesTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              isActive
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/10 ring-1 ring-emerald-600"
                : "bg-slate-50 text-slate-600 hover:text-slate-800 hover:bg-slate-100 ring-1 ring-slate-100"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
