import type {
  OrderResponseDTO,
  OrderFiltersState,
  StatusTab,
  SortField,
  SortOrder,
} from "../_types";

export interface OrderCardProps {
  order: OrderResponseDTO;
}

export interface OrderStatusBadgeProps {
  status: OrderResponseDTO["status"];
}

export interface OrderContextMenuProps {
  order: OrderResponseDTO;
}

export interface OrderStatusTabsProps {
  activeTab: StatusTab;
  onTabChange: (tab: StatusTab) => void;
  isPending?: boolean;
}

export interface OrdersToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: SortField;
  sortOrder: SortOrder;
  onSortChange: (sort: SortField, order: SortOrder) => void;
  isPending?: boolean;
}

export interface OrderListProps {
  filters: OrderFiltersState;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

export interface OrdersPaginationProps {
  page: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  isPending?: boolean;
}

export interface OrdersHeaderProps {
  filters: OrderFiltersState;
}

export interface EmptyOrdersProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}
