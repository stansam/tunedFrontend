import type { 
  AdminBlogStats, 
  AdminBlogCategoryResponse, 
  AdminBlogPostResponse,
  AdminBlogCommentResponse
} from "../_types/blogs.types";

export const FALLBACK_BLOG_STATS: AdminBlogStats = {
  total_posts: 12,
  published_posts: 8,
  draft_posts: 4,
  total_comments: 24,
  pending_comments: 5,
};

export const FALLBACK_BLOG_CATEGORIES: readonly AdminBlogCategoryResponse[] = [
  { id: "cat-1", name: "Academic Guide", slug: "academic-guide", description: "Guides and tips for academic papers" },
  { id: "cat-2", name: "Writing Tips", slug: "writing-tips", description: "Helpful writing resources and styling details" },
  { id: "cat-3", name: "Career Development", slug: "career-development", description: "Career path options and resume tips" },
];

export const FALLBACK_BLOG_COMMENTS: readonly AdminBlogCommentResponse[] = [
  {
    id: "comment-1",
    post_id: "post-1",
    content: "This guide is extremely helpful for writing research papers! Thanks for sharing.",
    name: "John Doe",
    email: "john@example.com",
    user_id: "user-1",
    approved: true,
    reactions: [],
    total_likes: 2,
    total_dislikes: 0,
  },
  {
    id: "comment-2",
    post_id: "post-1",
    content: "Can you elaborate more on the citation styles part?",
    name: "Alice Smith",
    email: "alice@example.com",
    user_id: null,
    approved: false,
    reactions: [],
    total_likes: 0,
    total_dislikes: 0,
  }
];

export const FALLBACK_BLOG_POSTS: readonly AdminBlogPostResponse[] = [
  {
    id: "post-1",
    title: "How to Structure a Master's Thesis",
    content: "Writing a master's thesis can be a daunting task. Here's how to structure it successfully...",
    author: "Dr. Sarah Jenkins",
    category_id: "cat-1",
    slug: "structure-masters-thesis",
    excerpt: "Learn the core structure and section requirements of a master's thesis.",
    featured_image: "",
    meta_description: "Learn how to structure a master's thesis with this guide.",
    is_published: true,
    is_featured: true,
    published_at: "2026-06-20T10:00:00Z",
    comments: [...FALLBACK_BLOG_COMMENTS],
    tags: [
      { id: "tag-1", name: "academic", slug: "academic" },
      { id: "tag-2", name: "thesis", slug: "thesis" }
    ],
  },
  {
    id: "post-2",
    title: "5 Common Proofreading Mistakes and How to Avoid Them",
    content: "Avoid these simple proofreading mistakes when polishing your paper...",
    author: "Alex Rivera",
    category_id: "cat-2",
    slug: "common-proofreading-mistakes",
    excerpt: "Avoid common grammar and structural errors with these simple tips.",
    featured_image: "",
    meta_description: "Top 5 common proofreading mistakes to avoid for students.",
    is_published: false,
    is_featured: false,
    published_at: "",
    comments: [],
    tags: [
      { id: "tag-3", name: "writing", slug: "writing" }
    ],
  }
];
