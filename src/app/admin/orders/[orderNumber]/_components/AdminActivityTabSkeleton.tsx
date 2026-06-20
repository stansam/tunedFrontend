"use client";

export function AdminActivityTabSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col space-y-4">
        <div className="h-16 w-3/4 bg-white/5 rounded-xl self-start border border-white/5" />
        <div className="h-24 w-2/3 bg-white/5 rounded-xl self-end border border-white/5" />
        <div className="h-16 w-1/2 bg-white/5 rounded-xl self-start border border-white/5" />
      </div>
      <div className="h-28 bg-white/5 rounded-xl border border-white/10" />
    </div>
  );
}
