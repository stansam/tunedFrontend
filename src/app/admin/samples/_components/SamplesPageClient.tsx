"use client";

import { useSamplesQuery, useSampleServicesQuery } from "../_hooks/useSamplesQuery";
import { useSampleMutations } from "../_hooks/useSampleMutations";
import { useSamplesSocket } from "../_hooks/useSamplesSocket";
import { useSamplesPageState } from "../_hooks/useSamplesPageState";
import {
  SamplesHeader, FilterArea, SamplesList, CreateSampleModal, EditSampleModal, DeleteSampleDialog,
} from "./index";
import type { AdminSampleMutation } from "../_types/samples.type";

export function SamplesPageClient() {
  useSamplesSocket();
  const s = useSamplesPageState();
  const { createMut, updateMut, deleteMut } = useSampleMutations();

  const { data: servicesData } = useSampleServicesQuery();
  const services = servicesData ?? [];

  const filters = {
    page: s.page,
    per_page: 10,
    service_id: s.catId === "all" ? undefined : s.catId,
    q: s.search || undefined,
  };
  const { data: listData, isLoading } = useSamplesQuery(filters);

  const handleCreate = (data: AdminSampleMutation) => {
    createMut.mutateAsync(data).then(() => s.setIsCreateOpen(false));
  };

  const handleEdit = (data: AdminSampleMutation) => {
    if (s.selectedSample) {
      updateMut.mutateAsync({ id: s.selectedSample.id, data }).then(() => s.setIsEditOpen(false));
    }
  };

  const handleDelete = () => {
    if (s.selectedSample) {
      deleteMut.mutateAsync(s.selectedSample.id).then(() => s.setIsDeleteOpen(false));
    }
  };

  const handleFeatureToggle = (id: string, featured: boolean) => {
    const matched = listData?.samples.find((item) => item.id === id);
    if (matched) {
      const payload: AdminSampleMutation = {
        title: matched.title,
        content: matched.excerpt || "",
        service_id: matched.service_id,
        excerpt: matched.excerpt,
        word_count: matched.word_count,
        featured,
        image: matched.image || "",
        tags: matched.tags.map((t) => t.name),
      };
      updateMut.mutate({ id, data: payload });
    }
  };

  return (
    <div className="@container/main flex min-h-screen flex-col gap-6 overflow-auto py-6">
      <SamplesHeader onCreateClick={() => s.setIsCreateOpen(true)} />
      <FilterArea
        search={s.search} onSearchChange={s.setSearch} categoryId={s.catId} onCategoryChange={s.setCatId} services={services}
      />
      <SamplesList
        samples={listData?.samples ?? []} loading={isLoading} expandedCardId={s.expandedCardId} onToggleExpandCard={s.onToggleExpandCard}
        onEdit={s.openEdit} onDelete={s.openDelete} onFeatureToggle={handleFeatureToggle} page={s.page} total={listData?.total ?? 0} onPageChange={s.setPage}
      />

      <CreateSampleModal key={s.isCreateOpen ? "create-open" : "create-closed"} isOpen={s.isCreateOpen} onClose={() => s.setIsCreateOpen(false)} onSave={handleCreate} isSaving={createMut.isPending} services={services} />
      <EditSampleModal key={s.isEditOpen ? `edit-open-${s.selectedSample?.id || "new"}` : "edit-closed"} isOpen={s.isEditOpen} sample={s.selectedSample} onClose={() => s.setIsEditOpen(false)} onSave={handleEdit} isSaving={updateMut.isPending} services={services} />
      <DeleteSampleDialog key={s.isDeleteOpen ? `delete-open-${s.selectedSample?.id || "new"}` : "delete-closed"} isOpen={s.isDeleteOpen} sample={s.selectedSample} onClose={() => s.setIsDeleteOpen(false)} onDelete={handleDelete} isDeleting={deleteMut.isPending} />
    </div>
  );
}
