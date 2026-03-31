import { cn } from "@/lib/utils";
import type { KeywordTagsProps, KeywordTagChipProps } from "../../_props/seo.props";

function KeywordTagChip({ tag }: KeywordTagChipProps) {
  return (
    <span
      id={tag.slug}
      className={cn(
        "inline-flex items-center rounded-full",
        "border border-slate-700/60 bg-slate-800/50",
        "px-3 py-1 text-xs font-medium text-slate-400",
        "transition-colors duration-150",
        "hover:border-emerald-700/60 hover:bg-emerald-900/20 hover:text-emerald-300"
      )}
    >
      {tag.label}
    </span>
  );
}

export function KeywordTags({ tags, label, compact = false }: KeywordTagsProps) {
  return (
    <div>
      {label !== undefined && (
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
          {label}
        </p>
      )}
      <ul
        className={cn("flex flex-wrap", compact ? "gap-1.5" : "gap-2")}
        aria-label={label ?? "Service keyword tags"}
      >
        {tags.map((tag) => (
          <li key={tag.slug}>
            <KeywordTagChip tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}
