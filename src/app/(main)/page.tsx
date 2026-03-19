import { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero";
import { HeroSkeleton } from "./_components/skeleton";
import { fetchOptions } from "@/lib/services/quote.service";
import { fetchFeaturedServices } from "@/lib/services/services.service";
import type { Service, QuoteFormOptions } from "@/lib/types";
import { FALLBACK_SERVICES, FALLBACK_LEVELS, FALLBACK_FEATURED } from "./_schemas/fallback";

export default async function HomePage() {
  const [optionsResult, featuredResult] = await Promise.all([
    fetchOptions(),
    fetchFeaturedServices(),
  ]);

  if (!optionsResult.ok && process.env.NODE_ENV === "development") {
    console.error("[HomePage] fetchOptions failed:", optionsResult.error);
  }

  if (!featuredResult.ok && process.env.NODE_ENV === "development") {
    console.error("[HomePage] fetchFeaturedServices failed:", featuredResult.error);
  }

  const options: QuoteFormOptions = {
    services: optionsResult.ok ? optionsResult.data.services : FALLBACK_SERVICES,
    levels: optionsResult.ok ? optionsResult.data.levels : FALLBACK_LEVELS,
  };

  // const services = optionsResult.ok ? optionsResult.data.services : FALLBACK_SERVICES;
  // const levels = optionsResult.ok ? optionsResult.data.levels : FALLBACK_LEVELS;
  const featuredServices = featuredResult.ok
    ? featuredResult.data.services
    : FALLBACK_FEATURED;

  return (
    <main className="min-h-screen bg-[#e8e6e1]">
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection
          options={options}
          featuredServices={featuredServices as Service[]}
        />
      </Suspense>
    </main>
  );
}

