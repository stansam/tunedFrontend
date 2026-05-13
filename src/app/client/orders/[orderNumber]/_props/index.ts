import type {
  OrderDetailResponseDTO,
  OrderCommentDTO,
  OrderTab,
  OrderStatus,
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
