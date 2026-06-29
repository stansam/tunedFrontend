export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface PaginatedNotifications {
  notifications: NotificationItem[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface NotificationState {
  unreadCount: number;
  notifications: NotificationItem[];
  isLoading: boolean;
  error: string | null;
}

export interface NotificationContextValue extends NotificationState {
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
}

