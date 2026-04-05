import { Tag } from "../../_types";

export const ALL_SERVICE = "all" as const;
export type AllService = typeof ALL_SERVICE;

export type SortField = "created_at" | "word_count" | "title";
export type SortOrder = "asc" | "desc";

export interface SampleService {
  id: string;
  name: string;
  slug: string;
}

export interface SampleListItem {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly word_count: number;
  readonly featured: boolean;
  readonly image: string | null;
  readonly created_at: string | null;
  readonly tags: readonly Tag[];
  readonly service?: SampleService | null;
}

export interface SamplePagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface SamplesPageResponse {
  data: SampleListItem[];
  pagination: SamplePagination;
}

export interface SampleQueryParams {
  q?: string;
  service_id?: string;
  sort?: SortField;
  order?: SortOrder;
  page?: number;
  per_page?: number;
}

export interface SampleFilters {
  search: string;
  serviceId: string; // "all" | actual id
  sort: SortField;
  order: SortOrder;
}
