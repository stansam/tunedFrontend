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
        errors?: Record<string, string[]> | string;
        status: number | "PARSE_ERROR" | "TIMEOUT" | "NETWORK_ERROR";
      };
    };