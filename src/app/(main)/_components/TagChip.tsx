import { cn } from "@/lib/utils";
import type { TagChipProps } from "../_props";

export function TagChip({ name, variant = "default" }: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-white text-slate-700",
        variant === "outline" && "ring-1 ring-white text-white",
        variant === "muted" && "bg-slate-100 text-slate-500"
      )}
    >
      {name}
    </span>
  );
}
