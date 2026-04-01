import type { 
  BlogListItem, 
  BlogFilters, 
  BlogCategory, 
  BlogSortField,
  BlogsPageResponse
} from "../_types/blog.types";

export interface BlogHeroProps {
  readonly title:         React.ReactNode;
  readonly description:   string;
  readonly blogCount:     number;
  readonly categoryCount: number;
}

export interface BlogControlBarProps {
  readonly filters:         BlogFilters;
  readonly categories:      readonly BlogCategory[];
  readonly totalResults:    number;
  readonly onSearchChange:  (value: string) => void;
  readonly onCategorySelect: (categoryId: string) => void;
  readonly onSortChange:    (sort: BlogSortField) => void;
  readonly onOrderToggle:   () => void;
  readonly onClearFilters:  () => void;
}

export interface BlogGridProps {
  readonly items:     readonly BlogListItem[];
  readonly isLoading: boolean;
}

export interface BlogPaginationProps {
  readonly page:        number;
  readonly totalPages:  number;
  readonly hasNext:     boolean;
  readonly hasPrev:     boolean;
  readonly onPageChange: (page: number) => void;
}

export interface BlogEmptyStateProps {
  readonly search:         string;
  readonly onClearFilters: () => void;
}

export interface BlogClientProps {
  readonly initialResponse: BlogsPageResponse;
  readonly initialFilters:  BlogFilters;
}

export interface UseBlogsReturnProps {
  readonly filters:         BlogFilters;
  readonly response:        BlogsPageResponse;
  readonly isLoading:       boolean;
  readonly categories:      readonly BlogCategory[];
  readonly setSearch:       (value: string) => void;
  readonly setCategory:     (id: string) => void;
  readonly setSort:         (field: BlogSortField) => void;
  readonly toggleOrder:     () => void;
  readonly setPage:         (page: number) => void;
  readonly clearFilters:    () => void;
}
