import { apiGet, apiPost } from "@/api-client";
import {
  FetchServicesResponseSchema,
  FetchLevelsResponseSchema,
  FetchFeaturedServicesResponseSchema,
  CalculatePriceResponseSchema,
  CalculatePriceRequestSchema,
} from "@/lib/schemas/quote.schema";
import type {
  ApiResult,
  Service,
  Level,
  FeaturedService
} from "@/types"
import type {
  CalculatePriceRequest,
  CalculatePriceResponse,
} from "@/types/quote.type";

// ─── Services ─────────────────────────────────────────────────────────────────

/**
 * Fetches all available services from the backend.
 * Results are cached by Next.js for 60 seconds.
 */
export async function fetchServices(): Promise<ApiResult<Service[]>> {
  const result = await apiGet<unknown>("/services", {
    next: { revalidate: 60, tags: ["services"] },
  });

  if (!result.ok) return result;

  const parsed = FetchServicesResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid services response from server",
        code: "PARSE_ERROR",
        details: parsed.error.flatten(),
      },
    };
  }

  return { ok: true, data: parsed.data.services };
}

// ─── Levels ──────────────────────────────────────────────────────────────────

/**
 * Fetches all available academic / expertise levels.
 * Results are cached by Next.js for 60 seconds.
 */
export async function fetchLevels(): Promise<ApiResult<Level[]>> {
  const result = await apiGet<unknown>("/levels", {
    next: { revalidate: 60, tags: ["levels"] },
  });

  if (!result.ok) return result;

  const parsed = FetchLevelsResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid levels response from server",
        code: "PARSE_ERROR",
        details: parsed.error.flatten(),
      },
    };
  }

  return { ok: true, data: parsed.data.levels };
}

// ─── Featured Services (Marquee) ──────────────────────────────────────────────

/**
 * Fetches featured services for the homepage marquee.
 * Results are cached by Next.js for 5 minutes.
 */
export async function fetchFeaturedServices(): Promise<
  ApiResult<FeaturedService[]>
> {
  const result = await apiGet<unknown>("/featured-services", {
    next: { revalidate: 300, tags: ["featured-services"] },
  });

  if (!result.ok) return result;

  const parsed = FetchFeaturedServicesResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid featured services response from server",
        code: "PARSE_ERROR",
        details: parsed.error.flatten(),
      },
    };
  }

  return { ok: true, data: parsed.data.featured_services };
}

// ─── Price Calculation ────────────────────────────────────────────────────────

/**
 * Sends a price-calculation request to the backend.
 * This is a client-side only call (no caching).
 */
export async function calculatePrice(
  payload: CalculatePriceRequest
): Promise<ApiResult<CalculatePriceResponse>> {
  // Validate before sending
  const validation = CalculatePriceRequestSchema.safeParse(payload);
  if (!validation.success) {
    return {
      ok: false,
      error: {
        message: "Invalid price calculation payload",
        code: "VALIDATION_ERROR",
        details: validation.error.flatten(),
      },
    };
  }

  const result = await apiPost<unknown>("/calculate-price", validation.data);

  if (!result.ok) return result;

  const parsed = CalculatePriceResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid price calculation response from server",
        code: "PARSE_ERROR",
        details: parsed.error.flatten(),
      },
    };
  }

  return { ok: true, data: parsed.data };
}
