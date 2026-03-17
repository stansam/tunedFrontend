import { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero";
import { fetchOptions } from "@/lib/services/quote.service";
import { fetchFeaturedServices } from "@/lib/services/services.service";
import type { Service, Level, QuoteFormOptions } from "@/lib/types";

// ─── Fallback data (shown when API is unavailable / dev mode) ─────────────────

const FALLBACK_SERVICES: any[] = [
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

const FALLBACK_LEVELS: Level[] = [
  { id: "high-school", name: "High School", order: 1 },
  { id: "undergraduate", name: "Undergraduate", order: 2 },
  { id: "masters", name: "Master's", order: 3 },
  { id: "phd", name: "PhD", order: 4 },
  { id: "personal", name: "Personal", order: 5 },
  { id: "professional", name: "Professional", order: 6 },
];

const FALLBACK_FEATURED: any[] = [
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [optionsResult, featuredResult] = await Promise.all([
    fetchOptions(),
    fetchFeaturedServices(),
  ]);

  const services = optionsResult.ok ? optionsResult.data.services : FALLBACK_SERVICES;
  const levels = optionsResult.ok ? optionsResult.data.academic_levels : FALLBACK_LEVELS;
  const featuredServices = featuredResult.ok
    ? featuredResult.data.services
    : FALLBACK_FEATURED;

  return (
    <main className="min-h-screen bg-[#e8e6e1]">
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection
          options={{ services, levels } as QuoteFormOptions}
          featuredServices={featuredServices as Service[]}
        />
      </Suspense>
    </main>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="w-full md:w-[42%] space-y-4">
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-20 rounded-2xl bg-slate-200" />
          <div className="h-8 w-3/4 rounded-full bg-slate-200" />
          <div className="h-10 w-full max-w-[320px] rounded-full bg-slate-200" />
        </div>
        <div className="w-full md:w-[58%] flex justify-center">
          <div className="h-[560px] w-[320px] rounded-[48px] bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
