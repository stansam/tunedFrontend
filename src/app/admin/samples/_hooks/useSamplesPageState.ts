import { useState } from "react";
import type { AdminSampleResponse } from "../_types/samples.type";

export function useSamplesPageState() {
  const [search, setSearch] = useState("");
  const [catId, setCatId] = useState("all");
  const [page, setPage] = useState(1);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState<AdminSampleResponse | null>(null);

  const openEdit = (sample: AdminSampleResponse) => {
    setSelectedSample(sample);
    setIsEditOpen(true);
  };

  const openDelete = (sample: AdminSampleResponse) => {
    setSelectedSample(sample);
    setIsDeleteOpen(true);
  };

  const handleToggleExpandCard = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return {
    search,
    setSearch: (val: string) => { setSearch(val); setPage(1); },
    catId,
    setCatId: (val: string) => { setCatId(val); setPage(1); },
    page,
    setPage,
    expandedCardId,
    onToggleExpandCard: handleToggleExpandCard,
    isCreateOpen,
    setIsCreateOpen,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedSample,
    setSelectedSample,
    openEdit,
    openDelete,
  };
}
