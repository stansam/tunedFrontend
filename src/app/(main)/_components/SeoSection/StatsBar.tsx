import { cn } from "@/lib/utils";
import type { SeoStatsBarProps, SeoStatItemProps } from "../../_props/seo.props";

function SeoStatItem({ stat, index }: SeoStatItemProps) {
  return (
    <div
      data-stat-index={index}
      className={cn(
        "min-w-[calc(100%/3)] shrink-0 snap-center",
        "md:min-w-0 md:shrink",
        "flex flex-col items-center justify-center gap-1.5 px-4 py-7 sm:px-6"
      )}
      aria-label={stat.ariaLabel ?? `${stat.value} ${stat.label}`}
    >
      <span
        className="block text-2xl font-bold leading-none text-emerald-400 sm:text-3xl md:text-[2rem]"
        aria-hidden="true"
      >
        {stat.value}
      </span>
      <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 sm:text-xs">
        {stat.label}
      </span>
    </div>
  );
}

export function SeoStatsBar({ stats }: SeoStatsBarProps) {
  return (
    <div className="w-full border-y border-slate-800">
      <ul
        className={cn(
          "flex overflow-x-auto snap-x snap-mandatory",
          "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          "divide-x divide-slate-800",
          "md:grid md:grid-cols-6 md:overflow-visible"
        )}
        aria-label="Key performance statistics"
      >
        {stats.map((stat, index) => (
          <li key={stat.label}>
            <SeoStatItem stat={stat} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
