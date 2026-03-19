"use client";

import { useRef, useState } from "react";
import type { ServicesMarqueeProps } from "../_props";
export { FALLBACK_FEATURED_SERVICES as FALLBACK_FEATURED } from "../_fallback/featured.fallback";
import type { ServiceCategory } from "../_types";
import { FeaturedServiceCard } from "./FeaturedService";
import { FALLBACK_ICON } from "@/lib/utils/resolveServiceIcon";

export function ServicesMarquee({ featuredServices, iconRecord }: ServicesMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const items: ServiceCategory[] = [...featuredServices, ...featuredServices];

  if (featuredServices.length === 0) return null;

  return (
    <section
      aria-label="Featured services"
      className="w-full overflow-hidden py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
         style={{
          width: "max-content",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        className="flex gap-4 will-change-transform animate-marquee"
      >
        {items.map((service, idx) => (
          <FeaturedServiceCard
            key={`${service.id}-${idx}`}
            service={service}
            icon={iconRecord[service.id] ?? FALLBACK_ICON}
          />
        ))}
      </div>
    </section>
  );
}