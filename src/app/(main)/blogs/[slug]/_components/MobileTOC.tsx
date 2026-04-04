import { cn } from "@/lib/utils";
import type { MobileTocProps } from "../_props/post.prop";

export function MobileTableOfContents({ items }: MobileTocProps) {
  if (items.length < 2) return null;

  return (
    <details
      className={cn(
        "rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 mb-6",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      )}
    >
      <summary className="flex items-center justify-between cursor-pointer select-none">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Table of contents
        </span>
        <span className="text-slate-300 text-xs">▼</span>
      </summary>
      <ol className="mt-3 space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "pl-3 border-l border-slate-100")}
          >
            <a
              href={`#${item.id}`}
              className="block text-sm text-slate-500 hover:text-emerald-600 py-0.5 transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}