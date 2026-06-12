import { Download, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UsersHeaderProps } from "../_props";

export function UsersHeader({ onBroadcast, onExport }: UsersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Client Insights
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Understand who is buying and manage your client base
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onExport}
          className="rounded-xl border-slate-200 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 backdrop-blur-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button
          onClick={onBroadcast}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Megaphone className="h-4 w-4" />
          Broadcast
        </Button>
      </div>
    </div>
  );
}
