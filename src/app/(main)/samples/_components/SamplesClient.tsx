"use client";

import { useSamples } from "../_hooks/useSamples";
import { SamplesControlBar } from "./SamplesControlBar";
import { SamplesGrid } from "./SamplesGrid";
import { SamplesPagination } from "./SamplesPagination";
import { SamplesEmptyState } from "./SamplesEmptyState";
import type { SamplesClientProps } from "../_props/samples.props";

export function SamplesClient({ initialResponse, initialFilters, services }: SamplesClientProps) {
  const {
    filters,
    response,
    isLoading,
    setSearch,
    setService,
    setSort,
    toggleOrder,
    setPage,
    clearFilters,
  } = useSamples(initialResponse, initialFilters, services);

  return (
    <section className="bg-[#f8f7f4] pb-16 pt-8 md:pb-24 md:pt-10 h-full min-h-[400px]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        
        <SamplesControlBar
          filters={filters}
          services={services}
          totalResults={response.pagination.total}
          onSearchChange={setSearch}
          onServiceSelect={setService}
          onSortChange={setSort}
          onOrderToggle={toggleOrder}
          onClearFilters={clearFilters}
        />

        {response.data.length === 0 && !isLoading ? (
          <SamplesEmptyState 
            search={filters.search} 
            onClearFilters={clearFilters} 
          />
        ) : (
          <>
            <SamplesGrid 
              items={response.data} 
              isLoading={isLoading} 
            />
            
            <SamplesPagination
              page={response.pagination.page}
              totalPages={response.pagination.total_pages}
              hasNext={response.pagination.has_next}
              hasPrev={response.pagination.has_prev}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
