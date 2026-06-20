import { useState, useRef, RefObject } from "react";
import type { ServiceCategory } from "../_types";
import type { TabId } from "../_types/featured.types";
import { getServiceCategoryGroup } from "../_services/featuredService";
import { resolveServiceIcons } from "@/lib/utils/resolveServiceIcon";
import type { ServiceIconRecord } from "../_props/featured.props";
import type { UseFeaturedServicesParams } from "../_props/featured.props";



export interface UseFeaturedServicesReturn {
  readonly activeTab: TabId;
  readonly activeIndex: number;
  readonly scrollContainerRef: RefObject<HTMLDivElement | null>;
  readonly filteredServices: readonly ServiceCategory[];
  readonly iconRecord: ServiceIconRecord;
  readonly handleScroll: () => void;
  readonly scrollToCard: (index: number) => void;
  readonly handleTabChange: (tabId: TabId) => void;
}

export function useFeaturedServices({
  featuredServices,
}: UseFeaturedServicesParams): UseFeaturedServicesReturn {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const iconMap = resolveServiceIcons(featuredServices);
  const iconRecord: ServiceIconRecord = Object.fromEntries(iconMap);

  const filteredServices = featuredServices.filter((service) => {
    if (activeTab === "all") return true;
    return getServiceCategoryGroup(service.id) === activeTab;
  });

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

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setActiveIndex(0);
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft = 0;
    }
  };

  return {
    activeTab,
    activeIndex,
    scrollContainerRef,
    filteredServices,
    iconRecord,
    handleScroll,
    scrollToCard,
    handleTabChange,
  };
}
