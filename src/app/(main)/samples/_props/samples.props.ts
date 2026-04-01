import type { 
  SamplesPageResponse, 
  SampleFilters, 
  SampleListItem,
  SampleService,
  SortField,
  SortOrder
} from "../_types/samples.types";

export interface SamplesClientProps {
  readonly initialResponse: SamplesPageResponse;
  readonly initialFilters:  SampleFilters;
}

export interface SamplesControlBarProps {
  readonly filters:        SampleFilters;
  readonly services:       readonly SampleService[];
  readonly totalResults:   number;
  readonly onSearchChange: (value: string) => void;
  readonly onServiceSelect: (serviceId: string) => void;
  readonly onSortChange:   (sort: SortField) => void;
  readonly onOrderToggle:  () => void;
  readonly onClearFilters: () => void;
}

export interface SamplesGridProps {
  readonly items:     readonly SampleListItem[];
  readonly isLoading: boolean;
}

export interface SamplesPaginationProps {
  readonly page:       number;
  readonly totalPages: number;
  readonly hasNext:    boolean;
  readonly hasPrev:    boolean;
  readonly onPageChange: (page: number) => void;
}

export interface SamplesEmptyStateProps {
  readonly search:         string;
  readonly onClearFilters: () => void;
}

export interface SamplesHeroProps {}

export interface UseSamplesReturnProps {
  readonly filters:         SampleFilters;
  readonly response:        SamplesPageResponse;
  readonly isLoading:       boolean;
  readonly services:        readonly SampleService[];
  readonly setSearch:       (value: string) => void;
  readonly setService:      (id: string) => void;
  readonly setSort:         (field: SortField) => void;
  readonly toggleOrder:     () => void;
  readonly setPage:         (page: number) => void;
  readonly clearFilters:    () => void;
}