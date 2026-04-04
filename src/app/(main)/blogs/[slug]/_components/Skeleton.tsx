import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-200/70",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function BlogDetailHeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8f7f4] pb-0 pt-10">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Shimmer className="h-4 w-10" />
          <Shimmer className="h-4 w-3" />
          <Shimmer className="h-4 w-10" />
        </div>

        <Shimmer className="mb-5 h-6 w-32 rounded-full" />

        <div className="mb-6 space-y-3 max-w-3xl">
          <Shimmer className="h-10 w-full" />
          <Shimmer className="h-10 w-4/5" />
          <Shimmer className="h-10 w-3/5" />
        </div>

        <div className="mb-8 space-y-2 max-w-2xl">
          <Shimmer className="h-5 w-full" />
          <Shimmer className="h-5 w-5/6" />
        </div>

        <div className="mb-8 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Shimmer className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5">
              <Shimmer className="h-3.5 w-24" />
              <Shimmer className="h-3 w-12" />
            </div>
          </div>
          <Shimmer className="h-4 w-24 hidden sm:block" />
          <Shimmer className="h-4 w-24 hidden sm:block" />
        </div>

        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((i) => (
            <Shimmer key={i} className="h-7 w-16 rounded-md" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Shimmer className="w-full aspect-video md:aspect-21/8 rounded-2xl" />
      </div>
    </section>
  );
}

export function BlogDetailContentSkeleton() {
  return (
    <div className="flex gap-8">
      <aside className="hidden xl:block w-56 shrink-0">
        <div className="sticky top-24 rounded-xl border border-slate-200 bg-white/70 p-5 space-y-2">
          <Shimmer className="h-3 w-20 mb-3" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Shimmer key={i} className="h-7 w-full" />
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-4">
        <Shimmer className="h-12 w-full rounded-xl xl:hidden mb-6" />

        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            {i % 3 === 0 && <Shimmer className="h-7 w-2/5 mb-4 mt-6" />}
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
            <Shimmer className="h-4 w-4/5" />
          </div>
        ))}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <Shimmer className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function BlogDetailCommentsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shimmer className="h-9 w-9 rounded-full" />
        <Shimmer className="h-5 w-32" />
      </div>

      {/* Comments */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-slate-100 bg-white p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Shimmer className="h-9 w-9 rounded-full" />
            <div className="space-y-1.5">
              <Shimmer className="h-3.5 w-20" />
              <Shimmer className="h-3 w-14" />
            </div>
          </div>
          <Shimmer className="h-3.5 w-full" />
          <Shimmer className="h-3.5 w-4/5" />
          <div className="flex gap-3">
            <Shimmer className="h-7 w-16 rounded-full" />
            <Shimmer className="h-7 w-16 rounded-full" />
          </div>
        </div>
      ))}

      <Shimmer className="h-56 w-full rounded-2xl mt-6" />
    </div>
  );
}

export function RelatedBlogsSkeleton() {
  return (
    <section className="bg-[#f8f7f4] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-10">
          <Shimmer className="h-3 w-24 mb-3" />
          <Shimmer className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <Shimmer className="aspect-video w-full rounded-none" />
              <div className="p-4 space-y-2">
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-4 w-4/5" />
                <Shimmer className="h-3.5 w-full mt-2" />
                <Shimmer className="h-3.5 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}