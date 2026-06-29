import { useState, useRef, RefObject } from "react";
import type { ServiceCategory } from "../_types";
import { resolveServiceIcons } from "@/lib/utils/resolveServiceIcon";
import type { ServiceIconRecord } from "../_props/featured.props";
import type { UseFeaturedServicesParams } from "../_props/featured.props";



export interface UseFeaturedServicesReturn {
  readonly activeIndex: number;
  readonly scrollContainerRef: RefObject<HTMLDivElement | null>;
  readonly featuredServices: readonly ServiceCategory[];
  readonly iconRecord: ServiceIconRecord;
  readonly handleScroll: () => void;
  readonly scrollToCard: (index: number) => void;
}

export function useFeaturedServices({
  featuredServices,
}: UseFeaturedServicesParams): UseFeaturedServicesReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const iconMap = resolveServiceIcons(featuredServices);
  const iconRecord: ServiceIconRecord = Object.fromEntries(iconMap);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const firstChild = children[0] as HTMLElement;
    const cardWidth = firstChild.getBoundingClientRect().width + 16; // width + gap
    const scrollLeft = container.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    
    setActiveIndex(Math.max(0, Math.min(index, children.length - 1)));
  };

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const firstChild = children[0] as HTMLElement;
    const cardWidth = firstChild.getBoundingClientRect().width + 16;

    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return {
    activeIndex,
    scrollContainerRef,
    featuredServices,
    iconRecord,
    handleScroll,
    scrollToCard,
  };
}
