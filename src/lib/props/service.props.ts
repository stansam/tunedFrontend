import type { 
  Service, 
  ServiceCategory
} from "@/lib/types/service.type";
import type { Sample, Level } from "@/lib/types/content.type";

export interface ServicesDropdownProps {
  readonly categories:       readonly ServiceCategory[];
  readonly isOpen:           boolean;
  readonly onClose:          () => void;
  readonly isLoading:        boolean;
  readonly activeCategoryId: string | null;
  readonly onCategorySelect: (id: string | null) => void;
  readonly services:         readonly Service[];
  readonly isServicesLoading: boolean;
}

export interface MobileServicesMenuProps {
  readonly categories: readonly ServiceCategory[];
  readonly onFetchCategory: (id: string) => Promise<void>;
  readonly isCategoryLoading: (id: string) => boolean;
}

export interface ServiceHeroProps {
  readonly service: Service;
  readonly levels:  readonly Level[];
}

export interface ServiceQuoteFormProps {
  readonly service: Service;
  readonly levels:  readonly Level[];
}

export interface ServiceDetailsProps {
  readonly service: Service;
}

export interface RelatedContentProps {
  readonly serviceId: string;
}

export interface RelatedContentGridProps {
  readonly relatedSamples: readonly Sample[];
  readonly relatedServices: readonly Service[];
  readonly isLoading:       boolean;
}
