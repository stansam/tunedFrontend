import type {
  AdminOrder,
  AdminOrdersStats,
  AdminOrderStatus,
  BottleneckStats,
  WriterLoad,
} from "../_types/orders.types";

export interface OrdersStatsProps {
  readonly stats: AdminOrdersStats;
  readonly activeTab: AdminOrderStatus | "all";
  readonly onTabChange: (tab: AdminOrderStatus | "all") => void;
}

export interface BottleneckSectionProps {
  readonly bottlenecks: BottleneckStats;
}

export interface WriterLoadSectionProps {
  readonly writerLoad: readonly WriterLoad[];
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
  readonly onAssign: (orderId: string) => void;
  readonly onEscalate: (orderId: string) => void;
}

export interface OrderRowProps {
  readonly order: AdminOrder;
  readonly onAssign: (orderId: string) => void;
  readonly onEscalate: (orderId: string) => void;
}

export interface OrdersPaginationProps {
  readonly total: number;
  readonly page: number;
  readonly perPage: number;
  readonly onPageChange: (page: number) => void;
}

export interface AssignWriterModalProps {
  readonly orderId: string | null;
  readonly writers: readonly WriterLoad[];
  readonly onClose: () => void;
  readonly onAssignConfirm: (writerId: string) => void;
}
