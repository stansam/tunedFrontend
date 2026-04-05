import type { BlogPost } from "../_types/post.type";
import type { BlogListItem } from "@/app/(main)/blogs/_types/blog.types";

export const FALLBACK_BLOG_POST: BlogPost = {
  id: "fallback-1",
  title: "Mastering the Art of the Argumentative Essay",
  slug: "mastering-argumentative-essay",
  content: `
<h2>Introduction</h2>
<p>The argumentative essay is one of the most fundamental forms of academic writing. It challenges you to take a clear stance, build a logical case, and anticipate objections—skills that extend far beyond the classroom.</p>
<h2>The Three-Part Foundation</h2>
<p>Every compelling argumentative essay rests on three pillars: a clear thesis, well-reasoned evidence, and effective rebuttals of counterarguments. Without any one of these, your argument will feel incomplete to even a sympathetic reader.</p>
<h3>Crafting Your Thesis</h3>
<p>A thesis is not merely a topic—it is a defensible claim. "Climate change is real" is a topic. "Immediate international carbon taxes are the only viable mechanism to prevent catastrophic warming by 2050" is a thesis. Notice the specificity, the stakes, and the implied opposition.</p>
<h2>Evidence and Reasoning</h2>
<p>The hierarchy of evidence matters enormously in academic contexts. Primary sources and peer-reviewed research carry far more weight than opinion pieces or anecdote. However, the quality of your reasoning—how you connect evidence to your claim—ultimately determines whether your argument succeeds.</p>
<h3>Anticipating Counterarguments</h3>
<p>A sophisticated argument does not ignore opposition; it addresses it head-on. Identify the strongest possible objection to your position, steelman it, and then dismantle it methodically. This demonstrates intellectual honesty and strengthens your credibility.</p>
<h2>Conclusion</h2>
<p>Mastering argumentative writing is a lifelong pursuit. Each essay you write sharpens your ability to think clearly, reason carefully, and communicate persuasively—skills that will serve you in every arena of professional and intellectual life.</p>
  `.trim(),
  author: "Dr. Elizabeth Vance",
  category_id: "cat-1",
  excerpt:
    "Learn the essential structures and techniques to craft compelling arguments that resonate with academic examiners and professional peers alike.",
  featured_image:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80",
  meta_description:
    "A comprehensive guide to writing argumentative essays that win over academic examiners.",
  is_published: true,
  is_featured: true,
  published_at: "2026-03-25T10:00:00Z",
  comments: [],
  tags: [
    { id: "t-1", name: "Writing", slug: "writing", usage_count: 5 },
    { id: "t-2", name: "Academic", slug: "academic", usage_count: 3 },
  ],
  category: {
    id: "cat-1",
    name: "Academic Writing",
    slug: "academic-writing",
  },
};

export const FALLBACK_RELATED_BLOGS: readonly BlogListItem[] = [
  {
    id: "blog-2",
    title: "Top 10 Productivity Hacks for Graduate Students",
    slug: "productivity-hacks-graduate-students",
    excerpt:
      "These proven productivity systems will help you reclaim your time and maintain a healthy work-life balance.",
    author: "Marcus Thorne",
    category_id: "cat-2",
    featured_image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    is_featured: false,
    published_at: "2026-03-22T14:30:00Z",
    tags: [
      { id: "t-3", name: "Productivity", slug: "productivity", usage_count: 8 },
    ],
    category: { id: "cat-2", name: "Study Tips", slug: "study-tips" },
  },
  {
    id: "blog-3",
    title: "The Future of AI in Qualitative Research",
    slug: "future-ai-qualitative-research",
    excerpt:
      "Exploring how large language models are transforming the landscape of trend analysis and thematic coding.",
    author: "Sarah Jenkins",
    category_id: "cat-4",
    featured_image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    is_featured: true,
    published_at: "2026-03-20T09:15:00Z",
    tags: [{ id: "t-5", name: "AI", slug: "ai", usage_count: 12 }],
    category: { id: "cat-4", name: "Research Methods", slug: "research-methods" },
  },
];