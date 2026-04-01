import React from "react";

/**
 * Collection of premium skeletons for the service detail page.
 * Designed to minimize layout shift and maintain aesthetic during streaming.
 */

export function ServiceHeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-20 pb-32 lg:py-28 lg:pb-40 animate-pulse">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="h-6 w-32 rounded-full bg-slate-800 self-center lg:self-start" />
            <div className="h-12 w-3/4 bg-slate-800 rounded-lg self-center lg:self-start" />
            <div className="h-4 w-5/6 bg-slate-800 rounded-lg self-center lg:self-start" />
            <div className="h-4 w-4/6 bg-slate-800 rounded-lg self-center lg:self-start" />
            <div className="mt-4 h-10 w-48 bg-slate-800 rounded-full self-center lg:self-start" />
          </div>
          <div className="relative mx-auto w-full max-w-[440px] h-[480px] bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-2xl lg:mr-0" />
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailsSkeleton() {
  return (
    <section className="bg-white py-16 lg:py-24 animate-pulse">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <div className="h-10 w-48 bg-slate-100 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-50 rounded" />
            <div className="h-4 w-full bg-slate-50 rounded" />
            <div className="h-4 w-5/6 bg-slate-50 rounded" />
            <div className="h-4 w-full bg-slate-50 rounded" />
            <div className="h-4 w-4/6 bg-slate-50 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-slate-100">
          <div className="h-32 bg-slate-50 rounded-2xl" />
          <div className="h-32 bg-slate-50 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export function RelatedContentSkeleton() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24 border-t border-slate-100 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="h-6 w-24 bg-slate-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function DropdownSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 animate-pulse">
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
