"use client";

import { Textarea } from "@/components/ui/textarea";

export function InstructionsTextarea({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Provide as much detail as possible to help your writer..."
        className="min-h-[160px] rounded-2xl border-white bg-white/50 px-4 py-4 text-base font-medium shadow-sm ring-offset-emerald-500 focus-visible:ring-emerald-500 resize-none"
      />
      <div className="absolute right-4 bottom-4 text-[10px] font-bold text-slate-400 tabular-nums">
        {value.length} / 5000
      </div>
    </div>
  );
}
