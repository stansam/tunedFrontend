import type { TagResponse } from "@/lib/types/tag.type";

export interface ServiceFiltersState {
  readonly q: string;
  readonly is_active: string; // "all" | "true" | "false"
  readonly featured: string; // "all" | "true" | "false"
  readonly category_id: string; // "all" | id
}

export interface AdminServiceCategory {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly order: number;
}

export interface PricingCategory {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly display_order: number;
  readonly default_rate?: number;
}

export interface AdminService {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly category_id: string;
  readonly featured: boolean;
  readonly pricing_category_id: string;
  readonly slug: string;
  readonly is_active: boolean;
  readonly tags: readonly TagResponse[];
  readonly category?: AdminServiceCategory;
  readonly pricing_category?: PricingCategory;
}

export interface CategoryMutationPayload {
  readonly name: string;
  readonly description?: string;
  readonly order?: number;
}

export interface ServiceMutationPayload {
  readonly name: string;
  readonly description?: string;
  readonly category_id: string;
  readonly pricing_category_id: string;
  readonly featured?: boolean;
  readonly is_active?: boolean;
  readonly slug?: string;
  readonly tags?: readonly string[]; // Tag names
}
