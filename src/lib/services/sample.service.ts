import { apiGet } from "@/api-client";
import { SampleSchema, RelatedSamplesResponseSchema } from "@/app/(main)/samples/[slug]/_shemas/sample.schema";
import type { ApiResult } from "@/lib/types";
import type { Sample, RelatedSampleItem } from "@/app/(main)/samples/[slug]/_types/sample.type";

export async function fetchSample(
  slug: string
): Promise<ApiResult<Sample>> {
  const result = await apiGet<unknown>(`/samples/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });

  if (!result.ok) return result as ApiResult<Sample>;

  const parsed = SampleSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[SampleDetail] PARSE ERROR:", parsed.error.format());
      console.log("[SampleDetail] RAW:", result.data);
    }
    return {
      ok: false,
      error: {
        message: "Invalid sample response from server.",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data as Sample,
    message: "Sample fetched successfully.",
    status: 200,
  };
}

export async function fetchRelatedSamples(
  slug: string
): Promise<ApiResult<readonly RelatedSampleItem[]>> {
  const result = await apiGet<unknown>(
    `/samples/${encodeURIComponent(slug)}/related?per_page=3`,
    { next: { revalidate: 120 } }
  );

  if (!result.ok) return result as ApiResult<readonly RelatedSampleItem[]>;

  const raw =
    Array.isArray(result.data)
      ? { data: result.data }
      : result.data;

  const parsed = RelatedSamplesResponseSchema.safeParse(raw);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[RelatedSamples] PARSE ERROR:", parsed.error.format());
      console.log("[RelatedSamples] RAW:", result.data);
    }
    return {
      ok: false,
      error: {
        message: "Invalid related samples response.",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  const items = parsed.data.data.filter((s) => s.slug !== slug);

  return {
    ok: true,
    data: items as readonly RelatedSampleItem[],
    message: "Related samples fetched.",
    status: 200,
  };
}