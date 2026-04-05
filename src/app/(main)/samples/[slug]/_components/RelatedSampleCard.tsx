import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatWordCount,
  readTimeFromWordCount,
  validateSampleImage,
  getServiceColourTokens,
  truncateText,
} from "../utils";
import type { RelatedSampleCardProps } from "../_props/sample.prop";

export function RelatedSampleCard({ sample }: RelatedSampleCardProps) {
  const image       = validateSampleImage(sample.image);
  const colour      = getServiceColourTokens(sample.service.name);
  const readTime    = readTimeFromWordCount(sample.word_count);
  const wordCount   = formatWordCount(sample.word_count);
  const shortExcerpt = truncateText(sample.excerpt, 110);

  return (
    <Link
      href={{pathname:`/samples/${sample.slug}`}}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl",
        "border border-slate-200 bg-white",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200",
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:-translate-y-1 hover:border-emerald-200"
      )}
      aria-label={`View sample: ${sample.title}`}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={`Preview image for ${sample.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={cn(
          "absolute left-3 top-3 rounded-full px-2.5 py-1",
          "text-[11px] font-semibold",
          "bg-white/90 backdrop-blur-sm",
          colour.text
        )}>
          {sample.service.name}
        </span>
        {sample.featured && (
          <span className={cn(
            "absolute right-3 top-3 rounded-full px-2 py-0.5",
            "bg-amber-400 text-[10px] font-bold text-white"
          )}>
            ★ Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className={cn(
          "mb-2 line-clamp-2 text-sm font-bold leading-snug text-slate-800",
          "group-hover:text-emerald-700 transition-colors"
        )}>
          {sample.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {shortExcerpt}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <FileText size={11} aria-hidden="true" />
              {wordCount}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} aria-hidden="true" />
              {readTime} min
            </span>
          </div>
          <span className={cn(
            "flex items-center gap-1 text-xs font-semibold text-emerald-600",
            "group-hover:gap-2 transition-all"
          )}>
            View
            <ArrowRight size={13} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}