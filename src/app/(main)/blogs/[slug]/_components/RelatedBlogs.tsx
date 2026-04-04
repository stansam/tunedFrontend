import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedCard } from "./RelatedCard";
import type { RelatedBlogsSectionProps } from "../_props/post.prop";


export function RelatedBlogsSection({ posts, currentSlug }: RelatedBlogsSectionProps) {
  const filtered = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section
      aria-labelledby="related-blogs-heading"
      className="bg-[#f8f7f4] py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-600">
              Keep reading
            </p>
            <h2
              id="related-blogs-heading"
              className="text-2xl font-bold text-slate-800 sm:text-3xl"
            >
              Related articles
            </h2>
          </div>
          <Link
            href="/blogs"
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white",
              "px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm",
              "hover:border-emerald-300 hover:text-emerald-600 transition-all"
            )}
          >
            All articles
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div
          className={cn(
            "grid gap-6",
            filtered.length === 1 && "grid-cols-1 max-w-md",
            filtered.length === 2 && "grid-cols-1 sm:grid-cols-2",
            filtered.length === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {filtered.map((post) => (
            <RelatedCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}