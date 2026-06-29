import { apiGet, apiPut, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type { NotificationItem, PaginatedNotifications } from "@/lib/types/notification.type";

export interface ReadAllResponse {
  updated_count: number;
}

export interface ReadResponse {
  notification: NotificationItem;
}

export interface DeleteResponse {
  deleted_id: string;
}

export async function fetchNotifications(
  limit: number = 20,
  offset: number = 0
): Promise<ApiResult<PaginatedNotifications>> {
  return apiGet<PaginatedNotifications>(
    `/notifications?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );
}

export async function markNotificationRead(
  id: string
): Promise<ApiResult<ReadResponse>> {
  return apiPut<ReadResponse>(`/notifications/${id}`, {});
}

export async function markAllNotificationsRead(): Promise<ApiResult<ReadAllResponse>> {
  return apiPut<ReadAllResponse>("/notifications/read-all", {});
}

export async function deleteNotification(
  id: string
): Promise<ApiResult<DeleteResponse>> {
  return apiDelete<DeleteResponse>(`/notifications/${id}`);
}
