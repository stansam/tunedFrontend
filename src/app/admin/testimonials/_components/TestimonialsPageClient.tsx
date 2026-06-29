"use client";

import { useTestimonialsQuery, useTestimonialServicesQuery } from "../_hooks/useTestimonialsQuery";
import { useTestimonialMutations } from "../_hooks/useTestimonialMutations";
import { useTestimonialsSocket } from "../_hooks/useTestimonialsSocket";
import { useTestimonialsPageState } from "../_hooks/useTestimonialsPageState";
import { useNavStats } from "../../_hooks/useNavStats";
import {TestimonialsHeader} from "./TestimonialsHeader";
import {FilterArea} from "./FilterArea";
import {TestimonialsList} from "./TestimonialsList";
import {EditTestimonialModal} from "./EditTestimonialModal";
import {DeleteTestimonialDialog} from "./DeleteTestimonialDialog";
import type { AdminTestimonialMutation } from "../_types/testimonials.type";

export function TestimonialsPageClient() {
  useTestimonialsSocket();
  const s = useTestimonialsPageState();
  const { approveMut, updateMut, deleteMut } = useTestimonialMutations();
  const { data: servicesData } = useTestimonialServicesQuery();
  const services = servicesData ?? [];

  const filters = {
    page: s.page,
    per_page: 10,
    service_id: s.serviceId === "all" ? undefined : s.serviceId,
    rating: s.rating === "all" ? undefined : Number(s.rating),
    status: s.status,
    q: s.search || undefined,
  };
  const { data: listData, isLoading } = useTestimonialsQuery(filters);

  const stats = useNavStats();
  const pendingCount = stats.testimonials_count;
  const totalCount = listData?.total ?? 0;
  const approvedCount = Math.max(0, totalCount - pendingCount);

  const handleApprove = (id: string) => {
    approveMut.mutate(id);
  };

  const handleEditSave = (data: AdminTestimonialMutation) => {
    if (s.selectedTestimonial) {
      updateMut.mutateAsync({ id: s.selectedTestimonial.id, data }).then(() => s.setIsEditOpen(false));
    }
  };

  const handleDelete = () => {
    if (s.selectedTestimonial) {
      deleteMut.mutateAsync(s.selectedTestimonial.id).then(() => s.setIsDeleteOpen(false));
    }
  };

  return (
    <div className="@container/main flex min-h-screen flex-col gap-6 overflow-auto py-6">
      <TestimonialsHeader totalCount={totalCount} pendingCount={pendingCount} approvedCount={approvedCount} />
      <FilterArea
        search={s.search} onSearchChange={s.setSearch} status={s.status} onStatusChange={s.setStatus}
        rating={s.rating} onRatingChange={s.setRating} serviceId={s.serviceId} onServiceChange={s.setServiceId}
        services={services}
      />
      <TestimonialsList
        testimonials={listData?.testimonials ?? []} loading={isLoading} expandedCardId={s.expandedCardId}
        onToggleExpandCard={s.onToggleExpandCard} onApprove={handleApprove} onEdit={s.openEdit}
        onDelete={s.openDelete} page={s.page} total={totalCount} onPageChange={s.setPage}
        isApprovingId={approveMut.isPending ? approveMut.variables : null}
      />
      <EditTestimonialModal key={s.isEditOpen ? `edit-${s.selectedTestimonial?.id}` : "edit-closed"} isOpen={s.isEditOpen} testimonial={s.selectedTestimonial} onClose={() => s.setIsEditOpen(false)} onSave={handleEditSave} isSaving={updateMut.isPending} />
      <DeleteTestimonialDialog key={s.isDeleteOpen ? `del-${s.selectedTestimonial?.id}` : "del-closed"} isOpen={s.isDeleteOpen} testimonial={s.selectedTestimonial} onClose={() => s.setIsDeleteOpen(false)} onDelete={handleDelete} isDeleting={deleteMut.isPending} />
    </div>
  );
}
