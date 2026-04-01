export function FaqSkeleton() {
  const pillWidths = [56, 80, 72, 112, 88, 130] as const;
  const cardWidths = [72, 85, 65, 78, 90] as const;

  return (
    <section
      aria-label="Loading FAQ content"
      aria-busy="true"
      className="bg-[#f8f7f4] py-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_224px] lg:items-start">

          <div className="space-y-4">
            <div className="h-12 animate-pulse rounded-full bg-slate-200" />

            <div className="flex gap-2 overflow-hidden">
              {pillWidths.map((w, i) => (
                <div
                  key={i}
                  className="h-9 shrink-0 animate-pulse rounded-full bg-slate-200"
                  style={{ width: w }}
                />
              ))}
            </div>

            <div className="space-y-2 pt-2">
              {cardWidths.map((w, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border border-slate-200 bg-white p-5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className="mb-2.5 h-4 rounded bg-slate-200"
                    style={{ width: `${w}%` }}
                  />
                  <div className="h-3 rounded bg-slate-100" style={{ width: "35%" }} />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 h-3 w-20 rounded bg-slate-200" />
              <div className="space-y-2.5">
                {[65, 55, 80, 70, 90, 75].map((w, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between"
                  >
                    <div className="h-3 rounded bg-slate-200" style={{ width: `${w}%` }} />
                    <div className="h-5 w-7 rounded-full bg-slate-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
