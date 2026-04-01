"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { useQuoteForm } from "@/lib/hooks/quote.hook";
import { LevelSelect } from "@/app/(main)/_components/LevelSelect";
import { DeadlinePicker } from "@/app/(main)/_components/DeadlinePicker";
import { PageCountControl } from "@/app/(main)/_components/PageCountControl";
import { cn } from "@/lib/utils";
import type { ServiceQuoteFormProps } from "@/lib/props/service.props";

export function ServiceQuoteForm({ service, levels }: ServiceQuoteFormProps) {
  const initialLevelId = useMemo(() => levels[0]?.id || null, [levels]);

  const {
    formState,
    price,
    isPriceLoading,
    priceError,
    wordsPerPage,
    setLevelId,
    setDeadline,
    setPageCount,
  } = useQuoteForm({
    initialServiceId: service.id,
    initialLevelId: initialLevelId,
  });

  const continueHref = "#";

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header Info */}
      <div className="flex flex-col gap-2 border-b border-slate-700/50 pb-4">
        <div className="flex items-center justify-between">
           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
            Official Service
          </p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full ring-1 ring-slate-700">
             <ShieldCheck size={10} className="text-emerald-500" />
             Verified
          </div>
        </div>
        <h2 className="text-xl font-black text-white tracking-tight">
          Get <span className="text-emerald-500">Instant</span> Quote
        </h2>
      </div>

      <div className="space-y-4">
        {/* Read-only Service Display */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 px-1">
            Selected Expertise
          </label>
          <div className="h-12 w-full bg-slate-900 border border-slate-700/80 rounded-xl flex items-center px-4 shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="font-bold text-white text-[15px]">{service.name}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 px-1">
              Select Level
            </label>
            <LevelSelect
              levels={levels}
              value={formState.levelId}
              onChange={setLevelId}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 px-1">
              Choose Deadline
            </label>
            <DeadlinePicker
              value={formState.deadline}
              onChange={setDeadline}
            />
          </div>
        </div>

        {/* Length Control */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 px-1">
            Work Length (Pages)
          </label>
          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-700/50 ring-1 ring-slate-800 transition-all focus-within:ring-emerald-500/30">
            <PageCountControl
              value={formState.pageCount}
              wordsPerPage={wordsPerPage}
              onChange={setPageCount}
            />
          </div>
        </div>
      </div>

      {/* Benefits List (Subtle Micro-copy) */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-1 py-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
           <CheckCircle2 size={12} className="text-emerald-500/80" />
           Secure Payment
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
           <CheckCircle2 size={12} className="text-emerald-500/80" />
           24/7 Support
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
           <CheckCircle2 size={12} className="text-emerald-500/80" />
           AI-Free Report
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
           <CheckCircle2 size={12} className="text-emerald-500/80" />
           Top Writers
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-700/50">
        <div className="flex flex-col">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-0.5">
            Total Price
          </p>
          <div className="h-8 flex items-center">
            {isPriceLoading ? (
              <Loader2
                size={20}
                className="animate-spin text-emerald-400"
                aria-label="Calculating price"
              />
            ) : priceError ? (
              <span className="text-xs font-bold text-red-400 border border-red-500/30 bg-red-500/5 px-2 py-0.5 rounded-md italic">Error calculation</span>
            ) : (
              <span className="text-3xl font-black text-white tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
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
            "group flex items-center gap-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 px-7 py-4 text-sm font-black text-slate-900 transition-all shadow-[0_20px_40px_-12px_rgba(16,185,129,0.3)] active:scale-95 disabled:opacity-50",
            (!formState.serviceId || isPriceLoading) && "opacity-50 cursor-not-allowed grayscale"
          )}
          aria-label="Proceed to secure checkout"
        >
          Order Now
          <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
