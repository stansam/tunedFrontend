"use client";

export function ProgressBar({ step }: { step: number }) {
  const progress = (step / 3) * 100;
  
  return (
    <div className="fixed top-16 left-0 z-50 h-1 w-full bg-black/5">
      <div 
        className="h-full bg-emerald-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
