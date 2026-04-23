"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export function RelativeTime(date: string) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);

  return (
    <time dateTime={date} className="text-xs text-slate-500 mt-1 block">
      {value ?? "—"}
    </time>
  );
}