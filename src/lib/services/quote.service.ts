import { apiGet, apiPost } from "@/api-client";
import { z } from "zod";
import {
  CalculatePriceResponseSchema,
  CalculatePriceRequestSchema,
} from "@/lib/schemas";
import type {
  ApiResult,
  CalculatePriceRequest,
  CalculatePriceResponse
} from "@/lib/types"
import {
  GetQuoteOptionsResponseSchema,
} from "@/lib/schemas/quote.schema";

export type QuoteOptionsData = z.infer<typeof GetQuoteOptionsResponseSchema>;

export async function fetchOptions(): Promise<ApiResult<QuoteOptionsData>> {
  const result = await apiGet<QuoteOptionsData>("/quote/options", {
    next: { revalidate: 60, tags: ["quote:options"] },
  });

  if (!result.ok) return result;

  const parsed = GetQuoteOptionsResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid quote options response from server",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return { 
    ok: true,
    data: parsed.data,
    message: "Quote options fetched successfully",
    status: 200,
   };
}

export async function calculatePrice(
  payload: CalculatePriceRequest
): Promise<ApiResult<CalculatePriceResponse>> {
  const validation = CalculatePriceRequestSchema.safeParse(payload);
  if (!validation.success) {
    return {
      ok: false,
      error: {
        message: "Invalid price calculation payload",
        errors: validation.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  const result = await apiPost<CalculatePriceResponse>("/calculate-price", validation.data);

  if (!result.ok) return result;

  const parsed = CalculatePriceResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Invalid price calculation response from server",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return { 
    ok: true, 
    data: parsed.data,
    message: "Price calculation successful",
    status: 200,
   };
}
