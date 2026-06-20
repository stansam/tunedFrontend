import type {
  AdminOrderTab,
  AdminOrderDetailDTO,
  AdminOrderCommentDTO,
  AdminDeliveryDTO,
  AdminDeliveryFileDTO,
} from "../_types";

export interface AdminOrderDetailPageClientProps { orderNumber: string; }

export interface AdminOrderDetailHeaderProps {
  order: AdminOrderDetailDTO;
  onActivate(): void;
  onEscalate(): void;
  isActivating: boolean;
  isEscalating: boolean;
}

export interface AdminOrderSummaryCardProps { order: AdminOrderDetailDTO; }
export interface AdminOrderCountdownTimerProps { dueDate: string | null; }
export interface AdminOrderDetailTabsProps { activeTab: AdminOrderTab; onTabChange(tab: AdminOrderTab): void; }
export interface AdminDetailsTabContentProps { order: AdminOrderDetailDTO; }
export interface AdminOrderRequirementsProps { order: AdminOrderDetailDTO; }
export interface AdminOrderInfoCardProps { order: AdminOrderDetailDTO; }
export interface AdminOrderDetailSidebarProps { order: AdminOrderDetailDTO; }
export interface AdminOrderTrackingStepperProps { status: string; }

export interface AdminActivityTabContentProps { orderId: string; }
export interface AdminActivityFeedProps { orderId: string; }
export interface AdminCommentThreadProps {
  comments: AdminOrderCommentDTO[];
  currentUserId: string;
  onEdit(id: string, content: string): void;
  onDelete(id: string): void;
}
export interface AdminCommentBubbleProps {
  comment: AdminOrderCommentDTO;
  currentUserId: string;
  onEdit(id: string, content: string): void;
  onDelete(id: string): void;
}
export interface AdminActivityComposerProps {
  onSend(content: string): Promise<void>;
  isSending: boolean;
}

export interface AdminDeliveryTabContentProps { order: AdminOrderDetailDTO; }
export interface AdminDeliveryCardProps { delivery: AdminDeliveryDTO; orderId: string; orderStatus: string; }
export interface AdminDeliveryAttachmentGridProps { attachments: AdminDeliveryFileDTO[]; }
export interface AdminDeliveryAttachmentItemProps { attachment: AdminDeliveryFileDTO; }
export interface AdminDeliveryStatusBadgeProps { status: string; statusColor: string; }
export interface AdminDeliveryMessageProps { delivery: AdminDeliveryDTO; }
export interface AdminDeliveryActionsProps {
  delivery: AdminDeliveryDTO;
  orderId: string;
  orderStatus: string;
}

export interface AdminSubmitDeliveryPanelProps { orderId: string; onSuccess(): void; }
export interface AdminRevisionRequestPanelProps { orderId: string; }
export interface AdminDeadlineExtensionPanelProps { orderId: string; currentDueDate: string | null; }
export interface AdminOrderActionsPanelProps {
  order: AdminOrderDetailDTO;
  onSuccess(): void;
}

export interface ConfirmActionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly title: string;
  readonly description: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly isPending?: boolean;
  readonly variant?: "default" | "destructive" | "emerald";
}