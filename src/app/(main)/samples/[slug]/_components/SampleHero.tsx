import Image from "next/image";
import Link from "next/link";
import { FileText, Clock, Star, Tag as TagIcon, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { getServiceColourTokens } from "../utils";
import type { SampleDetailHeroProps } from "../_props/sample.prop";

export function SampleDetailHero({ sample }: SampleDetailHeroProps) {
  const serviceColour = getServiceColourTokens(sample.service.name);

  return (
    <section
      aria-labelledby="sample-detail-heading"
      className="relative w-full overflow-hidden bg-[#f8f7f4]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent"
      />

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-8 top-0 select-none",
          "font-extrabold leading-none text-slate-800 opacity-[0.025]",
          "text-[100px] md:text-[180px] lg:text-[240px]"
        )}
      >
        SAMPLE
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-32 h-64 w-64 rounded-full bg-teal-400/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-0 sm:px-6 lg:max-w-7xl lg:px-8">

        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
            <li>
              <Link
                href="/"
                className="font-medium transition-colors hover:text-emerald-600"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} className="text-slate-300" />
            </li>
            <li>
              <Link
                href="/samples"
                className="font-medium transition-colors hover:text-emerald-600"
              >
                Samples
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} className="text-slate-300" />
            </li>
            <li>
              <Link
                href={`/samples?service=${sample.service.slug}`}
                className="font-medium transition-colors hover:text-emerald-600"
              >
                {sample.service.name}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
            "border text-xs font-semibold uppercase tracking-wider",
            serviceColour.bg,
            serviceColour.border,
            serviceColour.text
          )}>
            <span
              className={cn("h-1.5 w-1.5 rounded-full", serviceColour.dot)}
              aria-hidden="true"
            />
            {sample.service.name}
          </span>

          {sample.featured && (
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
              "border border-amber-200 bg-amber-50",
              "text-xs font-semibold uppercase tracking-wider text-amber-700"
            )}>
              <Star size={11} className="fill-amber-500 text-amber-500" aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        <h1
          id="sample-detail-heading"
          className="mb-6 max-w-4xl text-3xl font-bold leading-tight text-slate-800 sm:text-4xl md:text-[2.75rem] lg:text-5xl"
        >
          {sample.title}
        </h1>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          {sample.excerpt}
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className={cn(
            "inline-flex items-center gap-2 rounded-full border border-slate-200",
            "bg-white px-4 py-2 shadow-sm",
            "text-sm font-medium text-slate-700"
          )}>
            <FileText size={14} className="text-emerald-500 shrink-0" aria-hidden="true" />
            <span>
              <span className="font-bold text-slate-800">{sample.wordCountFormatted}</span>
            </span>
          </div>

          <div className={cn(
            "inline-flex items-center gap-2 rounded-full border border-slate-200",
            "bg-white px-4 py-2 shadow-sm",
            "text-sm font-medium text-slate-700"
          )}>
            <Clock size={14} className="text-emerald-500 shrink-0" aria-hidden="true" />
            <span>{sample.readTimeMinutes} min read</span>
          </div>

          <div className={cn(
            "inline-flex items-center gap-2 rounded-full border border-slate-200",
            "bg-white px-4 py-2 shadow-sm",
            "text-sm font-medium text-slate-700"
          )}>
            <BookOpen size={14} className="text-emerald-500 shrink-0" aria-hidden="true" />
            <span>{sample.service.name}</span>
          </div>
        </div>

        {sample.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <TagIcon size={14} className="text-slate-400 shrink-0" aria-hidden="true" />
            {sample.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/samples?tag=${tag.slug}`}
                className={cn(
                  "rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600",
                  "hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                )}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="relative mx-auto mt-2 max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className={cn(
          "relative w-full overflow-hidden rounded-2xl",
          "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]",
          "aspect-video md:aspect-21/8"
        )}>
          <Image
            src={sample.image}
            alt={`Featured image for ${sample.title}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"
          />
          <div className="absolute bottom-4 left-4">
            <span className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "bg-black/40 px-4 py-1.5 backdrop-blur-sm",
              "text-xs font-semibold text-white"
            )}>
              <FileText size={12} aria-hidden="true" />
              {sample.wordCountFormatted}
            </span>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-b from-transparent to-[#f8f7f4]"
      />
    </section>
  );
}