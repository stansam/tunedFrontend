import { z } from "zod";

/** ISO-8601 UTC datetime regex */
export const isoUtcDatetime = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/,
    "Must be a timezone-aware ISO 8601 datetime string ending in Z"
  );