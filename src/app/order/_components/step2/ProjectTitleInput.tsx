"use client";

import { Input } from "@/components/ui/input";

export function ProjectTitleInput({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your project title"
        className="h-14 rounded-2xl border-white bg-white/50 px-4 text-base font-medium shadow-sm ring-offset-emerald-500 focus-visible:ring-emerald-500"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 tabular-nums">
        {value.length} / 255
      </div>
    </div>
  );
}
