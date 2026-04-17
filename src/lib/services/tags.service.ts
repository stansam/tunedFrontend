import { apiGet } from "@/api-client";
import { TagListResponseSchema } from "@/lib/schemas/tag.schema";
import type { ApiResult } from "@/lib/types";
import type { TagResponse } from "@/lib/types/tag.type";

export async function fetchTags(): Promise<ApiResult<readonly TagResponse[]>> {
  const result = await apiGet<unknown>("/tags", {
    next: { revalidate: 300 },
  });

  if (!result.ok) return result as ApiResult<readonly TagResponse[]>;

  const parsed = TagListResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[Tags] PARSE ERROR:", parsed.error.format());
    }
    return {
      ok: false,
      error: {
        message: "Invalid tags format returned from server.",
        errors: parsed.error.flatten().fieldErrors as unknown as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data as readonly TagResponse[],
    message: "Tags fetched successfully.",
    status: 200,
  };
}
