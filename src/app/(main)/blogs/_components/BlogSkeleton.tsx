import { BlogCardSkeleton } from "../../_components/skeleton";

export function BlogSkeleton() {
  return (
    <section className="bg-[#e8e6e1] pb-16 pt-8 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        
        <div className="mb-8 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="h-11 w-full max-w-md animate-pulse rounded-lg bg-white ring-1 ring-slate-200" />
            
            <div className="h-11 w-40 animate-pulse rounded-lg bg-white ring-1 ring-slate-200" />
          </div>

          <div className="flex items-center gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-white ring-1 ring-slate-200" 
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[400px]">
            <BlogCardSkeleton isPrimary />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-h-[280px]">
              <BlogCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
