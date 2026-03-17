import type { ApiResult, RequestOptions } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";

const DEFAULT_TIMEOUT_MS = 15_000;

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

async function parseErrorBody(res: Response): Promise<ApiResult<never>> {
  try {
    const body = await res.json();
    return {
      ok: false,
      error: {
        message: body?.message ?? body?.detail ?? res.statusText,
        errors: body?.errors ?? { "": [] },
        status: body?.code ?? res.status,
      },
    };
  } catch {
    return {
      ok: false,
      error: {
        message: res.statusText,
        status: res.status,
        errors: { "": [] },
      },
    };
  }
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
      return await parseErrorBody(res);
    }

    const contentType = res.headers.get("content-type");
    const data: T = contentType?.includes("application/json")
      ?
      await res.json()
      : (null as T);
    return {
      ok: true,
      data,
      message: res.statusText,
      status: res.status,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        ok: false,
        error: { 
          message: "Request timed out",
          errors: { "": [] },
          status: "TIMEOUT"
        },
      };
    }

    return {
      ok: false,
      error: {
        message:
           "An unexpected error occurred",
        errors: err instanceof Error ? { "": [err.message] } : { "": ["An unexpected error occurred"] },
        status: "NETWORK_ERROR",
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
