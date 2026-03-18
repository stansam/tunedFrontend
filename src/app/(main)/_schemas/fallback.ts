import type { Level, ServiceWithPricingCategory, FallbackService } from "@/lib/types";

export const FALLBACK_SERVICES: ServiceWithPricingCategory[] = [
  { id: "essay-writing", name: "Essay Writing", category: "writing", pricing_category: "writing" },
  { id: "dissertation", name: "Dissertation", category: "writing", pricing_category: "writing" },
  { id: "research-paper", name: "Research Paper", category: "writing", pricing_category: "writing" },
  { id: "admission-essay", name: "Admission Essay", category: "writing", pricing_category: "writing" },
  { id: "case-study", name: "Case Study", category: "technical", pricing_category: "technical" },
  { id: "data-analysis", name: "Data Analysis", category: "technical", pricing_category: "technical" },
  { id: "lab-report", name: "Lab Report", category: "technical", pricing_category: "technical" },
  { id: "proofreading", name: "Proofreading", category: "proofreading", pricing_category: "proofreading" },
  { id: "editing", name: "Editing", category: "proofreading", pricing_category: "proofreading" },
  { id: "formatting", name: "Formatting", category: "proofreading", pricing_category: "proofreading" },
];

export const FALLBACK_LEVELS: Level[] = [
  { id: "high-school", name: "High School", order: 1 },
  { id: "undergraduate", name: "Undergraduate", order: 2 },
  { id: "masters", name: "Master's", order: 3 },
  { id: "phd", name: "PhD", order: 4 },
  { id: "personal", name: "Personal", order: 5 },
  { id: "professional", name: "Professional", order: 6 },
];

export const FALLBACK_FEATURED: FallbackService[] = [
  {
    id: "proofreading-editing",
    name: "Proofreading and Editing",
    description:
      "Whether it is an academic paper, resume, or business document, professional proofreading helps.",
    iconEmoji: "✍️",
  },
  {
    id: "writing",
    name: "Writing",
    description:
      "From essays and dissertations to admission papers, we support you in producing structured papers.",
    iconEmoji: "📝",
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description:
      "Make sense of your data and uncover key insights with accurate analysis, visualizations, and conclusions.",
    iconEmoji: "📊",
  },
  {
    id: "presentations",
    name: "Presentations",
    description:
      "Impress your audience with professionally designed slides and compelling narratives.",
    iconEmoji: "🎯",
  },
  {
    id: "research",
    name: "Research",
    description:
      "Thorough literature reviews, annotated bibliographies, and structured research support.",
    iconEmoji: "🔬",
  },
  {
    id: "coding",
    name: "Coding & Programming",
    description:
      "Get help with technical assignments, debugging, and code documentation.",
    iconEmoji: "💻",
  },
];