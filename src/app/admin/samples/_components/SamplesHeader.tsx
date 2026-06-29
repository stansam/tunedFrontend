"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SamplesHeaderProps {
  readonly onCreateClick: () => void;
}

export function SamplesHeader({ onCreateClick }: SamplesHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 lg:px-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Samples</h1>
        <p className="text-sm text-slate-500 font-medium">
          Manage sample essays and documents visible to potential clients
        </p>
      </div>
      <Button
        onClick={onCreateClick}
        className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs px-4 py-2 transition-all flex items-center gap-2 cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        Upload Sample
      </Button>
    </div>
  );
}
