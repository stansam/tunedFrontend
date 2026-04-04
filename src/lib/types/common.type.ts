export type ApiResult<T> =
  | {
      ok: true;
      data: T;
      message: string;
      status: number;
    }
  | {
      ok: false;
      error: {
        message: string;
        errors?: Record<string, string[]>;
        status: number | "PARSE_ERROR" | "TIMEOUT" | "NETWORK_ERROR";
      };
    };
    
export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  timeoutMs?: number;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export type NavLink = {
  label: string;
  href: string;
};

export interface Pagination {
  readonly sort:        string;
  readonly order:       string;
  readonly page:        number;
  readonly per_page:    number;
}