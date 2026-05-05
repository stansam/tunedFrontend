"use client";

import { cn } from "../../_utils/order.utils";

const STYLES = ["APA", "MLA", "Chicago", "Harvard", "Other"];

type FormatStyle = "APA" | "MLA" | "Chicago" | "Harvard" | "Other";

export function FormatStyleSelect({ value, onChange }: { value: string, onChange: (v: FormatStyle) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {STYLES.map((style) => {
        const isActive = value === style;
        return (
          <button
            key={style}
            onClick={() => onChange(style as FormatStyle)}
            className={cn(
              "rounded-xl border px-4 py-2 text-sm font-bold transition-all",
              isActive ? "border-emerald-500 bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-500/10" : "border-white bg-white/50 text-slate-500 hover:border-slate-200"
            )}
          >
            {style}
          </button>
        );
      })}
    </div>
  );
}
