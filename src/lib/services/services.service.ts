import { ApiResult } from "@/lib/types";
import { GetServicesResponseSchema } from "@/lib/schemas/service.schema";
import { apiGet } from "@/api-client";
import z from "zod";

export async function fetchFeaturedServices(): Promise<
  ApiResult<z.infer<typeof GetServicesResponseSchema>>
> {
  const result = await apiGet<typeof GetServicesResponseSchema>("/featured-services", {
    next: { revalidate: 300, tags: ["featured-services"] },
  });

  if (!result.ok) return result;

  const parsed = GetServicesResponseSchema.safeParse(result.data);
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