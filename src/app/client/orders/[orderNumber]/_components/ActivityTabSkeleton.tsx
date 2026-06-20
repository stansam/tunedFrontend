import { Skeleton } from "@/components/ui/skeleton";

function BubbleSkeleton({ align }: { align: "left" | "right" }) {
  return (
    <div className={`flex gap-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      <div className="flex flex-col gap-1.5 max-w-[72%]">
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-14 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function ActivityTabSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-md">
      <div className="flex-1 space-y-4 py-2">
        <BubbleSkeleton align="left" />
        <BubbleSkeleton align="right" />
        <BubbleSkeleton align="left" />
      </div>
      <div className="mt-2">
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    </div>
  );
}
