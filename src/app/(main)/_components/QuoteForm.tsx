"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useQuoteForm } from "@/lib/hooks/quote.hook";
import { QuoteFormTabs } from "./QuoteFormTabs";
import { ServiceSelect } from "./ServiceSelect";
import { LevelSelect } from "./LevelSelect";
import { DeadlinePicker } from "./DeadlinePicker";
import { PageCountControl } from "./PageCountControl";
import type { QuoteFormProps } from "@/lib/props/index.props";
import { cn } from "@/lib/utils";

export function QuoteForm({ options }: QuoteFormProps) {
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
    <div className="flex flex-col gap-3 w-full ">
      <div className="text-center px-2">
        <p className="text-base font-semibold text-white leading-snug">
          AI &amp; Plagiarism free services
        </p>
        <p className="text-xs text-emerald-100 mt-0.5">
          Get a custom quote now
        </p>
      </div>

      <QuoteFormTabs
        activeTab={formState.activeTab}
        onTabChange={setActiveTab}
      />

      <ServiceSelect
        services={options.services}
        activeTab={formState.activeTab}
        value={formState.serviceId}
        onChange={setServiceId}
      />

      <div className="grid grid-cols-2 gap-2">
        <LevelSelect
          levels={options.levels}
          value={formState.levelId}
          onChange={setLevelId}
        />
        <DeadlinePicker
          value={formState.deadline}
          onChange={setDeadline}
        />
      </div>

      <PageCountControl
        value={formState.pageCount}
        wordsPerPage={wordsPerPage}
        onChange={setPageCount}
      />

      <div className="flex items-center justify-between mt-1">
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
                {price?.total_price
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(price.total_price)
                  : "$0.00"}
              </span>
            )}
          </div>
        </div>

        <Link
          href={continueHref}
          className={cn(
            "flex items-center gap-2 rounded-full bg-slate-700 hover:bg-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors shadow-none focus:outline-none focus:ring-2 focus:ring-slate-300",
            !formState.serviceId && "opacity-50 cursor-not-allowed"
          )}
          aria-label="Continue to order"
        >
          Continue
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
