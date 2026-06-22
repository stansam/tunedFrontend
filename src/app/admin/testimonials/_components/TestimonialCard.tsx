"use client";
import { Star, Check, Edit, Trash2, ChevronDown, ChevronUp, Link as LinkIcon, User } from "lucide-react";
import type { TestimonialCardProps } from "../_props/testimonials.props";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";

export function TestimonialCard({
  testimonial, expanded, onToggleExpand, onApprove, onEdit, onDelete, isApproving,
}: TestimonialCardProps) {
  const authorName = testimonial.user?.name || "Anonymous Client";
  const authorEmail = testimonial.user?.email || "No email";
  const dateStr = testimonial.created_at ? new Date(testimonial.created_at).toLocaleDateString() : "Recent";
  const isApproved = testimonial.is_approved;

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs transition-all duration-300 hover:bg-white/50 hover:shadow-sm overflow-hidden w-full">
      <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/60 border border-white/85 shrink-0 overflow-hidden">
            {testimonial.user?.avatar_url ? (
              <Image src={testimonial.user.avatar_url} alt={authorName} width={40} height={40} unoptimized className="size-full rounded-xl object-cover" />
            ) : <User className="h-5 w-5 text-slate-400" />}
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 text-sm truncate">{authorName}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isApproved ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                {isApproved ? "Approved" : "Pending"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {authorEmail} · {testimonial.service?.name || "General"} · {dateStr}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto md:ml-0 shrink-0 self-end md:self-auto text-slate-500 font-medium">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`size-3.5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!isApproved && (
              <button disabled={isApproving} onClick={onApprove} className="px-2.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer"><Check className="h-3.5 w-3.5" /> Approve</button>
            )}
            <button onClick={onToggleExpand} className="px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-white/60 hover:bg-white border border-slate-200 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer">
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-5 pt-2 border-t border-white/20 bg-white/20 backdrop-blur-xs space-y-4">
          <p className="text-xs text-slate-700 bg-white/40 border border-white/30 rounded-xl p-3 shadow-2xs leading-relaxed font-medium">
            &quot;{testimonial.content}&quot;
          </p>
          <div className="flex items-center justify-between gap-3 text-xs">
            {testimonial.order_number ? (
              <Link href={`/admin/orders/${testimonial.order_number}` as Route} className="text-emerald-600 hover:text-emerald-500 font-semibold inline-flex items-center gap-1">
                <LinkIcon className="h-3.5 w-3.5" /> View Linked Order
              </Link>
            ) : <span className="text-slate-400 italic">No order linked</span>}
            <div className="flex gap-2">
              <button onClick={onEdit} className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer"><Edit className="h-3.5 w-3.5" /> Edit</button>
              <button onClick={onDelete} className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
