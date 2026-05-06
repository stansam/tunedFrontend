"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ServiceSelectProps } from "../../_props/order.props";
import type { ServiceWithPricingCategory } from "@/lib/types";

export function ServiceTypeSelect({ services, value, onChange, isLoading }: ServiceSelectProps) {
  // const writingServices = services.filter(s => s.pricing_category === "writing");
  // const technicalServices = services.filter(s => s.pricing_category === "technical");
  // const editingServices = services.filter(s => s.pricing_category === "proofreading");

  const groupedServices = services.reduce<Record<string, ServiceWithPricingCategory[]>>(
    (acc, service) => {
      const key = service.category || "Other";
      (acc[key] ||= []).push(service);
      // if (!acc[key]) {
      //   acc[key] = [];
      // }
      // acc[key].push(service);
      return acc;
    }, {}
  );

  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="h-14 rounded-2xl border-white bg-white/50 text-base font-medium shadow-sm ring-offset-emerald-500 focus:ring-emerald-500">
        <SelectValue placeholder={isLoading ? "Loading..." : "Choose Service"} />
      </SelectTrigger>
      {/* <SelectContent className="rounded-2xl border-white/50 bg-white/80 backdrop-blur-xl">
        <SelectGroup>
          <SelectLabel className="text-[10px] uppercase tracking-widest text-slate-400">Academic Writing</SelectLabel>
          {writingServices.map(s => <SelectItem key={s.id} value={s.id} className="rounded-xl focus:bg-emerald-50">{s.name}</SelectItem>)}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-[10px] uppercase tracking-widest text-slate-400">Technical</SelectLabel>
          {technicalServices.map(s => <SelectItem key={s.id} value={s.id} className="rounded-xl focus:bg-emerald-50">{s.name}</SelectItem>)}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-[10px] uppercase tracking-widest text-slate-400">Proofreading</SelectLabel>
          {editingServices.map(s => <SelectItem key={s.id} value={s.id} className="rounded-xl focus:bg-emerald-50">{s.name}</SelectItem>)}
        </SelectGroup>
      </SelectContent> */}
      <SelectContent className="rounded-2xl border-white/50 bg-white/80 backdrop-blur-xl">
        {Object.entries(groupedServices).map(([category, items]) => (
          <SelectGroup key={category}>
            <SelectLabel className="text-[10px] uppercase tracking-widest text-slate-400">
              {category}
            </SelectLabel>

            {items.map((s) => (
              <SelectItem
                key={s.id}
                value={s.id}
                className="rounded-xl focus:bg-emerald-50"
              >
                {s.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
