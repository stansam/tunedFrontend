export interface Service {
    id: string;
    name: string;
    description: string;
    category_id: string;
    featured: boolean;
    pricing_category_id: string;
    slug: string;
    is_active: boolean;
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