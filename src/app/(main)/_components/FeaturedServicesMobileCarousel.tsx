import { FeaturedServiceCard } from "./FeaturedService";
import { FALLBACK_ICON } from "@/lib/utils/resolveServiceIcon";
import type { FeaturedServicesMobileCarouselProps } from "../_props/featured.props";

export function FeaturedServicesMobileCarousel({
  scrollContainerRef,
  onScroll,
  services,
  iconRecord,
}: FeaturedServicesMobileCarouselProps) {
  return (
    <div
      ref={scrollContainerRef}
      onScroll={onScroll}
      className="flex gap-4 overflow-x-auto pb-6 pt-1 px-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      {services.map((service) => (
        <div
          key={service.id}
          className="snap-center snap-always shrink-0 w-[280px]"
        >
          <FeaturedServiceCard
            service={service}
            icon={iconRecord[service.id] ?? FALLBACK_ICON}
            className="w-full max-w-none shrink"
          />
        </div>
      ))}
    </div>
  );
}
