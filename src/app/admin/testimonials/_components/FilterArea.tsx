"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { FilterAreaProps } from "../_props/testimonials.props";

export function FilterArea({
  search,
  onSearchChange,
  status,
  onStatusChange,
  rating,
  onRatingChange,
  serviceId,
  onServiceChange,
  services,
}: FilterAreaProps) {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6 py-2 w-full">
      <div className="flex flex-wrap gap-4 w-full">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search content or author..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 rounded-xl border border-white/50 bg-white/40 backdrop-blur-md text-xs text-slate-700 shadow-xs focus-visible:bg-white/60 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="w-full sm:w-40 shrink-0">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md text-xs text-slate-600 shadow-xs focus:ring-1 focus:ring-emerald-500 transition-all font-semibold">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-slate-100 bg-white shadow-md text-xs">
              <SelectItem value="all" className="cursor-pointer">All Status</SelectItem>
              <SelectItem value="approved" className="cursor-pointer">Approved Only</SelectItem>
              <SelectItem value="pending" className="cursor-pointer">Pending Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-40 shrink-0">
          <Select value={rating} onValueChange={onRatingChange}>
            <SelectTrigger className="w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md text-xs text-slate-600 shadow-xs focus:ring-1 focus:ring-emerald-500 transition-all font-semibold">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-slate-100 bg-white shadow-md text-xs">
              <SelectItem value="all" className="cursor-pointer">All Ratings</SelectItem>
              <SelectItem value="5" className="cursor-pointer">5 Stars</SelectItem>
              <SelectItem value="4" className="cursor-pointer">4 Stars</SelectItem>
              <SelectItem value="3" className="cursor-pointer">3 Stars</SelectItem>
              <SelectItem value="2" className="cursor-pointer">2 Stars</SelectItem>
              <SelectItem value="1" className="cursor-pointer">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-40 shrink-0">
          <Select value={serviceId} onValueChange={onServiceChange}>
            <SelectTrigger className="w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md text-xs text-slate-600 shadow-xs focus:ring-1 focus:ring-emerald-500 transition-all font-semibold">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-slate-100 bg-white shadow-md text-xs">
              <SelectItem value="all" className="cursor-pointer">All Categories</SelectItem>
              {services.map((svc) => (
                <SelectItem key={svc.id} value={svc.id} className="cursor-pointer">
                  {svc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
