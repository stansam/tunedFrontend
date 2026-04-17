"use client";

import { useTags } from "../_hooks/useTags";
import { cn } from "@/lib/utils";
import { TagsFallback } from "./TagsFallback";
import type { TagResponse } from "@/lib/types/tag.type";

export function TagsBar() {
  const { tags, isLoading } = useTags();

  if (isLoading) {
    return <TagsFallback />;
  }

  if (!tags || tags.length === 0) {
    return <TagsFallback />;
  }

  return (
    <nav
      aria-label="tags"
      className={cn(
        "w-full",
        "bg-[#f2f1ec] border-b border-slate-200/60 shadow-sm",
        "relative z-20 overflow-hidden"
      )}
    >
      <div className="flex w-max animate-marquee">
        <ul className="flex flex-1 items-center gap-2 px-2 py-2.5">
          {tags.map((tag, i) => (
            <TagItem key={`primary-${tag.id}-${i}`} tag={tag} isFeatured={tag.usage_count > 50} />
          ))}
        </ul>
        <ul className="flex flex-1 items-center gap-2 px-2 py-2.5" aria-hidden="true">
          {tags.map((tag, i) => (
            <TagItem key={`clone-${tag.id}-${i}`} tag={tag} isFeatured={tag.usage_count > 50} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

function TagItem({ tag, isFeatured }: { tag: TagResponse; isFeatured: boolean }) {
  return (
    <li className="shrink-0 flex">
      <button
        type="button"
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5",
          "rounded-full px-4 py-1.5",
          "text-sm font-semibold whitespace-nowrap",
          "transition-colors duration-150 cursor-default",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
          isFeatured
            ? "bg-emerald-600 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:bg-emerald-700"
            : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        )}
        aria-pressed={isFeatured}
      >
        {isFeatured && <span aria-hidden="true">🔥</span>}
        {tag.name}
      </button>
    </li>
  );
}