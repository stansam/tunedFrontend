"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useQuoteForm } from "@/lib/hooks/quote.hook";
import { QuoteFormTabs } from "./QuoteFormTabs";
import { ServiceSelect } from "./ServiceSelect";
import { LevelSelect } from "./LevelSelect";
import { DeadlinePicker } from "./DeadlinePicker";
import { PageCountControl } from "./PageCountControl";
import type { QuoteFormProps } from "@/lib/props/index.props";

export function QuoteForm({ services, levels }: QuoteFormProps) {
  const {
    formState,
    price,
    isPriceLoading,
    priceError,
    wordsPerPage,
    setActiveTab,
    setServiceId,
    setLevelId,
    setDeadline,
    setPageCount,
  } = useQuoteForm();

  const continueHref = "#"
  // formState.serviceId
  //   ? `/order?service=${formState.serviceId}&level=${formState.levelId ?? ""}&pages=${formState.pageCount}`
  //   : "/order";

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header */}
      <div className="text-center px-2">
        <p className="text-base font-semibold text-white leading-snug">
          AI &amp; Plagiarism free services
        </p>
        <p className="text-xs text-emerald-100 mt-0.5">
          Get a custom quote now
        </p>
      </div>

      {/* Category tabs */}
      <QuoteFormTabs
        activeTab={formState.activeTab}
        onTabChange={setActiveTab}
      />

      {/* Service select */}
      <ServiceSelect
        services={services}
        activeTab={formState.activeTab}
        value={formState.serviceId}
        onChange={setServiceId}
      />

      {/* Level + Deadline row */}
      <div className="grid grid-cols-2 gap-2">
        <LevelSelect
          levels={levels}
          value={formState.levelId}
          onChange={setLevelId}
        />
        <DeadlinePicker
          value={formState.deadline}
          onChange={setDeadline}
        />
      </div>

      {/* Page count control */}
      <PageCountControl
        value={formState.pageCount}
        wordsPerPage={wordsPerPage}
        onChange={setPageCount}
      />

      {/* Price + Continue row */}
      <div className="flex items-center justify-between mt-1">
        {/* Approx price */}
        <div>
          <p className="text-[10px] font-medium text-emerald-100 uppercase tracking-wide">
            Approx Price:
          </p>
          <div className="h-6 flex items-center">
            {isPriceLoading ? (
              <Loader2
                size={16}
                className="animate-spin text-emerald-200"
                aria-label="Calculating price"
              />
            ) : priceError ? (
              <span className="text-xs text-red-300">Error</span>
            ) : (
              <span className="text-base font-bold text-white tabular-nums">
                {price?.formatted ?? "$0.00"}
              </span>
            )}
          </div>
        </div>

        {/* Continue button */}
        <Link
          href={continueHref}
          className="flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors shadow-none focus:outline-none focus:ring-2 focus:ring-emerald-300"
          aria-label="Continue to order"
        >
          Continue
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
