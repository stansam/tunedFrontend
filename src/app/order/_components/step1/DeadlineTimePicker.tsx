"use client";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { getFlatpickrTimeConfig } from "../../_utils/deadline.utils";
import { Clock } from "lucide-react";

export function DeadlineTimePicker({ value, onChange }: { value: string, onChange: (t: string) => void }) {
  const config = getFlatpickrTimeConfig();

  return (
    <div className="relative">
      <Flatpickr
        value={value}
        onChange={(_dates, timeStr) => onChange(timeStr)}
        options={config}
        className="h-14 w-full rounded-2xl border border-white bg-white/50 px-4 text-base font-medium shadow-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
        placeholder="Select Time"
      />
      <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
    </div>
  );
}
