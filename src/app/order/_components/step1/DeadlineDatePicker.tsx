"use client";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { getFlatpickrDateConfig } from "../../_utils/deadline.utils";
import { Calendar } from "lucide-react";

export function DeadlineDatePicker({ value, onChange }: { value: Date | null, onChange: (d: Date) => void }) {
  const config = getFlatpickrDateConfig();

  return (
    <div className="relative">
      <Flatpickr
        value={value || ""}
        onChange={([date]) =>{
          if (date) onChange(date);
          }}
        options={config}
        className="h-14 w-full rounded-2xl border border-white bg-white/50 px-4 text-base font-medium shadow-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
        placeholder="Select Date"
      />
      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
    </div>
  );
}
