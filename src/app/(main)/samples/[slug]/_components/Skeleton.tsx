import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-slate-200/70", className)}
      aria-hidden="true"
    />
  );
}

export function SampleDetailHeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8f7f4] pb-0 pt-10">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Shimmer className="h-4 w-12" />
          <Shimmer className="h-4 w-3" />
          <Shimmer className="h-4 w-16" />
          <Shimmer className="h-4 w-3" />
          <Shimmer className="h-4 w-24" />
        </div>

        <Shimmer className="mb-4 h-6 w-36 rounded-full" />

        <Shimmer className="mb-5 h-6 w-24 rounded-full" />

        <div className="mb-6 max-w-4xl space-y-3">
          <Shimmer className="h-11 w-full" />
          <Shimmer className="h-11 w-4/5" />
          <Shimmer className="h-11 w-3/5" />
        </div>

        <div className="mb-8 max-w-2xl space-y-2">
          <Shimmer className="h-5 w-full" />
          <Shimmer className="h-5 w-5/6" />
          <Shimmer className="h-5 w-4/6" />
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <Shimmer className="h-9 w-32 rounded-full" />
          <Shimmer className="h-9 w-28 rounded-full" />
          <Shimmer className="h-9 w-24 rounded-full" />
        </div>

        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((i) => (
            <Shimmer key={i} className="h-7 w-20 rounded-md" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Shimmer className="w-full aspect-video md:aspect-21/8 rounded-2xl" />
      </div>
    </section>
  );
}

export function SampleDetailContentSkeleton() {
  return (
    <div className={cn(
      "grid grid-cols-1 gap-8",
      "lg:grid-cols-[1fr_320px] lg:gap-10",
      "xl:grid-cols-[1fr_360px]"
    )}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Shimmer className="h-6 w-32" />
          <Shimmer className="h-9 w-28 rounded-lg" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 flex items-center gap-3">
            <Shimmer className="h-4 w-4 rounded-full" />
            <Shimmer className="h-4 w-4 rounded-full" />
            <Shimmer className="h-4 w-4 rounded-full" />
            <Shimmer className="ml-auto h-4 w-32" />
          </div>

          <div className="px-8 py-10 space-y-6">
            <Shimmer className="h-8 w-3/4 mx-auto" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Shimmer key={i} className="h-4 w-full" />
              ))}
              <Shimmer className="h-4 w-4/5" />
            </div>
            <Shimmer className="h-6 w-2/5" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Shimmer key={i} className="h-4 w-full" />
              ))}
              <Shimmer className="h-4 w-3/5" />
            </div>
          </div>

          <div className="px-8 pb-8">
            <Shimmer className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Shimmer className="h-48 w-full rounded-2xl" />
        <Shimmer className="h-32 w-full rounded-2xl" />
        <Shimmer className="h-14 w-full rounded-full" />
        <Shimmer className="h-14 w-full rounded-full" />
      </div>
    </div>
  );
}

export function RelatedSamplesSkeleton() {
  return (
    <section className="bg-[#f8f7f4] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-10">
          <Shimmer className="mb-3 h-3 w-24" />
          <Shimmer className="h-8 w-52" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <Shimmer className="aspect-video w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Shimmer className="h-5 w-4/5" />
                <Shimmer className="h-5 w-3/5" />
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-4 w-5/6" />
                <div className="flex items-center justify-between pt-1">
                  <Shimmer className="h-6 w-24 rounded-full" />
                  <Shimmer className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SampleDetailPageSkeleton() {
  return (
    <div className="bg-[#f8f7f4]">
      <SampleDetailHeroSkeleton />
      <section className="bg-[#f0ede8] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <SampleDetailContentSkeleton />
        </div>
      </section>
    </div>
  );
}