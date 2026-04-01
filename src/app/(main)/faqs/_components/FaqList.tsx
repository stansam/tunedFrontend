"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ALL_CATEGORY } from "../_types/faq.types";
import type { FaqListProps } from "../_props/faq.props";
import { FaqItem } from "./FaqItem";
import { FaqEmptyState } from "./FaqEmptyState";

export function FaqList({
  faqs,
  openItemId,
  onToggle,
  activeCategory,
  search,
  onClearSearch,
  onBrowseAll,
}: FaqListProps) {
  const headingLabel =
    activeCategory === ALL_CATEGORY ? "All questions" : activeCategory;

  if (faqs.length === 0) {
    return (
      <FaqEmptyState
        search={search}
        onClearSearch={onClearSearch}
        onBrowseAll={onBrowseAll}
      />
    );
  }

  return (
    <section aria-labelledby="faq-list-heading">
      <p
        id="faq-list-heading"
        className="mb-4 text-sm text-slate-500"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="font-medium text-slate-700">{headingLabel}</span>
        {" · "}
        {faqs.length} result{faqs.length !== 1 ? "s" : ""}
      </p>

      <dl
        className={cn("space-y-2")}
        aria-label={`${headingLabel} FAQ list`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <FaqItem
                faq={faq}
                isOpen={openItemId === faq.id}
                onToggle={() => onToggle(faq.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </dl>
    </section>
  );
}
