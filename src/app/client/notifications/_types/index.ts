import type { NotificationType } from "@/lib/types/notification.type";

export interface NotificationFilters {
  search: string;
  type: "all" | NotificationType;
  readStatus: "all" | "unread" | "read";
}
