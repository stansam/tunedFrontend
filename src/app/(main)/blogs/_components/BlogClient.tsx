"use client";

import { useBlogs } from "../_hooks/useBlogs";
import { BlogControlBar } from "./BlogControlBar";
import { BlogGrid } from "./BlogGrid";
import { BlogPagination } from "./BlogPagination";
import { BlogEmptyState } from "./BlogEmptyState";
import type { BlogClientProps } from "../_props/blog.props";
import type { BlogCategory } from "../_types/blog.types";

export function BlogClient({ 
  initialResponse, 
  initialFilters,
  categories 
}: BlogClientProps & { categories: readonly BlogCategory[] }) {
  const {
    filters,
    response,
    isLoading,
    setSearch,
    setCategory,
    setSort,
    toggleOrder,
    setPage,
    clearFilters,
  } = useBlogs(initialResponse, initialFilters, categories);

  return (
    <section className="bg-[#e8e6e1] pb-16 pt-8 md:pb-24 md:pt-10 h-full min-h-[400px]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        
        <BlogControlBar
          filters={filters}
          categories={categories}
          totalResults={response.pagination.total}
          onSearchChange={setSearch}
          onCategorySelect={setCategory}
          onSortChange={setSort}
          onOrderToggle={toggleOrder}
          onClearFilters={clearFilters}
        />

        {response.data.length === 0 && !isLoading ? (
          <BlogEmptyState 
            search={filters.search} 
            onClearFilters={clearFilters} 
          />
        ) : (
          <>
            <BlogGrid 
              items={response.data} 
              isLoading={isLoading} 
            />
            
            <BlogPagination
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
