import { cn } from "@/lib/utils";
import type { SeoSectionHeaderProps } from "../../_props/seo.props";

export function SeoSectionHeader({
  id,
  heading,
  subheading,
}: SeoSectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16 text-center">
      <div
        className="inline-flex items-center gap-2 mb-4"
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-emerald-500" />
        <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">
          Why TunedEssays
        </span>
        <span className="h-px w-8 bg-emerald-500" />
      </div>

      <h2
        id={id}
        className={cn(
          "text-2xl font-bold text-white leading-tight",
          "sm:text-3xl md:text-4xl lg:text-5xl",
          "max-w-4xl mx-auto"
        )}
      >
        {heading}
      </h2>

      <p
        className={cn(
          "mt-4 text-slate-400 text-base leading-relaxed",
          "md:text-lg",
          "max-w-2xl mx-auto"
        )}
      >
        {subheading}
      </p>
    </div>
  );
}