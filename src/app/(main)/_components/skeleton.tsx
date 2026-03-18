export function HeroSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="w-full md:w-[42%] space-y-4">
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-20 rounded-2xl bg-slate-200" />
          <div className="h-8 w-3/4 rounded-full bg-slate-200" />
          <div className="h-10 w-full max-w-[320px] rounded-full bg-slate-200" />
        </div>
        <div className="w-full md:w-[58%] flex justify-center">
          <div className="h-[560px] w-[320px] rounded-[48px] bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
