import { useState } from "react";
import type { AdminTestimonialResponse } from "../_types/testimonials.type";

export function useTestimonialsPageState() {
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState<string>("all");
  const [serviceId, setServiceId] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<AdminTestimonialResponse | null>(null);

  const openEdit = (t: AdminTestimonialResponse) => {
    setSelectedTestimonial(t);
    setIsEditOpen(true);
  };

  const openDelete = (t: AdminTestimonialResponse) => {
    setSelectedTestimonial(t);
    setIsDeleteOpen(true);
  };

  const handleToggleExpandCard = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return {
    search,
    setSearch: (val: string) => { setSearch(val); setPage(1); },
    rating,
    setRating: (val: string) => { setRating(val); setPage(1); },
    serviceId,
    setServiceId: (val: string) => { setServiceId(val); setPage(1); },
    status,
    setStatus: (val: string) => { setStatus(val); setPage(1); },
    page,
    setPage,
    expandedCardId,
    onToggleExpandCard: handleToggleExpandCard,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedTestimonial,
    setSelectedTestimonial,
    openEdit,
    openDelete,
  };
}
