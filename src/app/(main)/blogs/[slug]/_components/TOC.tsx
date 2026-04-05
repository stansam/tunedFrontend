"use client";

import { cn } from "@/lib/utils";
import { useTableOfContents } from "../_hooks/useTOC";
import type { TableOfContentsProps } from "../_props/post.prop";

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  const { scrollTo } = useTableOfContents(items);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm p-5",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      )}
    >
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        On this page
      </p>
      <ol className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "pl-3 border-l border-slate-100")}
          >
            <button
              onClick={() => scrollTo(item.id)}
              className={cn(
                "w-full text-left text-sm leading-snug py-1 px-2 rounded-md transition-all",
                "hover:bg-emerald-50 hover:text-emerald-700",
                activeId === item.id
                  ? "text-emerald-600 font-semibold bg-emerald-50"
                  : "text-slate-500 font-medium"
              )}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}