"use client";

import { cn } from "../../_utils/order.utils";

export function LineSpacingToggle({ value, onChange }: { value: "double" | "single", onChange: (v: "double" | "single") => void }) {
  return (
    <div className="flex h-14 items-center gap-1 rounded-2xl border border-white bg-white/50 p-1.5 shadow-sm">
      <button
        onClick={() => onChange("double")}
        className={cn(
          "flex-1 h-full rounded-xl text-sm font-bold transition-all",
          value === "double" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
        )}
      >
        Double
      </button>
      <button
        onClick={() => onChange("single")}
        className={cn(
          "flex-1 h-full rounded-xl text-sm font-bold transition-all",
          value === "single" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
        )}
      >
        Single
      </button>
    </div>
  );
}
