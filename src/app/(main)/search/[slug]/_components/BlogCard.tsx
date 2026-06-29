"use client";

import { Route } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { useSearchTracking } from "@/lib/hooks/useSearchTracking";
import { ResultCardProps } from "../_props";

export function BlogCard({ item, index, eventId }: ResultCardProps) {
  const { trackClick } = useSearchTracking();
  const handleCardClick = () => {
    trackClick("blog", item.id, index, eventId || undefined);
  };

  const pubDate = item.published_at
    ? new Date(item.published_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/blogs/${item.slug}` as Route }
      onClick={handleCardClick}
      className="group block border border-slate-100 rounded-2xl p-5 bg-white hover:bg-slate-50/30 hover:border-emerald-200 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
          <FileText size={20} />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-between justify-between">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-blue-700 transition-colors truncate">
              {item.title}
            </h3>
            {pubDate && (
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                {pubDate}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
        <ArrowRight
          size={14}
          className="text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200"
        />
      </div>
    </Link>
  );
}
