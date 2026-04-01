import { cn } from "@/lib/utils";
import type { BlogHeroProps } from "../_props/blog.props";

export function BlogHero({ 
  title, 
  description, 
  blogCount, 
  categoryCount 
}: BlogHeroProps) {
  return (
    <section
      aria-labelledby="blogs-page-heading"
      className="relative w-full overflow-hidden bg-[#f8f7f4] py-16 md:py-24"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent"
        aria-hidden="true"
      />

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-8 top-0 select-none",
          "text-[120px] font-extrabold leading-none text-slate-800 opacity-[0.03]",
          "md:text-[200px] lg:text-[280px]"
        )}
      >
        INSIGHTS
      </span>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full",
          "bg-emerald-400/10 blur-3xl"
        )}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">

          <div className={cn(
            "inline-flex items-center gap-2 rounded-full",
            "border border-emerald-200 bg-emerald-50 px-4 py-1.5",
            "text-xs font-semibold uppercase tracking-wider text-emerald-700"
          )}>
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            The Tuned Blog
          </div>

          <h1
            id="blogs-page-heading"
            className="text-3xl font-bold leading-tight text-slate-800 sm:text-4xl md:text-5xl lg:text-[3.5rem]"
          >
            {title}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border border-slate-200 bg-white px-4 py-2 shadow-sm",
              "text-sm font-medium text-slate-700"
            )}>
              <span className="text-emerald-500 font-bold">{blogCount}+</span>
              articles published
            </div>
            <div className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border border-slate-200 bg-white px-4 py-2 shadow-sm",
              "text-sm font-medium text-slate-700"
            )}>
              <span className="text-emerald-500 font-bold">{categoryCount}</span>
              knowledge areas
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-b from-transparent to-[#f8f7f4]"
        aria-hidden="true"
      />
    </section>
  );
}
