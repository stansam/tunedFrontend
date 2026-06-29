"use client";

export function AdminOrderDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2 w-full sm:w-auto">
          <div className="h-4 w-32 bg-slate-200 rounded" />
          <div className="h-8 w-64 bg-slate-200 rounded" />
        </div>
        <div className="h-10 w-36 bg-slate-200 rounded self-stretch sm:self-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div className="h-32 bg-white/40 border border-white/50 rounded-xl" />
          <div className="h-12 bg-white/40 border border-white/50 rounded-xl" />
          <div className="h-[400px] bg-white/40 border border-white/50 rounded-xl" />
        </div>
        <div className="space-y-6">
          <div className="h-64 bg-white/40 border border-white/50 rounded-xl" />
          <div className="h-48 bg-white/40 border border-white/50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
