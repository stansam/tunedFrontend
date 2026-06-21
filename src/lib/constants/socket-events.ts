// Inbound Client Events (client → server)
export const SOCKET_EMIT = {
  DASHBOARD_SUBSCRIBE:           "dashboard:subscribe",
  DASHBOARD_UNSUBSCRIBE:         "dashboard:unsubscribe",
  JOIN_ORDER:                    "join:order",
  LEAVE_ORDER:                   "leave:order",
  NOTIFICATION_MARK_READ:        "notification:mark_read",
  NOTIFICATION_GET_UNREAD_COUNT: "notification:get_unread_count",
} as const;

// Outbound Server Events (server → client)
export const SOCKET_ON = {
  // Notifications
  NOTIFICATION_COUNT:    "notification:count",
  NOTIFICATION_NEW:      "notification:new",
  NOTIFICATION_READ:     "notification:read",
  // Orders
  ORDER_UPDATED:         "order:updated",
  ORDER_DRAFT_SAVED:     "order:draft_saved",
  ORDER_COMMENT:         "order:comment",
  ORDER_COMMENT_UPDATED: "order:comment:updated",
  ORDER_COMMENT_DELETED: "order:comment:deleted",
  ORDER_REVISION_STATUS: "order:revision:status_changed",
  ORDER_JOINED:          "order:joined",
  ORDER_LEFT:            "order:left",
  // Delivery
  DELIVERY_CREATED:      "order:delivery:created",
  DELIVERY_UPDATED:      "order:delivery:updated",
  DELIVERY_DELETED:      "order:delivery:deleted",
  // Dashboard / Payments
  DASHBOARD_PAYMENT_UPDATED:  "dashboard:payment_updated",
  DASHBOARD_PAYMENT_VERIFIED: "dashboard:payment_verified",
  DASHBOARD_REFUND_PROCESSED: "dashboard:refund_processed",
  DASHBOARD_POINTS_UPDATED:   "dashboard:points_updated",
  // Preferences
  PREFERENCES_UPDATED:        "preferences:updated",
  // Alerts
  ACTIONABLE_ALERT_NEW:  "actionable_alert.new",  // backend uses dot, kept as-is
  // Admin
  ADMIN_ORDER_CREATED:           "admin:order:created",
  ADMIN_ORDER_STATUS_CHANGED:    "admin:order:status_changed",
  ADMIN_ORDER_ESCALATED:         "admin:order:escalated",
  ADMIN_ORDER_EXTENSION_RESPONDED: "admin:order:extension_responded",
  ADMIN_PAYMENT_VERIFICATION_REQUIRED: "admin:payment_verification_required",
  ADMIN_REVISION_REQUESTED:      "admin:revision:requested",
  ADMIN_USER_REGISTERED:         "admin:user:registered",
  ADMIN_CATEGORY_CREATED:        "admin:category:created",
  ADMIN_CATEGORY_UPDATED:        "admin:category:updated",
  ADMIN_CATEGORY_DELETED:        "admin:category:deleted",
  ADMIN_SERVICE_CREATED:         "admin:service:created",
  ADMIN_SERVICE_UPDATED:         "admin:service:updated",
  ADMIN_SERVICE_DELETED:         "admin:service:deleted",
  ADMIN_BLOG_POST_CREATED:       "admin:blog:post:created",
  ADMIN_BLOG_POST_UPDATED:       "admin:blog:post:updated",
  ADMIN_BLOG_POST_DELETED:       "admin:blog:post:deleted",
  ADMIN_BLOG_POST_PUBLISHED:     "admin:blog:post:published",
  ADMIN_BLOG_CATEGORY_CREATED:   "admin:blog:category:created",
  ADMIN_BLOG_CATEGORY_UPDATED:   "admin:blog:category:updated",
  ADMIN_BLOG_CATEGORY_DELETED:   "admin:blog:category:deleted",
  ADMIN_BLOG_COMMENT_UPDATED:    "admin:blog:comment:updated",
  // System
  SOCKET_ERROR:          "error",
} as const;
