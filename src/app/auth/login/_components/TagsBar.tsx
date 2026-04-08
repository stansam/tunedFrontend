import { cn } from "@/lib/utils";

const FALLBACK_TAGS = [
  { label: "Popular",                       icon: "🔥", featured: true  },
  { label: "Proofreading and Editing",      icon: null, featured: false },
  { label: "Writing",                       icon: null, featured: false },
  { label: "Data Analysis",                 icon: null, featured: false },
  { label: "Business and Market Research",  icon: null, featured: false },
  { label: "Presentations",                 icon: null, featured: false },
  { label: "Resume Writing",                icon: null, featured: false },
  { label: "Technical Writing & Calculations", icon: null, featured: false },
] as const;

export function TagsBar() {
  return (
    <nav
      aria-label="tags"
      className={cn(
        "w-full",
        "bg-[#f2f1ec] border-b border-slate-200/60 shadow-sm",
        "relative z-20"
      )}
    >
      <ul
        className={cn(
          "flex items-center gap-2 px-4 py-2.5",
          "overflow-x-auto scrollbar-none no-scrollbar",
          "relative"
        )}
      >
        {FALLBACK_TAGS.map((cat) => (
          <li key={cat.label} className="shrink-0 flex">
            <button
              type="button"
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5",
                "rounded-full px-4 py-1.5",
                "text-sm font-semibold whitespace-nowrap",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                cat.featured
                  ? "bg-emerald-600 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:bg-emerald-700"
                  : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
              aria-pressed={cat.featured}
            >
              {cat.icon && (
                <span aria-hidden="true">{cat.icon}</span>
              )}
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}