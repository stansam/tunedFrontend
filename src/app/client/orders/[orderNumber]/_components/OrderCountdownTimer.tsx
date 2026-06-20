"use client";

import { useOrderTimer } from "../_hooks/useOrderTimer";
import type { OrderCountdownTimerProps } from "../_props";

function TimerUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[26px]">
      <span className="text-lg font-bold tabular-nums leading-none text-emerald-600 md:text-2xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
    </div>
  );
}

export function OrderCountdownTimer({ dueDate }: OrderCountdownTimerProps) {
  const { days, hours, minutes, seconds, isOverdue } = useOrderTimer(dueDate);

  if (!dueDate) return null;

  return (
    <div className="flex flex-col items-end gap-1">
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
        TIME LEFT
      </span>

      {isOverdue ? (
        <p className="text-sm font-semibold text-red-500">Overdue</p>
      ) : (
        <div className="flex items-start gap-1.5">
          <TimerUnit value={days} label="Days" />
          <span className="mt-0.5 text-sm font-bold text-emerald-400">|</span>
          <TimerUnit value={hours} label="Hours" />
          <span className="mt-0.5 text-sm font-bold text-emerald-400">|</span>
          <TimerUnit value={minutes} label="Minutes" />
          <span className="mt-0.5 text-sm font-bold text-emerald-400">|</span>
          <TimerUnit value={seconds} label="Seconds" />
        </div>
      )}
    </div>
  );
}
