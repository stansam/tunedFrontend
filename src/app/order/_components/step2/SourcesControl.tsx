"use client";

import { Minus, Plus } from "lucide-react";

export function SourcesControl({ value, onChange }: { value: number, onChange: (v: number) => void }) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(Math.max(0, value - 1));

  return (
    <div className="flex h-14 items-center gap-4 rounded-2xl border border-white bg-white/50 px-2 shadow-sm">
      <button 
        onClick={decrement}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 hover:text-emerald-600 active:scale-95 transition-all shadow-sm"
      >
        <Minus size={18} />
      </button>
      <div className="flex-1 text-center text-lg font-bold text-slate-900 tabular-nums">
        {value}
      </div>
      <button 
        onClick={increment}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 hover:text-emerald-600 active:scale-95 transition-all shadow-sm"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
