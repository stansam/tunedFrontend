import { Service, Level, FeaturedService, ServiceId, LevelId, CategoryTab } from "./index";

export interface CalculatePriceRequest {
  service_id: ServiceId;
  level_id: LevelId;
  /** ISO 8601, timezone-aware. e.g. "2026-03-17T04:21:33.512894Z" */
  deadline: string;
  page_count: number;
  word_count: number;
}

export interface CalculatePriceResponse {
  price: number;
  currency: string;
  formatted: string; // e.g. "$12.00"
}

export interface FetchServicesResponse {
  services: Service[];
}

export interface FetchLevelsResponse {
  levels: Level[];
}

export interface FetchFeaturedServicesResponse {
  featured_services: FeaturedService[];
}

// ─── Form State ───────────────────────────────────────────────────────────────

export interface QuoteFormState {
  activeTab: CategoryTab;
  serviceId: ServiceId | null;
  levelId: LevelId | null;
  deadline: string | null; // ISO 8601 UTC string
  pageCount: number;
}
