export type ServiceId = string;
export type LevelId = string;
export type CategoryTab = "writing" | "technical" | "proofreading";

// ─── Domain Models ────────────────────────────────────────────────────────────

export interface Service {
  id: ServiceId;
  name: string;
  category: CategoryTab;
  description?: string;
}

export interface Level {
  id: LevelId;
  name: string;
  description?: string;
}

export interface FeaturedService {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  iconEmoji?: string;
}

// ─── API Meta ─────────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };
