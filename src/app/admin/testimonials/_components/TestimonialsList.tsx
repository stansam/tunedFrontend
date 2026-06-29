"use client";

import { Inbox } from "lucide-react";
import { TestimonialCard } from "./TestimonialCard";
import type { TestimonialsListProps } from "../_props/testimonials.props";

export function TestimonialsList({
  testimonials,
  loading,
  expandedCardId,
  onToggleExpandCard,
  onApprove,
  onEdit,
  onDelete,
  page,
  total,
  onPageChange,
  isApprovingId,
}: TestimonialsListProps) {
  if (loading) {
    return (
      <div className="text-center py-12 text-slate-500 font-medium text-xs">
        Loading testimonials list...
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-12 text-center text-slate-500 text-sm flex flex-col items-center justify-center gap-3">
        <Inbox className="h-12 w-12 text-slate-300" />
        <p className="font-semibold text-slate-700">No testimonials found</p>
        <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="space-y-4 px-4 lg:px-6 w-full pb-10">
      <div className="space-y-3">
        {testimonials.map((t) => (
          <TestimonialCard
            key={t.id}
            testimonial={t}
            expanded={expandedCardId === t.id}
            onToggleExpand={() => onToggleExpandCard(t.id)}
            onApprove={() => onApprove(t.id)}
            onEdit={() => onEdit(t)}
            onDelete={() => onDelete(t)}
            isApproving={isApprovingId === t.id}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/20 pt-4 text-xs font-semibold text-slate-500">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1.5 rounded-xl bg-white/60 hover:bg-white border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1.5 rounded-xl bg-white/60 hover:bg-white border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
