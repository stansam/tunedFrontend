import type { SearchResultItem, SearchCounts } from "@/lib/types/search.type";
import type { ResultType } from "../_types";

export interface SearchPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    type?: string;
    page?: string;
    per_page?: string;
  }>;
}

export interface ResultsTabsProps {
  activeTab: ResultType;
  counts: SearchCounts;
  onChange: (tab: ResultType) => void;
}

export interface ResultCardProps {
  item: SearchResultItem;
  index: number;
  eventId?: string | null;
}

export interface SearchPaginationProps {
  currentPage: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
  onHoverPage?: (page: number) => void;
}