import { cn } from "@/lib/utils";
import { SampleCard } from "../../_components/SampleCard";
import type { SamplesGridProps } from "../_props/samples.props";
import type { SampleViewModel } from "../../_types";

export function SamplesGrid({ items, isLoading }: SamplesGridProps) {
  if (!isLoading && items.length === 0) {
    return <div id="samples-grid-top" />;
  }

  return (
    <div 
      id="samples-grid-top"
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
        isLoading && "opacity-60 pointer-events-none transition-opacity duration-300"
      )}
      aria-live={isLoading ? "polite" : "off"}
    >
      {items.map((item) => {
        const viewModel: SampleViewModel = {
          id: item.id,
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          serviceId: item.service?.id || "unknown",
          wordCount: item.word_count,
          isFeatured: item.featured,
          image: item.image || `https://placehold.co/600x400/1a1a1a/ffffff?text=${encodeURIComponent(item.title)}`,
          tags: item.tags as any,
        };

        return <SampleCard key={item.id} sample={viewModel} />;
      })}
    </div>
  );
}
