"use client";

import { formatDistanceToNow } from "date-fns";

export function RelativeTime({ date }: { readonly date: string }) {
  return (
    <time
      dateTime={date}
      className="text-xs text-slate-500 mt-1 block font-medium"
      suppressHydrationWarning
    >
      {typeof window === "undefined"
        ? "..."
        : formatDistanceToNow(new Date(date), { addSuffix: true })}
    </time>
  );
}
