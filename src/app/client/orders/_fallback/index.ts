import type { OrderListResponseDTO } from "../_types";

export const FALLBACK_ORDERS: OrderListResponseDTO = {
  orders: [],
  total: 0,
  page: 1,
  per_page: 10,
  sort: "created_at",
  order: "desc",
};

export const SKELETON_COUNT = 5;

export const DEFAULT_PER_PAGE = 10;
