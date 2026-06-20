import { cn } from "@/lib/utils";
import type { FeaturedServicesIndicatorsProps } from "../_props/featured.props";

export function FeaturedServicesIndicators({
  count,
  activeIndex,
  onDotClick,
}: FeaturedServicesIndicatorsProps) {
  if (count <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4" aria-label="Carousel pagination">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onDotClick(idx)}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            activeIndex === idx
              ? "w-6 bg-emerald-500"
              : "w-2 bg-slate-200 hover:bg-slate-300"
          )}
          aria-label={`Go to slide ${idx + 1}`}
          aria-current={activeIndex === idx ? "true" : "false"}
        />
      ))}
    </div>
  );
}
