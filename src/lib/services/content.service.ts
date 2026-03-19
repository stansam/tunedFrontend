import { ApiResult, FeaturedContentResponse } from "@/lib/types";
import { FeaturedContentResponseSchema } from "@/lib/schemas/content.schema";
import { apiGet } from "@/api-client";

export async function fetchFeaturedContent(): Promise<
  ApiResult<FeaturedContentResponse>
> {
  const result = await apiGet<FeaturedContentResponse>("/featured/content", {
    next: { revalidate: 300, tags: ["featured-content"] },
  });

  if (!result.ok) return result;

  const parsed = FeaturedContentResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid featured services response from server",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true, 
    data: parsed.data,
    message: "Featured services fetched successfully",
    status: 200,
  };
}