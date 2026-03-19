import { Tag } from "./content.type";

export interface Service {
    id: string;
    name: string;
    description: string;
    category_id: string;
    featured: boolean;
    pricing_category_id: string;
    slug: string;
    is_active: boolean;
    tags: Tag[];
}

export interface FallbackService {
    id: string;
    name: string;
    description: string;
    iconEmoji: string;
}


export interface ServiceIconMapping {
  readonly keywords:  readonly string[];
  readonly emoji:     string;
  readonly ariaLabel: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface FetchServicesResponse {
  services: Service[];
}