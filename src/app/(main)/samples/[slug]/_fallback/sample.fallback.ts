import type { Sample, RelatedSampleItem } from "../_types/sample.type";

export const FALLBACK_SAMPLE: Sample = {
  id: "fallback-1",
  title: "Comprehensive Literature Review: Climate Policy Effectiveness",
  slug: "literature-review-climate-policy",
  excerpt:
    "An in-depth comparative analysis of international climate policy frameworks, examining the effectiveness of carbon pricing mechanisms, regulatory approaches, and voluntary commitments across twelve major economies. This sample demonstrates our rigorous research methodology and academic writing standards at the postgraduate level.",
  service_id: "svc-1",
  word_count: 3200,
  featured: true,
  image:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
  tags: [
    { id: "t-1", name: "Literature Review", slug: "literature-review", usage_count: 12 },
    { id: "t-2", name: "Climate Policy", slug: "climate-policy", usage_count: 8 },
    { id: "t-3", name: "Research Methods", slug: "research-methods", usage_count: 20 },
  ],
  service: {
    id: "svc-1",
    name: "Academic Writing",
    slug: "academic-writing",
    description:
      "Professional academic writing services covering essays, dissertations, literature reviews, and research papers across all disciplines.",
  },
};

export const FALLBACK_RELATED_SAMPLES: readonly RelatedSampleItem[] = [
  {
    id: "fallback-2",
    title: "Business Strategy Analysis: Digital Transformation in Retail",
    slug: "business-strategy-digital-retail",
    excerpt:
      "A strategic management case study examining how leading retail brands navigated digital transformation, with Porter's Five Forces and SWOT analyses.",
    service_id: "svc-2",
    word_count: 2800,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: [
      { id: "t-4", name: "Business Strategy", slug: "business-strategy", usage_count: 15 },
    ],
    service: {
      id: "svc-2",
      name: "Business Writing",
      slug: "business-writing",
    },
  },
  {
    id: "fallback-3",
    title: "Argumentative Essay: The Ethics of Artificial Intelligence",
    slug: "argumentative-essay-ai-ethics",
    excerpt:
      "A compelling argumentative essay exploring the philosophical and practical dimensions of AI ethics, autonomy, and accountability in modern society.",
    service_id: "svc-1",
    word_count: 1500,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: [
      { id: "t-5", name: "Essay Writing", slug: "essay-writing", usage_count: 22 },
    ],
    service: {
      id: "svc-1",
      name: "Academic Writing",
      slug: "academic-writing",
    },
  },
  {
    id: "fallback-4",
    title: "Research Proposal: Behavioural Economics in Healthcare",
    slug: "research-proposal-behavioural-economics",
    excerpt:
      "A structured research proposal outlining methodology, theoretical framework, and anticipated outcomes for a study on nudge theory in preventive health.",
    service_id: "svc-3",
    word_count: 2100,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80",
    tags: [
      { id: "t-6", name: "Research Proposal", slug: "research-proposal", usage_count: 9 },
    ],
    service: {
      id: "svc-3",
      name: "Research Services",
      slug: "research-services",
    },
  },
];