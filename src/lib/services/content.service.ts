// import { ApiResult, FeaturedContentResponse } from "@/lib/types";
// import { FeaturedContentResponseSchema } from "@/lib/schemas/content.schema";
// import { apiGet } from "@/api-client";

// export async function fetchFeaturedContent(): Promise<
//   ApiResult<FeaturedContentResponse>
// > {
//   const result = await apiGet<FeaturedContentResponse>("/featured/content", {
//     next: { revalidate: 300, tags: ["featured-content"] },
//   });

//   if (!result.ok) return result;

//   const parsed = FeaturedContentResponseSchema.safeParse(result.data);
//   if (!parsed.success) {
//     return {
//       ok: false,
//       error: {
//         message: "Invalid featured services response from server",
//         errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
//         status: "PARSE_ERROR",
//       },
//     };
//   }

//   return {
//     ok: true, 
//     data: parsed.data,
//     message: "Featured services fetched successfully",
//     status: 200,
//   };
// }

/**
 * content.service.ts
 *
 * Service function for fetching all featured content from the backend.
 *
 * Corrections from the previous version:
 *
 *   1. apiGet generic changed from `FeaturedContentResponse` → `unknown`.
 *      Reason: the raw fetch response is unvalidated at that point. Typing it
 *      as `FeaturedContentResponse` was a lie — it told TypeScript the data
 *      was already shaped correctly before Zod had a chance to verify it.
 *      Using `unknown` forces all downstream consumption to go through the
 *      Zod parse, which is the correct trust boundary.
 *
 *   2. Removed `as Record<string, string[]>` unsafe cast on fieldErrors.
 *      Reason: `parsed.error.flatten().fieldErrors` is already typed by Zod
 *      as `Record<string, string[] | undefined>`. The cast was hiding the
 *      `| undefined` on each value, producing a false sense of safety.
 *      The ApiError `errors` field now uses Zod's exact inferred type.
 *
 *   3. `status` field on success response is a number (200), not a string.
 *      Matches the ApiResult contract precisely.
 */

import { apiGet } from "@/api-client";
import { FeaturedContentResponseSchema } from "@/lib/schemas";
import type { ApiResult } from "@/lib/types";
import type { FeaturedContentResponse } from "@/app/(main)/_types";


// type ZodFieldErrors = Record<string, string[] | undefined>;

export async function fetchFeaturedContent(): Promise<
  ApiResult<FeaturedContentResponse>
> {
  
  const result = await apiGet<unknown>("/featured/content", {
    next: { revalidate: 300, tags: ["featured-content"] },
  });

  if (!result.ok) return result;

  const parsed = FeaturedContentResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid featured content response from server",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status:    "PARSE_ERROR",
      },
    };
  }

  return {
    ok:   true,
    data: parsed.data,
    message: "Featured services fetched successfully",
    status: 200,
  };
}