import { cn } from "@/lib/utils";

const FAKE_ITEMS = Array.from({ length: 8 });

export function TagsFallback() {
  return (
    <nav
      aria-label="tags skeleton"
      className={cn(
        "w-full overflow-hidden",
        "bg-[#f2f1ec] border-b border-slate-200/60 shadow-sm",
        "relative z-20"
      )}
    >
      <ul className="flex items-center gap-2 px-4 py-2.5">
        {FAKE_ITEMS.map((_, i) => (
          <li key={i} className="shrink-0 flex">
            <span
              className={cn(
                "inline-flex shrink-0 w-28 h-8 rounded-full",
                "bg-slate-200/70 animate-pulse"
              )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
