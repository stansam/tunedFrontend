"use client";

import { Info, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { formatCurrency } from "../../_utils/order.utils";
import type { SubtotalBarProps } from "../../_props/order.props";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function PriceSubtotalBar({ subtotal, isLoading, onNext, onBack, showBack, nextLabel = "Proceed" }: SubtotalBarProps) {
  return (
    <div className="sticky bottom-0 z-40 border-t border-black/5 bg-white/80 p-4 backdrop-blur-xl md:p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sub Total</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={14} className="text-slate-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="rounded-xl bg-slate-900 p-2 text-xs text-white">
                Final Total calculated in the final step based on paper complexity.
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tabular-nums">
              {isLoading ? <Loader2 className="animate-spin text-emerald-500" size={24} /> : formatCurrency(subtotal)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={onBack}
              className="flex h-14 items-center justify-center rounded-2xl bg-slate-100 px-8 text-sm font-black text-slate-600 transition-all hover:bg-slate-200 active:scale-95"
            >
              <ArrowLeft size={18} className="mr-2" /> Back
            </button>
          )}
          {nextLabel && (
            <button 
              onClick={onNext}
              className="flex h-14 items-center justify-center rounded-2xl bg-emerald-600 px-8 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/40 active:scale-95"
            >
              {nextLabel} <ArrowRight size={18} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
