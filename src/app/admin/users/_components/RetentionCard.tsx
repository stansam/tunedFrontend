import type { RetentionCardProps } from "../_props";

export function RetentionCard({ rate }: RetentionCardProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/40 p-5 backdrop-blur-md shadow-sm flex flex-col justify-between h-[120px]">
      <div>
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Client Retention Rate
        </span>
        <div className="mt-1">
          <span className="text-2xl font-black text-slate-900 md:text-3xl">
            {rate}%
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="h-2 w-full rounded-full bg-slate-100/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${rate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
