import { cn } from "@/lib/utils";
import type { ServiceCardProps } from "../../_props";
import { resolveServiceIcon } from "@/lib/utils/resolveServiceIcon";

export function FeaturedServiceCard({ service }: ServiceCardProps) {
  const { emoji, ariaLabel } = resolveServiceIcon(service);

  return (
    <article
      className={cn(
        "flex shrink-0 items-start gap-3 rounded-2xl bg-white px-5 py-4",
        "shadow-sm ring-1 ring-slate-100 w-[260px] sm:w-[280px]",
        "transition-shadow hover:shadow-md cursor-default select-none"
      )}
      aria-label={service.name}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
        <span className="text-2xl leading-none" role="img" aria-label={ariaLabel}>
          {emoji}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-800 text-sm leading-snug truncate">
          {service.name}
        </p>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
      </div>
    </article>
  );
}
