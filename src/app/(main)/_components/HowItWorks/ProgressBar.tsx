import { cn } from "@/lib/utils";

interface ProgressBarProps {
  readonly current: number;
  readonly total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 rounded-full transition-all duration-300",
            i === current
              ? "w-8 bg-amber-500"
              : i < current
                ? "w-2 bg-amber-300"
                : "w-2 bg-stone-200"
          )}
        />
      ))}
    </div>
  );
}
