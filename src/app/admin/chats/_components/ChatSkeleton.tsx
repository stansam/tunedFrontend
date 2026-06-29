import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 lg:px-6 h-[calc(100vh-120px)]">
      {/* Left Panel Skeleton */}
      <div className="lg:col-span-1 rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-4 flex flex-col gap-4">
        <Skeleton className="h-8 w-24 bg-slate-200/60" />
        <Skeleton className="h-10 w-full bg-slate-200/60" />
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Skeleton className="h-10 w-10 rounded-full bg-slate-200/60 shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/2 bg-slate-200/60" />
                <Skeleton className="h-2 w-3/4 bg-slate-200/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Panel Skeleton */}
      <div className="lg:col-span-3 rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/20">
          <div className="flex gap-3 items-center">
            <Skeleton className="h-10 w-10 rounded-full bg-slate-200/60" />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-32 bg-slate-200/60" />
              <Skeleton className="h-2.5 w-48 bg-slate-200/60" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 bg-slate-200/60" />
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-end p-4">
          <Skeleton className="h-10 w-1/3 rounded-xl rounded-bl-none self-start bg-slate-200/60" />
          <Skeleton className="h-10 w-1/2 rounded-xl rounded-br-none self-end bg-slate-200/60" />
          <Skeleton className="h-10 w-1/4 rounded-xl rounded-bl-none self-start bg-slate-200/60" />
        </div>
        <Skeleton className="h-10 w-full bg-slate-200/60" />
      </div>
    </div>
  );
}
export default ChatSkeleton;
