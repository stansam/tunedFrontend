import { Tag, BlogPostId, CategoryId, Slug, ISODateString } from "../../_types";

export const ALL_CATEGORY = "all" as const;
export type AllCategory = typeof ALL_CATEGORY;

export type BlogSortField = "published_at" | "created_at" | "title";
export type BlogSortOrder = "asc" | "desc";

export interface BlogCategory {
  readonly id:          CategoryId;
  readonly name:        string;
  readonly slug:        Slug;
  readonly description?: string | null;
}

export interface BlogListItem {
  readonly id:               BlogPostId;
  readonly title:            string;
  readonly slug:             Slug;
  readonly excerpt:          string;
  readonly author:           string;
  readonly category_id:      CategoryId;
  readonly featured_image:   string | null;
  readonly is_featured:      boolean;
  readonly published_at:     ISODateString | null;
  readonly tags:             readonly Tag[];
  readonly category?:        BlogCategory | null;
}

export interface BlogPagination {
  readonly page:        number;
  readonly per_page:    number;
  readonly total:       number;
  readonly total_pages: number;
  readonly has_next:    boolean;
  readonly has_prev:    boolean;
}

export interface BlogsPageResponse {
  readonly data:       readonly BlogListItem[];
  readonly pagination: BlogPagination;
}

export interface BlogQueryParams {
  readonly q?:           string;
  readonly category_id?: string;
  readonly sort?:        BlogSortField;
  readonly order?:       BlogSortOrder;
  readonly page?:        number;
  readonly per_page?:    number;
}

export interface BlogFilters {
  readonly search:     string;
  readonly categoryId: string; // "all" | actual id
  readonly sort:       BlogSortField;
  readonly order:      BlogSortOrder;
}
