"use client";

import { AlertTriangle } from "lucide-react";

export function DashboardError({ message }: { readonly message: string }) {
  return (
    <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 text-xs text-red-700 flex items-center gap-2 font-semibold">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
