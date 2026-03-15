import { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero";
import { fetchServices, fetchLevels, fetchFeaturedServices } from "@/lib/services/quote.service";
import type { Service, Level, FeaturedService } from "@/types";

// ─── Fallback data (shown when API is unavailable / dev mode) ─────────────────

const FALLBACK_SERVICES: Service[] = [
  { id: "essay-writing", name: "Essay Writing", category: "writing" },
  { id: "dissertation", name: "Dissertation", category: "writing" },
  { id: "research-paper", name: "Research Paper", category: "writing" },
  { id: "admission-essay", name: "Admission Essay", category: "writing" },
  { id: "case-study", name: "Case Study", category: "technical" },
  { id: "data-analysis", name: "Data Analysis", category: "technical" },
  { id: "lab-report", name: "Lab Report", category: "technical" },
  { id: "proofreading", name: "Proofreading", category: "proofreading" },
  { id: "editing", name: "Editing", category: "proofreading" },
  { id: "formatting", name: "Formatting", category: "proofreading" },
];

const FALLBACK_LEVELS: Level[] = [
  { id: "high-school", name: "High School" },
  { id: "undergraduate", name: "Undergraduate" },
  { id: "masters", name: "Master's" },
  { id: "phd", name: "PhD" },
  { id: "personal", name: "Personal" },
  { id: "professional", name: "Professional" },
];

const FALLBACK_FEATURED: FeaturedService[] = [
  {
    id: "proofreading-editing",
    title: "Proofreading and Editing",
    description:
      "Whether it is an academic paper, resume, or business document, professional proofreading helps.",
    iconEmoji: "✍️",
  },
  {
    id: "writing",
    title: "Writing",
    description:
      "From essays and dissertations to admission papers, we support you in producing structured papers.",
    iconEmoji: "📝",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description:
      "Make sense of your data and uncover key insights with accurate analysis, visualizations, and conclusions.",
    iconEmoji: "📊",
  },
  {
    id: "presentations",
    title: "Presentations",
    description:
      "Impress your audience with professionally designed slides and compelling narratives.",
    iconEmoji: "🎯",
  },
  {
    id: "research",
    title: "Research",
    description:
      "Thorough literature reviews, annotated bibliographies, and structured research support.",
    iconEmoji: "🔬",
  },
  {
    id: "coding",
    title: "Coding & Programming",
    description:
      "Get help with technical assignments, debugging, and code documentation.",
    iconEmoji: "💻",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  // Parallel data fetching with graceful fallback
  const [servicesResult, levelsResult, featuredResult] = await Promise.all([
    fetchServices(),
    fetchLevels(),
    fetchFeaturedServices(),
  ]);

  const services = servicesResult.ok ? servicesResult.data : FALLBACK_SERVICES;
  const levels = levelsResult.ok ? levelsResult.data : FALLBACK_LEVELS;
  const featuredServices = featuredResult.ok
    ? featuredResult.data
    : FALLBACK_FEATURED;

  return (
    <main className="min-h-screen bg-[#e8e6e1]">
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection
          services={services}
          levels={levels}
          featuredServices={featuredServices}
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
