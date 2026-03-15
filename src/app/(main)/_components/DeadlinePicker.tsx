"use client";

import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMinDeadline } from "@/lib/hooks/quote.hook";
import type { DeadlinePickerProps } from "@/lib/props/index.props";

export function DeadlinePicker({
  value,
  onChange,
  disabled = false,
}: DeadlinePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<flatpickr.Instance | null>(null);
  const minDate = useMinDeadline();

  useEffect(() => {
    if (!inputRef.current) return;

    fpRef.current = flatpickr(inputRef.current, {
      enableTime: true,
      dateFormat: "M j, Y – H:i",
      minDate,
      time_24hr: false,
      disableMobile: false,
      onChange: ([selectedDate]) => {
        if (selectedDate) {
          // Convert to timezone-aware ISO 8601 UTC string
          onChange(selectedDate.toISOString());
        }
      },
    });

    return () => {
      fpRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep min date in sync (refreshes every minute via hook)
  useEffect(() => {
    fpRef.current?.set("minDate", minDate);
  }, [minDate]);

  // Sync external value → flatpickr (e.g. form reset)
  useEffect(() => {
    if (!value) {
      fpRef.current?.clear();
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        readOnly
        disabled={disabled}
        placeholder="Deadline"
        aria-label="Select deadline"
        className={cn(
          "w-full rounded-full bg-slate-100 py-2.5 pl-4 pr-10 text-sm text-slate-700",
          "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400",
          "cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />
      <Calendar
        size={14}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
    </div>
  );
}
