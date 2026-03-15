import type { ApiError, ApiResult } from "@/types";

// ─── Config ───────────────────────────────────────────────────────────────────

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";

const DEFAULT_TIMEOUT_MS = 15_000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildHeaders(extra?: HeadersInit): HeadersInit {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...extra,
  };
}

async function parseErrorBody(res: Response): Promise<ApiError> {
  try {
    const body = await res.json();
    return {
      message: body?.message ?? body?.detail ?? res.statusText,
      code: body?.code ?? res.status,
      details: body,
    };
  } catch {
    return { message: res.statusText, code: res.status };
  }
}

// ─── Core Request ─────────────────────────────────────────────────────────────

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  timeoutMs?: number;
  next?: NextFetchRequestConfig;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResult<T>> {
  const {
    method = "GET",
    body,
    headers,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    next,
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(buildUrl(path), {
      method,
      headers: buildHeaders(headers),
      body: body != null ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      ...(next ? { next } : {}),
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const error = await parseErrorBody(res);
      return { ok: false, error };
    }

    const data: T = await res.json();
    return { ok: true, data };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        ok: false,
        error: { message: "Request timed out", code: "TIMEOUT" },
      };
    }

    return {
      ok: false,
      error: {
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
        code: "NETWORK_ERROR",
      },
    };
  }
}


export const apiGet = <T>(
  path: string,
  opts?: Omit<RequestOptions, "method" | "body">
): Promise<ApiResult<T>> => apiRequest<T>(path, { ...opts, method: "GET" });

export const apiPost = <T>(
  path: string,
  body: unknown,
  opts?: Omit<RequestOptions, "method" | "body">
): Promise<ApiResult<T>> =>
  apiRequest<T>(path, { ...opts, method: "POST", body });
