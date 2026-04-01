import { apiGet } from "@/api-client";
import { 
  ServiceCategorySchema, 
  ServiceDetailsSchema, 
  RelatedContentResponseSchema,
  AcademicLevelSchema
} from "@/lib/schemas/service.schema";
import { z } from "zod";
import type { ApiResult } from "@/lib/types";
import type { 
  Service,
  ServiceCategory, 
  ServiceDetails, 
  RelatedContentResponse 
} from "@/lib/types/service.type";
import type { Level, Sample } from "@/lib/types/content.type";

/**
 * Fetch all service categories with their nested services for navigation.
 */
export async function fetchServiceCategories(): Promise<ApiResult<readonly ServiceCategory[]>> {
  const result = await apiGet<unknown>("/services/categories", {
    next: { revalidate: 3600, tags: ["services:categories"] }
  });

  if (!result.ok) return result as ApiResult<readonly ServiceCategory[]>;

  const parsed = z.array(ServiceCategorySchema).safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid service categories response from server.",
        errors: parsed.error.flatten().fieldErrors as unknown as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data as readonly ServiceCategory[],
    message: "Service categories fetched successfully",
    status: 200,
  };
}

/**
 * Fetch detailed information for a single service by its slug.
 */
export async function fetchServiceBySlug(slug: string): Promise<ApiResult<ServiceDetails>> {
  const result = await apiGet<unknown>(`/services/${slug}`, {
    next: { revalidate: 3600, tags: [`service:${slug}`] }
  });

  if (!result.ok) return result as ApiResult<ServiceDetails>;

  const parsed = ServiceDetailsSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid service details response from server.",
        errors: parsed.error.flatten().fieldErrors as unknown as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data as ServiceDetails,
    message: "Service details fetched successfully",
    status: 200,
  };
}

/**
 * Fetch related samples and services for a given service.
 */
export async function fetchRelatedContent(serviceId: string): Promise<ApiResult<RelatedContentResponse>> {
  const result = await apiGet<unknown>(`/services/${serviceId}/related-content`, {
    next: { revalidate: 3600 }
  });

  if (!result.ok) return result as ApiResult<RelatedContentResponse>;

  const parsed = RelatedContentResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid related content response from server.",
        errors: parsed.error.flatten().fieldErrors as unknown as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  // Map to align with frontend Sample type which uses service_id
  const data: RelatedContentResponse = {
    services: parsed.data.services as readonly Service[],
    samples: parsed.data.samples.map(s => ({
      ...s,
      service_id: s.service?.id || "",
    })) as unknown as readonly Sample[],
  };

  return {
    ok: true,
    data,
    message: "Related content fetched successfully",
    status: 200,
  };
}

/**
 * Fetch academic levels for the quote form.
 */
export async function fetchAcademicLevels(): Promise<ApiResult<readonly Level[]>> {
  const result = await apiGet<unknown>("/academic-levels", {
    next: { revalidate: 86400 } // Cache for 24 hours
  });

  if (!result.ok) return result as ApiResult<readonly Level[]>;

  const parsed = z.array(AcademicLevelSchema).safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid academic levels response from server.",
        errors: parsed.error.flatten().fieldErrors as unknown as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data as readonly Level[],
    message: "Academic levels fetched successfully",
    status: 200,
  };
}
