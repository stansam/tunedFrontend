"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/api-client";
import type { OrdersToolbarProps } from "../_props/orders.props";

export function OrdersToolbar({
  searchValue,
  onSearchChange,
  serviceValue,
  onServiceChange,
  sortValue,
  sortOrder,
  onSortChange,
}: OrdersToolbarProps) {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiGet<Array<{ readonly id: string; readonly name: string }>>("/services");
      return res.ok ? res.data ?? [] : [];
    },
    staleTime: 300_000,
  });

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Search orders..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-white/40 border-white/50 backdrop-blur-md rounded-xl"
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full sm:w-auto items-center sm:justify-end">
        <Select value={serviceValue} onValueChange={onServiceChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-white/40 border-white/50 backdrop-blur-md rounded-xl">
            <SelectValue placeholder="All Services" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Services</SelectItem>
            {(services ?? []).map((svc) => (
              <SelectItem key={svc.id} value={svc.id}>
                {svc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={`${sortValue}-${sortOrder}`}
          onValueChange={(val) => {
            const [field, order] = val.split("-") as [
              "created_at" | "due_date" | "title",
              "asc" | "desc",
            ];
            onSortChange(field, order);
          }}
        >
          <SelectTrigger className="w-full sm:w-[160px] bg-white/40 border-white/50 backdrop-blur-md rounded-xl">
            <SelectValue placeholder="Sort Orders" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="created_at-desc">Newest First</SelectItem>
            <SelectItem value="created_at-asc">Oldest First</SelectItem>
            <SelectItem value="due_date-asc">Deadline (Soonest)</SelectItem>
            <SelectItem value="due_date-desc">Deadline (Furthest)</SelectItem>
            <SelectItem value="title-asc">Title A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
