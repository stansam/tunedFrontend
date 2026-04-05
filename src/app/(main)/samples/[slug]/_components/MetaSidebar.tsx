import Link from "next/link";
import {
  FileText,
  Clock,
  Tag as TagIcon,
  ArrowRight,
  BookOpen,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getServiceColourTokens } from "../utils";
import type { SampleMetaSidebarProps } from "../_props/sample.prop";

const SERVICE_HIGHLIGHTS = [
  "100% original, custom-written",
  "Delivered to your deadline",
  "Free unlimited revisions",
  "Plagiarism report included",
] as const;

export function SampleMetaSidebar({ sample }: SampleMetaSidebarProps) {
  const colour = getServiceColourTokens(sample.service.name);

  return (
    <aside aria-label="Sample details and order options" className="flex flex-col gap-5">

      <div className={cn(
        "rounded-2xl border p-5",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04)]",
        colour.bg,
        colour.border
      )}>
        <div className="mb-4 flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
          )}>
            <BookOpen size={18} className={colour.text} aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Service type
            </p>
            <p className={cn("text-sm font-bold", colour.text)}>
              {sample.service.name}
            </p>
          </div>
        </div>

        {sample.service.description && (
          <p className="text-sm leading-relaxed text-slate-600">
            {sample.service.description}
          </p>
        )}

        <Link
          href={{pathname:`/service/${sample.service.slug}`}}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 text-xs font-semibold",
            colour.text,
            "hover:underline transition-colors"
          )}
        >
          Explore service
          <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </div>

      <div className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      )}>
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Document details
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FileText size={15} className="text-emerald-500 shrink-0" aria-hidden="true" />
              Word count
            </div>
            <span className="text-sm font-bold text-slate-800">
              {sample.wordCountFormatted}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock size={15} className="text-emerald-500 shrink-0" aria-hidden="true" />
              Reading time
            </div>
            <span className="text-sm font-bold text-slate-800">
              ~{sample.readTimeMinutes} min
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Layers size={15} className="text-emerald-500 shrink-0" aria-hidden="true" />
              Category
            </div>
            <span className="text-sm font-bold text-slate-800 text-right max-w-[140px] truncate">
              {sample.service.name}
            </span>
          </div>

          {sample.featured && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" aria-hidden="true" />
                Quality
              </div>
              <span className={cn(
                "inline-flex items-center gap-1 rounded-full",
                "bg-amber-50 border border-amber-200 px-2.5 py-0.5",
                "text-xs font-semibold text-amber-700"
              )}>
                Featured work
              </span>
            </div>
          )}
        </div>
      </div>

      {sample.tags.length > 0 && (
        <div className={cn(
          "rounded-2xl border border-slate-200 bg-white p-5",
          "shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        )}>
          <div className="mb-3 flex items-center gap-2">
            <TagIcon size={13} className="text-slate-400" aria-hidden="true" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Topics
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sample.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/samples?tag=${tag.slug}`}
                className={cn(
                  "rounded-md bg-slate-100 px-2.5 py-1",
                  "text-xs font-medium text-slate-600",
                  "hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                )}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link
        href={{pathname:"/order", query:{service:sample.service.slug,ref:sample.slug}}}
        className={cn(
          "flex w-full items-center justify-center gap-2",
          "rounded-full bg-emerald-500 hover:bg-emerald-600",
          "px-6 py-4 text-sm font-bold text-white",
          "shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all",
          "hover:shadow-[0_6px_20px_rgba(16,185,129,0.45)] hover:-translate-y-0.5"
        )}
      >
        Order similar work
        <ArrowRight size={16} aria-hidden="true" />
      </Link>

      <Link
        href={{pathname:"/contact"}}
        className={cn(
          "flex w-full items-center justify-center gap-2",
          "rounded-full border border-slate-200 bg-white hover:border-emerald-300",
          "px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-emerald-700",
          "shadow-sm transition-all"
        )}
      >
        Ask a question
      </Link>

      <ul
        className="space-y-2 px-1"
        aria-label="Service guarantees"
      >
        {SERVICE_HIGHLIGHTS.map((point) => (
          <li key={point} className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2
              size={13}
              className="shrink-0 text-emerald-500"
              aria-hidden="true"
            />
            {point}
          </li>
        ))}
      </ul>
    </aside>
  );
}