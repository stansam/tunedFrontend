import type {
  OrderDetailResponseDTO,
  OrderCommentDTO,
  OrderTab,
  OrderStatus,
  PendingAttachment,
  CommentAttachmentDTO,
  CommentEditState,
  OrderDeliveryResponseDTO,
  OrderDeliveryFileResponseDTO,
  DeliveryStatus,
} from "../_types";

export interface OrderDetailHeaderProps {
  orderNumber: string;
}

export interface OrderSummaryCardProps {
  order: OrderDetailResponseDTO;
}

export interface OrderCountdownTimerProps {
  dueDate: string | null;
}

export interface OrderDetailTabsProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
  isPending?: boolean;
}

export interface OrderRequirementsProps {
  order: OrderDetailResponseDTO;
}

export interface CommentItemProps {
  comment: OrderCommentDTO;
  currentUserId: string;
  dayLabel?: string;
}

export interface CommentComposerProps {
  onSend: (content: string) => Promise<void>;
  isSending?: boolean;
}

export interface OrderCommentsProps {
  orderId: string;
}

export interface DetailsTabContentProps {
  order: OrderDetailResponseDTO;
}

export interface OrderInfoCardProps {
  order: OrderDetailResponseDTO;
}

export interface OrderTrackingStepperProps {
  status: OrderStatus;
}

export interface OrderDetailSidebarProps {
  order: OrderDetailResponseDTO;
}

export interface OrderDetailPageClientProps {
  orderNumber: string;
}

export interface ActivityTabContentProps {
  orderId: string;
}

export interface ActivityFeedProps {
  orderId: string;
}

export interface CommentThreadProps {
  comments: OrderCommentDTO[];
  currentUserId: string;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  isEditing: CommentEditState;
  onCancelEdit: () => void;
  onConfirmEdit: (commentId: string, content: string) => Promise<void>;
}

export interface CommentBubbleProps {
  comment: OrderCommentDTO;
  currentUserId: string;
  dayLabel?: string;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
}

export interface ActivityComposerProps {
  onSend: (content: string, attachmentIds?: string[]) => Promise<void>;
  isSending: boolean;
  orderId: string;
  orderNumber: string;
}

export interface CommentAttachmentPreviewProps {
  attachments: PendingAttachment[];
  onRemove: (localId: string) => void;
}

export interface CommentAttachmentBadgeProps {
  attachment: CommentAttachmentDTO;
}

export interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob, durationMs: number) => void;
  onCancel: () => void;
}

export interface DeliveryTabContentProps { order: OrderDetailResponseDTO }
export interface DeliveryCardProps { delivery: OrderDeliveryResponseDTO; orderId: string; orderStatus: OrderStatus }
export interface DeliveryActionsProps { delivery: OrderDeliveryResponseDTO; orderId: string; orderStatus: OrderStatus }
export interface DeliveryMessageProps { delivery: OrderDeliveryResponseDTO }
export interface CreateSimilarOrderCardProps { orderNumber: string }
export interface DeliveryStatusBadgeProps { status: DeliveryStatus; statusColor: string }
export interface DeliveryAttachmentItemProps { attachment: OrderDeliveryFileResponseDTO }
export interface DeliveryAttachmentGridProps {
  attachments: OrderDeliveryFileResponseDTO[];
}