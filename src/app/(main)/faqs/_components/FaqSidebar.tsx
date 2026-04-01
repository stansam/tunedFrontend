"use client";

import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_CATEGORY } from "../_types/faq.types";
import type { FaqSidebarProps } from "../_props/faq.props";

export function FaqSidebar({
  categories,
  activeCategory,
  categoryCounts,
  onSelect,
}: FaqSidebarProps) {
  return (
    <aside aria-label="FAQ categories" className="sticky top-24 self-start space-y-4">

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Categories
        </h2>

        <ul className="space-y-0.5" role="list">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            const count    = categoryCounts[category] ?? 0;

            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => onSelect(category)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                    isActive
                      ? "border-l-2 border-emerald-500 bg-emerald-50 pl-[10px] font-semibold text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  )}
                >
                  <span>{category}</span>
                  {category !== ALL_CATEGORY && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
        <h3 className="text-sm font-semibold text-slate-800">
          Still have questions?
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Our support team typically responds within 1 hour.
        </p>
        <a
          href="mailto:info@tunedessays.com"
          className={cn(
            "mt-3 inline-flex w-full items-center justify-center gap-2",
            "rounded-lg bg-emerald-500 px-4 py-2",
            "text-xs font-semibold text-white",
            "transition-colors hover:bg-emerald-600",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          )}
        >
          <Mail size={12} aria-hidden="true" />
          Contact Support
        </a>
      </div>
    </aside>
  );
}
