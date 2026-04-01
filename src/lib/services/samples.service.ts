import { apiGet } from "@/api-client";
import { SamplesPageResponseSchema } from "@/lib/schemas";
import type { ApiResult } from "@/lib/types";
import type { 
  SampleQueryParams, 
  SamplesPageResponse 
} from "@/app/(main)/samples/_types/samples.types";

export async function fetchSamples(
  params: SampleQueryParams = {}
): Promise<ApiResult<SamplesPageResponse>> {
  const query = new URLSearchParams();

  if (params.q) query.set("q", params.q);
  if (params.service_id && params.service_id !== "all") {
    query.set("service_id", params.service_id);
  }
  if (params.sort) query.set("sort", params.sort);
  if (params.order) query.set("order", params.order);
  if (params.page) query.set("page", String(params.page));
  if (params.per_page) query.set("per_page", String(params.per_page));

  const qs = query.toString();
  const path = `/samples${qs ? `?${qs}` : ""}`;

  const result = await apiGet<unknown>(path, {
    cache: "no-store",
  });

  if (!result.ok) return result as ApiResult<SamplesPageResponse>;

  const parsed = SamplesPageResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const normalizedErrors: Record<string, string[]> = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
    );

    return {
      ok: false,
      error: {
        message: "Invalid samples response from server.",
        errors: normalizedErrors,
        status: "PARSE_ERROR",
      },
    };
  }

  const data: SamplesPageResponse = {
    ...parsed.data,
    data: parsed.data.data.map(item => ({
      ...item,
      tags: item.tags,
    })),
  };

  return {
    ok: true,
    data,
    message: "Samples fetched successfully.",
    status: 200,
  };
}
