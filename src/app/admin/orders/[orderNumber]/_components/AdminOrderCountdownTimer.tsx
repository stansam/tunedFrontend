"use client";

import { useState, useEffect } from "react";
import type { AdminOrderCountdownTimerProps } from "../_props";
import type { TimeRemaining } from "../_types";

function computeTimeRemaining(dueDate: string | null): TimeRemaining {
  if (!dueDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOverdue: false };
  }
  const due = new Date(dueDate).getTime();
  const now = new Date().getTime();
  const diff = due - now;

  if (diff <= 0) {
    const absDiff = Math.abs(diff);
    return {
      days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((absDiff % (1000 * 60)) / 1000),
      isOverdue: true,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isOverdue: false,
  };
}

export function AdminOrderCountdownTimer({ dueDate }: AdminOrderCountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => computeTimeRemaining(dueDate));

  useEffect(() => {
    if (!dueDate) return;
    const tick = () => setTimeLeft(computeTimeRemaining(dueDate));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [dueDate]);

  if (!dueDate) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center space-x-2">
      <div className={`flex items-center space-x-1.5 font-mono text-sm font-semibold ${
        timeLeft.isOverdue ? "text-red-400" : "text-emerald-400"
      }`}>
        <span>{timeLeft.isOverdue ? "-" : ""}</span>
        <span>{pad(timeLeft.days * 24 + timeLeft.hours)}</span>
        <span>:</span>
        <span>{pad(timeLeft.minutes)}</span>
        <span>:</span>
        <span>{pad(timeLeft.seconds)}</span>
      </div>
      <span className="text-[10px] text-slate-400 uppercase tracking-wider">
        {timeLeft.isOverdue ? "Overdue" : "Remaining"}
      </span>
    </div>
  );
}
