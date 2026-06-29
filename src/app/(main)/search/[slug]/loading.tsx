"use client";

import { Navbar } from "../../_components/Navbar";
import { Footer } from "../../_components/Footer";

export default function SearchLoading() {
  return (
    <>
      <Navbar activeRoute="" />
      <main className="min-h-screen bg-[#e8e6e1] pt-10 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-28 bg-slate-300 rounded-full" />
            <div className="h-8 w-80 bg-slate-300 rounded-2xl" />
          </div>

          {/* Tabs Skeleton */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 w-28 bg-slate-300 rounded-xl shrink-0" />
            ))}
          </div>

          {/* Results Grid Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-slate-200/60 rounded-2xl p-5 bg-white space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-200 rounded-xl" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-1/3 bg-slate-200 rounded" />
                    <div className="h-3 w-1/4 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="h-3.5 w-full bg-slate-200 rounded" />
                <div className="h-3.5 w-5/6 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
