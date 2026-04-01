import React from "react";

/**
 * Specialized skeleton for the Navbar services dropdown.
 * Ensuring a smooth visual transition while categories are being fetched.
 */
export function DropdownSkeleton() {
  return (
    <div className="flex w-full h-full animate-pulse overflow-hidden rounded-xl border border-slate-100 bg-white">
      {/* Category List Skeleton */}
      <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-4 space-y-3">
        <div className="h-2 w-12 bg-slate-200 rounded mb-4" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-10 w-full bg-slate-200/50 rounded-lg" />
        ))}
      </div>

      {/* Services List Skeleton */}
      <div className="flex-1 p-5 space-y-5">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-slate-100 rounded" />
          <div className="h-3 w-56 bg-slate-100/50 rounded" />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 w-full bg-slate-50 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
