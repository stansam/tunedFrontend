"use client";

import { Minus, Plus } from "lucide-react";

export function WordCountControl({ value, onChange }: { value: number, onChange: (v: number) => void }) {
  const wordsPerPage = 275;
  const pages = Math.ceil(value / wordsPerPage);

  const increment = () => onChange(value + wordsPerPage);
  const decrement = () => onChange(Math.max(wordsPerPage, value - wordsPerPage));

  return (
    <div className="space-y-3">
      <div className="flex h-14 items-center gap-4 rounded-2xl border border-white bg-white/50 px-2 shadow-sm">
        <button 
          onClick={decrement}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 hover:text-emerald-600 active:scale-95 transition-all shadow-sm"
        >
          <Minus size={18} />
        </button>
        <div className="flex-1 text-center text-lg font-bold text-slate-900 tabular-nums">
          {value} <span className="text-sm font-medium text-slate-400">words</span>
        </div>
        <button 
          onClick={increment}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 hover:text-emerald-600 active:scale-95 transition-all shadow-sm"
        >
          <Plus size={18} />
        </button>
      </div>
      <p className="px-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
        ≈ {pages} {pages === 1 ? "page" : "pages"}
      </p>
    </div>
  );
}
