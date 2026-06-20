import type { AdminNavStats } from "../_schemas/nav.schema";

export interface AdminNavStatsState {
  readonly activeOrdersCount: number;
  readonly paymentsCount: number;
  readonly chatCount: number;
  readonly testimonialsCount: number;
  readonly isLoading: boolean;
}

export type { AdminNavStats };
