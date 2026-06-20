"use client";

import { formatDistanceToNow } from "date-fns";

interface RelativeTimeProps {
  readonly date: string;
}

export function RelativeTime({ date }: RelativeTimeProps) {
  return (
    <time
      dateTime={date}
      className="text-xs text-slate-500 mt-1 block"
      suppressHydrationWarning
    >
      {typeof window === "undefined"
        ? "..."
        : formatDistanceToNow(new Date(date), { addSuffix: true })}
    </time>
  );
}