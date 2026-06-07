"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FeaturedServiceCard } from "./FeaturedService";
import { SectionHeader } from "./SectionHeader";
import { resolveServiceIcons, FALLBACK_ICON } from "@/lib/utils/resolveServiceIcon";
import type { ServiceIconRecord } from "../_props/featured.props";
import { cn } from "@/lib/utils";
import { FeaturedServicesProps } from "../_props";

const TABS = [
  { id: "all", label: "All Services" },
  { id: "writing", label: "Writing" },
  { id: "editing", label: "Editing" },
  { id: "technical", label: "Technical & Coding" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function getServiceCategoryGroup(id: string): "writing" | "editing" | "technical" {
  if (id === "essay-writing" || id === "research") {
    return "writing";
  }
  if (id === "proofreading-editing") {
    return "editing";
  }
  return "technical";
}

export function FeaturedServices({ featuredServices, className }: FeaturedServicesProps) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Resolve icons for all featured services
  const iconMap = resolveServiceIcons(featuredServices);
  const iconRecord: ServiceIconRecord = Object.fromEntries(iconMap);

  // Filter services by active tab
  const filteredServices = featuredServices.filter((service) => {
    if (activeTab === "all") return true;
    return getServiceCategoryGroup(service.id) === activeTab;
  });

  // Handle scroll events on mobile swipe container to update active dot
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

  // Scroll to a specific card on dot click
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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveIndex(0);
                  const container = scrollContainerRef.current;
                  if (container) {
                    container.scrollLeft = 0;
                  }
                }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/10 ring-1 ring-emerald-600"
                    : "bg-slate-50 text-slate-600 hover:text-slate-800 hover:bg-slate-100 ring-1 ring-slate-100"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service) => (
                <FeaturedServiceCard
                  key={service.id}
                  service={service}
                  icon={iconRecord[service.id] ?? FALLBACK_ICON}
                  className="w-full max-w-none shrink sm:w-full"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Layout - Swipeable Carousel */}
        <div className="md:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-6 pt-1 px-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {filteredServices.map((service) => (
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

          {/* Mobile Dot Indicators */}
          {filteredServices.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4" aria-label="Carousel pagination">
              {filteredServices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeIndex === idx
                      ? "w-6 bg-emerald-500"
                      : "w-2 bg-slate-200 hover:bg-slate-300"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={activeIndex === idx ? "true" : "false"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
