"use client";

import { HelpCircle } from "lucide-react";
import { ResultCardProps } from "../_props";

export function FaqCard({ item }: ResultCardProps) {
  return (
    <div className="group block border border-slate-100 rounded-2xl p-5 bg-white hover:bg-white hover:border-slate-200 shadow-sm cursor-default relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
          <HelpCircle size={20} />
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              {item.title}
            </h3>
            {item.category && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                {item.category}
              </span>
            )}
          </div>
          <div className="text-xs sm:text-sm text-slate-500 leading-relaxed bg-slate-50/50 rounded-xl p-3.5 border border-slate-50/50">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
