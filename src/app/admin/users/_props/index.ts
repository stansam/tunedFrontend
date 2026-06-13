import type {
  AdminUserResponseDTO,
  AdminUserStatsResponseDTO,
  GeographicDistributionDTO,
  UserFiltersState,
  StatusFilter,
  SortField,
  SortOrder,
} from "../_types";

export interface UsersHeaderProps {
  readonly onBroadcast: () => void;
  readonly onExport: () => void;
}

export interface UsersStatsGridProps {
  readonly stats: AdminUserStatsResponseDTO;
  readonly isLoading: boolean;
}

export interface TopClientsCardProps {
  readonly filters: UserFiltersState;
  readonly users: readonly AdminUserResponseDTO[];
  readonly total: number;
  readonly isPending: boolean;
  readonly onSearchChange: (q: string) => void;
  readonly onStatusChange: (status: StatusFilter) => void;
  readonly onSortChange: (sort: SortField, order: SortOrder) => void;
  readonly onPageChange: (page: number) => void;
  readonly onMessageAll: () => void;
  readonly onAction: (user: AdminUserResponseDTO) => void;
}

export interface UserRowProps {
  readonly user: AdminUserResponseDTO;
  readonly onAction: (user: AdminUserResponseDTO) => void;
  readonly isMobile?: boolean;
}

export interface GeographicCardProps {
  readonly items: readonly GeographicDistributionDTO[];
  readonly isLoading: boolean;
}

export interface RetentionCardProps {
  readonly rate: number;
  readonly isLoading: boolean;
}

export interface UsersPageClientProps {
  readonly initialStats?: AdminUserStatsResponseDTO;
}
