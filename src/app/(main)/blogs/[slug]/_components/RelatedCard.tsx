import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateReadTime } from "../utils";
import type { BlogListItem } from "@/app/(main)/blogs/_types/blog.types";

export function RelatedCard({ post }: { post: BlogListItem }) {
  const readTime = calculateReadTime(post.excerpt);
  const image =
    post.featured_image ||
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80";

  return (
    <Link
      href={{ pathname: `/blogs/${post.slug}` }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200",
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-emerald-200"
      )}
      aria-label={`Read: ${post.title}`}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={`Featured image for ${post.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.category && (
          <span className={cn(
            "absolute top-3 left-3 rounded-full",
            "bg-white/90 backdrop-blur-sm px-2.5 py-1",
            "text-[11px] font-semibold text-emerald-700"
          )}>
            {post.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className={cn(
          "mb-2 line-clamp-2 text-sm font-bold leading-snug text-slate-800",
          "group-hover:text-emerald-700 transition-colors"
        )}>
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={11} aria-hidden="true" />
            {readTime} min read
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all">
            Read
            <ArrowRight size={13} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}