import React from "react";
import { Bell } from "lucide-react";

export function NotificationSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4 min-w-[280px] w-full">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="h-4 w-24 bg-slate-100 rounded-md animate-pulse"></div>
        <div className="h-3 w-16 bg-slate-100 rounded-md animate-pulse"></div>
      </div>

      {/* Item 1 */}
      <div className="flex gap-3 py-2 cursor-wait">
        <div className="h-8 w-8 rounded-full bg-slate-100 shrink-0 animate-pulse flex items-center justify-center">
            <Bell size={14} className="text-slate-200" />
        </div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3.5 bg-slate-100 rounded-md w-3/4 animate-pulse"></div>
          <div className="h-3 bg-slate-50 rounded-md w-full animate-pulse"></div>
          <div className="h-2 bg-slate-50 rounded-md w-1/4 animate-pulse mt-2"></div>
        </div>
      </div>

      {/* Item 2 */}
      <div className="flex gap-3 py-2 cursor-wait">
        <div className="h-8 w-8 rounded-full bg-slate-100 shrink-0 animate-pulse flex items-center justify-center">
             <Bell size={14} className="text-slate-200" />
        </div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3.5 bg-slate-100 rounded-md w-5/6 animate-pulse"></div>
          <div className="h-3 bg-slate-50 rounded-md w-4/5 animate-pulse"></div>
          <div className="h-2 bg-slate-50 rounded-md w-1/3 animate-pulse mt-2"></div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-50 mt-2">
            <div className="h-8 w-full bg-slate-50 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
