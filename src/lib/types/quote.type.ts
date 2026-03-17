import { Level } from "./content.type"

export type CategoryTab = "writing" | "technical" | "proofreading";
type ServiceId = string;
type LevelId = string;

export interface QuoteFormState {
  activeTab: CategoryTab;
  serviceId: ServiceId | null;
  levelId: LevelId | null;
  deadline: string | null; // ISO 8601 UTC string
  pageCount: number;
}

export interface ServiceWithPricingCategory {
  id: string;
  name: string;
  category: string; // Service category name
  pricing_category: CategoryTab, // Pricing category name
}

export interface QuoteFormOptions {
    services: ServiceWithPricingCategory[];
    levels: Level[] ;
}