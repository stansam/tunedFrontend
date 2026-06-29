"use client";

import { useFeaturedServices } from "../_hooks/useFeaturedServices";
import { SectionHeader } from "./SectionHeader";
import { FeaturedServicesDesktopGrid } from "./FeaturedServicesDesktopGrid";
import { FeaturedServicesMobileCarousel } from "./FeaturedServicesMobileCarousel";
import { FeaturedServicesIndicators } from "./FeaturedServicesIndicators";
import { FeaturedServicesProps } from "../_props";
import { cn } from "@/lib/utils";

export function FeaturedServices({ featuredServices, className }: FeaturedServicesProps) {
  const {
    activeIndex,
    scrollContainerRef,
    iconRecord,
    handleScroll,
    scrollToCard,
  } = useFeaturedServices({ featuredServices });

  if (featuredServices.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-services-heading"
      className={cn(
        "relative w-full bg-white py-16 md:py-20 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-slate-100" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="featured-services-heading"
          title="Our Featured Services"
          description="Explore our range of academic and professional services tailored to help you succeed."
          backgroundLabel="SERVICES"
          backgroundPosition="left"
          align="center"
          accentWord="Services"
        />

        <FeaturedServicesDesktopGrid
          services={featuredServices}
          iconRecord={iconRecord}
        />

        <div className="md:hidden">
          <FeaturedServicesMobileCarousel
            scrollContainerRef={scrollContainerRef}
            onScroll={handleScroll}
            services={featuredServices}
            iconRecord={iconRecord}
          />

          <FeaturedServicesIndicators
            count={featuredServices.length}
            activeIndex={activeIndex}
            onDotClick={scrollToCard}
          />
        </div>
      </div>
    </section>
  );
}
