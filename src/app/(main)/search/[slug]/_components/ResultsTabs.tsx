"use client";

import { cn } from "@/lib/utils";
import { ResultType } from "../_types";
import { ResultsTabsProps } from "../_props";
import { Award, BookOpen, FileText, HelpCircle, Tag, Grid } from "lucide-react";

export function ResultsTabs({ activeTab, counts, onChange }: ResultsTabsProps) {
  const tabs = [
    { id: "all" as ResultType, label: "All Results", count: counts.total, icon: Grid },
    { id: "service" as ResultType, label: "Services", count: counts.services, icon: Award },
    { id: "sample" as ResultType, label: "Samples", count: counts.samples, icon: BookOpen },
    { id: "blog" as ResultType, label: "Blogs", count: counts.blogs, icon: FileText },
    { id: "faq" as ResultType, label: "FAQs", count: counts.faqs, icon: HelpCircle },
    { id: "tag" as ResultType, label: "Tags", count: counts.tags, icon: Tag },
  ];

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex space-x-1.5 p-1 bg-slate-900/5 backdrop-blur-md rounded-2xl border border-slate-900/10 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                isActive
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              )}
            >
              <Icon size={16} className={isActive ? "text-emerald-600" : "text-slate-400"} />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-extrabold transition-all duration-200",
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-200/60 text-slate-500"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
