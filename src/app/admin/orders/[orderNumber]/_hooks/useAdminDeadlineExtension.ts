"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDeadlineExtensions,
  requestDeadlineExtension,
} from "../_services/admin-extension.service";
import { ADMIN_EXTENSIONS_STALE_MS, ADMIN_ORDER_DETAIL_GC_MS } from "../_fallbacks";
import { adminOrderDetailQueryKey } from "./useAdminOrderDetail";
import type { AdminDeadlineExtensionDTO } from "../_types";

export function adminExtensionsQueryKey(orderId: string) {
  return ["admin-deadline-extensions", orderId] as const;
}

export function useAdminDeadlineExtension(orderId: string, orderNumber: string) {
  const queryClient = useQueryClient();

  const query = useQuery<AdminDeadlineExtensionDTO[], Error>({
    queryKey: adminExtensionsQueryKey(orderId),
    queryFn: async () => {
      const result = await fetchDeadlineExtensions(orderId);
      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to fetch deadline extensions");
      }
      return result.data ?? [];
    },
    staleTime: ADMIN_EXTENSIONS_STALE_MS,
    gcTime: ADMIN_ORDER_DETAIL_GC_MS,
    enabled: !!orderId,
  });

  const mutation = useMutation<
    AdminDeadlineExtensionDTO,
    Error,
    { requested_hours: number; reason: string; priority?: string }
  >({
    mutationFn: async (dto) => {
      const result = await requestDeadlineExtension(orderId, dto);
      if (!result.ok) throw new Error(result.error?.message || "Failed to create request");
      return result.data as AdminDeadlineExtensionDTO;
    },
    onSuccess: (newReq) => {
      queryClient.setQueryData<AdminDeadlineExtensionDTO[]>(
        adminExtensionsQueryKey(orderId),
        (prev) => [newReq, ...(prev || [])],
      );
      queryClient.invalidateQueries({ queryKey: adminOrderDetailQueryKey(orderNumber) });
    },
  });

  return {
    extensions: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    requestExtension: mutation.mutateAsync,
    isRequesting: mutation.isPending,
    requestError: mutation.error,
  };
}
