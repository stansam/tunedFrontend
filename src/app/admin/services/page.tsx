"use client";

import { useState } from "react";
import { Plus, LayoutGrid, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServicesQuery } from "./_hooks/useServicesQuery";
import { useServiceMutations } from "./_hooks/useServiceMutations";
import { useServiceSockets } from "./_hooks/useServiceSockets";
import { FilterArea } from "./_components/FilterArea";
import { CategoryCard } from "./_components/CategoryCard";
import { CategoryModal } from "./_components/CategoryModal";
import { ServiceModal } from "./_components/ServiceModal";
import { ServicesLoadingSkeleton } from "./_components/Skeletons";
import type { AdminServiceCategory, AdminService, ServiceFiltersState } from "./_types/services.types";

export default function ServicesPage() {
  const [filters, setFilters] = useState<ServiceFiltersState>({ q: "", is_active: "all", featured: "all", category_id: "all" });
  const { categories, services, pricingCategories, isLoading } = useServicesQuery(filters);
  const { deleteCategory, deleteService } = useServiceMutations();
  useServiceSockets();

  const [activeCat, setActiveCat] = useState<AdminServiceCategory | null | undefined>(undefined);
  const [activeSvc, setActiveSvc] = useState<AdminService | null | undefined>(undefined);

  if (isLoading) return <ServicesLoadingSkeleton />;

  return (
    <div className="flex-1 space-y-6 py-6 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-emerald-600" /> Services Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">Configure and manage active service offerings, categories, and rate tiers.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setActiveCat(null)} className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 rounded-xl text-xs h-9 px-4 border border-emerald-500/20">
            <FolderPlus className="h-4 w-4 mr-1.5" /> + Category
          </Button>
          <Button onClick={() => setActiveSvc(null)} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs h-9 px-4 shadow-sm">
            <Plus className="h-4 w-4 mr-1.5" /> + Service
          </Button>
        </div>
      </div>

      <FilterArea filters={filters} onFilterChange={(u) => setFilters((f) => ({ ...f, ...u }))} categories={categories} />

      <div className="space-y-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            services={services}
            onEditCategory={setActiveCat}
            onDeleteCategory={(id) => confirm("Delete this category?") && deleteCategory.mutate(id)}
            onEditService={setActiveSvc}
            onDeleteService={(id) => confirm("Delete this service?") && deleteService.mutate(id)}
          />
        ))}
        {categories.length === 0 && (
          <div className="text-center text-xs text-slate-500 py-12">No categories found. Click + Category to start.</div>
        )}
      </div>

      {activeCat !== undefined && (
        <CategoryModal
          key={activeCat?.id ?? "new"}
          isOpen={activeCat !== undefined}
          onClose={() => setActiveCat(undefined)}
          category={activeCat}
        />
      )}
      {activeSvc !== undefined && (
        <ServiceModal
          key={activeSvc?.id ?? "new"}
          isOpen={activeSvc !== undefined}
          onClose={() => setActiveSvc(undefined)}
          service={activeSvc}
          categories={categories}
          pricingCategories={pricingCategories}
        />
      )}
    </div>
  );
}
