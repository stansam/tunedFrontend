import { Clock } from "lucide-react";

export function ActivityTabContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
        <Clock className="h-7 w-7 text-amber-400" />
      </div>
      <div>
        <p className="font-semibold text-slate-800">Activity Coming Soon</p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Order activity history and timeline updates will be available here
          soon.
        </p>
      </div>
    </div>
  );
}
