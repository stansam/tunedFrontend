export function ConfirmSkeleton() {
  return (
    <div
      className="flex flex-col items-center gap-4"
      aria-busy="true"
      aria-label="Verifying your email…"
    >
      <div className="w-20 h-20 rounded-full bg-emerald-50 animate-pulse" />
      <div className="h-5 w-40 rounded-full bg-slate-100 animate-pulse" />
      <div className="h-4 w-56 rounded-full bg-slate-100 animate-pulse" />
    </div>
  );
}
