import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, Tag as TagIcon, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogDetailHeroProps } from "../_props/post.prop";

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
  return (
    <section
      aria-labelledby="blog-detail-heading"
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
          "text-[100px] font-extrabold leading-none text-slate-800 opacity-[0.025]",
          "md:text-[180px] lg:text-[240px]"
        )}
      >
        BLOG
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-0 sm:px-6 lg:max-w-7xl lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-slate-400">
            <li>
              <Link
                href="/"
                className="hover:text-emerald-600 transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} className="text-slate-300" />
            </li>
            <li>
              <Link
                href="/blogs"
                className="hover:text-emerald-600 transition-colors font-medium"
              >
                Blog
              </Link>
            </li>
            {post.category && (
              <>
                <li aria-hidden="true">
                  <ChevronRight size={14} className="text-slate-300" />
                </li>
                <li>
                  <span className="text-slate-500 font-medium">{post.category.name}</span>
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          {post.category && (
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full",
              "border border-emerald-200 bg-emerald-50 px-3 py-1",
              "text-xs font-semibold uppercase tracking-wider text-emerald-700"
            )}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {post.category.name}
            </span>
          )}
          {post.isFeatured && (
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full",
              "border border-amber-200 bg-amber-50 px-3 py-1",
              "text-xs font-semibold uppercase tracking-wider text-amber-700"
            )}>
              <Star size={11} className="fill-amber-500 text-amber-500" aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        <h1
          id="blog-detail-heading"
          className="mb-6 text-3xl font-bold leading-tight text-slate-800 sm:text-4xl md:text-[2.75rem] lg:text-5xl max-w-4xl"
        >
          {post.title}
        </h1>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          {post.excerpt}
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                "bg-emerald-500 text-white text-sm font-bold ring-2 ring-emerald-200"
              )}
              aria-hidden="true"
            >
              {post.authorInitials}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">{post.author}</p>
              <p className="text-xs text-slate-400">Author</p>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" aria-hidden="true" />

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar size={15} className="text-emerald-500 shrink-0" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" aria-hidden="true" />

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock size={15} className="text-emerald-500 shrink-0" aria-hidden="true" />
            <span>{post.readTimeMinutes} min read</span>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <TagIcon size={14} className="text-slate-400" aria-hidden="true" />
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                #{tag.name}
              </span>
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
            src={post.featuredImage}
            alt={`Featured image for ${post.title}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-b from-transparent to-[#f8f7f4]"
      />
    </section>
  );
}