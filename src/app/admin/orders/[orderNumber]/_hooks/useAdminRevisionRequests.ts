"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRevisionRequests,
  updateRevisionStatus,
} from "../_services/admin-revision.service";
import { ADMIN_REVISIONS_STALE_MS, ADMIN_ORDER_DETAIL_GC_MS } from "../_fallbacks";
import type { AdminRevisionRequestDTO } from "../_types";

export function adminRevisionsQueryKey(orderId: string) {
  return ["admin-revision-requests", orderId] as const;
}

export function useAdminRevisionRequests(orderId: string) {
  const queryClient = useQueryClient();

  const query = useQuery<AdminRevisionRequestDTO[], Error>({
    queryKey: adminRevisionsQueryKey(orderId),
    queryFn: async () => {
      const result = await fetchRevisionRequests(orderId);
      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to fetch revision requests");
      }
      return result.data ?? [];
    },
    staleTime: ADMIN_REVISIONS_STALE_MS,
    gcTime: ADMIN_ORDER_DETAIL_GC_MS,
    enabled: !!orderId,
  });

  const mutation = useMutation<
    AdminRevisionRequestDTO,
    Error,
    { requestId: string; status: string; internal_notes?: string | null }
  >({
    mutationFn: async ({ requestId, status, internal_notes }) => {
      const result = await updateRevisionStatus(orderId, requestId, { status, internal_notes });
      if (!result.ok) throw new Error(result.error?.message || "Failed to update status");
      return result.data as AdminRevisionRequestDTO;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<AdminRevisionRequestDTO[]>(
        adminRevisionsQueryKey(orderId),
        (prev) => prev?.map((r) => (r.id === updated.id ? updated : r)) ?? [],
      );
    },
  });

  return {
    revisions: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    updateStatus: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    updateError: mutation.error,
  };
}
