import type {
  AdminService,
  AdminServiceCategory,
  PricingCategory,
  ServiceFiltersState,
} from "../_types/services.types";

export interface FilterAreaProps {
  readonly filters: ServiceFiltersState;
  readonly onFilterChange: (updates: Partial<ServiceFiltersState>) => void;
  readonly categories: readonly AdminServiceCategory[];
}

export interface CategoryCardProps {
  readonly category: AdminServiceCategory;
  readonly services: readonly AdminService[];
  readonly onEditCategory: (category: AdminServiceCategory) => void;
  readonly onDeleteCategory: (id: string) => void;
  readonly onEditService: (service: AdminService) => void;
  readonly onDeleteService: (id: string) => void;
}

export interface ServiceCardProps {
  readonly service: AdminService;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

export interface ServiceDetailsProps {
  readonly service: AdminService;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

export interface CategoryModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly category?: AdminServiceCategory | null;
}

export interface ServiceModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly service?: AdminService | null;
  readonly categories: readonly AdminServiceCategory[];
  readonly pricingCategories: readonly PricingCategory[];
}

export interface ServiceFormFieldsProps {
  readonly name: string;
  readonly setName: (val: string) => void;
  readonly slug: string;
  readonly setSlug: (val: string) => void;
  readonly description: string;
  readonly setDescription: (val: string) => void;
  readonly catId: string;
  readonly setCatId: (val: string) => void;
  readonly priceCatId: string;
  readonly setPriceCatId: (val: string) => void;
  readonly featured: boolean;
  readonly setFeatured: (val: boolean) => void;
  readonly active: boolean;
  readonly setActive: (val: boolean) => void;
  readonly tags: readonly string[];
  readonly setTags: (val: readonly string[]) => void;
  readonly categories: readonly AdminServiceCategory[];
  readonly pricingCategories: readonly PricingCategory[];
}
