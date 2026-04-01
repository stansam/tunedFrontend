import type { 
  SampleListItem, 
  SamplesPageResponse 
} from "../_types/samples.types";

export const FALLBACK_SAMPLES: SampleListItem[] = [
  {
    id: "sample-1",
    title: "Argumentative Essay on Human Impact on Climate Patterns",
    slug: "argumentative-essay-human-impact-climate",
    excerpt: "A compelling argumentative essay exploring anthropogenic climate change, featuring rigorous citations, structured reasoning, and a clear call to action regarding global policy.",
    word_count: 1250,
    featured: true,
    created_at: "2026-03-20T10:00:00Z",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80", // Nature/forest
    service: { id: "essay-writing", name: "Essay Writing", slug: "essay-writing" },
    tags: [{ id: "t1", name: "Climate", slug: "climate", usage_count: 1 }],
  },
  {
    id: "sample-2",
    title: "Business Plan: Innovative SaaS Startup 2026",
    slug: "business-plan-saas-startup-2026",
    excerpt: "A comprehensive business plan for a B2B SaaS product, covering detailed market analysis, five-year financial projections, and multi-channel go-to-market strategy.",
    word_count: 3400,
    featured: true,
    created_at: "2026-03-18T14:30:00Z",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", // Office/charts
    service: { id: "research", name: "Research", slug: "research" },
    tags: [{ id: "t2", name: "Business", slug: "business", usage_count: 1 }],
  },
  {
    id: "sample-3",
    title: "Data Visualisation Report: Regional Sales Trends",
    slug: "data-visualisation-regional-sales-trends",
    excerpt: "A detailed analytical report showcasing complex data visualizations, statistical breakdowns of quarterly sales trends, and actionable insights for stakeholders.",
    word_count: 2100,
    featured: false,
    created_at: "2026-03-15T09:15:00Z",
    image: "https://images.unsplash.com/photo-1551288049-bbda3865c67d?w=600&q=80", // Data/screen
    service: { id: "data-analysis", name: "Data Analysis", slug: "data-analysis" },
    tags: [{ id: "t3", name: "Analysis", slug: "analysis", usage_count: 1 }],
  },
  {
    id: "sample-4",
    title: "Literature Review: AI Applications in Modern Healthcare",
    slug: "literature-review-ai-healthcare",
    excerpt: "A systematic and exhaustive literature review scrutinizing peer-reviewed papers on the transformative application of artificial intelligence in clinical diagnostics and patient care.",
    word_count: 4200,
    featured: true,
    created_at: "2026-03-10T16:45:00Z",
    image: "https://images.unsplash.com/photo-1576091160550-2173599bd14e?w=600&q=80", // Medical/tech
    service: { id: "research", name: "Research", slug: "research" },
    tags: [{ id: "t4", name: "AI", slug: "ai", usage_count: 1 }],
  },
  {
    id: "sample-5",
    title: "Proofreading: Advanced Health Sciences Research Paper",
    slug: "proofreading-health-sciences-paper",
    excerpt: "An example of a meticulously proofread and edited health sciences paper, demonstrating corrections in medical terminology, citation accuracy, and professional tone consistency.",
    word_count: 1500,
    featured: false,
    created_at: "2026-03-05T11:20:00Z",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", // Writing/desk
    service: { id: "proofreading-editing", name: "Proofreading & Editing", slug: "proofreading-editing" },
    tags: [{ id: "t5", name: "Medical", slug: "medical", usage_count: 1 }],
  },
  {
    id: "sample-6",
    title: "VC Pitch Deck: Strategic Narrative and Visuals",
    slug: "vc-pitch-deck-presentation",
    excerpt: "A professionally designed presentation narrative for a venture capital pitch, balancing technical depth with compelling storytelling and high-impact visuals.",
    word_count: 900,
    featured: false,
    created_at: "2026-02-28T13:00:00Z",
    image: "https://images.unsplash.com/photo-1475721027785-f74dea327912?w=600&q=80", // Presentation/stage
    service: { id: "presentations", name: "Presentations", slug: "presentations" },
    tags: [{ id: "t6", name: "Startup", slug: "startup", usage_count: 1 }],
  },
];

export const FALLBACK_SAMPLES_PAGE: SamplesPageResponse = {
  data: FALLBACK_SAMPLES,
  pagination: {
    page: 1,
    per_page: 6,
    total: 6,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  },
};
