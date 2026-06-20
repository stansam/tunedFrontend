import type {
  AdminOrder,
  AdminOrdersStats,
  AdminOrderStatus,
  BottleneckStats,
  ServiceLoad,
} from "../_types/orders.types";

export interface OrdersStatsProps {
  readonly stats: AdminOrdersStats;
  readonly activeTab: AdminOrderStatus | "all";
  readonly onTabChange: (tab: AdminOrderStatus | "all") => void;
}

export interface BottleneckSectionProps {
  readonly bottlenecks: BottleneckStats;
}

export interface ServiceLoadSectionProps {
  readonly serviceLoad: readonly ServiceLoad[];
}

export interface OrdersToolbarProps {
  readonly searchValue: string;
  readonly onSearchChange: (val: string) => void;
  readonly serviceValue: string;
  readonly onServiceChange: (val: string) => void;
  readonly sortValue: "created_at" | "due_date" | "title";
  readonly sortOrder: "asc" | "desc";
  readonly onSortChange: (field: "created_at" | "due_date" | "title", order: "asc" | "desc") => void;
  readonly isPending?: boolean;
}

export interface OrdersTableProps {
  readonly orders: readonly AdminOrder[];
  readonly onActivate: (orderId: string) => void;
  readonly onEscalate: (orderId: string) => void;
  readonly isActivating?: boolean;
}

export interface OrderRowProps {
  readonly order: AdminOrder;
  readonly onActivate: (orderId: string) => void;
  readonly onEscalate: (orderId: string) => void;
  readonly isActivating?: boolean;
}

export interface OrdersPaginationProps {
  readonly total: number;
  readonly page: number;
  readonly perPage: number;
  readonly onPageChange: (page: number) => void;
}

export interface ActivateOrderModalProps {
  readonly orderId: string | null;
  readonly onClose: () => void;
  readonly onActivateConfirm: () => void;
}
