"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItemProps } from "../_props/faq.props";

export function FaqItem({ faq, isOpen, onToggle }: FaqItemProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-white",
        "transition-all duration-200",
        isOpen
          ? "border-emerald-200 shadow-sm"
          : "border-slate-200 hover:border-slate-300"
      )}
    >
      <dt>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-body-${faq.id}`}
          className={cn(
            "flex w-full items-start gap-4 px-5 py-4 text-left",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-inset focus-visible:ring-emerald-500"
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center",
              "rounded-full text-sm font-bold leading-none",
              "transition-colors duration-200",
              isOpen
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 text-slate-500"
            )}
            aria-hidden="true"
          >
            {isOpen ? "−" : "+"}
          </span>

          <span
            className={cn(
              "flex-1 text-sm font-semibold leading-snug",
              "sm:text-[15px]",
              isOpen ? "text-slate-900" : "text-slate-700"
            )}
          >
            {faq.question}
          </span>

          <ChevronDown
            size={16}
            aria-hidden="true"
            className={cn(
              "mt-0.5 shrink-0 text-slate-400",
              "transition-transform duration-300",
              isOpen && "rotate-180 text-emerald-500"
            )}
          />
        </button>
      </dt>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.dd
            id={`faq-body-${faq.id}`}
            key={`faq-body-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 px-5 pb-5 pt-4">
              <p className="text-sm leading-relaxed text-slate-600">
                {faq.answer}
              </p>
              <div className="mt-3">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full",
                    "border border-emerald-100 bg-emerald-50",
                    "px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                  )}
                >
                  {faq.category}
                </span>
              </div>
            </div>
          </motion.dd>
        )}
      </AnimatePresence>
    </div>
  );
}
