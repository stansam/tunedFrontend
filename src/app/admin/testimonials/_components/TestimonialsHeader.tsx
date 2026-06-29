"use client";

import { Star, CheckCircle, Clock } from "lucide-react";
import type { TestimonialsHeaderProps } from "../_props/testimonials.props";

export function TestimonialsHeader({
  totalCount,
  pendingCount,
  approvedCount,
}: TestimonialsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Testimonials</h1>
        <p className="text-sm text-slate-500 font-medium">
          Manage client feedback, ratings, and testimonials approval status.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md p-4 shadow-2xs flex items-center gap-4">
          <div className="size-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <Star className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Total</span>
            <span className="text-xl font-bold text-slate-800 tabular-nums">{totalCount}</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md p-4 shadow-2xs flex items-center gap-4">
          <div className="size-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Approved</span>
            <span className="text-xl font-bold text-slate-800 tabular-nums">{approvedCount}</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md p-4 shadow-2xs flex items-center gap-4">
          <div className="size-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Pending</span>
            <span className="text-xl font-bold text-slate-800 tabular-nums">{pendingCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
