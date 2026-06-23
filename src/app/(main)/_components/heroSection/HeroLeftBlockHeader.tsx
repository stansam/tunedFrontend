"use client";

export function HeroLeftBlockHeader() {
  return (
    <div className="flex flex-col justify-center align-center gap-2 mb-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
        Your Trusted Writer &amp; Editor
      </h1>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-6 w-10 rounded-full bg-slate-200 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-slate-400" />
        </div>
        <p className="text-sm italic text-slate-500 font-medium">
          Your love letter to the very essence of writing
        </p>
      </div>
    </div>
  );
}
