import { cn } from "@/lib/utils";
import type { SeoColumnsGridProps } from "../../_props/seo.props";
import { SeoColumn } from "./Column";

export function SeoColumnsGrid({
  columns,
  expandedState,
  onToggle,
}: SeoColumnsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        "sm:grid-cols-2",
        "xl:grid-cols-3"
      )}
    >
      {columns.map((column, index) => (
        <SeoColumn
          key={column.id}
          column={column}
          isExpanded={expandedState[column.id] ?? false}
          onToggle={() => onToggle(column.id)}
          index={index}
        />
      ))}
    </div>
  );
}
