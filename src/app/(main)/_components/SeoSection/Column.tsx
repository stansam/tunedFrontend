"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SeoColumnProps, ExpandToggleProps } from "../../_props/seo.props";
import { KeywordTags } from "./KeywordTags";

function ExpandToggle({ isExpanded, onToggle, columnId }: ExpandToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-controls={`${columnId}-expanded`}
      className={cn(
        "mt-1 inline-flex items-center gap-1.5 self-start rounded-full",
        "border border-slate-700/60 bg-slate-800/40",
        "px-3 py-1.5 text-xs font-medium text-slate-400",
        "transition-all duration-200",
        "hover:border-emerald-700/60 hover:bg-emerald-900/20 hover:text-emerald-300",
        // Offset ring so it sits inside the dark section bg without clipping
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#0f1117]"
      )}
    >
      <span>{isExpanded ? "Show less" : "Read more"}</span>
      <ChevronDown
        size={12}
        aria-hidden="true"
        className={cn(
          "transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
      />
    </button>
  );
}

export function SeoColumn({ column, isExpanded, onToggle, index }: SeoColumnProps) {
  return (
    <article
      data-column-index={index}
      className={cn(
        "flex flex-col gap-4 rounded-2xl",
        "border border-slate-800/80 bg-slate-800/20",
        "p-6 sm:p-7",
        "transition-colors duration-200",
        "hover:border-slate-700/80 hover:bg-slate-800/40"
      )}
      aria-labelledby={`seo-col-${column.id}`}
    >
      <h3
        id={`seo-col-${column.id}`}
        className="text-base font-semibold leading-snug text-white sm:text-[17px]"
      >
        {column.heading}
      </h3>

      <p className="text-sm leading-relaxed text-slate-400">
        {column.body}
      </p>

      <KeywordTags tags={column.tags} compact />

      {column.expandable && (
        <>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={`${column.id}-expanded`}
                key={`${column.id}-expanded-region`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 border-t border-slate-800/60 pt-4">
                  {column.expandedHeading !== undefined && (
                    <h4 className="text-sm font-semibold text-slate-300">
                      {column.expandedHeading}
                    </h4>
                  )}
                  {column.expandedBody !== undefined && (
                    <p className="text-sm leading-relaxed text-slate-400">
                      {column.expandedBody}
                    </p>
                  )}
                  {column.expandedTags !== undefined &&
                    column.expandedTags.length > 0 && (
                      <KeywordTags tags={column.expandedTags} compact />
                    )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ExpandToggle
            isExpanded={isExpanded}
            onToggle={onToggle}
            columnId={column.id}
          />
        </>
      )}
    </article>
  );
}
