import type { 
  BlogListItem, 
  BlogsPageResponse,
  BlogCategory
} from "../_types/blog.types";

export const FALLBACK_BLOG_CATEGORIES: BlogCategory[] = [
  { id: "cat-1", name: "Academic Writing", slug: "academic-writing" },
  { id: "cat-2", name: "Study Tips", slug: "study-tips" },
  { id: "cat-3", name: "Career Advice", slug: "career-advice" },
  { id: "cat-4", name: "Research Methods", slug: "research-methods" },
];

export const FALLBACK_BLOGS: BlogListItem[] = [
  {
    id: "blog-1",
    title: "Mastering the Art of the Argumentative Essay",
    slug: "mastering-argumentative-essay",
    excerpt: "Learn the essential structures and techniques to craft compelling arguments that resonate with academic examiners and professional peers alike.",
    author: "Dr. Elizabeth Vance",
    category_id: "cat-1",
    featured_image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    is_featured: true,
    published_at: "2026-03-25T10:00:00Z",
    tags: [
      { id: "t-1", name: "Writing", slug: "writing", usage_count: 5 },
      { id: "t-2", name: "Academic", slug: "academic", usage_count: 3 },
    ],
    category: FALLBACK_BLOG_CATEGORIES[0],
  },
  {
    id: "blog-2",
    title: "Top 10 Productivity Hacks for Graduate Students",
    slug: "productivity-hacks-graduate-students",
    excerpt: "Struggling with your dissertation? These proven productivity systems will help you reclaim your time and maintain a healthy work-life balance.",
    author: "Marcus Thorne",
    category_id: "cat-2",
    featured_image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    is_featured: false,
    published_at: "2026-03-22T14:30:00Z",
    tags: [
      { id: "t-3", name: "Productivity", slug: "productivity", usage_count: 8 },
      { id: "t-4", name: "Student Life", slug: "student-life", usage_count: 2 },
    ],
    category: FALLBACK_BLOG_CATEGORIES[1],
  },
  {
    id: "blog-3",
    title: "The Future of AI in Qualitative Research",
    slug: "future-ai-qualitative-research",
    excerpt: "Exploring how large language models are transforming the landscape of trend analysis and thematic coding in contemporary research environments.",
    author: "Sarah Jenkins",
    category_id: "cat-4",
    featured_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    is_featured: true,
    published_at: "2026-03-20T09:15:00Z",
    tags: [
      { id: "t-5", name: "AI", slug: "ai", usage_count: 12 },
      { id: "t-6", name: "Research", slug: "research", usage_count: 15 },
    ],
    category: FALLBACK_BLOG_CATEGORIES[3],
  },
];

export const FALLBACK_BLOGS_PAGE: BlogsPageResponse = {
  data: FALLBACK_BLOGS,
  pagination: {
    page: 1,
    per_page: 10,
    total: 3,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  },
};
