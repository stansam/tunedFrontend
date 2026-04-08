import React from "react";
import { cn } from "@/lib/utils";

interface GenderSelectProps {
  value: "M" | "F" | "";
  onChange: (value: "M" | "F") => void;
  disabled?: boolean;
}

export function GenderSelect({ value, onChange, disabled }: GenderSelectProps) {
  return (
    <div className="flex gap-2 h-full items-end pb-[2px]">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("M")}
        className={cn(
          "flex h-11 flex-1 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-150",
          value === "M"
            ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500"
            : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-pressed={value === "M"}
      >
        M
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("F")}
        className={cn(
          "flex h-11 flex-1 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-150",
          value === "F"
            ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500"
            : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-pressed={value === "F"}
      >
        F
      </button>
    </div>
  );
}
