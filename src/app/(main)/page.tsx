import { Suspense } from "react";
import { Navbar } from "./_components/Navbar";
import { HeroSection } from "./_components/HeroSection";
import { HeroSkeleton } from "./_components/skeleton";
import { fetchOptions } from "@/lib/services/quote.service";
import { fetchFeaturedContent } from "@/lib/services/content.service";
import { FeaturedBlogs } from "./_components/FeaturedBlogs";
import { FeaturedSamples } from "./_components/FeaturedSamples";
import { ServiceCategory, Sample, BlogPostResponse } from "./_types";
import type { QuoteFormOptions } from "@/lib/types";

import { 
  FALLBACK_FEATURED_SERVICES, FALLBACK_SAMPLES, FALLBACK_BLOGS
} from "./_fallback/featured.fallback";
import { FALLBACK_SERVICES, FALLBACK_LEVELS } from "./_fallback/quote.fallback";

export default async function HomePage() {
  const [optionsResult, featuredResult] = await Promise.all([
    fetchOptions(),
    fetchFeaturedContent(),
  ]);

  if (!optionsResult.ok && process.env.NODE_ENV === "development") {
    console.error("[HomePage] fetchOptions failed:", optionsResult.error);
  }

  if (!featuredResult.ok && process.env.NODE_ENV === "development") {
    console.error("[HomePage] fetchFeaturedContent failed:", featuredResult.error);
  }

  const options: QuoteFormOptions = {
    services: optionsResult.ok ? optionsResult.data.services : FALLBACK_SERVICES,
    levels: optionsResult.ok ? optionsResult.data.levels : FALLBACK_LEVELS,
  };

  const featuredServices: readonly ServiceCategory[] = featuredResult.ok
    ? featuredResult.data.services
    : FALLBACK_FEATURED_SERVICES;

  const blogs: readonly BlogPostResponse[] = featuredResult.ok
    ? featuredResult.data.blogs
    : FALLBACK_BLOGS;

  const samples: readonly Sample[] = featuredResult.ok
    ? featuredResult.data.samples
    : FALLBACK_SAMPLES;

  return (
    <main className="min-h-screen bg-[#e8e6e1]">
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection
          options={options}
          featuredServices={featuredServices}
        />
      </Suspense>

      <FeaturedBlogs blogs={blogs} />
      
      <FeaturedSamples samples={samples} />
    </main>
  );
}

