import { z } from "zod";
import { apiGet } from "@/api-client";
import { SamplesPageResponseSchema, SampleServiceSchema } from "@/lib/schemas";
import type { ApiResult } from "@/lib/types";
import type { 
  SampleQueryParams, 
  SampleService, 
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
    if (process.env.NODE_ENV !== "production") {
      console.error("SAMPLES PARSE ERROR:", parsed.error.format());
      console.log("SAMPLES RAW DATA:", result.data);
    }

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

  // const data: SamplesPageResponse = {
  //   ...parsed.data,
  //   data: parsed.data.data.map(item => ({
  //     ...item,
  //     tags: item.tags,
  //   })),
  // };

  return {
    ok: true,
    data: parsed.data,
    message: "Samples fetched successfully.",
    status: 200,
  };
}

export async function fetchSampleService(): Promise<ApiResult<SampleService[]>> {
  const result = await apiGet<unknown>("/samples/services", {
    cache: "no-store",
  });

  if (!result.ok) return result as ApiResult<SampleService[]>;

  const parsed = z.array(SampleServiceSchema).safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("SAMPLES SERVICE PARSE ERROR:", parsed.error.format());
      console.log("SAMPLES SERVICE RAW DATA:", result.data);
    }

    const fieldErrors = parsed.error.flatten().fieldErrors;
    const normalizedErrors: Record<string, string[]> = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
    );

    return {
      ok: false,
      error: {
        message: "Invalid sample categories response from server.",
        errors: normalizedErrors,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data,
    message: "Sample categories fetched successfully.",
    status: 200,
  };
}