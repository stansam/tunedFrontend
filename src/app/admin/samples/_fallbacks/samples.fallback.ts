import type { AdminSampleResponse, AdminSampleService } from "../_types/samples.type";

export const FALLBACK_SAMPLE_SERVICES: readonly AdminSampleService[] = [
  { id: "service-essays", name: "Essays", slug: "essays" },
  { id: "service-data-analysis", name: "Data Analysis", slug: "data-analysis" },
  { id: "service-research", name: "Research", slug: "research" },
];

export const FALLBACK_SAMPLES: readonly AdminSampleResponse[] = [
  {
    id: "sample-1",
    title: "Argumentative Essay — Climate Change Policy",
    slug: "argumentative-essay-climate-change-policy",
    excerpt: "An in-depth analysis of climate change policies and international agreements.",
    service_id: "service-essays",
    word_count: 2500,
    featured: true,
    image: "",
    tags: [
      { id: "tag-phd", name: "PhD Level", slug: "phd-level", description: "PhD academic papers" }
    ],
    service: { id: "service-essays", name: "Essays", slug: "essays" },
    views_count: 342,
    downloads_count: 84,
  },
  {
    id: "sample-2",
    title: "Regression Analysis — SPSS Output Report",
    slug: "regression-analysis-spss-output-report",
    excerpt: "SPSS output report representing regression analysis on student performance statistics.",
    service_id: "service-data-analysis",
    word_count: 1800,
    featured: false,
    image: "",
    tags: [
      { id: "tag-masters", name: "Masters", slug: "masters", description: "Masters level content" }
    ],
    service: { id: "service-data-analysis", name: "Data Analysis", slug: "data-analysis" },
    views_count: 288,
    downloads_count: 71,
  },
  {
    id: "sample-3",
    title: "Literature Review — Mental Health in Africa",
    slug: "literature-review-mental-health-in-africa",
    excerpt: "Comprehensive literature review mapping mental health services and accessibility in sub-Saharan Africa.",
    service_id: "service-research",
    word_count: 3200,
    featured: true,
    image: "",
    tags: [
      { id: "tag-uni", name: "University", slug: "university", description: "University level content" }
    ],
    service: { id: "service-research", name: "Research", slug: "research" },
    views_count: 195,
    downloads_count: 44,
  },
];
