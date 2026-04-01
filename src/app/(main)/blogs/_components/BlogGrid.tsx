import { cn } from "@/lib/utils";
import { BlogCard } from "../../_components/BlogCard";
import type { BlogGridProps } from "../_props/blog.props";
import type { BlogPostViewModel } from "../../_types";

export function BlogGrid({ items, isLoading }: BlogGridProps) {
  if (!isLoading && items.length === 0) {
    return <div id="blogs-grid-top" />;
  }

  return (
    <div 
      id="blogs-grid-top"
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        isLoading && "opacity-60 pointer-events-none transition-opacity duration-300"
      )}
      aria-live={isLoading ? "polite" : "off"}
    >
      {items.map((item, index) => {
        const viewModel: BlogPostViewModel = {
          id: item.id,
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          author: item.author,
          featuredImage: item.featured_image || `https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80`,
          categoryId: item.category_id,
          tags: item.tags,
          publishedAt: item.published_at || new Date().toISOString(),
          isFeatured: item.is_featured,
          readTimeMinutes: Math.ceil(item.excerpt.length / 200) + 2, // Simple estimate
        };

        return (
          <div key={item.id} className={cn(
            index === 0 && "sm:col-span-2 lg:col-span-2 lg:row-span-2"
          )}>
            <BlogCard 
              post={viewModel} 
              isPrimary={index === 0} 
            />
          </div>
        );
      })}
    </div>
  );
}
