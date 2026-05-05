"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LevelSelectProps } from "../../_props/order.props";

export function ProjectLevelSelect({ levels, value, onChange }: LevelSelectProps) {
  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="h-14 rounded-2xl border-white bg-white/50 text-base font-medium shadow-sm ring-offset-emerald-500 focus:ring-emerald-500">
        <SelectValue placeholder="Select level" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-white/50 bg-white/80 backdrop-blur-xl">
        {levels.map(l => (
          <SelectItem key={l.id} value={l.id} className="rounded-xl focus:bg-emerald-50">
            {l.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
