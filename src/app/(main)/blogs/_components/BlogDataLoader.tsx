import { fetchBlogs, fetchBlogCategories } from "@/lib/services/blog.service";
import { FALLBACK_BLOGS_PAGE, FALLBACK_BLOG_CATEGORIES } from "../_fallback/blog.fallback";
import { BlogClient } from "./BlogClient";
import { ALL_CATEGORY } from "../_types/blog.types";
import type { BlogFilters } from "../_types/blog.types";

export async function BlogDataLoader() {
  const [blogsResult, categoriesResult] = await Promise.all([
    fetchBlogs({
      sort: "published_at",
      order: "desc",
      page: 1,
      per_page: 10,
    }),
    fetchBlogCategories()
  ]);

  const response = blogsResult.ok ? blogsResult.data : FALLBACK_BLOGS_PAGE;
  const categories = categoriesResult.ok ? categoriesResult.data : FALLBACK_BLOG_CATEGORIES;

  const initialFilters: BlogFilters = {
    search: "",
    categoryId: ALL_CATEGORY,
    sort: "published_at",
    order: "desc",
  };

  return (
    <BlogClient 
      initialResponse={response} 
      initialFilters={initialFilters} 
      categories={categories}
    />
  );
}
