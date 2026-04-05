import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RelatedSamplesSectionProps } from "../_props/sample.prop";
import { Sample } from "../_types/sample.type";
import { RelatedSampleCard } from "./RelatedSampleCard";


export function RelatedSamplesSection({
  samples,
  currentSlug,
}: RelatedSamplesSectionProps) {
  const filtered = samples
    .filter((s: Sample) => s.slug !== currentSlug)
    .slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section
      aria-labelledby="related-samples-heading"
      className="bg-[#f8f7f4] py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-600">
              More samples
            </p>
            <h2
              id="related-samples-heading"
              className="text-2xl font-bold text-slate-800 sm:text-3xl"
            >
              Related work
            </h2>
          </div>
          <Link
            href="/samples"
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full",
              "border border-slate-200 bg-white px-5 py-2.5",
              "text-sm font-semibold text-slate-600 shadow-sm",
              "hover:border-emerald-300 hover:text-emerald-600 transition-all"
            )}
          >
            All samples
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className={cn(
          "grid gap-6",
          filtered.length === 1 && "grid-cols-1 max-w-sm",
          filtered.length === 2 && "grid-cols-1 sm:grid-cols-2",
          filtered.length >= 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {filtered.map((sample: Sample) => (
            <RelatedSampleCard key={sample.id} sample={sample} />
          ))}
        </div>
      </div>
    </section>
  );
}