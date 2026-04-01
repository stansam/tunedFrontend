import { Tag, Sample } from "./content.type";

export interface Service {
  readonly id:                  string;
  readonly name:                string;
  readonly description:         string;
  readonly category_id:         string;
  readonly featured:            boolean;
  readonly pricing_category_id: string;
  readonly slug:                string;
  readonly is_active:           boolean;
  readonly tags:                readonly Tag[];
}

export interface FallbackService {
  readonly id:        string;
  readonly name:      string;
  readonly description: string;
  readonly iconEmoji: string;
}

export interface ServiceIconMapping {
  readonly keywords:  readonly string[];
  readonly emoji:     string;
  readonly ariaLabel: string;
}

export interface ServiceCategory {
  readonly id:          string;
  readonly name:        string;
  readonly description: string;
  readonly order:       number;
  readonly services?:   readonly Service[]; // For nested Navbar dropdown
}

export interface ServiceDetails extends Service {
  readonly content: string;
  readonly meta_description?: string;
  readonly category_name?: string;
}

export interface RelatedContentResponse {
  readonly services: readonly Service[];
  readonly samples:  readonly Sample[];
}

export interface FetchServicesResponse {
  readonly services: readonly Service[];
}

export interface ServiceCategoryResponse {
  readonly categories: readonly ServiceCategory[];
}